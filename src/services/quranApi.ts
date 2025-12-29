/**
 * Quran API Service for Nur-Al-Quran
 * 
 * Handles all API calls to Quran Foundation API (v4).
 * Includes error handling, caching, and type-safe responses.
 * 
 * @module services/quranApi
 * @see https://apis.quran.foundation/content/api/v4
 */

import { API_CONFIG } from '@/config/appConfig';
import type { Surah, Verse, Juz } from '@/types';
import { getAccessToken } from './quranFoundationAuth';
import { db } from './firebase';
import type { VerseMeaning } from '@/data/meanings/types';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    where,
    limit
} from 'firebase/firestore';


/**
 * Custom error for API failures
 */

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
 * Fetch wrapper with timeout and error handling for Quran Foundation API
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const token = await getAccessToken();
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'x-auth-token': token || '',
                'x-client-id': import.meta.env.VITE_QURAN_FOUNDATION_CLIENT_ID || ''
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
    try {
        // 1. Try Firestore First
        const chaptersCol = collection(db, 'quran_foundation_chapters');
        const q = query(chaptersCol, orderBy('id', 'asc'));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            console.log('✅ Fetched chapters from Firestore');
            return snapshot.docs.map(doc => {
                const data = doc.data() as ApiSurah;
                return {
                    id: data.id,
                    name: data.name_simple,
                    arabicName: data.name_arabic,
                    transliteration: data.name_complex,
                    englishMeaning: data.translated_name.name,
                    totalVerses: data.verses_count,
                    revelationType: data.revelation_place,
                    revelationOrder: data.revelation_order,
                    juzNumbers: [],
                };
            });
        }

        // 2. Fallback to API
        const response = await apiFetch<{ chapters: ApiSurah[] }>('/chapters');

        return response.chapters.map((surah): Surah => ({
            id: surah.id,
            name: surah.name_simple,
            arabicName: surah.name_arabic,
            transliteration: surah.name_complex,
            englishMeaning: surah.translated_name.name,
            totalVerses: surah.verses_count,
            revelationType: surah.revelation_place,
            revelationOrder: surah.revelation_order,
            juzNumbers: [],
        }));
    } catch (error) {
        console.error('fetchSurahs failed:', error);
        throw error;
    }
}

/**
 * Fetch a single Surah by ID
 * 
 * @param surahId - Surah number (1-114)
 * @returns Surah details
 * @throws QuranApiError on failure
 */
export async function fetchSurah(surahId: number): Promise<Surah> {
    try {
        // 1. Try Firestore First
        const docRef = doc(db, 'quran_foundation_chapters', String(surahId));
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
            const data = snapshot.data() as ApiSurah;
            return {
                id: data.id,
                name: data.name_simple,
                arabicName: data.name_arabic,
                transliteration: data.name_complex,
                englishMeaning: data.translated_name.name,
                totalVerses: data.verses_count,
                revelationType: data.revelation_place,
                revelationOrder: data.revelation_order,
                juzNumbers: [],
            };
        }

        // 2. Fallback to API
        const response = await apiFetch<{ chapter: ApiSurah }>(`/chapters/${surahId}`);
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
    } catch (error) {
        console.error(`fetchSurah(${surahId}) failed:`, error);
        throw error;
    }
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
    try {
        // 1. Try Firestore First
        const versesCol = collection(db, 'quran_foundation_verses');
        const q = query(
            versesCol,
            where('chapter_id', '==', surahId)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            console.log(`✅ Fetched verses for Chapter ${surahId} from Firestore`);
            const allVerses: any[] = snapshot.docs.map(d => d.data());

            // Sort client-side to avoid composite index requirement
            allVerses.sort((a, b) => (a.verse_number || 0) - (b.verse_number || 0));

            // Client-side pagination for Firestore data
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const paginatedVerses = allVerses.slice(start, end);
            const totalPages = Math.ceil(allVerses.length / perPage);

            const verses: Verse[] = paginatedVerses.map((verse): Verse => ({
                id: verse.verse_key,
                surahId,
                verseNumber: verse.verse_number,
                arabic: verse.text_uthmani,
                hinglish: verse.hinglish,
                meaning: verse.meaning,
                meaningEn: verse.meaningEn,
                words: [],
                translations: verse.translations?.map((t: any) => {
                    let language: 'en' | 'hi' | 'ar' = 'en';
                    if (t.resource_id === API_CONFIG.TRANSLATIONS.hi || t.resource_id === 122) {
                        language = 'hi';
                    } else if (t.resource_id === API_CONFIG.TRANSLATIONS.en || t.resource_id === 85) {
                        language = 'en';
                    }
                    return {
                        language,
                        text: t.text.replace(/<[^>]*>/g, ''),
                        source: t.resource_name,
                    };
                }) ?? [],
                audio: {
                    url: `https://verses.quran.com/Alafasy/mp3/${surahId.toString().padStart(3, '0')}${verse.verse_number.toString().padStart(3, '0')}.mp3`,
                    reciter: 'Mishary Rashid Alafasy',
                    duration: 0,
                },
                juzNumber: verse.juz_number,
                pageNumber: verse.page_number,
            }));

            return {
                verses,
                pagination: { totalPages, currentPage: page },
            };
        }

        // 2. Fallback to API
        interface ApiResponse {
            verses: ApiVerse[];
            pagination: {
                total_pages: number;
                current_page: number;
            };
        }

        const translationIds = [
            API_CONFIG.TRANSLATIONS.en,
            API_CONFIG.TRANSLATIONS.hi
        ].join(',');

        const endpoint = `/verses/by_chapter/${surahId}?page=${page}&per_page=${perPage}&translations=${translationIds}&fields=text_uthmani,juz_number,page_number`;

        const response = await apiFetch<ApiResponse>(endpoint);

        const verses: Verse[] = response.verses.map((verse): Verse => {

            return {
                id: verse.verse_key,
                surahId,
                verseNumber: verse.verse_number,
                arabic: verse.text_uthmani,
                hinglish: '',
                meaning: '',
                meaningEn: '',
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
                        text: t.text.replace(/<[^>]*>/g, ''),
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
    } catch (error) {
        throw error;
    }
}

/**
 * Fetch a single verse's audio URL (from API)
 * Note: Individual verse audio is not currently synced to Firestore
 */
export async function fetchVerseAudio(
    verseKey: string,
    reciterId = API_CONFIG.DEFAULT_RECITER_ID
): Promise<string> {
    try {
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
    } catch (error) {
        // Simple fallback construction if API fails
        const [surah, verse] = verseKey.split(':');
        return `https://verses.quran.com/Alafasy/mp3/${surah.padStart(3, '0')}${verse.padStart(3, '0')}.mp3`;
    }
}

/**
 * Fetch all reciters from Firestore
 */
export async function fetchReciters(): Promise<any[]> {
    try {
        const recitersCol = collection(db, 'quran_foundation_reciters');
        const snapshot = await getDocs(recitersCol);

        if (!snapshot.empty) {
            const popularIds = [7, 1, 2, 3, 4, 5, 6, 9, 10];
            const reciters = snapshot.docs.map(doc => {
                const data = doc.data();
                // Field names in Firestore can be 'name' or 'reciter_name' depending on the sync version
                const name = data.name || data.reciter_name || 'Unknown Reciter';
                const style = data.style || data.type || 'Murattal';

                return {
                    id: data.id,
                    name: name,
                    style: style,
                    arabicName: data.arabic_name,
                    country: data.language_name === 'Arabic' ? '🇸🇦' : '🌍'
                };
            });

            // Sort: Popular IDs first, then alphabetically by name
            return reciters.sort((a, b) => {
                const aIndex = popularIds.indexOf(a.id);
                const bIndex = popularIds.indexOf(b.id);

                if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;

                return a.name.localeCompare(b.name);
            });
        }

        // If Firestore is empty, return empty array and log warning
        console.warn('⚠️ No reciters found in Firestore. Please run the sync script.');
        return [];
    } catch (error) {
        console.error('fetchReciters failed:', error);
        return [];
    }
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
        timestamps: Array<{
            verse_key: string;
            timestamp_from: string | number;
            timestamp_to: string | number;
        }>;
    } | null;
}

/**
 * Fetch chapter audio with verse timings from Quran Foundation API
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
    try {
        // 1. Try Firestore First for Timings
        const docRef = doc(db, 'quran_foundation_audio', `${reciterId}_${surahId}`);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
            const data = snapshot.data();
            console.log(`✅ Fetched timings for Reciter ${reciterId}, Chapter ${surahId} from Firestore`);

            const timingsArray = data.timestamps || [];

            // Smarter isMs check: if the last timing is huge, it's definitely ms
            const lastTiming = timingsArray[timingsArray.length - 1];
            const isMs = lastTiming ? parseFloat(lastTiming.timestamp_to) > 10000 : false;

            const verseTimings = timingsArray.map((t: any) => {
                const from = parseFloat(t.timestamp_from);
                const to = parseFloat(t.timestamp_to);

                return {
                    verseNumber: parseInt(t.verse_key.split(':')[1], 10),
                    startTime: isMs ? from / 1000 : from,
                    endTime: isMs ? to / 1000 : to,
                };
            });

            let audioUrl = data.audio_url || '';
            if (audioUrl && !audioUrl.startsWith('http')) {
                audioUrl = `https:${audioUrl}`;
            }

            return {
                audioUrl,
                duration: data.duration || 0,
                verseTimings,
            };
        }

        // 2. Fallback to API
        const response = await apiFetch<ChapterAudioResponse>(
            `/chapter_recitations/${reciterId}/${surahId}?segments=true`
        );

        const audioFile = response.audio_file;

        if (!audioFile) {
            throw new QuranApiError('Audio file not found for this chapter');
        }

        const audioUrl = audioFile.audio_url.startsWith('http')
            ? audioFile.audio_url
            : `https:${audioFile.audio_url}`;

        const timingsArray = audioFile.timestamps || [];
        const verseTimings = timingsArray.map((t: any) => {
            const from = parseFloat(t.timestamp_from);
            const to = parseFloat(t.timestamp_to);
            const isMs = from > 10000;

            return {
                verseNumber: parseInt(t.verse_key.split(':')[1], 10),
                startTime: isMs ? from / 1000 : from,
                endTime: isMs ? to / 1000 : to,
            };
        });

        console.log(`✅ Audio loaded from Quran Foundation for Reciter ${reciterId}, Surah ${surahId}. Timings count: ${verseTimings.length}. URL: ${audioUrl}`);

        return {
            audioUrl,
            duration: audioFile.duration || 0,
            verseTimings,
        };
    } catch (error) {
        console.error(`fetchChapterAudio(${surahId}, ${reciterId}) failed:`, error);
        throw error;
    }
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

/**
 * Fetch surah meanings from Firestore
 * @param surahId - Chapter number
 */
export async function fetchSurahMeanings(surahId: number): Promise<Record<number, VerseMeaning> | null> {
    console.log(`🔍 [Firestore] Attempting to fetch meanings for Surah ${surahId}`);
    try {
        const docRef = doc(db, 'quran_meanings', surahId.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const versesArray = data.verses as VerseMeaning[];

            // Convert array to Record<verseNumber, VerseMeaning>
            const meaningsRecord: Record<number, VerseMeaning> = {};
            versesArray.forEach(v => {
                meaningsRecord[v.verse] = v;
            });

            console.log(`✅ [Firestore] Found meanings for Surah ${surahId}:`, Object.keys(meaningsRecord).length, 'verses');
            return meaningsRecord;
        }
        console.warn(`❌ [Firestore] No meanings document found for Surah ${surahId}`);
        return null;
    } catch (error) {
        console.error(`❌ [Firestore] fetchSurahMeanings(${surahId}) failed:`, error);
        return null;
    }
}

/**
 * Fetch ALL surah meanings from Firestore (for bulk search)
 */
export async function fetchAllSurahMeanings(): Promise<Record<number, Record<number, VerseMeaning>>> {
    console.log(`🔍 [Firestore] Attempting to fetch ALL meanings for search`);
    try {
        const colRef = collection(db, 'quran_meanings');
        const querySnapshot = await getDocs(colRef);

        const allMeanings: Record<number, Record<number, VerseMeaning>> = {};

        querySnapshot.forEach(docSnap => {
            const surahId = parseInt(docSnap.id);
            const data = docSnap.data();
            const versesArray = data.verses as VerseMeaning[];

            const meaningsRecord: Record<number, VerseMeaning> = {};
            versesArray.forEach(v => {
                meaningsRecord[v.verse] = v;
            });

            allMeanings[surahId] = meaningsRecord;
        });

        console.log(`✅ [Firestore] Found meanings for ${Object.keys(allMeanings).length} Surahs`);
        return allMeanings;
    } catch (error) {
        console.error(`❌ [Firestore] fetchAllSurahMeanings failed:`, error);
        return {};
    }
}

/**
 * Fetch surah info (Significance, Background) from Firestore
 * @param surahId - Chapter number
 */
export async function fetchSurahInfo(surahId: number): Promise<any | null> {
    console.log(`🔍 [Firestore] Attempting to fetch metadata for Surah ${surahId}`);
    try {
        const docRef = doc(db, 'surah_info', surahId.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(`✅ [Firestore] Found metadata for Surah ${surahId}`);
            return {
                title: data.title,
                significance: data.significance,
                history: data.backgroundHi || data.history,
                historyEn: data.backgroundEn || data.historyEn,
                contextBullets: data.contextBullets
            };
        }
        console.warn(`❌ [Firestore] No metadata document found for Surah ${surahId}`);
        return null;
    } catch (error) {
        console.error(`❌ [Firestore] fetchSurahInfo(${surahId}) failed:`, error);
        return null;
    }
}
