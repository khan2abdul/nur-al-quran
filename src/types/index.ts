/**
 * Type Definitions Index for Nur-Al-Quran
 * 
 * Re-exports all type definitions for convenient importing.
 * 
 * @example
 * import { Surah, Verse, Language, Theme } from '@/types';
 * 
 * @module types
 */

// Quran data types
export type {
    RevelationType,
    TranslationLanguage,
    Surah,
    Word,
    Translation,
    AudioRecitation,
    Verse,
    Juz,
    Bookmark,
    Note,
    ReadingProgress,
    Reciter,
    VerseTiming,
    ChapterAudio,
    PlaybackSpeed,
    PlaybackMode,
    AudioPlayerState,
    DifficultWord,
    VerseContext,
} from './quran';

// Common application types
export type {
    Language,
    Theme,
    ApiResponse,
    AsyncState,
    PaginationParams,
    PaginatedResponse,
    AppSettings,
    RouteDefinition,
    ToastType,
    Toast,
} from './common';

// Re-export constants
export { DEFAULT_SETTINGS } from './common';
