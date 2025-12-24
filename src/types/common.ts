/**
 * Common Types for Nur-Al-Quran
 * 
 * Generic types used across the application including
 * API responses, UI state, and utility types.
 * 
 * @module types/common
 */

/**
 * Supported UI languages
 */
export type Language = 'ar' | 'en' | 'hi';

/**
 * Application theme modes
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Generic API response wrapper
 * @template T - The type of data returned on success
 */
export interface ApiResponse<T> {
    /** Response data on success */
    readonly data: T | null;

    /** Error message on failure */
    readonly error: string | null;

    /** Loading state */
    readonly loading: boolean;
}

/**
 * Async operation state
 * @template T - The type of data being loaded
 */
export interface AsyncState<T> {
    readonly data: T | null;
    readonly loading: boolean;
    readonly error: Error | null;
}

/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
    /** Page number (1-indexed) */
    readonly page: number;

    /** Items per page */
    readonly limit: number;
}

/**
 * Paginated response wrapper
 * @template T - The type of items in the list
 */
export interface PaginatedResponse<T> {
    /** List of items */
    readonly items: readonly T[];

    /** Total number of items */
    readonly total: number;

    /** Current page number */
    readonly page: number;

    /** Total number of pages */
    readonly totalPages: number;

    /** Whether there are more pages */
    readonly hasMore: boolean;
}

/**
 * Application settings stored in localStorage
 */
export interface AppSettings {
    /** Current theme preference */
    readonly theme: Theme;

    /** Current language */
    readonly language: Language;

    /** Preferred reciter for audio */
    readonly reciter: string;

    /** Auto-play audio on verse navigation */
    readonly autoPlayAudio: boolean;

    /** Show word-by-word translation by default */
    readonly showWordByWord: boolean;

    /** Arabic font size setting */
    readonly arabicFontSize: 'sm' | 'base' | 'lg' | 'xl';

    /** Translation font size setting */
    readonly translationFontSize: 'sm' | 'base' | 'lg';
}

/**
 * Default application settings
 */
export const DEFAULT_SETTINGS: AppSettings = {
    theme: 'system',
    language: 'en',
    reciter: 'mishary-alafasy',
    autoPlayAudio: false,
    showWordByWord: false,
    arabicFontSize: 'base',
    translationFontSize: 'base',
} as const;

/**
 * Navigation route definition
 */
export interface RouteDefinition {
    /** Route path */
    readonly path: string;

    /** Display name for navigation */
    readonly name: string;

    /** Icon name (from icon library) */
    readonly icon?: string;

    /** Whether to show in main navigation */
    readonly showInNav: boolean;
}

/**
 * Toast notification type
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast notification message
 */
export interface Toast {
    readonly id: string;
    readonly type: ToastType;
    readonly message: string;
    readonly duration?: number;
}
