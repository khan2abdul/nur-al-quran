/**
 * Audio Player Component for Nur-Al-Quran
 * 
 * Sticky bottom audio player with full playback controls,
 * reciter selection, and verse navigation.
 * 
 * @module components/ui/AudioPlayer
 */

import React, { memo, useState, useCallback } from 'react';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
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
    const { state, actions } = useAudioPlayer();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback((reciter: Reciter) => {
        actions.setReciter(reciter);
        setIsOpen(false);
    }, [actions]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Select reciter"
            >
                <span className="truncate max-w-[120px]">
                    {state.selectedReciter?.name ?? 'Select Reciter'}
                </span>
                {Icons.chevronDown}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-64 overflow-y-auto">
                        {AVAILABLE_RECITERS.map((reciter) => (
                            <button
                                key={reciter.id}
                                onClick={() => handleSelect(reciter)}
                                className={`w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${state.selectedReciter?.id === reciter.id
                                    ? 'bg-primary-50 dark:bg-primary-900/20'
                                    : ''
                                    }`}
                            >
                                <div className="font-medium text-sm text-slate-900 dark:text-white">
                                    {reciter.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
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
    const { state, actions } = useAudioPlayer();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback((speed: PlaybackSpeed) => {
        actions.setPlaybackSpeed(speed);
        setIsOpen(false);
    }, [actions]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Playback speed"
            >
                {state.playbackSpeed}x
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                        {SPEED_OPTIONS.map((speed) => (
                            <button
                                key={speed}
                                onClick={() => handleSelect(speed)}
                                className={`block w-full px-4 py-2 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${state.playbackSpeed === speed
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                    : 'text-slate-700 dark:text-slate-300'
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
    const { state, actions } = useAudioPlayer();
    const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * state.duration;
        actions.seekTo(newTime);
    }, [state.duration, actions]);

    return (
        <div
            className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer group"
            onClick={handleClick}
        >
            {/* Progress fill */}
            <div
                className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
            />
            {/* Hover indicator */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
    const { state, actions } = useAudioPlayer();

    // Don't render if no surah is loaded
    const { isMobile } = useView();

    if (!state.currentSurah) {
        return null;
    }

    return (
        <div className={`
            fixed left-0 right-0 z-50 transition-all duration-300
            ${isMobile ? 'bottom-[64px]' : 'bottom-0'} 
            bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
            border-t border-primary-200 dark:border-primary-800
            shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]
        `}>
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress bar */}
                <div className="pt-2">
                    <ProgressBar />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between py-3 gap-4">
                    {/* Left: Reciter info */}
                    <div className="flex-1 min-w-0">
                        <ReciterSelector />
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Verse {state.currentVerse}
                        </div>
                    </div>

                    {/* Center: Main controls */}
                    <div className="flex items-center gap-2">
                        {/* Skip backward */}
                        <button
                            onClick={actions.skipBackward}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Rewind 10 seconds"
                        >
                            {Icons.rewind10}
                        </button>

                        {/* Previous verse */}
                        <button
                            onClick={actions.prevVerse}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Previous verse"
                        >
                            {Icons.skipBack}
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={actions.togglePlayPause}
                            disabled={state.isLoading}
                            className="w-12 h-12 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors disabled:opacity-50"
                            aria-label={state.isPlaying ? 'Pause' : 'Play'}
                        >
                            {state.isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : state.isPlaying ? (
                                Icons.pause
                            ) : (
                                Icons.play
                            )}
                        </button>

                        {/* Next verse */}
                        <button
                            onClick={actions.nextVerse}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Next verse"
                        >
                            {Icons.skipForward}
                        </button>

                        {/* Skip forward */}
                        <button
                            onClick={actions.skipForward}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Forward 10 seconds"
                        >
                            {Icons.forward10}
                        </button>
                    </div>

                    {/* Right: Time and speed */}
                    <div className="flex-1 flex items-center justify-end gap-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                            {formatDuration(state.currentTime)} / {formatDuration(state.duration)}
                        </span>
                        <SpeedSelector />
                    </div>
                </div>

                {/* Error message */}
                {state.error && (
                    <div className="pb-2 text-xs text-red-600 dark:text-red-400 text-center">
                        {state.error}
                    </div>
                )}
            </div>
        </div>
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
