/**
 * Notes Service for Nur-Al-Quran
 * 
 * Provides Firestore cloud sync for authenticated users' notes.
 * Notes are only available for logged-in users (no localStorage fallback).
 * 
 * @module services/noteService
 */

import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    query,
    orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Note } from '@/types';

/**
 * Get Firestore collection reference for user's notes
 */
const getNotesCollection = (userId: string) =>
    collection(db, 'users', userId, 'notes');

/**
 * Fetch all notes from Firestore for a user
 */
export async function fetchCloudNotes(userId: string): Promise<Note[]> {
    try {
        const notesRef = getNotesCollection(userId);
        const q = query(notesRef, orderBy('updatedAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Note[];
    } catch (error) {
        console.error('Failed to fetch cloud notes:', error);
        return [];
    }
}

/**
 * Save a note to Firestore
 */
export async function saveCloudNote(userId: string, note: Note): Promise<void> {
    try {
        const noteRef = doc(db, 'users', userId, 'notes', note.verseId);
        await setDoc(noteRef, {
            verseId: note.verseId,
            surahId: note.surahId,
            verseNumber: note.verseNumber,
            text: note.text,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    } catch (error) {
        console.error('Failed to save cloud note:', error);
        throw error;
    }
}

/**
 * Delete a note from Firestore
 */
export async function deleteCloudNote(userId: string, verseId: string): Promise<void> {
    try {
        const noteRef = doc(db, 'users', userId, 'notes', verseId);
        await deleteDoc(noteRef);
    } catch (error) {
        console.error('Failed to delete cloud note:', error);
        throw error;
    }
}
