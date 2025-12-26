/**
 * Central export for all Surah meanings
 * Supports dynamic asynchronous loading for all 114 surahs.
 */

import type { VerseMeaning } from './types';

export type { VerseMeaning };

// Cache for loaded surah meanings
const surahCache: Record<number, Record<number, VerseMeaning>> = {};

import { fetchSurahMeanings } from '@/services/quranApi';

/**
 * Dynamically load meanings for a specific surah
 * @param surahId - Chapter number (1-114)
 */
export async function loadSurahMeanings(surahId: number): Promise<Record<number, VerseMeaning> | undefined> {
    if (surahCache[surahId]) return surahCache[surahId];

    try {
        // 1. Try Firestore first
        const firestoreMeanings = await fetchSurahMeanings(surahId);
        if (firestoreMeanings) {
            console.log(`📡 Loaded meanings for Surah ${surahId} from Firestore`);
            surahCache[surahId] = firestoreMeanings;
            return firestoreMeanings;
        }

        console.warn(`⚠️ Meanings not found in Firestore for Surah ${surahId}. Local .tsx files have been removed.`);
    } catch (error) {
        console.warn(`Meanings not found/loaded for Surah ${surahId}:`, error);
    }

    return undefined;
}

/**
 * Get meaning for a specific verse (Sync version - requires prior load)
 * @param surahId - Chapter number (1-114)
 * @param verseNumber - Verse number within the chapter
 * @returns VerseMeaning object or undefined if not found
 */
export function getVerseMeaning(surahId: number, verseNumber: number): VerseMeaning | undefined {
    return surahCache[surahId]?.[verseNumber];
}

/**
 * Check if a surah has meanings loaded in cache
 */
export function isSurahLoaded(surahId: number): boolean {
    return !!surahCache[surahId];
}

export default {
    loadSurahMeanings,
    getVerseMeaning,
    isSurahLoaded
};
