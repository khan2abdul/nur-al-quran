/**
 * useBookmarks Hook for Nur-Al-Quran
 * 
 * Manages bookmark state with cloud sync for authenticated users
 * and localStorage persistence for guests.
 * 
 * @module hooks/useBookmarks
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Bookmark } from '@/types';
import { STORAGE_KEYS } from '@/config/appConfig';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { generateId } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';
import {
    fetchCloudBookmarks,
    saveCloudBookmark,
    deleteCloudBookmark,
    syncLocalToCloud,
    clearCloudBookmarks,
} from '@/services/bookmarkService';

/**
 * Bookmark with additional display info
 */
export interface BookmarkWithInfo extends Bookmark {
    /** Surah name for display */
    surahName?: string;
    /** Arabic name of the surah */
    arabicName?: string;
    /** Preview text of the verse */
    versePreview?: string;
}

/**
 * Return type for useBookmarks hook
 */
interface UseBookmarksReturn {
    /** List of all bookmarks */
    bookmarks: Bookmark[];

    /** Add a new bookmark */
    addBookmark: (surahId: number, verseNumber: number, note?: string) => Bookmark;

    /** Remove a bookmark by verse ID */
    removeBookmark: (verseId: string) => void;

    /** Toggle bookmark for a verse */
    toggleBookmark: (surahId: number, verseNumber: number) => void;

    /** Check if a verse is bookmarked */
    isBookmarked: (surahId: number, verseNumber: number) => boolean;

    /** Get bookmark for a verse */
    getBookmark: (surahId: number, verseNumber: number) => Bookmark | undefined;

    /** Clear all bookmarks */
    clearAllBookmarks: () => void;

    /** Get bookmarks for a specific surah */
    getBookmarksBySurah: (surahId: number) => Bookmark[];

    /** Total bookmark count */
    count: number;

    /** Loading state */
    isLoading: boolean;

    /** Whether using cloud sync */
    isCloudSynced: boolean;
}

/**
 * Create verse ID from surah and verse number
 */
const createVerseId = (surahId: number, verseNumber: number): string =>
    `${surahId}:${verseNumber}`;

/**
 * Custom hook for managing bookmarks
 * 
 * @returns Bookmark management functions and state
 * 
 * @example
 * const { bookmarks, addBookmark, isBookmarked, toggleBookmark } = useBookmarks();
 * 
 * // Check if verse is bookmarked
 * if (isBookmarked(1, 5)) { ... }
 * 
 * // Toggle bookmark
 * toggleBookmark(1, 5);
 */
export function useBookmarks(): UseBookmarksReturn {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Load bookmarks from localStorage on initialization
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
        return getStorageItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    });

    // Sync with cloud when user changes (sign in/out)
    useEffect(() => {
        const syncBookmarks = async () => {
            if (user) {
                setIsLoading(true);
                try {
                    // Get local bookmarks
                    const localBookmarks = getStorageItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);

                    // Sync local to cloud and get merged result
                    const mergedBookmarks = await syncLocalToCloud(user.uid, localBookmarks);

                    // Update state and localStorage with merged bookmarks
                    setBookmarks(mergedBookmarks);
                    setStorageItem(STORAGE_KEYS.BOOKMARKS, mergedBookmarks);
                } catch (error) {
                    console.error('Failed to sync bookmarks:', error);
                    // Fallback to cloud-only on error
                    const cloudBookmarks = await fetchCloudBookmarks(user.uid);
                    setBookmarks(cloudBookmarks);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        syncBookmarks();
    }, [user?.uid]);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        setStorageItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
    }, [bookmarks]);

    /**
     * Add a new bookmark
     */
    const addBookmark = useCallback((
        surahId: number,
        verseNumber: number,
        note?: string
    ): Bookmark => {
        const verseId = createVerseId(surahId, verseNumber);

        const newBookmark: Bookmark = {
            id: generateId(),
            verseId,
            surahId,
            verseNumber,
            createdAt: Date.now(),
            note,
        };

        setBookmarks(prev => {
            // Check if already exists
            if (prev.some(b => b.verseId === verseId)) {
                return prev;
            }
            return [...prev, newBookmark];
        });

        // Sync to cloud if authenticated
        if (user) {
            saveCloudBookmark(user.uid, newBookmark).catch(console.error);
        }

        return newBookmark;
    }, [user]);

    /**
     * Remove a bookmark by verse ID
     */
    const removeBookmark = useCallback((verseId: string) => {
        setBookmarks(prev => prev.filter(b => b.verseId !== verseId));

        // Sync to cloud if authenticated
        if (user) {
            deleteCloudBookmark(user.uid, verseId).catch(console.error);
        }
    }, [user]);

    /**
     * Toggle bookmark for a verse
     */
    const toggleBookmark = useCallback((surahId: number, verseNumber: number) => {
        const verseId = createVerseId(surahId, verseNumber);

        setBookmarks(prev => {
            const exists = prev.find(b => b.verseId === verseId);
            if (exists) {
                // Remove from cloud if authenticated
                if (user) {
                    deleteCloudBookmark(user.uid, verseId).catch(console.error);
                }
                return prev.filter(b => b.verseId !== verseId);
            }

            const newBookmark: Bookmark = {
                id: generateId(),
                verseId,
                surahId,
                verseNumber,
                createdAt: Date.now(),
            };

            // Save to cloud if authenticated
            if (user) {
                saveCloudBookmark(user.uid, newBookmark).catch(console.error);
            }

            return [...prev, newBookmark];
        });
    }, [user]);

    /**
     * Check if a verse is bookmarked
     */
    const isBookmarked = useCallback((surahId: number, verseNumber: number): boolean => {
        const verseId = createVerseId(surahId, verseNumber);
        return bookmarks.some(b => b.verseId === verseId);
    }, [bookmarks]);

    /**
     * Get bookmark for a verse
     */
    const getBookmark = useCallback((surahId: number, verseNumber: number): Bookmark | undefined => {
        const verseId = createVerseId(surahId, verseNumber);
        return bookmarks.find(b => b.verseId === verseId);
    }, [bookmarks]);

    /**
     * Clear all bookmarks
     */
    const clearAllBookmarks = useCallback(() => {
        setBookmarks([]);

        // Clear from cloud if authenticated
        if (user) {
            clearCloudBookmarks(user.uid).catch(console.error);
        }
    }, [user]);

    /**
     * Get bookmarks for a specific surah
     */
    const getBookmarksBySurah = useCallback((surahId: number): Bookmark[] => {
        return bookmarks.filter(b => b.surahId === surahId);
    }, [bookmarks]);

    /**
     * Total bookmark count
     */
    const count = useMemo(() => bookmarks.length, [bookmarks]);

    /**
     * Whether using cloud sync
     */
    const isCloudSynced = useMemo(() => !!user, [user]);

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        isBookmarked,
        getBookmark,
        clearAllBookmarks,
        getBookmarksBySurah,
        count,
        isLoading,
        isCloudSynced,
    };
}

export default useBookmarks;
