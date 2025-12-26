/**
 * Bookmarks Page for Nur-Al-Quran
 * 
 * Displays all saved bookmarks with surah/verse info,
 * navigation to verses, and bookmark management.
 * 
 * @module pages/Bookmarks/BookmarksPage
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/context/AuthContext';
import { fetchSurahs } from '@/services/quranApi';
import { getSurahRoute } from '@/config/routes';
import type { Surah, Bookmark } from '@/types';

/**
 * Bookmark with surah info
 */
interface BookmarkWithSurah extends Bookmark {
    surah?: Surah;
}

/**
 * Empty State Component
 */
const EmptyState: React.FC = memo(() => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
            <span className="text-4xl">🔖</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Bookmarks Yet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            Save your favorite verses while reading to find them easily later.
        </p>
        <Link
            to="/surahs"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Start Reading
        </Link>
    </div>
));

EmptyState.displayName = 'EmptyState';

/**
 * Bookmark Card Component
 */
interface BookmarkCardProps {
    readonly bookmark: BookmarkWithSurah;
    readonly onRemove: (verseId: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = memo(({ bookmark, onRemove }) => {
    const handleRemove = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(bookmark.verseId);
        if ('vibrate' in navigator) navigator.vibrate(10);
    }, [bookmark.verseId, onRemove]);

    const formattedDate = new Date(bookmark.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            to={`${getSurahRoute(bookmark.surahId)}#verse-${bookmark.verseNumber}`}
            className="block bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all group shadow-sm"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Surah Info */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 font-bold text-sm">
                            {bookmark.surahId}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {bookmark.surah?.name ?? `Surah ${bookmark.surahId}`}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {bookmark.surah?.arabicName}
                            </p>
                        </div>
                    </div>

                    {/* Verse Number */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium">
                            Verse {bookmark.verseNumber}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <span className="text-slate-500 dark:text-slate-500 text-xs">{formattedDate}</span>
                    </div>

                    {/* Note if exists */}
                    {bookmark.note && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 italic line-clamp-2">
                            "{bookmark.note}"
                        </p>
                    )}
                </div>

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove bookmark"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </Link>
    );
});

BookmarkCard.displayName = 'BookmarkCard';

/**
 * Bookmarks Page Component
 */
export const BookmarksPage: React.FC = memo(() => {
    const { user, signInWithGoogle } = useAuth();
    const { bookmarks, removeBookmark, clearAllBookmarks, count } = useBookmarks();
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Load surahs for display
    useEffect(() => {
        const loadSurahs = async () => {
            try {
                const data = await fetchSurahs();
                setSurahs(data);
            } catch (err) {
                console.error('Failed to load surahs:', err);
            } finally {
                setLoading(false);
            }
        };
        loadSurahs();
    }, []);

    // Merge bookmarks with surah info
    const bookmarksWithSurah: BookmarkWithSurah[] = bookmarks
        .map(b => ({
            ...b,
            surah: surahs.find(s => s.id === b.surahId),
        }))
        .sort((a, b) => b.createdAt - a.createdAt); // Most recent first

    const handleClearAll = useCallback(() => {
        clearAllBookmarks();
        setShowClearConfirm(false);
        if ('vibrate' in navigator) navigator.vibrate([50, 30, 50]);
    }, [clearAllBookmarks]);

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-cyan-400/10 rounded-[2rem] flex items-center justify-center mb-8">
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Personalized Library</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed">
                    Join Nur Al-Quran to save your favorite verses and access them anytime, anywhere.
                </p>
                <button
                    onClick={signInWithGoogle}
                    className="px-10 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold transition-all shadow-xl shadow-cyan-400/20"
                >
                    Sign In to Bookmark
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-light dark:bg-slate-900 py-6 px-4">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-lg text-white">
                            🔖
                        </span>
                        Bookmarks
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {count} saved verse{count !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Clear All Button */}
                {count > 0 && (
                    <button
                        onClick={() => setShowClearConfirm(true)}
                        className="px-3 py-2 text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Clear Confirmation Modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-700 shadow-xl">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Clear All Bookmarks?
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                            This will remove all {count} saved bookmarks. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="flex-1 py-2.5 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 animate-pulse border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-1" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : count === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {bookmarksWithSurah.map(bookmark => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            onRemove={removeBookmark}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

BookmarksPage.displayName = 'BookmarksPage';

export default BookmarksPage;
