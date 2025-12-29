/**
 * Notes Page for Nur-Al-Quran
 * 
 * Displays all user's verse notes with surah/verse info.
 * Only accessible to logged-in users.
 * 
 * @module pages/Notes/NotesPage
 */

import React, { memo, useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNotes } from '@/hooks/useNotes';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/config/routes';

// Surah names for display
const SURAH_NAMES: Record<number, { name: string; arabic: string }> = {
    1: { name: 'Al-Fatihah', arabic: 'الفاتحة' },
    2: { name: 'Al-Baqarah', arabic: 'البقرة' },
    3: { name: "Ali 'Imran", arabic: 'آل عمران' },
    4: { name: 'An-Nisa', arabic: 'النساء' },
    5: { name: "Al-Ma'idah", arabic: 'المائدة' },
    // Add more as needed or fetch from API
};

const getSurahInfo = (surahId: number) =>
    SURAH_NAMES[surahId] || { name: `Surah ${surahId}`, arabic: '' };

/**
 * Note Card Component
 */
interface NoteCardProps {
    readonly surahId: number;
    readonly verseNumber: number;
    readonly text: string;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly verseId: string;
    readonly onEdit: (verseId: string, currentText: string) => void;
    readonly onDelete: (verseId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = memo(({
    surahId,
    verseNumber,
    text,
    updatedAt,
    verseId,
    onEdit,
    onDelete,
}) => {
    const surahInfo = getSurahInfo(surahId);
    const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden transition-all hover:shadow-xl">
            {/* Header */}
            <div className="bg-emerald-50 dark:bg-emerald-400/10 px-5 py-4 border-b border-emerald-100 dark:border-emerald-400/20">
                <div className="flex items-center justify-between">
                    <Link
                        to={`/surah/${surahId}`}
                        state={{ startingVerse: verseNumber }}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <span className="w-10 h-10 rounded-xl bg-emerald-400 flex items-center justify-center text-slate-900 font-bold text-sm">
                            {verseNumber}
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                                {surahInfo.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Verse {verseNumber} • {surahInfo.arabic}
                            </p>
                        </div>
                    </Link>
                    <span className="text-xs text-slate-400">{formattedDate}</span>
                </div>
            </div>

            {/* Note Content */}
            <div className="p-5">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {text}
                </p>
            </div>

            {/* Actions */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-2">
                <button
                    onClick={() => onEdit(verseId, text)}
                    className="px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-400/10 rounded-lg transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(verseId)}
                    className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
});

NoteCard.displayName = 'NoteCard';

/**
 * Edit Note Modal
 */
interface EditModalProps {
    readonly isOpen: boolean;
    readonly verseId: string;
    readonly initialText: string;
    readonly onSave: (verseId: string, text: string) => void;
    readonly onClose: () => void;
}

const EditNoteModal: React.FC<EditModalProps> = memo(({
    isOpen,
    verseId,
    initialText,
    onSave,
    onClose,
}) => {
    const [text, setText] = useState(initialText);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Edit Note
                </h3>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your note..."
                    className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    autoFocus
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (text.trim()) {
                                onSave(verseId, text.trim());
                            }
                        }}
                        className="px-5 py-2.5 rounded-xl font-semibold bg-emerald-400 text-slate-900 hover:bg-emerald-300 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
});

EditNoteModal.displayName = 'EditNoteModal';

/**
 * Notes Page Component
 */
export const NotesPage: React.FC = memo(() => {
    const { user } = useAuth();
    const { notes, removeNote, addNote, isLoading } = useNotes();
    const [editModal, setEditModal] = useState<{ isOpen: boolean; verseId: string; text: string }>({
        isOpen: false,
        verseId: '',
        text: '',
    });

    const handleEdit = useCallback((verseId: string, currentText: string) => {
        setEditModal({ isOpen: true, verseId, text: currentText });
    }, []);

    const handleSave = useCallback(async (verseId: string, text: string) => {
        const [surahId, verseNumber] = verseId.split(':').map(Number);
        await addNote(surahId, verseNumber, text);
        setEditModal({ isOpen: false, verseId: '', text: '' });
    }, [addNote]);

    const handleDelete = useCallback(async (verseId: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await removeNote(verseId);
        }
    }, [removeNote]);

    // Redirect if not logged in
    if (!user) {
        return <Navigate to={ROUTES.AUTH} replace />;
    }

    return (
        <div className="min-h-screen py-8 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-3">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        Personal Collection
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        My <span className="text-emerald-400">Notes</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Your personal reflections and thoughts on the Quran
                    </p>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5 p-6 animate-pulse">
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
                                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />
                            </div>
                        ))}
                    </div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-400/10 flex items-center justify-center">
                            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            No notes yet
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                            Start adding notes to verses as you read the Quran. Your reflections will appear here.
                        </p>
                        <Link
                            to={ROUTES.SURAHS}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-slate-900 font-bold rounded-xl hover:bg-emerald-300 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Start Reading
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            {notes.length} note{notes.length !== 1 ? 's' : ''}
                        </p>
                        {notes.map((note) => (
                            <NoteCard
                                key={note.verseId}
                                surahId={note.surahId}
                                verseNumber={note.verseNumber}
                                text={note.text}
                                createdAt={note.createdAt}
                                updatedAt={note.updatedAt}
                                verseId={note.verseId}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <EditNoteModal
                isOpen={editModal.isOpen}
                verseId={editModal.verseId}
                initialText={editModal.text}
                onSave={handleSave}
                onClose={() => setEditModal({ isOpen: false, verseId: '', text: '' })}
            />
        </div>
    );
});

NotesPage.displayName = 'NotesPage';

export default NotesPage;
