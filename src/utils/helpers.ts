/**
 * Utility Functions for Nur-Al-Quran
 * 
 * General-purpose helper functions used across the application.
 * 
 * @module utils/helpers
 */

/**
 * Generate a unique ID
 * 
 * @returns A unique string identifier
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format verse key for display
 * 
 * @param surahId - Surah number
 * @param verseNumber - Verse number
 * @returns Formatted string like "2:255"
 */
export function formatVerseKey(surahId: number, verseNumber: number): string {
    return `${surahId}:${verseNumber}`;
}

/**
 * Parse verse key into components
 * 
 * @param verseKey - Verse key in format "surah:verse"
 * @returns Object with surahId and verseNumber
 */
export function parseVerseKey(verseKey: string): { surahId: number; verseNumber: number } {
    const [surah, verse] = verseKey.split(':');
    return {
        surahId: parseInt(surah ?? '1', 10),
        verseNumber: parseInt(verse ?? '1', 10),
    };
}

/**
 * Convert Arabic numerals to Eastern Arabic numerals
 * 
 * @param num - Number to convert
 * @returns String with Eastern Arabic numerals
 * 
 * @example
 * toArabicNumerals(123) // "١٢٣"
 */
export function toArabicNumerals(num: number): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d, 10)] ?? d).join('');
}

/**
 * Debounce a function call
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, wait);
    };
}

/**
 * Clamp a number between min and max
 * 
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Format duration in seconds to MM:SS
 * 
 * @param seconds - Duration in seconds
 * @returns Formatted string like "3:45"
 */
export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if a string contains Arabic characters
 * 
 * @param text - Text to check
 * @returns True if contains Arabic
 */
export function containsArabic(text: string): boolean {
    return /[\u0600-\u06FF]/.test(text);
}

/**
 * Capitalize first letter of a string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Create a range of numbers
 * 
 * @param start - Start number (inclusive)
 * @param end - End number (inclusive)
 * @returns Array of numbers
 */
export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Sleep for a specified duration
 * 
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if we're running on the server (SSR)
 * 
 * @returns True if server-side
 */
export function isServer(): boolean {
    return typeof window === 'undefined';
}

/**
 * Check if the device is mobile
 * 
 * @returns True if mobile device
 */
export function isMobile(): boolean {
    if (isServer()) return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}
