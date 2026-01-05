/**
 * Audio Player Component for Nur-Al-Quran
 * 
 * Sticky bottom audio player with full playback controls,
 * reciter selection, and verse navigation.
 * 
 * @module components/ui/AudioPlayer
 */

import React, { memo, useState, useCallback } from 'react';
import { useAudioSync, useAudioTime, useAudioActions } from '@/context/AudioPlayerContext';
import { AVAILABLE_RECITERS } from '@/services/quranApi';
import { formatDuration } from '@/utils/helpers';
import type { PlaybackSpeed, Reciter } from '@/types';
import { useView } from '@/context/ViewContext';

/**
 * Playback speed options
 */
const SPEED_OPTIONS: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 2];

/**
 * Icon components
 */
const Icons = {
    play: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
        </svg>
    ),
    pause: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    ),
    skipBack: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
    ),
    skipForward: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
    ),
    rewind10: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
    ),
    forward10: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
    ),
    speaker: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
    ),
    chevronDown: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    ),
    close: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
};

/**
 * Reciter Selector Dropdown
 */
const ReciterSelector: React.FC = memo(() => {
    const syncState = useAudioSync();
    const actions = useAudioActions();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback((reciter: Reciter) => {
        actions.setReciter(reciter);
        setIsOpen(false);
    }, [actions]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-white/50 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                aria-label="Select reciter"
            >
                <span className="truncate max-w-[120px]">
                    {syncState.selectedReciter?.name ?? 'Select Reciter'}
                </span>
                <span className="text-slate-400 dark:opacity-40">{Icons.chevronDown}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-4 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 z-50 max-h-80 overflow-y-auto backdrop-blur-xl">
                        {syncState.availableReciters.map((reciter) => (
                            <button
                                key={reciter.id}
                                onClick={() => handleSelect(reciter)}
                                className={`w-full px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0 ${syncState.selectedReciter?.id === reciter.id
                                    ? 'bg-cyan-400/10'
                                    : ''
                                    }`}
                            >
                                <div className={`font-bold text-sm ${syncState.selectedReciter?.id === reciter.id ? 'text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                                    {reciter.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {reciter.style}
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

ReciterSelector.displayName = 'ReciterSelector';

/**
 * Speed Selector
 */
const SpeedSelector: React.FC = memo(() => {
    const timeState = useAudioTime();
    const actions = useAudioActions();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback((speed: PlaybackSpeed) => {
        actions.setPlaybackSpeed(speed);
        setIsOpen(false);
    }, [actions]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1.5 text-[10px] font-bold bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 dark:text-white/50 hover:text-cyan-400 transition-colors uppercase tracking-widest border border-slate-200 dark:border-white/10"
                aria-label="Playback speed"
            >
                {timeState.playbackSpeed}x
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 z-50 overflow-hidden backdrop-blur-xl">
                        {SPEED_OPTIONS.map((speed) => (
                            <button
                                key={speed}
                                onClick={() => handleSelect(speed)}
                                className={`block w-full px-6 py-3 text-xs font-bold text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${timeState.playbackSpeed === speed
                                    ? 'bg-cyan-400/10 text-cyan-400'
                                    : 'text-slate-600 dark:text-white/60'
                                    }`}
                            >
                                {speed}x
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

SpeedSelector.displayName = 'SpeedSelector';

/**
 * Progress Bar
 */
const ProgressBar: React.FC = memo(() => {
    const timeState = useAudioTime();
    const actions = useAudioActions();
    const progress = timeState.duration > 0 ? (timeState.currentTime / timeState.duration) * 100 : 0;

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * timeState.duration;
        actions.seekTo(newTime);
    }, [timeState.duration, actions]);

    return (
        <div
            className="relative h-1 bg-slate-200 dark:bg-white/10 rounded-full cursor-pointer group"
            onClick={handleClick}
        >
            {/* Progress fill */}
            <div
                className="absolute inset-y-0 left-0 bg-cyan-400 rounded-full transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progress}%` }}
            />
            {/* Hover indicator */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                style={{ left: `calc(${progress}% - 6px)` }}
            />
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

/**
 * Main Audio Player Component
 */
export const AudioPlayer: React.FC = memo(() => {
    const syncState = useAudioSync();
    const timeState = useAudioTime();
    const actions = useAudioActions();

    // Don't render if no surah is loaded
    const { isMobile } = useView();

    if (!syncState.currentSurah) {
        // Diagnostic fallback: Render placeholder if layout is correct but data missing
        return (
            <div className={`
                fixed left-0 right-0 z-[100] transition-all duration-300
                ${isMobile ? 'bottom-[calc(80px+env(safe-area-inset-bottom,0px))]' : 'bottom-0'} 
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
                border-t border-primary-200 dark:border-primary-800
                shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]
                pb-safe px-4 py-3 flex items-center justify-center
            `}>
                <span className="text-sm text-slate-500 animate-pulse">
                    Initializing Audio Player...
                </span>
            </div>
        );
    }

    return (
        <div className={`
            fixed left-0 right-0 z-[100] transition-all duration-300
            ${isMobile ? 'bottom-[calc(80px+env(safe-area-inset-bottom,0px))]' : 'bottom-0'} 
            bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl
            border-t border-slate-200 dark:border-white/5
            shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.5)]
            pb-safe
        `}>
            <div className="max-w-6xl mx-auto px-4">
                {/* Progress bar */}
                <div className="pt-2">
                    <ProgressBar />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between py-3 gap-2 md:gap-4">
                    {/* Left: Reciter info */}
                    <div className="flex-1 min-w-0">
                        <ReciterSelector />
                        <div className="text-[10px] font-mono text-cyan-400/40 mt-1 uppercase tracking-widest">
                            Verse {syncState.currentVerse}
                        </div>
                    </div>

                    {/* Center: Main controls */}
                    <div className="flex items-center gap-4">
                        {/* Skip backward */}
                        <button
                            onClick={actions.skipBackward}
                            className="hidden md:flex p-2 text-slate-400 dark:text-white/40 hover:text-cyan-400 transition-colors"
                            aria-label="Rewind 10 seconds"
                        >
                            {Icons.rewind10}
                        </button>

                        {/* Previous verse */}
                        <button
                            onClick={actions.prevVerse}
                            className="p-2 text-slate-400 dark:text-white/40 hover:text-cyan-400 transition-colors"
                            aria-label="Previous verse"
                        >
                            {Icons.skipBack}
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={actions.togglePlayPause}
                            disabled={syncState.isLoading}
                            className="w-14 h-14 flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50"
                            aria-label={syncState.isPlaying ? 'Pause' : 'Play'}
                        >
                            {syncState.isLoading ? (
                                <div className="w-6 h-6 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                            ) : syncState.isPlaying ? (
                                Icons.pause
                            ) : (
                                Icons.play
                            )}
                        </button>

                        {/* Next verse */}
                        <button
                            onClick={actions.nextVerse}
                            className="p-2 text-slate-400 dark:text-white/40 hover:text-cyan-400 transition-colors"
                            aria-label="Next verse"
                        >
                            {Icons.skipForward}
                        </button>

                        {/* Skip forward */}
                        <button
                            onClick={actions.skipForward}
                            className="hidden md:flex p-2 text-slate-400 dark:text-white/40 hover:text-cyan-400 transition-colors"
                            aria-label="Forward 10 seconds"
                        >
                            {Icons.forward10}
                        </button>
                    </div>

                    {/* Right: Time and speed */}
                    <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 min-w-0">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-white/30 tabular-nums uppercase tracking-widest truncate">
                            {formatDuration(timeState.currentTime)} <span className="text-slate-200 dark:text-white/10 mx-0.5">/</span> {formatDuration(timeState.duration)}
                        </span>
                        <SpeedSelector />
                    </div>
                </div>

                {/* Error message */}
                {syncState.error && (
                    <div className="pb-2 text-xs text-red-600 dark:text-red-400 text-center">
                        {syncState.error}
                    </div>
                )}
            </div>
        </div>
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
