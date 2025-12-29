/**
 * useNotes Hook for Nur-Al-Quran
 * 
 * Manages notes state with cloud sync for authenticated users.
 * Notes are only available for logged-in users.
 * 
 * @module hooks/useNotes
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Note } from '@/types';
import {
    fetchCloudNotes,
    saveCloudNote,
    deleteCloudNote,
} from '@/services/noteService';

/**
 * Return type for useNotes hook
 */
interface UseNotesReturn {
    notes: Note[];
    addNote: (surahId: number, verseNumber: number, text: string) => Promise<Note | null>;
    updateNote: (surahId: number, verseNumber: number, text: string) => Promise<Note | null>;
    removeNote: (verseId: string) => Promise<void>;
    getNote: (surahId: number, verseNumber: number) => Note | undefined;
    getNotesBySurah: (surahId: number) => Note[];
    hasNote: (surahId: number, verseNumber: number) => boolean;
    count: number;
    isLoading: boolean;
}

/**
 * Create verse ID from surah and verse number
 */
const createVerseId = (surahId: number, verseNumber: number): string =>
    `${surahId}:${verseNumber}`;

/**
 * Custom hook for managing verse notes
 * 
 * @returns Note management functions and state
 * 
 * @example
 * const { notes, addNote, hasNote, getNote } = useNotes();
 * 
 * // Check if verse has a note
 * if (hasNote(1, 5)) { ... }
 * 
 * // Add or update note
 * await addNote(1, 5, "This verse is beautiful!");
 */
export function useNotes(): UseNotesReturn {
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sync notes from cloud when user changes
    useEffect(() => {
        const syncNotes = async () => {
            if (!user?.uid) {
                setNotes([]);
                return;
            }

            setIsLoading(true);
            try {
                const cloudNotes = await fetchCloudNotes(user.uid);
                setNotes(cloudNotes);
            } catch (error) {
                console.error('Failed to sync notes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        syncNotes();
    }, [user?.uid]);

    // Add a new note
    const addNote = useCallback(async (surahId: number, verseNumber: number, text: string): Promise<Note | null> => {
        if (!user?.uid || !text.trim()) return null;

        const verseId = createVerseId(surahId, verseNumber);
        const existingNote = notes.find(n => n.verseId === verseId);
        const now = Date.now();

        const note: Note = {
            id: verseId,
            verseId,
            surahId,
            verseNumber,
            text: text.trim(),
            createdAt: existingNote?.createdAt || now,
            updatedAt: now,
        };

        try {
            await saveCloudNote(user.uid, note);
            setNotes(prev => {
                const filtered = prev.filter(n => n.verseId !== verseId);
                return [note, ...filtered];
            });
            return note;
        } catch (error) {
            console.error('Failed to save note:', error);
            return null;
        }
    }, [user?.uid, notes]);

    // Update existing note (alias for addNote)
    const updateNote = addNote;

    // Remove a note
    const removeNote = useCallback(async (verseId: string): Promise<void> => {
        if (!user?.uid) return;

        try {
            await deleteCloudNote(user.uid, verseId);
            setNotes(prev => prev.filter(n => n.verseId !== verseId));
        } catch (error) {
            console.error('Failed to remove note:', error);
        }
    }, [user?.uid]);

    // Get a specific note
    const getNote = useCallback((surahId: number, verseNumber: number): Note | undefined => {
        const verseId = createVerseId(surahId, verseNumber);
        return notes.find(n => n.verseId === verseId);
    }, [notes]);

    // Get all notes for a specific surah
    const getNotesBySurah = useCallback((surahId: number): Note[] => {
        return notes.filter(n => n.surahId === surahId);
    }, [notes]);

    // Check if a verse has a note
    const hasNote = useCallback((surahId: number, verseNumber: number): boolean => {
        const verseId = createVerseId(surahId, verseNumber);
        return notes.some(n => n.verseId === verseId);
    }, [notes]);

    // Memoized count
    const count = useMemo(() => notes.length, [notes]);

    return {
        notes,
        addNote,
        updateNote,
        removeNote,
        getNote,
        getNotesBySurah,
        hasNote,
        count,
        isLoading,
    };
}

export default useNotes;
