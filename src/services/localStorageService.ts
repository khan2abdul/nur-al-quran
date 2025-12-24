/**
 * localStorage Service for Nur-Al-Quran
 * 
 * Provides a type-safe abstraction over localStorage with
 * JSON serialization, error handling, and fallback support.
 * 
 * @module services/localStorageService
 */

/**
 * Get item from localStorage with type safety
 * 
 * @template T - The expected type of the stored value
 * @param key - The storage key
 * @param fallback - Default value if key doesn't exist or parsing fails
 * @returns The stored value or fallback
 * 
 * @example
 * const bookmarks = getStorageItem('bookmarks', []);
 */
export function getStorageItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') {
        return fallback;
    }

    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            return fallback;
        }
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return fallback;
    }
}

/**
 * Set item in localStorage with JSON serialization
 * 
 * @template T - The type of the value to store
 * @param key - The storage key
 * @param value - The value to store
 * @returns True if successful, false otherwise
 * 
 * @example
 * setStorageItem('settings', { theme: 'dark' });
 */
export function setStorageItem<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error);
        return false;
    }
}

/**
 * Remove item from localStorage
 * 
 * @param key - The storage key to remove
 * @returns True if successful, false otherwise
 */
export function removeStorageItem(key: string): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
        return false;
    }
}

/**
 * Clear all Nur-Al-Quran related items from localStorage
 * 
 * @param prefix - The key prefix to match (default: 'nur-al-quran:')
 * @returns Number of items removed
 */
export function clearStorageByPrefix(prefix = 'nur-al-quran:'): number {
    if (typeof window === 'undefined') {
        return 0;
    }

    try {
        const keysToRemove: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
        return keysToRemove.length;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return 0;
    }
}

/**
 * Check if localStorage is available
 * 
 * @returns True if localStorage is available and working
 */
export function isStorageAvailable(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}
