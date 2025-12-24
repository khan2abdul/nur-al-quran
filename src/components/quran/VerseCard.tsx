/**
 * Verse Card Component for Nur-Al-Quran
 * 
 * Displays a single verse with Arabic text, translations,
 * bookmark toggle, and click-to-play functionality.
 * 
 * @module components/quran/VerseCard
 */

import React, { memo, useCallback } from 'react';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
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

    /** Meaning/Tafsir */
    readonly meaning?: string;

    /** English Meaning/Tafsir */
    readonly meaningEn?: string;

    /** Difficult words for interactive display */
    readonly difficultWords?: DifficultWord[];

    /** Active translation language */
    readonly translationLang: 'en' | 'hi';

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
        className={`w-5 h-5 transition-colors ${filled
            ? 'text-gold-500 fill-gold-500'
            : 'text-slate-400 hover:text-gold-500'
            }`}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
    </svg>
);

/**
 * Audio Wave Animation
 */
const AudioWave: React.FC = memo(() => (
    <div className="flex items-center gap-0.5 h-4">
        {[1, 2, 3, 4].map((i) => (
            <div
                key={i}
                className="w-0.5 bg-primary-500 rounded-full animate-pulse"
                style={{
                    height: `${Math.random() * 12 + 4}px`,
                    animationDelay: `${i * 0.1}s`,
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
    meaning,
    meaningEn,
    difficultWords,
    translationLang,
    fontSize,
    isPlaying = false,
    isBookmarked = false,
    onBookmarkToggle,
    onClick,
}) => {
    const { actions } = useAudioPlayer();
    const [activeWordIdx, setActiveWordIdx] = React.useState<number | null>(null);

    // Font size classes - Overriding default sizes
    const arabicSize = fontSize === 'small' ? 'text-2xl' : fontSize === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl';
    const translationSize = fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base';

    // Select meaning based on language
    const displayMeaning = translationLang === 'en' ? meaningEn : meaning;

    const handleClick = useCallback(() => {
        onClick?.(verseNumber);
        actions.seekToVerse(verseNumber);
    }, [verseNumber, onClick, actions]);

    // Render interactive Hinglish
    const renderHinglish = () => {
        if (!hinglish) return null;
        if (!difficultWords?.length) return hinglish;

        const words = hinglish.split(' ');
        return words.map((word, idx) => {
            const cleanWord = word.replace(/[^a-zA-Z]/g, '');
            const diffWord = difficultWords.find(dw =>
                cleanWord.toLowerCase() === dw.word.toLowerCase() ||
                cleanWord.toLowerCase() === dw.transliteration.toLowerCase()
            );

            if (diffWord) {
                return (
                    <span
                        key={idx}
                        className="relative inline-block mx-0.5 cursor-pointer group"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveWordIdx(activeWordIdx === idx ? null : idx);
                        }}
                    >
                        <span className="border-b-2 border-dotted border-primary-400 dark:border-primary-500 font-medium text-primary-700 dark:text-primary-300">
                            {word}
                        </span>

                        {/* Tooltip */}
                        {(activeWordIdx === idx) && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl z-10 text-center animate-fade-in">
                                <span className="font-bold block mb-0.5 text-gold-400">{diffWord.word}</span>
                                <span className="block opacity-90">{diffWord.meaning}</span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                            </div>
                        )}
                    </span>
                );
            }
            return <span key={idx} className="mx-0.5">{word}</span>;
        });
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
        verse-card cursor-pointer transition-all duration-300
        ${isPlaying
                    ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 shadow-lg ring-2 ring-amber-300 dark:ring-amber-700'
                    : 'hover:shadow-md'
                }
      `}
            role="button"
            tabIndex={0}
            aria-label={`Verse ${verseNumber}`}
        >
            {/* Header: Verse number and bookmark */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Verse number badge */}
                    <div className={`verse-number ${isPlaying ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200' : ''}`}>
                        {verseNumber}
                    </div>

                    {/* Arabic verse number */}
                    <span className="font-arabic text-sm text-slate-500 dark:text-slate-400">
                        ﴿{toArabicNumerals(verseNumber)}﴾
                    </span>

                    {/* Playing indicator */}
                    {isPlaying && <AudioWave />}
                </div>

                {/* Bookmark button */}
                <button
                    onClick={handleBookmarkClick}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    <BookmarkIcon filled={isBookmarked} />
                </button>
            </div>

            {/* Arabic Text (Replaced 'arabic-text' class with explicit styles to allow font sizing) */}
            <div className={`font-arabic text-right leading-[2.5] md:leading-[3.5] text-slate-800 dark:text-slate-100 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700 ${arabicSize}`} dir="rtl">
                {arabic}
            </div>

            {/* Translation Content */}
            <div className={`mb-3 leading-relaxed text-slate-600 dark:text-slate-300 ${translationSize}`}>
                {translationLang === 'en' ? (
                    <div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block mb-1">
                            English
                        </span>
                        {english}
                    </div>
                ) : (
                    <div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block mb-1">
                            {hinglish ? 'Hinglish' : 'Hindi'}
                        </span>
                        {hinglish ? (
                            <div className="flex flex-wrap items-center -mx-0.5">
                                {renderHinglish()}
                            </div>
                        ) : hindi}
                    </div>
                )}
            </div>

            {/* AI Generated Meaning / Reflection */}
            {displayMeaning && (
                <div className="mt-4 p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">✨</span>
                        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                            Meaning & Reflection
                        </span>
                    </div>
                    <p className={`leading-relaxed text-slate-700 dark:text-slate-300 ${translationSize}`}>
                        {displayMeaning}
                    </p>
                </div>
            )}
        </div>
    );
});

VerseCard.displayName = 'VerseCard';

export default VerseCard;
