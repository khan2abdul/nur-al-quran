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
import { getStorageItem, setStorageItem } from '@/services/localStorageService';
import { AVAILABLE_RECITERS } from '@/services/quranApi';

/**
 * Split State into Sync (Verse level) and Time (Ticker level)
 */
export interface AudioSyncState {
    isPlaying: boolean;
    isLoading: boolean;
    currentSurah: number | null;
    currentVerse: number;
    availableReciters: Reciter[];
    selectedReciter: Reciter | null;
    playbackMode: PlaybackMode;
    verseTimings: VerseTiming[];
    error: string | null;
}

export interface AudioTimeState {
    currentTime: number;
    duration: number;
    playbackSpeed: PlaybackSpeed;
}

const initialSyncState: AudioSyncState = {
    isPlaying: false,
    isLoading: false,
    currentSurah: null,
    currentVerse: 1,
    availableReciters: [...AVAILABLE_RECITERS],
    selectedReciter: AVAILABLE_RECITERS[0] ?? null,
    playbackMode: 'continuous',
    verseTimings: [],
    error: null,
};

const initialTimeState: AudioTimeState = {
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1,
};

interface AudioPlayerActions {
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    seekTo: (time: number) => void;
    seekToVerse: (verseNumber: number) => void;
    setPlaybackSpeed: (speed: PlaybackSpeed) => void;
    setReciter: (reciter: Reciter) => void;
    setPlaybackMode: (mode: PlaybackMode) => void;
    loadSurah: (surahId: number, audioUrl: string, timings: VerseTiming[]) => Promise<void>;
    nextVerse: () => void;
    prevVerse: () => void;
    skipForward: () => void;
    skipBackward: () => void;
    stop: () => void;
}

const AudioSyncContext = createContext<AudioSyncState | null>(null);
const AudioTimeContext = createContext<AudioTimeState | null>(null);
const AudioActionsContext = createContext<AudioPlayerActions | null>(null);
const AudioRefContext = createContext<React.RefObject<HTMLAudioElement | null> | null>(null);

export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sync, setSync] = useState<AudioSyncState>(initialSyncState);
    const [time, setTime] = useState<AudioTimeState>(initialTimeState);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const initReciters = async () => {
            try {
                const { fetchReciters } = await import('@/services/quranApi');
                const reciters = await fetchReciters();
                const savedReciterId = getStorageItem<number>('nur-al-quran:reciter', 7);
                const reciter = reciters.find(r => r.id === savedReciterId) ?? reciters[0];

                setSync(prev => ({
                    ...prev,
                    availableReciters: reciters,
                    selectedReciter: reciter
                }));
            } catch (err) {
                console.error('Failed to initialize reciters:', err);
            }
        };

        initReciters();
    }, []);

    // Sync current verse with time
    useEffect(() => {
        if (!sync.isPlaying || sync.verseTimings.length === 0) return;
        const currentTiming = sync.verseTimings.find(
            t => time.currentTime >= t.startTime && time.currentTime < t.endTime
        );
        if (currentTiming && currentTiming.verseNumber !== sync.currentVerse) {
            setSync(prev => ({ ...prev, currentVerse: currentTiming.verseNumber }));
        }
    }, [time.currentTime, sync.verseTimings, sync.isPlaying, sync.currentVerse]);

    const play = useCallback(async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
                setSync(prev => ({ ...prev, isPlaying: true, error: null }));
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error('Playback failed:', err);
                }
            }
        }
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
        setSync(prev => ({ ...prev, isPlaying: false }));
    }, []);

    const togglePlayPause = useCallback(() => {
        if (sync.isPlaying) pause(); else play();
    }, [sync.isPlaying, play, pause]);

    const seekTo = useCallback((newTime: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setTime(prev => ({ ...prev, currentTime: newTime }));
        }
    }, []);

    const seekToVerse = useCallback((num: number) => {
        setSync(currentSync => {
            const t = currentSync.verseTimings.find(v => v.verseNumber === num);
            if (t && audioRef.current) {
                audioRef.current.currentTime = t.startTime;
                setTime(prev => ({ ...prev, currentTime: t.startTime }));
            }
            // Always update currentVerse so highlighting works even if seeking fails
            return { ...currentSync, currentVerse: num };
        });
    }, []);

    const setPlaybackSpeed = useCallback((speed: PlaybackSpeed) => {
        if (audioRef.current) audioRef.current.playbackRate = speed;
        setTime(prev => ({ ...prev, playbackSpeed: speed }));
    }, []);

    const setReciter = useCallback((r: Reciter) => {
        setSync(prev => ({ ...prev, selectedReciter: r }));
        setStorageItem('nur-al-quran:reciter', r.id);
    }, []);

    const setPlaybackMode = useCallback((m: PlaybackMode) => setSync(prev => ({ ...prev, playbackMode: m })), []);

    const loadSurah = useCallback(async (id: number, url: string, timings: VerseTiming[]) => {
        if (audioRef.current) {
            // Prevent redundant reloads if the URL is the same
            if (audioRef.current.src === url && sync.currentSurah === id) {
                return;
            }

            // Pause and reset if needed
            audioRef.current.pause();

            setSync(prev => ({ ...prev, isLoading: true, currentSurah: id, currentVerse: 1, verseTimings: timings, error: null }));
            setTime(prev => ({ ...prev, currentTime: 0 }));

            audioRef.current.src = url;
            audioRef.current.load();
        }
    }, [sync.currentSurah]);

    const nextVerse = useCallback(() => {
        setSync(s => {
            const t = s.verseTimings.find(v => v.verseNumber === s.currentVerse + 1);
            if (t && audioRef.current) {
                audioRef.current.currentTime = t.startTime;
                setTime(prev => ({ ...prev, currentTime: t.startTime }));
                return { ...s, currentVerse: s.currentVerse + 1 };
            }
            return s;
        });
    }, []);

    const prevVerse = useCallback(() => {
        setSync(s => {
            const n = Math.max(1, s.currentVerse - 1);
            const t = s.verseTimings.find(v => v.verseNumber === n);
            if (t && audioRef.current) {
                audioRef.current.currentTime = t.startTime;
                setTime(prev => ({ ...prev, currentTime: t.startTime }));
                return { ...s, currentVerse: n };
            }
            return s;
        });
    }, []);

    const skipForward = useCallback(() => {
        if (audioRef.current) {
            const next = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration);
            audioRef.current.currentTime = next;
            setTime(p => ({ ...p, currentTime: next }));
        }
    }, []);

    const skipBackward = useCallback(() => {
        if (audioRef.current) {
            const prev = Math.max(audioRef.current.currentTime - 10, 0);
            audioRef.current.currentTime = prev;
            setTime(p => ({ ...p, currentTime: prev }));
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
        setSync(p => ({ ...p, isPlaying: false, currentVerse: 1 }));
        setTime(p => ({ ...p, currentTime: 0 }));
    }, []);

    const actions = useMemo(() => ({
        play, pause, togglePlayPause, seekTo, seekToVerse,
        setPlaybackSpeed, setReciter, setPlaybackMode, loadSurah,
        nextVerse, prevVerse, skipForward, skipBackward, stop,
    }), [play, pause, togglePlayPause, seekTo, seekToVerse, setPlaybackSpeed, setReciter, setPlaybackMode, loadSurah, nextVerse, prevVerse, skipForward, skipBackward, stop]);

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) setTime(prev => ({ ...prev, currentTime: audioRef.current?.currentTime ?? 0 }));
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current) {
            setTime(prev => ({ ...prev, duration: audioRef.current?.duration ?? 0 }));
            setSync(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const handleEnded = useCallback(() => setSync(prev => ({ ...prev, isPlaying: false })), []);

    // Global Reciter Sync: Reload audio when reciter changes
    useEffect(() => {
        let isCancelled = false;
        const syncAudio = async () => {
            if (sync.currentSurah) {
                try {
                    const { fetchChapterAudio } = await import('@/services/quranApi');
                    const audioData = await fetchChapterAudio(sync.currentSurah, sync.selectedReciter?.id ?? 7);
                    if (!isCancelled) {
                        await loadSurah(sync.currentSurah, audioData.audioUrl, audioData.verseTimings);
                    }
                } catch (err) {
                    console.error('Failed to sync audio on reciter change:', err);
                }
            }
        };

        // If a surah is already set and reciter changes, trigger reload
        if (sync.currentSurah) {
            syncAudio();
        }

        return () => { isCancelled = true; };
    }, [sync.selectedReciter?.id, sync.currentSurah, loadSurah]);

    const handleError = useCallback((e: any) => {
        const url = audioRef.current?.src || 'Unknown URL';
        console.error('Audio playback error:', e, 'URL:', url);
        setSync(prev => ({
            ...prev,
            isLoading: false,
            isPlaying: false,
            error: `Failed to load audio from: ${url}. Please check your connection or try another reciter.`
        }));
    }, []);

    return (
        <AudioSyncContext.Provider value={sync}>
            <AudioTimeContext.Provider value={time}>
                <AudioActionsContext.Provider value={actions}>
                    <AudioRefContext.Provider value={audioRef}>
                        {children}
                        <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleEnded}
                            onError={handleError}
                            preload="metadata"
                            crossOrigin="anonymous"
                        />
                    </AudioRefContext.Provider>
                </AudioActionsContext.Provider>
            </AudioTimeContext.Provider>
        </AudioSyncContext.Provider>
    );
};

export const useAudioSync = () => {
    const context = useContext(AudioSyncContext);
    if (!context) throw new Error('useAudioSync must be used within AudioPlayerProvider');
    return context;
};

export const useAudioTime = () => {
    const context = useContext(AudioTimeContext);
    if (!context) throw new Error('useAudioTime must be used within AudioPlayerProvider');
    return context;
};

export const useAudioActions = () => {
    const context = useContext(AudioActionsContext);
    if (!context) throw new Error('useAudioActions must be used within AudioPlayerProvider');
    return context;
};

export const useAudioRef = () => {
    const context = useContext(AudioRefContext);
    if (!context) throw new Error('useAudioRef must be used within AudioPlayerProvider');
    return context;
};

export const useAudioPlayer = () => {
    const sync = useAudioSync();
    const time = useAudioTime();
    const actions = useAudioActions();
    const audioRef = useAudioRef();
    return { state: { ...sync, ...time }, actions, audioRef };
};
