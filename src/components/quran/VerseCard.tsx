/**
 * Verse Card Component for Nur-Al-Quran
 * 
 * Displays a single verse with Arabic text, translations,
 * bookmark toggle, and click-to-play functionality.
 * 
 * @module components/quran/VerseCard
 */

import React, { memo, useCallback } from 'react';
import { useAudioActions } from '@/context/AudioPlayerContext';
import { useAuth } from '@/context/AuthContext';
import { toArabicNumerals } from '@/utils/helpers';
import type { DifficultWord } from '@/types';

interface VerseCardProps {
    /** Verse number (1-indexed) */
    readonly verseNumber: number;

    /** Arabic text of the verse */
    readonly arabic: string;

    /** English translation */
    readonly english: string;

    /** Hindi translation */
    readonly hindi?: string;

    /** Hinglish translation */
    readonly hinglish?: string;

    /** Asaan Alfaz / Simplified Hinglish */
    readonly asaanAlfaaz?: string;

    /** Meaning/Tafsir */
    readonly meaning?: string;

    /** English Meaning/Tafsir */
    readonly meaningEn?: string;

    /** Aasaan Alfaz tags */
    readonly easyWords?: string[];

    /** Difficult words for interactive display */
    readonly difficultWords?: DifficultWord[];

    /** Display mode */
    readonly displayMode: 'default' | 'en' | 'hi' | 'hinglish' | 'asaan' | 'ar';

    /** Font size setting */
    readonly fontSize: 'small' | 'medium' | 'large';

    /** Whether playing */
    readonly isPlaying?: boolean;

    /** Whether this verse is bookmarked */
    readonly isBookmarked?: boolean;

    /** Callback when bookmark is toggled */
    readonly onBookmarkToggle?: (verseNumber: number) => void;

    /** Callback when verse is clicked */
    readonly onClick?: (verseNumber: number) => void;
}

/**
 * Bookmark Icon
 */
const BookmarkIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg
        className={`w-6 h-6 transition-all ${filled
            ? 'text-cyan-400 fill-cyan-400'
            : 'text-slate-400 hover:text-cyan-400'
            }`}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
    </svg>
);

/**
 * Audio Wave Animation
 */
const AudioWave: React.FC = memo(() => (
    <div className="flex items-end gap-1 h-6">
        {[1, 2, 3, 4, 5].map((i) => (
            <div
                key={i}
                className="w-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                    height: `${Math.random() * 80 + 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s'
                }}
            />
        ))}
    </div>
));

AudioWave.displayName = 'AudioWave';

/**
 * Verse Card Component
 */
export const VerseCard: React.FC<VerseCardProps> = memo(({
    verseNumber,
    arabic,
    english,
    hindi,
    hinglish,
    asaanAlfaaz,
    meaning,
    meaningEn,
    easyWords,
    difficultWords,
    displayMode,
    fontSize,
    isPlaying = false,
    isBookmarked = false,
    onBookmarkToggle,
    onClick,
}) => {
    const actions = useAudioActions();
    const { user } = useAuth();
    const [activeWordIdx, setActiveWordIdx] = React.useState<number | null>(null);

    // Dynamic sizing and mode flags
    const translationSize = fontSize === 'small' ? 'text-lg' : fontSize === 'large' ? 'text-2xl' : 'text-xl';
    const arabicSize = fontSize === 'small' ? 'text-3xl' : fontSize === 'large' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl';

    const isArabicOnly = displayMode === 'ar';
    const isEnglishOnly = displayMode === 'en';
    const isHindiOnly = displayMode === 'hi';
    const isHinglishOnly = displayMode === 'hinglish';
    const isAsaanOnly = displayMode === 'asaan';
    const isDefault = displayMode === 'default';

    const [activeDifficultWord, setActiveDifficultWord] = React.useState<DifficultWord | null>(null);

    const handleClick = useCallback(() => {
        onClick?.(verseNumber);
        actions.seekToVerse(verseNumber);
        setActiveDifficultWord(null); // Close tooltip on card click
    }, [verseNumber, onClick, actions]);

    const handlePlayClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlaying) {
            actions.pause();
        } else {
            actions.seekToVerse(verseNumber);
            actions.play();
        }
    }, [isPlaying, verseNumber, actions]);

    const renderContent = () => {
        let text = '';
        if (isEnglishOnly) text = english;
        else if (isHindiOnly) text = hindi || english;
        else if (isHinglishOnly) text = hinglish || english;
        else if (isAsaanOnly || isDefault) text = asaanAlfaaz || hinglish || english;

        if (!text) return null;

        // If we have difficult words, try to highlight them
        if (difficultWords && difficultWords.length > 0 && (isHinglishOnly || isAsaanOnly || isDefault)) {
            let parts: (string | React.ReactNode)[] = [text];

            difficultWords.forEach((dw) => {
                const newParts: (string | React.ReactNode)[] = [];
                parts.forEach((part) => {
                    if (typeof part !== 'string') {
                        newParts.push(part);
                        return;
                    }

                    const subParts = part.split(new RegExp(`(${dw.word})`, 'gi'));
                    subParts.forEach((sp) => {
                        if (sp.toLowerCase() === dw.word.toLowerCase()) {
                            newParts.push(
                                <span
                                    key={`${dw.word}-${Math.random()}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDifficultWord(dw);
                                    }}
                                    className="border-b-2 border-cyan-400/50 cursor-help hover:bg-cyan-400/10 transition-colors px-0.5 rounded"
                                >
                                    {sp}
                                </span>
                            );
                        } else {
                            newParts.push(sp);
                        }
                    });
                });
                parts = newParts;
            });
            return <>{parts}</>;
        }

        return text;
    };

    const handleBookmarkClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onBookmarkToggle?.(verseNumber);
    }, [verseNumber, onBookmarkToggle]);

    return (
        <div
            id={`verse-${verseNumber}`}
            onClick={handleClick}
            className={`
                group cursor-pointer transition-all duration-500 flex flex-col md:flex-row
                rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 md:mb-12 border-2 md:border-4
                ${isPlaying
                    ? 'border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)] scale-[1.01]'
                    : 'border-transparent hover:border-emerald-400/20 shadow-2xl hover:scale-[1.005]'
                }
            `}
            role="button"
            tabIndex={0}
            aria-label={`Verse ${verseNumber}`}
        >
            {/* LEFT SIDE: Translation/Commentary Focus */}
            {!isArabicOnly && (
                <div className={`w-full ${isDefault ? 'md:w-1/2' : 'md:w-full'} bg-slate-100 dark:bg-slate-800 p-6 md:p-10 lg:p-14 relative flex flex-col justify-between overflow-hidden transition-colors ${isPlaying ? 'bg-emerald-50 dark:bg-slate-700' : ''}`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 dark:bg-transparent rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handlePlayClick}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying
                                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                                        : 'bg-white dark:bg-white/10 text-slate-400 dark:text-white hover:bg-emerald-500 hover:text-white shadow-sm'
                                        }`}
                                >
                                    {isPlaying ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    )}
                                </button>
                                <div className="flex flex-col">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">Quran Meaning</span>
                                    <span className={`font-mono text-xs font-bold transition-colors uppercase tracking-widest mt-0.5 ${isPlaying ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-white/60'}`}>Ayah {verseNumber}</span>
                                </div>
                            </div>
                            {isPlaying && <AudioWave />}
                        </div>

                        {/* Content */}
                        <div className={`font-sans font-medium text-slate-800 dark:text-white leading-[1.6] ${translationSize} flex-grow flex items-center mb-10 transition-colors`}>
                            <div className="relative">
                                {renderContent()}

                                {/* Difficult Word Tooltip */}
                                {activeDifficultWord && (
                                    <div className="absolute left-0 bottom-full mb-4 z-50 bg-white dark:bg-slate-700 p-4 rounded-2xl border-2 border-emerald-400/30 shadow-2xl animate-in fade-in slide-in-from-bottom-2 max-w-xs transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Meaning</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveDifficultWord(null); }}
                                                className="text-slate-300 dark:text-white/40 hover:text-emerald-500 dark:hover:text-white"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{activeDifficultWord.word} ({activeDifficultWord.transliteration})</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-300 italic">{activeDifficultWord.meaning}</p>
                                        <div className="absolute left-4 -bottom-2 w-4 h-4 bg-white dark:bg-slate-700 border-r-2 border-b-2 border-emerald-400/30 rotate-45" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RIGHT SIDE: Arabic Focus */}
            {(isArabicOnly || isDefault) && (
                <div className={`w-full ${isDefault ? 'md:w-1/2' : 'md:w-full'} bg-white dark:bg-slate-800 p-6 md:p-10 lg:p-16 relative flex flex-col justify-center border-l-0 md:border-l-[12px] border-emerald-400 min-h-[250px] md:min-h-0 transition-colors ${isPlaying ? 'bg-emerald-50/30 dark:bg-slate-700' : ''}`}>
                    <button
                        onClick={handleBookmarkClick}
                        className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-10 lg:right-10 p-2 md:p-3 rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-colors z-20 group/bookmark"
                        title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                        <BookmarkIcon filled={isBookmarked} />
                    </button>
                    <div
                        className={`font-arabic text-slate-900 dark:text-white text-right leading-[2] md:leading-[2.4] ${arabicSize} transition-colors`}
                        dir="rtl"
                    >
                        {arabic}
                    </div>
                </div>
            )}
        </div>
    );
});

VerseCard.displayName = 'VerseCard';
export default VerseCard;
