import { fetchAllSurahMeanings } from './quranApi';
import type { VerseMeaning } from '@/data/meanings/types';

// In-memory cache for search data
let meaningsCache: Record<number, Record<number, VerseMeaning>> | null = null;
let isFetching = false;

export interface SearchMatch {
    surahId: number;
    verseNumbers: number[];
}

/**
 * Normalizes text for insensitive searching
 */
const normalize = (text: string) => text.toLowerCase().trim();

/**
 * Searches across all cached surah meanings for keywords
 */
export async function searchVersesByKeywords(query: string): Promise<SearchMatch[]> {
    if (!query) return [];

    // Lazy load/refresh meanings cache
    if (!meaningsCache && !isFetching) {
        isFetching = true;
        try {
            meaningsCache = await fetchAllSurahMeanings();
        } finally {
            isFetching = false;
        }
    }

    if (!meaningsCache) return [];

    const normalizedQuery = normalize(query);
    const keywords = normalizedQuery.split(/[\/\s,]+/).filter(k => k.length > 2); // Split by slash, space, comma

    // Fallback to full query if keywords are too short or none
    const searchTerms = keywords.length > 0 ? keywords : [normalizedQuery];

    const results: SearchMatch[] = [];

    // Search through all surahs
    for (const [surahIdStr, verses] of Object.entries(meaningsCache)) {
        const surahId = parseInt(surahIdStr);
        const matchingVerses: number[] = [];

        // Search through all verses in this surah
        for (const [verseNumStr, meaning] of Object.entries(verses)) {
            const verseNum = parseInt(verseNumStr);

            // Generate searchable blob
            const searchableText = normalize([
                meaning.meaningEn,
                meaning.meaningHi,
                meaning.hinglish,
                ...(meaning.easyWords || [])
            ].filter(Boolean).join(' '));

            // Match if ANY search term is found (for slashes/multi-word)
            // Or if the full query is found
            const matches = searchTerms.some(term => searchableText.includes(term)) ||
                searchableText.includes(normalizedQuery);

            if (matches) {
                matchingVerses.push(verseNum);
            }
        }

        if (matchingVerses.length > 0) {
            results.push({
                surahId,
                verseNumbers: matchingVerses
            });
        }
    }

    // Sort by Surah ID for consistency
    return results.sort((a, b) => a.surahId - b.surahId);
}
