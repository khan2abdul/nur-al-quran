/**
 * Bookmark Service for Nur-Al-Quran
 * 
 * Provides Firestore cloud sync for authenticated users' bookmarks.
 * Guests use localStorage only (handled in useBookmarks hook).
 * 
 * @module services/bookmarkService
 */

import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    writeBatch,
    query,
    orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Bookmark } from '@/types';

/**
 * Get Firestore collection reference for user's bookmarks
 */
const getBookmarksCollection = (userId: string) =>
    collection(db, 'users', userId, 'bookmarks');

/**
 * Fetch all bookmarks from Firestore for a user
 */
export async function fetchCloudBookmarks(userId: string): Promise<Bookmark[]> {
    try {
        const bookmarksRef = getBookmarksCollection(userId);
        const q = query(bookmarksRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Bookmark[];
    } catch (error) {
        console.error('Failed to fetch cloud bookmarks:', error);
        return [];
    }
}

/**
 * Save a bookmark to Firestore
 */
export async function saveCloudBookmark(userId: string, bookmark: Bookmark): Promise<void> {
    try {
        const bookmarkRef = doc(db, 'users', userId, 'bookmarks', bookmark.verseId);
        await setDoc(bookmarkRef, {
            verseId: bookmark.verseId,
            surahId: bookmark.surahId,
            verseNumber: bookmark.verseNumber,
            createdAt: bookmark.createdAt,
            note: bookmark.note || null,
        });
    } catch (error) {
        console.error('Failed to save cloud bookmark:', error);
        throw error;
    }
}

/**
 * Delete a bookmark from Firestore
 */
export async function deleteCloudBookmark(userId: string, verseId: string): Promise<void> {
    try {
        const bookmarkRef = doc(db, 'users', userId, 'bookmarks', verseId);
        await deleteDoc(bookmarkRef);
    } catch (error) {
        console.error('Failed to delete cloud bookmark:', error);
        throw error;
    }
}

/**
 * Sync local bookmarks to cloud (merge strategy: cloud wins for conflicts)
 * Used when a user signs in to migrate their guest bookmarks
 */
export async function syncLocalToCloud(userId: string, localBookmarks: Bookmark[]): Promise<Bookmark[]> {
    try {
        // First, fetch existing cloud bookmarks
        const cloudBookmarks = await fetchCloudBookmarks(userId);
        const cloudVerseIds = new Set(cloudBookmarks.map(b => b.verseId));

        // Find local bookmarks that aren't in the cloud
        const newBookmarks = localBookmarks.filter(b => !cloudVerseIds.has(b.verseId));

        if (newBookmarks.length > 0) {
            // Batch write new bookmarks to cloud
            const batch = writeBatch(db);
            newBookmarks.forEach(bookmark => {
                const bookmarkRef = doc(db, 'users', userId, 'bookmarks', bookmark.verseId);
                batch.set(bookmarkRef, {
                    verseId: bookmark.verseId,
                    surahId: bookmark.surahId,
                    verseNumber: bookmark.verseNumber,
                    createdAt: bookmark.createdAt,
                    note: bookmark.note || null,
                });
            });
            await batch.commit();
        }

        // Return merged list (cloud + new local)
        return [...cloudBookmarks, ...newBookmarks];
    } catch (error) {
        console.error('Failed to sync local bookmarks to cloud:', error);
        // On failure, return cloud bookmarks only
        return fetchCloudBookmarks(userId);
    }
}

/**
 * Clear all cloud bookmarks for a user
 */
export async function clearCloudBookmarks(userId: string): Promise<void> {
    try {
        const bookmarksRef = getBookmarksCollection(userId);
        const snapshot = await getDocs(bookmarksRef);

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    } catch (error) {
        console.error('Failed to clear cloud bookmarks:', error);
        throw error;
    }
}
