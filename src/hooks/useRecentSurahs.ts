import { useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { STORAGE_KEYS } from '@/config/appConfig';

const MAX_RECENT = 5;

/**
 * Hook to manage recently viewed surahs
 */
export function useRecentSurahs() {
    const [recentIds, setRecentIds] = useState<number[]>([]);

    // Initialize from localStorage
    useEffect(() => {
        const stored = getStorageItem<number[]>(STORAGE_KEYS.RECENT_SURAHS, []);
        setRecentIds(stored);
    }, []);

    /**
     * Add a surah to the recent list
     */
    const addRecentSurah = useCallback((id: number) => {
        setRecentIds(prev => {
            // Remove if already exists to move it to the front
            const filtered = prev.filter(existingId => existingId !== id);
            // Add to front and limit size
            const updated = [id, ...filtered].slice(0, MAX_RECENT);

            // Persist to localStorage
            setStorageItem(STORAGE_KEYS.RECENT_SURAHS, updated);

            return updated;
        });
    }, []);

    /**
     * Clear all recent surahs
     */
    const clearRecentSurahs = useCallback(() => {
        setRecentIds([]);
        setStorageItem(STORAGE_KEYS.RECENT_SURAHS, []);
    }, []);

    return {
        recentIds,
        addRecentSurah,
        clearRecentSurahs
    };
}
