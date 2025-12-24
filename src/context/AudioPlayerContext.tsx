/**
 * Audio Player Context for Nur-Al-Quran
 * 
 * Provides global audio playback state and controls.
 * Manages reciter selection, verse synchronization, and playback modes.
 * 
 * @module context/AudioPlayerContext
 */

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react';
import type {
    AudioPlayerState,
    PlaybackSpeed,
    PlaybackMode,
    Reciter,
    VerseTiming,
} from '@/types';
import { STORAGE_KEYS } from '@/config/appConfig';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { AVAILABLE_RECITERS } from '@/services/quranApi';

/**
 * Initial audio player state
 */
const initialState: AudioPlayerState = {
    isPlaying: false,
    isLoading: false,
    currentSurah: null,
    currentVerse: 1,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1,
    selectedReciter: AVAILABLE_RECITERS[0] ?? null,
    playbackMode: 'continuous',
    verseTimings: [],
    error: null,
};

/**
 * Audio player context actions
 */
interface AudioPlayerActions {
    /** Play audio */
    play: () => void;
    /** Pause audio */
    pause: () => void;
    /** Toggle play/pause */
    togglePlayPause: () => void;
    /** Seek to specific time */
    seekTo: (time: number) => void;
    /** Seek to specific verse */
    seekToVerse: (verseNumber: number) => void;
    /** Set playback speed */
    setPlaybackSpeed: (speed: PlaybackSpeed) => void;
    /** Change reciter */
    setReciter: (reciter: Reciter) => void;
    /** Set playback mode */
    setPlaybackMode: (mode: PlaybackMode) => void;
    /** Load audio for a surah */
    loadSurah: (surahId: number, audioUrl: string, timings: VerseTiming[]) => Promise<void>;
    /** Skip to next verse */
    nextVerse: () => void;
    /** Skip to previous verse */
    prevVerse: () => void;
    /** Skip forward 10 seconds */
    skipForward: () => void;
    /** Skip backward 10 seconds */
    skipBackward: () => void;
    /** Stop and reset player */
    stop: () => void;
}

interface AudioPlayerContextValue {
    state: AudioPlayerState;
    actions: AudioPlayerActions;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

interface AudioPlayerProviderProps {
    readonly children: ReactNode;
}

/**
 * Audio Player Provider
 * 
 * Wraps the application to provide audio playback functionality.
 */
export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
    const [state, setState] = useState<AudioPlayerState>(initialState);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load saved reciter preference on mount
    useEffect(() => {
        const savedReciterId = getStorageItem<number>('nur-al-quran:reciter', 7);
        const reciter = AVAILABLE_RECITERS.find(r => r.id === savedReciterId) ?? AVAILABLE_RECITERS[0];
        if (reciter) {
            setState(prev => ({ ...prev, selectedReciter: reciter }));
        }
    }, []);

    // Update current verse based on playback time
    useEffect(() => {
        if (!state.isPlaying || state.verseTimings.length === 0) return;

        const currentTiming = state.verseTimings.find(
            timing => state.currentTime >= timing.startTime && state.currentTime < timing.endTime
        );

        if (currentTiming && currentTiming.verseNumber !== state.currentVerse) {
            setState(prev => ({ ...prev, currentVerse: currentTiming.verseNumber }));
        }
    }, [state.currentTime, state.verseTimings, state.isPlaying, state.currentVerse]);

    // Handle verse-by-verse mode
    useEffect(() => {
        if (state.playbackMode !== 'verse-by-verse' || !state.isPlaying) return;

        const currentTiming = state.verseTimings.find(
            timing => timing.verseNumber === state.currentVerse
        );

        if (currentTiming && state.currentTime >= currentTiming.endTime) {
            // Pause at the end of each verse
            audioRef.current?.pause();
            setState(prev => ({ ...prev, isPlaying: false }));
        }
    }, [state.currentTime, state.currentVerse, state.playbackMode, state.isPlaying, state.verseTimings]);

    /**
     * Play audio
     */
    const play = useCallback(() => {
        audioRef.current?.play();
        setState(prev => ({ ...prev, isPlaying: true, error: null }));
    }, []);

    /**
     * Pause audio
     */
    const pause = useCallback(() => {
        audioRef.current?.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    /**
     * Toggle play/pause
     */
    const togglePlayPause = useCallback(() => {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }, [state.isPlaying, play, pause]);

    /**
     * Seek to specific time
     */
    const seekTo = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setState(prev => ({ ...prev, currentTime: time }));
        }
    }, []);

    /**
     * Seek to specific verse
     */
    const seekToVerse = useCallback((verseNumber: number) => {
        const timing = state.verseTimings.find(t => t.verseNumber === verseNumber);
        if (timing) {
            seekTo(timing.startTime);
            setState(prev => ({ ...prev, currentVerse: verseNumber }));
        }
    }, [state.verseTimings, seekTo]);

    /**
     * Set playback speed
     */
    const setPlaybackSpeed = useCallback((speed: PlaybackSpeed) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
        setState(prev => ({ ...prev, playbackSpeed: speed }));
    }, []);

    /**
     * Change reciter
     */
    const setReciter = useCallback((reciter: Reciter) => {
        setState(prev => ({ ...prev, selectedReciter: reciter }));
        setStorageItem('nur-al-quran:reciter', reciter.id);
    }, []);

    /**
     * Set playback mode
     */
    const setPlaybackMode = useCallback((mode: PlaybackMode) => {
        setState(prev => ({ ...prev, playbackMode: mode }));
    }, []);

    /**
     * Load audio for a surah
     */
    const loadSurah = useCallback(async (
        surahId: number,
        audioUrl: string,
        timings: VerseTiming[]
    ): Promise<void> => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            currentSurah: surahId,
            currentVerse: 1,
            currentTime: 0,
            verseTimings: timings,
            error: null,
        }));

        try {
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.load();
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to load audio',
            }));
        }
    }, []);

    /**
     * Skip to next verse
     */
    const nextVerse = useCallback(() => {
        const nextVerseNum = state.currentVerse + 1;
        const timing = state.verseTimings.find(t => t.verseNumber === nextVerseNum);
        if (timing) {
            seekToVerse(nextVerseNum);
        }
    }, [state.currentVerse, state.verseTimings, seekToVerse]);

    /**
     * Skip to previous verse
     */
    const prevVerse = useCallback(() => {
        const prevVerseNum = Math.max(1, state.currentVerse - 1);
        seekToVerse(prevVerseNum);
    }, [state.currentVerse, seekToVerse]);

    /**
     * Skip forward 10 seconds
     */
    const skipForward = useCallback(() => {
        seekTo(Math.min(state.currentTime + 10, state.duration));
    }, [state.currentTime, state.duration, seekTo]);

    /**
     * Skip backward 10 seconds
     */
    const skipBackward = useCallback(() => {
        seekTo(Math.max(state.currentTime - 10, 0));
    }, [state.currentTime, seekTo]);

    /**
     * Stop and reset player
     */
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setState(prev => ({
            ...prev,
            isPlaying: false,
            currentTime: 0,
            currentVerse: 1,
        }));
    }, []);

    /**
     * Handle audio time update
     */
    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            setState(prev => ({
                ...prev,
                currentTime: audioRef.current?.currentTime ?? 0,
            }));
        }
    }, []);

    /**
     * Handle audio loaded metadata
     */
    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current) {
            setState(prev => ({
                ...prev,
                duration: audioRef.current?.duration ?? 0,
                isLoading: false,
            }));
        }
    }, []);

    /**
     * Handle audio ended
     */
    const handleEnded = useCallback(() => {
        setState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    /**
     * Handle audio error
     */
    const handleError = useCallback(() => {
        setState(prev => ({
            ...prev,
            isLoading: false,
            isPlaying: false,
            error: 'Failed to load audio. Please try another reciter.',
        }));
    }, []);

    const actions = useMemo<AudioPlayerActions>(() => ({
        play,
        pause,
        togglePlayPause,
        seekTo,
        seekToVerse,
        setPlaybackSpeed,
        setReciter,
        setPlaybackMode,
        loadSurah,
        nextVerse,
        prevVerse,
        skipForward,
        skipBackward,
        stop,
    }), [
        play, pause, togglePlayPause, seekTo, seekToVerse,
        setPlaybackSpeed, setReciter, setPlaybackMode, loadSurah,
        nextVerse, prevVerse, skipForward, skipBackward, stop,
    ]);

    const value = useMemo<AudioPlayerContextValue>(() => ({
        state,
        actions,
        audioRef,
    }), [state, actions]);

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleError}
                preload="metadata"
            />
        </AudioPlayerContext.Provider>
    );
};

/**
 * Hook to access audio player context
 * 
 * @throws Error if used outside AudioPlayerProvider
 */
export const useAudioPlayer = (): AudioPlayerContextValue => {
    const context = useContext(AudioPlayerContext);
    if (!context) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
};

export default AudioPlayerProvider;
