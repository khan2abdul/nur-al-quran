/**
 * Application Configuration for Nur-Al-Quran
 * 
 * Contains global constants, API endpoints, and feature flags.
 * All configuration values are typed and immutable.
 * 
 * @module config/appConfig
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
    /** Quran Foundation API base URL */
    BASE_URL: 'https://apis.quran.foundation/content/api/v4',

    /** Request timeout in milliseconds */
    TIMEOUT: 10000,

    /** Default reciter ID for audio */
    DEFAULT_RECITER_ID: 7, // Mishary Rashid Alafasy

    /** Default translation IDs by language */
    TRANSLATIONS: {
        en: 85,  // Abdul Haleem (Standard English)
        hi: 122, // Hindi translation
        ar: 0,   // Arabic (original text, no translation needed)
    },
} as const;

/**
 * Application Metadata
 */
export const APP_CONFIG = {
    /** Application name */
    NAME: 'Nur Al-Quran',

    /** Application tagline */
    TAGLINE: 'Bringing Divine Light to Everyone',

    /** Version number */
    VERSION: '1.0.0',

    /** GitHub repository URL */
    REPO_URL: 'https://github.com/khan2abdul/nur-al-quran',

    /** Firebase project URL */
    LIVE_URL: 'https://nur-al-quran.web.app',
} as const;

/**
 * localStorage keys for persistent data
 */
export const STORAGE_KEYS = {
    /** User settings */
    SETTINGS: 'nur-al-quran:settings',

    /** Bookmarks list */
    BOOKMARKS: 'nur-al-quran:bookmarks',

    /** Reading progress */
    READING_PROGRESS: 'nur-al-quran:reading-progress',

    /** Theme preference */
    THEME: 'nur-al-quran:theme',

    /** Language preference */
    LANGUAGE: 'nur-al-quran:language',

    /** Cached Surah list */
    SURAH_CACHE: 'nur-al-quran:surahs',

    /** Recently viewed Surahs */
    RECENT_SURAHS: 'nur-al-quran:recent-surahs',

    /** Completed/Read Surahs */
    READ_SURAHS: 'nur-al-quran:read-surahs',
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG = {
    /** Number of verses to load per page */
    VERSES_PER_PAGE: 20,

    /** Debounce delay for search input (ms) */
    SEARCH_DEBOUNCE: 300,

    /** Toast notification duration (ms) */
    TOAST_DURATION: 3000,

    /** Animation duration (ms) */
    ANIMATION_DURATION: 300,
} as const;

/**
 * Quran Constants
 */
export const QURAN_CONFIG = {
    /** Total number of Surahs */
    TOTAL_SURAHS: 114,

    /** Total number of Juz (parts) */
    TOTAL_JUZ: 30,

    /** Total number of verses in the Quran */
    TOTAL_VERSES: 6236,

    /** Total number of pages in standard Mushaf */
    TOTAL_PAGES: 604,
} as const;
