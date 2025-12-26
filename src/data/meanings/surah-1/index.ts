/**
 * Meanings for Surah 1 (Al-Fatihah)
 * 
 * Each verse has simple, 5th-grade level explanations in:
 * - English (simple words, relatable examples)
 * - Hinglish (Indian context, conversational)
 */

import { verse1Meaning } from './verse-1';
// Import other verses as you create them
// import { verse2Meaning } from './verse-2';
// import { verse3Meaning } from './verse-3';
// ... etc

export interface VerseMeaning {
    verseNumber: number;
    meaningEn: string;
    meaningHi?: string;
    keywords?: Array<{
        word: string;
        meaning: string;
    }>;
}

export const surah1Meanings: Record<number, VerseMeaning> = {
    1: verse1Meaning,
    // 2: verse2Meaning,
    // 3: verse3Meaning,
    // Add more as you create them
};

export default surah1Meanings;
