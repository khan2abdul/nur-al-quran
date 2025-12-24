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
import { fetchSurah, fetchVerses, fetchChapterAudio } from '@/services/quranApi';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { SurahHeader } from '@/components/quran/SurahHeader';
import { VerseCard } from '@/components/quran/VerseCard';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { ROUTES } from '@/config/routes';
import type { Surah, Verse } from '@/types';
import { surah1Info } from '@/data/quran/surah-1';

const SURAH_INFO: Record<number, any> = {
    1: surah1Info
};

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
        <div className="flex items-center gap-2 text-sm">
            <Link
                to={ROUTES.SURAHS}
                className="text-primary-600 dark:text-primary-400 hover:underline"
            >
                ← All Surahs
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <div className="flex items-center gap-2">
                {currentSurahId > 1 && (
                    <Link
                        to={`/surah/${currentSurahId - 1}`}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        aria-label="Previous Surah"
                    >
                        ◀
                    </Link>
                )}
                <span className="text-slate-600 dark:text-slate-400">
                    Surah {currentSurahId} of 114
                </span>
                {currentSurahId < 114 && (
                    <Link
                        to={`/surah/${currentSurahId + 1}`}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        aria-label="Next Surah"
                    >
                        ▶
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
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // View State
    const [translationLang, setTranslationLang] = useState<'en' | 'hi'>('hi');
    const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

    const { state, actions } = useAudioPlayer();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const versesContainerRef = useRef<HTMLDivElement>(null);

    // Load surah data and verses
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch surah info and verses in parallel
                const [surahData, versesData] = await Promise.all([
                    fetchSurah(surahNumber),
                    fetchVerses(surahNumber, 1, 300), // Load all verses
                ]);

                setSurah(surahData);
                setVerses(versesData.verses);

                // Load audio
                try {
                    const audioData = await fetchChapterAudio(surahNumber, state.selectedReciter?.id ?? 7);
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
    }, [surahNumber, state.selectedReciter?.id, actions]);

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
        if (state.isPlaying && state.currentSurah === surahNumber) {
            const verseElement = document.getElementById(`verse-${state.currentVerse}`);
            if (verseElement) {
                verseElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [state.currentVerse, state.isPlaying, state.currentSurah, surahNumber]);

    // Handle bookmark toggle
    const handleBookmarkToggle = useCallback((verseNumber: number) => {
        toggleBookmark(surahNumber, verseNumber);
        if ('vibrate' in navigator) navigator.vibrate(10);
    }, [surahNumber, toggleBookmark]);

    // Handle verse click
    const handleVerseClick = useCallback((verseNumber: number) => {
        actions.seekToVerse(verseNumber);
        actions.play();
    }, [actions]);

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
        <div className="py-6 pb-32">
            {/* Navigation & Controls */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <SurahSelector currentSurahId={surahNumber} />

                {/* View Controls */}
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    {/* Language Toggle */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-md p-0.5">
                        <button
                            onClick={() => setTranslationLang('en')}
                            className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all ${translationLang === 'en'
                                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-300 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setTranslationLang('hi')}
                            className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all ${translationLang === 'hi'
                                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-300 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            HI
                        </button>
                    </div>

                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />

                    {/* Font Size Controls */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setFontSize('small')}
                            className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-colors ${fontSize === 'small'
                                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                            aria-label="Small font"
                        >
                            A
                        </button>
                        <button
                            onClick={() => setFontSize('medium')}
                            className={`w-7 h-7 flex items-center justify-center rounded text-sm font-bold transition-colors ${fontSize === 'medium'
                                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                            aria-label="Medium font"
                        >
                            A
                        </button>
                        <button
                            onClick={() => setFontSize('large')}
                            className={`w-7 h-7 flex items-center justify-center rounded text-base font-bold transition-colors ${fontSize === 'large'
                                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
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
                <SurahHeader surah={surah} history={SURAH_INFO[surahNumber]} />
            ) : null}

            {/* Verses */}
            <div ref={versesContainerRef} className="space-y-4">
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 5 }).map((_, i) => (
                        <VerseSkeleton key={i} />
                    ))
                ) : (
                    verses.map((verse) => (
                        <div id={`verse-${verse.verseNumber}`} key={verse.id}>
                            <VerseCard
                                verseNumber={verse.verseNumber}
                                arabic={verse.arabic}
                                english={verse.translations.find(t => t.language === 'en')?.text ?? ''}
                                hindi={verse.translations.find(t => t.language === 'hi')?.text}
                                hinglish={verse.hinglish}
                                meaning={verse.meaning}
                                meaningEn={verse.meaningEn}
                                difficultWords={(verse as any).difficultWords}
                                translationLang={translationLang}
                                fontSize={fontSize}
                                isPlaying={
                                    state.isPlaying &&
                                    state.currentSurah === surahNumber &&
                                    state.currentVerse === verse.verseNumber
                                }
                                isBookmarked={isBookmarked(surahNumber, verse.verseNumber)}
                                onBookmarkToggle={handleBookmarkToggle}
                                onClick={handleVerseClick}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Audio Player */}
            <AudioPlayer />
        </div>
    );
});

VerseViewPage.displayName = 'VerseViewPage';

export default VerseViewPage;
