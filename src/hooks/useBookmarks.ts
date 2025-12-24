/**
 * useBookmarks Hook for Nur-Al-Quran
 * 
 * Manages bookmark state with localStorage persistence.
 * Provides add, remove, toggle, and check operations.
 * 
 * @module hooks/useBookmarks
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Bookmark } from '@/types';
import { STORAGE_KEYS } from '@/config/appConfig';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { generateId } from '@/utils/helpers';

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
    // Load bookmarks from localStorage on initialization
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
        return getStorageItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    });

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

        return newBookmark;
    }, []);

    /**
     * Remove a bookmark by verse ID
     */
    const removeBookmark = useCallback((verseId: string) => {
        setBookmarks(prev => prev.filter(b => b.verseId !== verseId));
    }, []);

    /**
     * Toggle bookmark for a verse
     */
    const toggleBookmark = useCallback((surahId: number, verseNumber: number) => {
        const verseId = createVerseId(surahId, verseNumber);

        setBookmarks(prev => {
            const exists = prev.find(b => b.verseId === verseId);
            if (exists) {
                return prev.filter(b => b.verseId !== verseId);
            }

            const newBookmark: Bookmark = {
                id: generateId(),
                verseId,
                surahId,
                verseNumber,
                createdAt: Date.now(),
            };
            return [...prev, newBookmark];
        });
    }, []);

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
    }, []);

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
    };
}

export default useBookmarks;
