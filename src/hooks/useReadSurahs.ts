/**
 * useReadSurahs Hook for Nur-Al-Quran
 * 
 * Tracks which surahs the user has completed (marked as read).
 * Supports cloud sync for authenticated users and localStorage for guests.
 * 
 * @module hooks/useReadSurahs
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { STORAGE_KEYS } from '@/config/appConfig';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { useAuth } from '@/context/AuthContext';
import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    writeBatch,
} from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * Read Surah Data
 */
interface ReadSurah {
    surahId: number;
    completedAt: number;
}

/**
 * Return type for useReadSurahs hook
 */
interface UseReadSurahsReturn {
    /** List of read surah IDs */
    readSurahIds: number[];

    /** Mark a surah as read */
    markAsRead: (surahId: number) => void;

    /** Mark a surah as unread */
    markAsUnread: (surahId: number) => void;

    /** Toggle read status */
    toggleReadStatus: (surahId: number) => void;

    /** Check if a surah is read */
    isRead: (surahId: number) => boolean;

    /** Total read count */
    readCount: number;

    /** Loading state */
    isLoading: boolean;
}

/**
 * Firestore helpers
 */
const getReadSurahsCollection = (userId: string) =>
    collection(db, 'users', userId, 'readSurahs');

async function fetchCloudReadSurahs(userId: string): Promise<ReadSurah[]> {
    try {
        const ref = getReadSurahsCollection(userId);
        const snapshot = await getDocs(ref);
        return snapshot.docs.map(doc => doc.data() as ReadSurah);
    } catch (error) {
        console.error('Failed to fetch cloud read surahs:', error);
        return [];
    }
}

async function saveCloudReadSurah(userId: string, surahId: number): Promise<void> {
    try {
        const ref = doc(db, 'users', userId, 'readSurahs', surahId.toString());
        await setDoc(ref, {
            surahId,
            completedAt: Date.now(),
        });
    } catch (error) {
        console.error('Failed to save cloud read surah:', error);
    }
}

async function deleteCloudReadSurah(userId: string, surahId: number): Promise<void> {
    try {
        const ref = doc(db, 'users', userId, 'readSurahs', surahId.toString());
        await deleteDoc(ref);
    } catch (error) {
        console.error('Failed to delete cloud read surah:', error);
    }
}

async function syncLocalToCloud(userId: string, localIds: number[]): Promise<number[]> {
    try {
        const cloudData = await fetchCloudReadSurahs(userId);
        const cloudIds = new Set(cloudData.map(r => r.surahId));

        // Find local IDs not in cloud
        const newIds = localIds.filter(id => !cloudIds.has(id));

        if (newIds.length > 0) {
            const batch = writeBatch(db);
            newIds.forEach(surahId => {
                const ref = doc(db, 'users', userId, 'readSurahs', surahId.toString());
                batch.set(ref, { surahId, completedAt: Date.now() });
            });
            await batch.commit();
        }

        // Return merged list
        return [...new Set([...cloudData.map(r => r.surahId), ...localIds])];
    } catch (error) {
        console.error('Failed to sync read surahs:', error);
        return localIds;
    }
}

/**
 * Custom hook for managing read/unread surahs
 */
export function useReadSurahs(): UseReadSurahsReturn {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Load from localStorage on initialization
    const [readSurahIds, setReadSurahIds] = useState<number[]>(() => {
        return getStorageItem<number[]>(STORAGE_KEYS.READ_SURAHS, []);
    });

    // Sync with cloud when user changes
    useEffect(() => {
        const syncData = async () => {
            if (user) {
                setIsLoading(true);
                try {
                    const localIds = getStorageItem<number[]>(STORAGE_KEYS.READ_SURAHS, []);
                    const mergedIds = await syncLocalToCloud(user.uid, localIds);
                    setReadSurahIds(mergedIds);
                    setStorageItem(STORAGE_KEYS.READ_SURAHS, mergedIds);
                } catch (error) {
                    console.error('Failed to sync read surahs:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        syncData();
    }, [user?.uid]);

    // Save to localStorage whenever state changes
    useEffect(() => {
        setStorageItem(STORAGE_KEYS.READ_SURAHS, readSurahIds);
    }, [readSurahIds]);

    /**
     * Mark a surah as read
     */
    const markAsRead = useCallback((surahId: number) => {
        setReadSurahIds(prev => {
            if (prev.includes(surahId)) return prev;
            return [...prev, surahId];
        });

        if (user) {
            saveCloudReadSurah(user.uid, surahId);
        }
    }, [user]);

    /**
     * Mark a surah as unread
     */
    const markAsUnread = useCallback((surahId: number) => {
        setReadSurahIds(prev => prev.filter(id => id !== surahId));

        if (user) {
            deleteCloudReadSurah(user.uid, surahId);
        }
    }, [user]);

    /**
     * Toggle read status
     */
    const toggleReadStatus = useCallback((surahId: number) => {
        setReadSurahIds(prev => {
            if (prev.includes(surahId)) {
                if (user) deleteCloudReadSurah(user.uid, surahId);
                return prev.filter(id => id !== surahId);
            } else {
                if (user) saveCloudReadSurah(user.uid, surahId);
                return [...prev, surahId];
            }
        });
    }, [user]);

    /**
     * Check if a surah is read
     */
    const isRead = useCallback((surahId: number): boolean => {
        return readSurahIds.includes(surahId);
    }, [readSurahIds]);

    /**
     * Total read count
     */
    const readCount = useMemo(() => readSurahIds.length, [readSurahIds]);

    return {
        readSurahIds,
        markAsRead,
        markAsUnread,
        toggleReadStatus,
        isRead,
        readCount,
        isLoading,
    };
}

export default useReadSurahs;
