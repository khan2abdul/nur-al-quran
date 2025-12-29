/**
 * Quran Data Types for Nur-Al-Quran
 * 
 * Defines the core data structures for Surahs, Verses, Translations,
 * and Audio recitations based on Quran.com API schema.
 * 
 * @module types/quran
 */

/**
 * Revelation type indicating where the Surah was revealed
 */
export type RevelationType = 'makkah' | 'madinah';

/**
 * Supported languages for translations
 */
export type TranslationLanguage = 'ar' | 'en' | 'hi';

/**
 * Represents a Surah (Chapter) of the Quran
 */
export interface Surah {
    /** Unique identifier (1-114) */
    readonly id: number;

    /** English name of the Surah */
    readonly name: string;

    /** Arabic name of the Surah */
    readonly arabicName: string;

    /** Transliterated name (e.g., "Al-Fatihah") */
    readonly transliteration: string;

    /** English translation of the name */
    readonly englishMeaning: string;

    /** Total number of verses in this Surah */
    readonly totalVerses: number;

    /** Where the Surah was revealed */
    readonly revelationType: RevelationType;

    /** Order of revelation (1-114) */
    readonly revelationOrder: number;

    /** Juz numbers this Surah spans */
    readonly juzNumbers: readonly number[];
}

/**
 * Represents a single word in a verse with its meaning
 */
export interface Word {
    /** Position in the verse (1-indexed) */
    readonly position: number;

    /** Arabic text of the word */
    readonly arabic: string;

    /** Transliteration */
    readonly transliteration: string;

    /** Word-by-word translation */
    readonly translation: string;
}

/**
 * Translation of a verse in a specific language
 */
export interface Translation {
    /** Language code */
    readonly language: TranslationLanguage;

    /** Translated text */
    readonly text: string;

    /** Translator/source name */
    readonly source: string;
}

/**
 * Audio recitation metadata
 */
export interface AudioRecitation {
    /** URL to the audio file */
    readonly url: string;

    /** Reciter name */
    readonly reciter: string;

    /** Duration in seconds */
    readonly duration: number;
}

/**
 * Represents a single Ayah (Verse) of the Quran
 */
export interface Verse {
    /** Unique identifier (composite of surah:verse) */
    readonly id: string;

    /** Surah number (1-114) */
    readonly surahId: number;

    /** Verse number within the Surah */
    readonly verseNumber: number;

    /** Arabic text of the verse */
    readonly arabic: string;

    /** Word-by-word breakdown */
    readonly words: readonly Word[];

    /** Available translations */
    readonly translations: readonly Translation[];

    /** Hinglish translation (Roman Urdu/Hindi) */
    readonly hinglish?: string;

    /** Simplified meaning/tafsir (Hinglish) */
    readonly meaning?: string;

    /** English meaning/tafsir */
    readonly meaningEn?: string;

    /** Audio data */
    readonly audio?: AudioRecitation;

    /** Juz number (1-30) */
    readonly juzNumber: number;

    /** Page number in standard Mushaf */
    readonly pageNumber: number;
}

/**
 * Represents a Juz (Part/Section) of the Quran
 */
export interface Juz {
    /** Juz number (1-30) */
    readonly id: number;

    /** Starting Surah and verse */
    readonly start: {
        readonly surahId: number;
        readonly verseNumber: number;
    };

    /** Ending Surah and verse */
    readonly end: {
        readonly surahId: number;
        readonly verseNumber: number;
    };

    /** Total verses in this Juz */
    readonly totalVerses: number;
}

/**
 * User bookmark for a verse
 */
export interface Bookmark {
    /** Unique bookmark ID */
    readonly id: string;

    /** Verse identifier (surahId:verseNumber) */
    readonly verseId: string;

    /** Surah ID for quick filtering */
    readonly surahId: number;

    /** Verse number for display */
    readonly verseNumber: number;

    /** Timestamp when bookmark was created */
    readonly createdAt: number;

    /** Optional user note */
    readonly note?: string;
}

/**
 * User note for a verse
 */
export interface Note {
    /** Unique note ID */
    readonly id: string;

    /** Verse identifier (surahId:verseNumber) */
    readonly verseId: string;

    /** Surah ID for quick filtering */
    readonly surahId: number;

    /** Verse number for display */
    readonly verseNumber: number;

    /** User's note text */
    readonly text: string;

    /** Timestamp when note was created */
    readonly createdAt: number;

    /** Timestamp when note was last updated */
    readonly updatedAt: number;
}

/**
 * Reading progress tracking
 */
export interface ReadingProgress {
    /** Last read verse ID */
    readonly lastVerseId: string;

    /** Last read Surah ID */
    readonly lastSurahId: number;

    /** Last read verse number */
    readonly lastVerseNumber: number;

    /** Timestamp of last reading session */
    readonly timestamp: number;
}

/**
 * Reciter (Qari) information
 */
export interface Reciter {
    /** Unique reciter ID from API */
    readonly id: number;

    /** Reciter's name */
    readonly name: string;

    /** Arabic name if available */
    readonly arabicName?: string;

    /** Recitation style description */
    readonly style: string;

    /** Country/nationality */
    readonly country?: string;
}

/**
 * Verse timing for audio synchronization
 */
export interface VerseTiming {
    /** Verse number (1-indexed) */
    readonly verseNumber: number;

    /** Start time in seconds */
    readonly startTime: number;

    /** End time in seconds */
    readonly endTime: number;
}

/**
 * Chapter/Surah audio metadata
 */
export interface ChapterAudio {
    /** Surah number */
    readonly surahId: number;

    /** Audio file URL */
    readonly audioUrl: string;

    /** Reciter information */
    readonly reciter: Reciter;

    /** Total duration in seconds */
    readonly duration: number;

    /** Timing segments for each verse */
    readonly verseTimings: readonly VerseTiming[];
}

/**
 * Playback speed options
 */
export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

/**
 * Audio playback mode
 */
export type PlaybackMode = 'continuous' | 'verse-by-verse';

/**
 * Audio player state
 */
export interface AudioPlayerState {
    /** Whether audio is currently playing */
    readonly isPlaying: boolean;

    /** Whether audio is loading */
    readonly isLoading: boolean;

    /** Current Surah being played */
    readonly currentSurah: number | null;

    /** Current verse being played (1-indexed) */
    readonly currentVerse: number;

    /** Current playback time in seconds */
    readonly currentTime: number;

    /** Total duration in seconds */
    readonly duration: number;

    /** Current playback speed */
    readonly playbackSpeed: PlaybackSpeed;

    /** Selected reciter */
    readonly selectedReciter: Reciter | null;

    /** Playback mode */
    readonly playbackMode: PlaybackMode;

    /** Verse timings for current surah */
    readonly verseTimings: readonly VerseTiming[];

    /** Error message if any */
    readonly error: string | null;
}

/**
 * Difficult word with simple explanation
 */
export interface DifficultWord {
    /** The Arabic word */
    readonly word: string;

    /** Transliteration */
    readonly transliteration: string;

    /** Simple meaning (conversational language) */
    readonly meaning: string;
}

/**
 * Verse context information
 */
export interface VerseContext {
    /** Where it was revealed */
    readonly setting: 'Makkah' | 'Madinah';

    /** Simple explanation of the verse */
    readonly explanation: string;

    /** Related themes or topics */
    readonly themes?: readonly string[];
}

/**
 * Detailed metadata for a Surah (Chapter)
 */
export interface SurahMetadata {
    /** Short meaningful statement */
    readonly significance: string;

    /** Background context in Hinglish */
    readonly history: string;

    /** Background context in English */
    readonly historyEn: string;

    /** Key informational badges */
    readonly contextBullets: readonly {
        readonly icon: string;
        readonly label: string;
        readonly text: string;
    }[];

    /** Unique Surah title */
    readonly title: string;
}
