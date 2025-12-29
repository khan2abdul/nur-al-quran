/**
 * Verse View Page for Nur-Al-Quran
 * 
 * Displays a complete Surah with all verses, audio playback,
 * synchronized highlighting, and verse navigation.
 * 
 * @module pages/VerseView/VerseViewPage
 */

import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { fetchSurah, fetchVerses, fetchChapterAudio, fetchSurahInfo } from '@/services/quranApi';
import { useAudioSync, useAudioActions } from '@/context/AudioPlayerContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useRecentSurahs } from '@/hooks/useRecentSurahs';
import { SurahHeader } from '@/components/quran/SurahHeader';
import { VerseCard } from '@/components/quran/VerseCard';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { ROUTES } from '@/config/routes';
import { useReadSurahs } from '@/hooks/useReadSurahs';
import { useNotes } from '@/hooks/useNotes';
import type { Surah, Verse } from '@/types';
import { getVerseMeaning, loadSurahMeanings } from '@/data/meanings';

/**
 * Loading Skeleton for Verses
 */
const VerseSkeleton: React.FC = memo(() => (
    <div className="card p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
    </div>
));

VerseSkeleton.displayName = 'VerseSkeleton';

/**
 * Surah Navigation Dropdown
 */
interface SurahSelectorProps {
    readonly currentSurahId: number;
}

const SurahSelector: React.FC<SurahSelectorProps> = memo(({ currentSurahId }) => {
    return (
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em]">
            <Link
                to={ROUTES.SURAHS}
                className="text-cyan-600 dark:text-cyan-400/60 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
                ← Library
            </Link>
            <span className="text-slate-200 dark:text-white/10">|</span>
            <div className="flex items-center gap-4">
                {currentSurahId > 1 && (
                    <Link
                        to={`/surah/${currentSurahId - 1}`}
                        className="text-slate-400 dark:text-white/40 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Previous Surah"
                    >
                        PREV
                    </Link>
                )}
                <span className="text-slate-800 dark:text-white/80 font-bold">
                    Surah {currentSurahId}
                </span>
                {currentSurahId < 114 && (
                    <Link
                        to={`/surah/${currentSurahId + 1}`}
                        className="text-slate-400 dark:text-white/40 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Next Surah"
                    >
                        NEXT
                    </Link>
                )}
            </div>
        </div>
    );
});

SurahSelector.displayName = 'SurahSelector';

/**
 * Verse View Page Component
 */
export const VerseViewPage: React.FC = memo(() => {
    const { surahId } = useParams<{ surahId: string }>();
    const surahNumber = parseInt(surahId ?? '1', 10);
    const location = useLocation();
    const startingVerse = (location.state as { startingVerse?: number })?.startingVerse;

    const [surah, setSurah] = useState<Surah | null>(null);
    const [surahInfo, setSurahInfo] = useState<any | null>(null);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);
    const [meaningsLoaded, setMeaningsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // View State
    const [displayMode, setDisplayMode] = useState<'default' | 'en' | 'hi' | 'hinglish' | 'asaan' | 'ar'>('default');
    const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

    // FAB State
    const [showFabMenu, setShowFabMenu] = useState(false);
    const [goToVerseInput, setGoToVerseInput] = useState('');

    const syncState = useAudioSync();
    const actions = useAudioActions();
    const { isBookmarked, toggleBookmark, getBookmarksBySurah } = useBookmarks();
    const { addRecentSurah } = useRecentSurahs();
    const { isRead, toggleReadStatus } = useReadSurahs();
    const { hasNote, getNote, addNote } = useNotes();
    const versesContainerRef = useRef<HTMLDivElement>(null);

    // Note modal state
    const [noteModal, setNoteModal] = useState<{ isOpen: boolean; verseNumber: number; text: string }>({
        isOpen: false,
        verseNumber: 0,
        text: '',
    });

    // Load surah data and verses
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // Add to recently viewed
                if (surahNumber) {
                    addRecentSurah(surahNumber);
                }
                setError(null);

                // Fetch surah info, verses and metadata in parallel
                const [surahData, versesData, metadata] = await Promise.all([
                    fetchSurah(surahNumber),
                    fetchVerses(surahNumber, 1, 300), // Load all verses
                    fetchSurahInfo(surahNumber)
                ]);

                setSurah(surahData);
                setVerses(versesData.verses);
                setSurahInfo(metadata);

                // Load meanings asynchronously
                try {
                    await loadSurahMeanings(surahNumber);
                    setMeaningsLoaded(true);
                } catch (meaningsErr) {
                    console.warn('Meanings loading failed:', meaningsErr);
                }

                // Load audio
                try {
                    const audioData = await fetchChapterAudio(surahNumber, syncState.selectedReciter?.id ?? 7);
                    await actions.loadSurah(surahNumber, audioData.audioUrl, audioData.verseTimings);
                } catch (audioErr) {
                    console.warn('Audio loading failed:', audioErr);
                    // Don't fail the whole page if audio fails
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load surah');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [surahNumber, syncState.selectedReciter?.id, actions]);

    // Auto-scroll to starting verse on load
    useEffect(() => {
        if (!loading && startingVerse && verses.length > 0) {
            // Small timeout to ensure DOM is ready
            setTimeout(() => {
                const verseElement = document.getElementById(`verse-${startingVerse}`);
                if (verseElement) {
                    verseElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }, 500);
        }
    }, [loading, startingVerse, verses.length]);

    // Auto-scroll to current verse when playing
    useEffect(() => {
        if (syncState.isPlaying && syncState.currentSurah === surahNumber) {
            // Updated to find the element inside VerseCard (id is on the card itself)
            const verseElement = document.getElementById(`verse-${syncState.currentVerse}`);
            if (verseElement) {
                // Ensure we scroll with an offset to account for the sticky audio player
                const yOffset = -120; // Room for player and top header
                const y = verseElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        }
    }, [syncState.currentVerse, syncState.isPlaying, syncState.currentSurah, surahNumber]);

    // Handle bookmark toggle
    const handleBookmarkToggle = useCallback((verseNumber: number) => {
        toggleBookmark(surahNumber, verseNumber);
        if ('vibrate' in navigator) navigator.vibrate(10);
    }, [surahNumber, toggleBookmark]);

    // Handle verse click
    const handleVerseClick = useCallback((verseNumber: number) => {
        actions.seekToVerse(verseNumber);
        // We removed actions.play() per user request: only play icon should trigger audio
    }, [actions]);

    // Scroll to a specific verse
    const scrollToVerse = useCallback((verseNumber: number) => {
        const verseElement = document.getElementById(`verse-${verseNumber}`);
        if (verseElement) {
            const yOffset = -120;
            const y = verseElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setShowFabMenu(false);
        setGoToVerseInput('');
    }, []);

    // Get bookmarks for this surah
    const surahBookmarks = getBookmarksBySurah(surahNumber);

    // Scroll to first bookmark in this surah
    const scrollToFirstBookmark = useCallback(() => {
        if (surahBookmarks.length > 0) {
            const firstBookmark = surahBookmarks[0];
            scrollToVerse(firstBookmark.verseNumber);
        }
    }, [surahBookmarks, scrollToVerse]);

    // Handle note click - open modal
    const handleNoteClick = useCallback((verseNumber: number) => {
        const existingNote = getNote(surahNumber, verseNumber);
        setNoteModal({
            isOpen: true,
            verseNumber,
            text: existingNote?.text || '',
        });
    }, [surahNumber, getNote]);

    // Handle note save
    const handleNoteSave = useCallback(async () => {
        if (noteModal.text.trim()) {
            await addNote(surahNumber, noteModal.verseNumber, noteModal.text.trim());
        }
        setNoteModal({ isOpen: false, verseNumber: 0, text: '' });
    }, [surahNumber, noteModal, addNote]);

    if (error) {
        return (
            <div className="py-12 text-center">
                <span className="text-5xl mb-4 block">⚠️</span>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Failed to Load Surah
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 md:py-10 pb-40 px-0 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto pl-4 pr-20 md:px-6">
                {/* Navigation & Controls */}
                <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <SurahSelector currentSurahId={surahNumber} />

                    {/* View Controls */}
                    <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-[1.5rem] shadow-xl border border-slate-200 dark:border-white/5">
                        {/* Language Toggle */}
                        <div className="flex flex-wrap items-center bg-slate-100 dark:bg-slate-700/50 rounded-2xl p-1">
                            {[
                                { id: 'default', label: 'Default' },
                                { id: 'en', label: 'English' },
                                { id: 'ar', label: 'Arabic' },
                                { id: 'hinglish', label: 'Hinglish' },
                                { id: 'asaan', label: 'Asaan Alfaaz' }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setDisplayMode(mode.id as any)}
                                    className={`px-4 py-2 text-[10px] md:text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${displayMode === mode.id
                                        ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-lg'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                        }`}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>

                        <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-white/10" />

                        {/* Font Size Controls */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-2xl p-1">
                            <button
                                onClick={() => setFontSize('small')}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${fontSize === 'small'
                                    ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-md'
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                                aria-label="Small font"
                            >
                                A
                            </button>
                            <button
                                onClick={() => setFontSize('medium')}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${fontSize === 'medium'
                                    ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-md'
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                                aria-label="Medium font"
                            >
                                A
                            </button>
                            <button
                                onClick={() => setFontSize('large')}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-base font-bold transition-all ${fontSize === 'large'
                                    ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-md'
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                                aria-label="Large font"
                            >
                                A
                            </button>
                        </div>
                    </div>
                </div>

                {/* Surah Header */}
                {loading ? (
                    <div className="card p-8 mb-6 animate-pulse">
                        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-48 mx-auto mb-4" />
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mx-auto mb-2" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mx-auto" />
                    </div>
                ) : surah ? (
                    <SurahHeader surah={surah} history={surahInfo} />
                ) : null}

                {/* Verses */}
                <div ref={versesContainerRef} className="space-y-4">
                    {loading ? (
                        // Loading skeletons
                        Array.from({ length: 5 }).map((_, i) => (
                            <VerseSkeleton key={i} />
                        ))
                    ) : (
                        verses.map((verse) => {
                            // Get meaning from TSX files
                            const verseMeaning = getVerseMeaning(surahNumber, verse.verseNumber);

                            return (
                                <VerseCard
                                    key={verse.id}
                                    verseNumber={verse.verseNumber}
                                    arabic={verse.arabic}
                                    english={verse.translations.find(t => t.language === 'en')?.text ?? ''}
                                    hindi={verseMeaning?.meaningHi}
                                    hinglish={verseMeaning?.meaningHi}
                                    asaanAlfaaz={verseMeaning?.hinglish}
                                    meaning={verseMeaning?.meaningHi}
                                    meaningEn={verseMeaning?.meaningEn}
                                    easyWords={verseMeaning?.easyWords}
                                    difficultWords={(verse as any).difficultWords}
                                    displayMode={displayMode}
                                    fontSize={fontSize}
                                    isPlaying={
                                        syncState.currentSurah === surahNumber &&
                                        syncState.currentVerse === verse.verseNumber
                                    }
                                    isBookmarked={isBookmarked(surahNumber, verse.verseNumber)}
                                    onBookmarkToggle={handleBookmarkToggle}
                                    onClick={handleVerseClick}
                                    hasNote={hasNote(surahNumber, verse.verseNumber)}
                                    onNoteClick={handleNoteClick}
                                />
                            );
                        })
                    )}
                </div>

                {/* Mark as Read/Unread Button + Navigation */}
                {!loading && surah && (
                    <div className="mt-16 mb-8 flex flex-col items-center gap-6">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
                        <p className="text-slate-400 text-sm">You've reached the end of {surah.name}</p>

                        {/* Mark as Read Button */}
                        <button
                            onClick={() => toggleReadStatus(surahNumber)}
                            className={`px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3 ${isRead(surahNumber)
                                ? 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30'
                                : 'bg-emerald-400 text-slate-900 shadow-xl shadow-emerald-400/20 hover:bg-emerald-300'
                                }`}
                        >
                            {isRead(surahNumber) ? (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Completed — Mark as Unread
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Mark as Read
                                </>
                            )}
                        </button>

                        {/* Previous / Library / Next Navigation */}
                        <div className="flex items-center gap-3 mt-4">
                            <Link
                                to={surahNumber > 1 ? `/surah/${surahNumber - 1}` : '#'}
                                className={`px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${surahNumber === 1
                                    ? 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-slate-600 cursor-not-allowed pointer-events-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:text-cyan-400'
                                    }`}
                                aria-disabled={surahNumber === 1}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </Link>

                            <Link
                                to={ROUTES.SURAHS}
                                className="px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 bg-emerald-400/10 text-emerald-500 border border-emerald-400/20 hover:bg-emerald-400 hover:text-slate-900"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Library
                            </Link>

                            <Link
                                to={surahNumber < 114 ? `/surah/${surahNumber + 1}` : '#'}
                                className={`px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${surahNumber === 114
                                    ? 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-slate-600 cursor-not-allowed pointer-events-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:text-cyan-400'
                                    }`}
                                aria-disabled={surahNumber === 114}
                            >
                                Next
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Floating Navigation Controls */}
                <div className="fixed bottom-48 md:bottom-32 right-3 md:right-6 flex flex-col items-center gap-2 md:gap-3 z-40">
                    {/* FAB Button */}
                    <button
                        onClick={() => setShowFabMenu(!showFabMenu)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full shadow-2xl flex items-center justify-center transition-all ${showFabMenu
                            ? 'bg-slate-800 dark:bg-slate-600 text-white rotate-45'
                            : 'bg-emerald-400 text-slate-900 hover:bg-emerald-300 hover:scale-110'
                            }`}
                        aria-label="Navigation options"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>

                    {/* Scroll Up Button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-400 shadow-lg flex items-center justify-center text-slate-900 hover:bg-emerald-300 transition-all hover:scale-110"
                        aria-label="Scroll to top"
                        title="Scroll to top"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>

                    {/* Scroll Down Button */}
                    <button
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-400 shadow-lg flex items-center justify-center text-slate-900 hover:bg-emerald-300 transition-all hover:scale-110"
                        aria-label="Scroll to bottom"
                        title="Scroll to bottom"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* FAB Menu Popup */}
                    {showFabMenu && (
                        <>
                            {/* Click-away overlay */}
                            <div
                                className="fixed inset-0 z-30"
                                onClick={() => setShowFabMenu(false)}
                            />
                            <div className="absolute bottom-full right-0 mb-6 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-40">
                                {/* Go to Verse */}
                                <div className="p-4 border-b border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Go to Verse
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            max={verses.length}
                                            value={goToVerseInput}
                                            onChange={(e) => setGoToVerseInput(e.target.value)}
                                            placeholder={`1-${verses.length}`}
                                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    const num = parseInt(goToVerseInput, 10);
                                                    if (num >= 1 && num <= verses.length) {
                                                        scrollToVerse(num);
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const num = parseInt(goToVerseInput, 10);
                                                if (num >= 1 && num <= verses.length) {
                                                    scrollToVerse(num);
                                                }
                                            }}
                                            className="px-4 py-2 bg-emerald-400 text-slate-900 font-bold text-sm rounded-lg hover:bg-emerald-300 transition-colors"
                                        >
                                            Go
                                        </button>
                                    </div>
                                </div>

                                {/* Scroll to Bookmark */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                        </svg>
                                        Bookmarks
                                        <span className="text-xs font-normal text-slate-400">
                                            ({surahBookmarks.length})
                                        </span>
                                    </div>

                                    {surahBookmarks.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic">No bookmarks in this Surah</p>
                                    ) : (
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {surahBookmarks.map((bookmark) => (
                                                <button
                                                    key={bookmark.verseId}
                                                    onClick={() => scrollToVerse(bookmark.verseNumber)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-400/20 transition-colors text-left"
                                                >
                                                    <span className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-sm font-bold">
                                                        {bookmark.verseNumber}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        Verse {bookmark.verseNumber}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Note Modal */}
                {noteModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setNoteModal({ isOpen: false, verseNumber: 0, text: '' })}
                        />
                        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Add Note
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                {surah?.name || 'Surah'} • Verse {noteModal.verseNumber}
                            </p>
                            <textarea
                                value={noteModal.text}
                                onChange={(e) => setNoteModal(prev => ({ ...prev, text: e.target.value }))}
                                placeholder="Write your thoughts, reflections, or notes..."
                                className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                autoFocus
                            />
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setNoteModal({ isOpen: false, verseNumber: 0, text: '' })}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleNoteSave}
                                    className="px-5 py-2.5 rounded-xl font-semibold bg-emerald-400 text-slate-900 hover:bg-emerald-300 transition-colors"
                                >
                                    Save Note
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <AudioPlayer />
            </div>
        </div>
    );
});

VerseViewPage.displayName = 'VerseViewPage';

export default VerseViewPage;
