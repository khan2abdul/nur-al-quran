/**
 * Quran API Service for Nur-Al-Quran
 * 
 * Handles all API calls to Quran.com API (v4).
 * Includes error handling, caching, and type-safe responses.
 * 
 * @module services/quranApi
 * @see https://quran.api-docs.io/
 */

import { API_CONFIG } from '@/config/appConfig';
import type { Surah, Verse, Juz } from '@/types';
import { surah1Data } from '@/data/quran/surah-1';

const LOCAL_DATA: Record<number, any[]> = {
    1: surah1Data
};

/**
 * Raw Surah response from API
 */
interface ApiSurah {
    id: number;
    name_simple: string;
    name_arabic: string;
    name_complex: string;
    revelation_place: 'makkah' | 'madinah';
    revelation_order: number;
    verses_count: number;
    translated_name: { name: string };
}

/**
 * Raw Verse response from API
 */
interface ApiVerse {
    id: number;
    verse_key: string;
    verse_number: number;
    text_uthmani: string;
    juz_number: number;
    page_number: number;
    translations?: Array<{
        id: number;
        resource_id: number;
        text: string;
        resource_name: string;
        language_name: string;
    }>;
    audio?: {
        url: string;
    };
}

/**
 * Custom error for API failures
 */
export class QuranApiError extends Error {
    constructor(
        message: string,
        public readonly statusCode?: number,
        public readonly endpoint?: string
    ) {
        super(message);
        this.name = 'QuranApiError';
    }
}

/**
 * Fetch wrapper with timeout and error handling
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new QuranApiError(
                `API request failed: ${response.statusText}`,
                response.status,
                endpoint
            );
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        if (error instanceof QuranApiError) {
            throw error;
        }
        if (error instanceof Error && error.name === 'AbortError') {
            throw new QuranApiError('Request timed out', undefined, endpoint);
        }
        throw new QuranApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            undefined,
            endpoint
        );
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Fetch all Surahs
 * 
 * @returns Array of all 114 Surahs
 * @throws QuranApiError on failure
 */
export async function fetchSurahs(): Promise<Surah[]> {
    interface ApiResponse {
        chapters: ApiSurah[];
    }

    const response = await apiFetch<ApiResponse>('/chapters');

    return response.chapters.map((surah): Surah => ({
        id: surah.id,
        name: surah.name_simple,
        arabicName: surah.name_arabic,
        transliteration: surah.name_complex,
        englishMeaning: surah.translated_name.name,
        totalVerses: surah.verses_count,
        revelationType: surah.revelation_place,
        revelationOrder: surah.revelation_order,
        juzNumbers: [], // Will be populated separately if needed
    }));
}

/**
 * Fetch a single Surah by ID
 * 
 * @param surahId - Surah number (1-114)
 * @returns Surah details
 * @throws QuranApiError on failure
 */
export async function fetchSurah(surahId: number): Promise<Surah> {
    interface ApiResponse {
        chapter: ApiSurah;
    }

    const response = await apiFetch<ApiResponse>(`/chapters/${surahId}`);
    const surah = response.chapter;

    return {
        id: surah.id,
        name: surah.name_simple,
        arabicName: surah.name_arabic,
        transliteration: surah.name_complex,
        englishMeaning: surah.translated_name.name,
        totalVerses: surah.verses_count,
        revelationType: surah.revelation_place,
        revelationOrder: surah.revelation_order,
        juzNumbers: [],
    };
}

/**
 * Fetch verses for a Surah
 * 
 * @param surahId - Surah number (1-114)
 * @param page - Page number for pagination
 * @param perPage - Verses per page
 * @returns Array of verses
 * @throws QuranApiError on failure
 */
export async function fetchVerses(
    surahId: number,
    page = 1,
    perPage = 20
): Promise<{ verses: Verse[]; pagination: { totalPages: number; currentPage: number } }> {
    interface ApiResponse {
        verses: ApiVerse[];
        pagination: {
            total_pages: number;
            current_page: number;
        };
    }

    // Request both English (131) and Hindi (122) translations
    const translationIds = [
        API_CONFIG.TRANSLATIONS.en,
        API_CONFIG.TRANSLATIONS.hi
    ].join(',');

    const endpoint = `/verses/by_chapter/${surahId}?page=${page}&per_page=${perPage}&translations=${translationIds}&fields=text_uthmani,juz_number,page_number`;
    const response = await apiFetch<ApiResponse>(endpoint);

    const verses: Verse[] = response.verses.map((verse): Verse => {
        // Find local AI data if available
        const localVerse = LOCAL_DATA[surahId]?.find((v: any) => v.verseNumber === verse.verse_number);

        return {
            id: verse.verse_key,
            surahId,
            verseNumber: verse.verse_number,
            arabic: verse.text_uthmani,
            hinglish: localVerse?.hinglish,
            meaning: localVerse?.meaning,
            meaningEn: localVerse?.meaningEn,
            words: [],
            translations: verse.translations?.map(t => {
                let language: 'en' | 'hi' | 'ar' = 'en';
                if (t.resource_id === API_CONFIG.TRANSLATIONS.hi) {
                    language = 'hi';
                } else if (t.resource_id === API_CONFIG.TRANSLATIONS.en) {
                    language = 'en';
                }

                return {
                    language,
                    text: t.text.replace(/<[^>]*>/g, ''), // Strip HTML tags
                    source: t.resource_name,
                };
            }) ?? [],
            audio: verse.audio ? {
                url: verse.audio.url,
                reciter: 'Mishary Rashid Alafasy',
                duration: 0,
            } : undefined,
            juzNumber: verse.juz_number,
            pageNumber: verse.page_number,
        };
    });

    return {
        verses,
        pagination: {
            totalPages: response.pagination.total_pages,
            currentPage: response.pagination.current_page,
        },
    };
}

/**
 * Fetch audio URL for a specific verse
 * 
 * @param verseKey - Verse key in format "surah:verse"
 * @param reciterId - Reciter ID (default: Mishary Alafasy)
 * @returns Audio URL
 */
export async function fetchVerseAudio(
    verseKey: string,
    reciterId = API_CONFIG.DEFAULT_RECITER_ID
): Promise<string> {
    interface ApiResponse {
        audio_files: Array<{ url: string }>;
    }

    const response = await apiFetch<ApiResponse>(
        `/recitations/${reciterId}/by_ayah/${verseKey}`
    );

    if (response.audio_files.length === 0) {
        throw new QuranApiError('No audio available for this verse');
    }

    return response.audio_files[0]?.url ?? '';
}

/**
 * Fetch all Juz information
 * 
 * @returns Array of all 30 Juz
 */
export async function fetchJuzList(): Promise<Juz[]> {
    interface ApiResponse {
        juzs: Array<{
            id: number;
            juz_number: number;
            verse_mapping: Record<string, string>;
        }>;
    }

    const response = await apiFetch<ApiResponse>('/juzs');

    // Deduplicate Juz by juz_number (API returns 60 items, likely duplicates)
    const uniqueJuzs = new Set<number>();

    return response.juzs
        .filter(j => {
            if (uniqueJuzs.has(j.juz_number)) return false;
            uniqueJuzs.add(j.juz_number);
            return true;
        })
        .map((juz): Juz => {
            const mappings = Object.entries(juz.verse_mapping);
            const firstMapping = mappings[0];
            const lastMapping = mappings[mappings.length - 1];

            const startVerse = firstMapping?.[1]?.split('-')[0] ?? '1';
            const endVerse = lastMapping?.[1]?.split('-')[1] ?? '1';

            return {
                id: juz.juz_number,
                start: {
                    surahId: parseInt(firstMapping?.[0] ?? '1', 10),
                    verseNumber: parseInt(startVerse, 10),
                },
                end: {
                    surahId: parseInt(lastMapping?.[0] ?? '1', 10),
                    verseNumber: parseInt(endVerse, 10),
                },
                totalVerses: 0,
            };
        });
}

/**
 * Audio file response from chapter recitations API
 */
interface ChapterAudioResponse {
    audio_file: {
        id: number;
        chapter_id: number;
        file_size: number;
        format: string;
        audio_url: string;
        duration: number;
        verse_timings: Array<{
            verse_key: string;
            timestamp_from: number;
            timestamp_to: number;
            duration: number;
            segments: number[][];
        }>;
    } | null;
}

/**
 * Fetch chapter audio with verse timings
 * 
 * @param surahId - Surah number (1-114)
 * @param reciterId - Reciter ID (default: 7 for Mishary Alafasy)
 * @returns Audio URL and verse timings
 * @throws QuranApiError on failure
 */
export async function fetchChapterAudio(
    surahId: number,
    reciterId = 7
): Promise<{
    audioUrl: string;
    duration: number;
    verseTimings: Array<{ verseNumber: number; startTime: number; endTime: number }>;
}> {
    const response = await apiFetch<ChapterAudioResponse>(
        `/chapter_recitations/${reciterId}/${surahId}`
    );

    const audioFile = response.audio_file;

    if (!audioFile) {
        throw new QuranApiError('Audio file not found for this chapter');
    }

    // Convert verse timings to our format
    const verseTimings = audioFile.verse_timings.map((timing) => {
        const verseNumber = parseInt(timing.verse_key.split(':')[1] ?? '1', 10);
        return {
            verseNumber,
            startTime: timing.timestamp_from / 1000, // Convert ms to seconds
            endTime: timing.timestamp_to / 1000,
        };
    });

    return {
        audioUrl: audioFile.audio_url,
        duration: audioFile.duration,
        verseTimings,
    };
}

/**
 * List of available reciters
 */
export const AVAILABLE_RECITERS = [
    { id: 7, name: 'Mishary Rashid Alafasy', style: 'Melodic & Clear', country: '🇰🇼', arabicName: 'مشاري العفاسي' },
    { id: 1, name: 'AbdulBaset AbdulSamad', style: 'Classic & Majestic', country: '🇪🇬', arabicName: 'عبدالباسط عبدالصمد' },
    { id: 2, name: 'Abdur-Rahman as-Sudais', style: 'Powerful & Fast', country: '🇸🇦', arabicName: 'عبدالرحمن السديس' },
    { id: 3, name: 'Abu Bakr al-Shatri', style: 'Soothing & Deep', country: '🇸🇦', arabicName: 'أبو بكر الشاطري' },
    { id: 4, name: 'Hani ar-Rifai', style: 'Emotional & Gentle', country: '🇸🇦', arabicName: 'هاني الرفاعي' },
    { id: 5, name: 'Mahmoud Khalil Al-Husary', style: 'Slow & Educational', country: '🇪🇬', arabicName: 'محمود خليل الحصري' },
    { id: 6, name: 'Saad al-Ghamdi', style: 'Soft & Soothing', country: '🇸🇦', arabicName: 'سعد الغامدي' },
    { id: 9, name: 'Maher Al Muaiqly', style: 'Contemporary', country: '🇸🇦', arabicName: 'ماهر المعيقلي' },
    { id: 10, name: 'Siddiq Al-Minshawi', style: 'Crying Recitation', country: '🇪🇬', arabicName: 'صديق المنشاوي' },
] as const;
