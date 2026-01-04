/**
 * Spiritual Growth Page - Cultivate Your Inner Self
 * 
 * A deeply immersive, interactive spiritual development page
 * with practical tools for dhikr, mindfulness, patience, gratitude,
 * dua, and sincerity.
 * 
 * @module pages/SpiritualGrowth/SpiritualGrowthPage
 */

import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// ============================================================================
// TYPES
// ============================================================================

interface DhikrPhrase {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    reward: string;
}

interface GratitudeEntry {
    id: string;
    date: string;
    items: string[];
    mood?: string;
}

interface DhikrSession {
    date: string;
    phrase: string;
    count: number;
}

interface PatienceMoment {
    id: string;
    date: string;
    situation: string;
    response: string;
    lesson: string;
}

interface MoodEntry {
    date: string;
    mood: string;
    note?: string;
}

interface SpiritualData {
    dhikr: {
        totalCount: number;
        dailyGoal: number;
        streak: number;
        lastDate: string;
        history: DhikrSession[];
    };
    gratitude: {
        entries: GratitudeEntry[];
    };
    patience: {
        moments: PatienceMoment[];
        score: number;
    };
    moods: MoodEntry[];
    duas: {
        favorites: string[];
        answered: AnsweredDua[];
        personal: PersonalDua[];
    };
    intentions: string[];
    hiddenDeeds: number;
}

interface AnsweredDua {
    id: string;
    duaText: string;
    dateAsked: string;
    dateAnswered: string;
    howAnswered: string;
}

interface PersonalDua {
    id: string;
    arabic?: string;
    english: string;
    category: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'nur-spiritual-data';

const DHIKR_PHRASES: DhikrPhrase[] = [
    {
        id: 'subhanallah',
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'SubhanAllah',
        english: 'Glory be to Allah',
        reward: 'A palm tree is planted for you in Paradise',
    },
    {
        id: 'alhamdulillah',
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdulillah',
        english: 'All praise is due to Allah',
        reward: 'Fills the scales of good deeds',
    },
    {
        id: 'allahuakbar',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        english: 'Allah is the Greatest',
        reward: 'Fills what is between the heavens and earth',
    },
    {
        id: 'lailaha',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        english: 'There is no god but Allah',
        reward: 'The best dhikr - keys to Paradise',
    },
    {
        id: 'astaghfirullah',
        arabic: 'أَسْتَغْفِرُ اللَّهَ',
        transliteration: 'Astaghfirullah',
        english: 'I seek forgiveness from Allah',
        reward: 'Allah turns sins into good deeds',
    },
];

const SECTIONS = [
    { id: 'intro', title: 'Introduction', icon: '✨' },
    { id: 'dhikr', title: 'Dhikr & Mindfulness', icon: '📿' },
    { id: 'patience', title: 'Patience & Gratitude', icon: '🌱' },
    { id: 'dua', title: 'The Power of Dua', icon: '🤲' },
    { id: 'sincerity', title: 'Sincerity in Action', icon: '💎' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getStorageItem = <T extends object>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;

        // Merge saved data with defaults to handle missing properties from older versions
        const savedData = JSON.parse(item);
        return { ...defaultValue, ...savedData };
    } catch {
        return defaultValue;
    }
};

const setStorageItem = <T,>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error('Failed to save to localStorage');
    }
};

const getDefaultData = (): SpiritualData => ({
    dhikr: {
        totalCount: 0,
        dailyGoal: 100,
        streak: 0,
        lastDate: '',
        history: [],
    },
    gratitude: {
        entries: [],
    },
    patience: {
        moments: [],
        score: 0,
    },
    moods: [],
    duas: {
        favorites: [],
        answered: [],
        personal: [],
    },
    intentions: [],
    hiddenDeeds: 0,
});

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Progress Bar Component
 */
const ProgressBar: React.FC<{ progress: number }> = memo(({ progress }) => (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
        />
    </div>
));

ProgressBar.displayName = 'ProgressBar';

/**
 * Section Navigation Sidebar
 */
const Sidebar: React.FC<{ sections: typeof SECTIONS; activeSection: string }> = memo(({ sections, activeSection }) => (
    <aside className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <nav className="flex flex-col gap-2 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-xl">
            {sections.map((section) => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeSection === section.id
                        ? 'bg-purple-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-purple-400'
                        }`}
                    title={section.title}
                >
                    <span className="text-lg">{section.icon}</span>
                </a>
            ))}
        </nav>
    </aside>
));

Sidebar.displayName = 'Sidebar';

/**
 * Achievement Badges for Dhikr
 */
interface Achievement {
    id: string;
    name: string;
    icon: string;
    description: string;
    requirement: number;
    type: 'count' | 'streak' | 'session';
}

const ACHIEVEMENTS: Achievement[] = [
    { id: 'first', name: 'First Step', icon: '🌟', description: 'Made your first dhikr', requirement: 1, type: 'count' },
    { id: 'century', name: 'Century', icon: '💯', description: 'Reached 100 total dhikr', requirement: 100, type: 'count' },
    { id: 'thousand', name: 'Thousand Blessings', icon: '🏆', description: '1,000 total dhikr', requirement: 1000, type: 'count' },
    { id: 'streak3', name: 'Consistent', icon: '🔥', description: '3-day streak', requirement: 3, type: 'streak' },
    { id: 'streak7', name: 'Weekly Warrior', icon: '⚡', description: '7-day streak', requirement: 7, type: 'streak' },
    { id: 'streak30', name: 'Monthly Master', icon: '👑', description: '30-day streak', requirement: 30, type: 'streak' },
    { id: 'session33', name: 'Tasbih Round', icon: '📿', description: '33 in one session', requirement: 33, type: 'session' },
    { id: 'session99', name: 'Full Misbaha', icon: '✨', description: '99 in one session', requirement: 99, type: 'session' },
];

/**
 * Interactive Dhikr Counter with Timer Mode and Achievements
 */
const DhikrCounter: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const [selectedPhrase, setSelectedPhrase] = useState<DhikrPhrase>(DHIKR_PHRASES[0]);
    const [sessionCount, setSessionCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [timerMinutes, setTimerMinutes] = useState(5);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showAchievements, setShowAchievements] = useState(false);
    const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

    // Timer effect
    useEffect(() => {
        if (!timerRunning || timeRemaining <= 0) return;

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setTimerRunning(false);
                    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning, timeRemaining]);

    // Check earned achievements
    const earnedAchievements = useMemo(() => {
        return ACHIEVEMENTS.filter((a) => {
            if (a.type === 'count') return data.dhikr.totalCount >= a.requirement;
            if (a.type === 'streak') return data.dhikr.streak >= a.requirement;
            if (a.type === 'session') return sessionCount >= a.requirement;
            return false;
        });
    }, [data.dhikr.totalCount, data.dhikr.streak, sessionCount]);

    const handleClick = useCallback(() => {
        if (navigator.vibrate) navigator.vibrate(10);

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);

        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);

        // Check for session achievement
        const sessionAchievement = ACHIEVEMENTS.find(
            (a) => a.type === 'session' && newSessionCount === a.requirement
        );
        if (sessionAchievement) {
            setNewAchievement(sessionAchievement);
            setTimeout(() => setNewAchievement(null), 3000);
        }

        // Update streak logic
        const today = new Date().toISOString().split('T')[0];
        let newStreak = data.dhikr.streak;

        if (data.dhikr.lastDate !== today) {
            const lastDate = data.dhikr.lastDate ? new Date(data.dhikr.lastDate) : null;
            const todayDate = new Date(today);

            if (lastDate) {
                const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
                newStreak = diffDays === 1 ? data.dhikr.streak + 1 : 1;
            } else {
                newStreak = 1;
            }

            // Check for streak achievement
            const streakAchievement = ACHIEVEMENTS.find(
                (a) => a.type === 'streak' && newStreak === a.requirement
            );
            if (streakAchievement) {
                setNewAchievement(streakAchievement);
                setTimeout(() => setNewAchievement(null), 3000);
            }
        }

        // Check for count achievement
        const newTotalCount = data.dhikr.totalCount + 1;
        const countAchievement = ACHIEVEMENTS.find(
            (a) => a.type === 'count' && newTotalCount === a.requirement
        );
        if (countAchievement) {
            setNewAchievement(countAchievement);
            setTimeout(() => setNewAchievement(null), 3000);
        }

        const newData = {
            ...data,
            dhikr: {
                ...data.dhikr,
                totalCount: newTotalCount,
                streak: newStreak,
                lastDate: today,
            },
        };
        onUpdate(newData);
    }, [data, onUpdate, sessionCount]);

    const startTimer = useCallback(() => {
        setTimeRemaining(timerMinutes * 60);
        setTimerRunning(true);
        setSessionCount(0);
    }, [timerMinutes]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = Math.min((sessionCount / data.dhikr.dailyGoal) * 100, 100);

    return (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-400/20 shadow-xl">
            {/* Achievement Popup */}
            {newAchievement && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 shadow-2xl flex items-center gap-3">
                        <span className="text-3xl">{newAchievement.icon}</span>
                        <div>
                            <p className="font-bold">{newAchievement.name}</p>
                            <p className="text-sm opacity-80">{newAchievement.description}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    📿 Digital Tasbih
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Click the beads to count your dhikr
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2 mb-6">
                <button
                    onClick={() => setShowTimer(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!showTimer ? 'bg-purple-400 text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                >
                    Free Count
                </button>
                <button
                    onClick={() => setShowTimer(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${showTimer ? 'bg-purple-400 text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                >
                    ⏱️ Timer
                </button>
                <button
                    onClick={() => setShowAchievements(!showAchievements)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${showAchievements ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                >
                    🏆 {earnedAchievements.length}/{ACHIEVEMENTS.length}
                </button>
            </div>

            {/* Achievements Panel */}
            {showAchievements && (
                <div className="mb-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-3">🏆 Achievements</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {ACHIEVEMENTS.map((a) => {
                            const earned = earnedAchievements.some((e) => e.id === a.id);
                            return (
                                <div
                                    key={a.id}
                                    className={`p-3 rounded-lg text-center ${earned
                                        ? 'bg-gradient-to-br from-amber-400/20 to-orange-400/20 border border-amber-400/30'
                                        : 'bg-slate-100 dark:bg-slate-900/50 opacity-50'
                                        }`}
                                >
                                    <span className="text-2xl">{a.icon}</span>
                                    <p className="text-xs font-bold mt-1 text-slate-900 dark:text-white">{a.name}</p>
                                    <p className="text-[10px] text-slate-500">{a.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Timer Controls */}
            {showTimer && !timerRunning && (
                <div className="mb-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Set timer duration:</p>
                    <div className="flex gap-2 justify-center mb-4">
                        {[5, 10, 15, 30].map((mins) => (
                            <button
                                key={mins}
                                onClick={() => setTimerMinutes(mins)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold ${timerMinutes === mins
                                    ? 'bg-cyan-400 text-slate-900'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {mins}m
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={startTimer}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 font-bold hover:opacity-90"
                    >
                        ▶️ Start {timerMinutes}-Minute Session
                    </button>
                </div>
            )}

            {/* Timer Display */}
            {timerRunning && (
                <div className="mb-6 text-center">
                    <p className="text-4xl font-bold text-cyan-400 mb-2">{formatTime(timeRemaining)}</p>
                    <button
                        onClick={() => setTimerRunning(false)}
                        className="px-4 py-2 rounded-lg bg-red-400/20 text-red-400 text-sm font-bold hover:bg-red-400/30"
                    >
                        ⏹️ Stop
                    </button>
                </div>
            )}

            {/* Phrase Selector */}
            <div className="flex gap-2 flex-wrap justify-center mb-8">
                {DHIKR_PHRASES.map((phrase) => (
                    <button
                        key={phrase.id}
                        onClick={() => {
                            setSelectedPhrase(phrase);
                            if (!timerRunning) setSessionCount(0);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedPhrase.id === phrase.id
                            ? 'bg-purple-400 text-slate-900 shadow-lg'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-purple-400/50'
                            }`}
                    >
                        {phrase.transliteration}
                    </button>
                ))}
            </div>

            {/* Main Counter Button */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleClick}
                    className={`w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-amber-400 shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 ${isAnimating ? 'scale-110' : ''
                        }`}
                >
                    <span className="text-4xl font-bold text-white">{sessionCount}</span>
                    <span className="text-white/80 text-sm font-arabic mt-2">{selectedPhrase.arabic}</span>
                </button>

                {/* Progress */}
                <div className="mt-6 w-full max-w-xs">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Session Progress</span>
                        <span>{sessionCount} / {data.dhikr.dailyGoal}</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {progress >= 100 && (
                        <p className="text-center text-xs text-emerald-500 mt-2 font-bold">
                            🎉 Daily goal achieved!
                        </p>
                    )}
                </div>

                {/* Phrase Meaning */}
                <div className="mt-6 text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur">
                    <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {selectedPhrase.english}
                    </p>
                    <p className="text-xs text-purple-500">
                        ✨ {selectedPhrase.reward}
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-6 flex gap-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.dhikr.totalCount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Total</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-500">{data.dhikr.streak}🔥</p>
                        <p className="text-xs text-slate-500">Streak</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-500">{earnedAchievements.length}</p>
                        <p className="text-xs text-slate-500">Badges</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

DhikrCounter.displayName = 'DhikrCounter';

/**
 * Gratitude Journal Component
 */
const GratitudeJournal: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const [items, setItems] = useState<string[]>(['', '', '']);
    const [saved, setSaved] = useState(false);

    const handleSave = useCallback(() => {
        const filledItems = items.filter((item) => item.trim() !== '');
        if (filledItems.length === 0) return;

        const entry: GratitudeEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            items: filledItems,
        };

        const newData = {
            ...data,
            gratitude: {
                entries: [...data.gratitude.entries, entry],
            },
        };
        onUpdate(newData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setItems(['', '', '']);
    }, [items, data, onUpdate]);

    const todayEntry = data.gratitude.entries.find(
        (e) => e.date === new Date().toISOString().split('T')[0]
    );

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                🙏 Daily Gratitude Journal
            </h4>

            {todayEntry ? (
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                    <p className="text-sm text-emerald-500 font-bold mb-2">✓ Today&apos;s gratitude logged!</p>
                    <ul className="space-y-1">
                        {todayEntry.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                <span className="text-emerald-400">✨</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        What are 3 things you&apos;re grateful for today?
                    </p>
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <span className="text-amber-400">{idx + 1}.</span>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx] = e.target.value;
                                    setItems(newItems);
                                }}
                                placeholder={`Blessing #${idx + 1}...`}
                                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSave}
                        disabled={items.every((i) => i.trim() === '')}
                        className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-bold hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        {saved ? '✓ Saved!' : 'Save Gratitude 🙏'}
                    </button>
                </div>
            )}

            {/* Gratitude Jar Visual */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    Your Gratitude Jar • {data.gratitude.entries.length} entries
                </p>
                <div className="flex flex-wrap gap-1">
                    {data.gratitude.entries.slice(-20).map((entry, idx) => (
                        <div
                            key={entry.id}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-80 hover:opacity-100 hover:scale-125 transition-all cursor-pointer"
                            title={`${entry.date}: ${entry.items.join(', ')}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});

GratitudeJournal.displayName = 'GratitudeJournal';

/**
 * Mood options for tracking
 */
const MOODS = [
    { id: 'grateful', emoji: '🙏', label: 'Grateful', color: 'from-amber-400 to-orange-400' },
    { id: 'peaceful', emoji: '☮️', label: 'Peaceful', color: 'from-cyan-400 to-blue-400' },
    { id: 'content', emoji: '😊', label: 'Content', color: 'from-emerald-400 to-green-400' },
    { id: 'hopeful', emoji: '🌟', label: 'Hopeful', color: 'from-purple-400 to-pink-400' },
    { id: 'anxious', emoji: '😟', label: 'Anxious', color: 'from-slate-400 to-slate-500' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-400 to-indigo-400' },
    { id: 'frustrated', emoji: '😤', label: 'Frustrated', color: 'from-red-400 to-orange-400' },
    { id: 'uncertain', emoji: '🤔', label: 'Uncertain', color: 'from-gray-400 to-slate-400' },
];

/**
 * Patience scenarios for practice
 */
const PATIENCE_SCENARIOS = [
    {
        id: 'traffic',
        situation: "You're stuck in heavy traffic and running late for an important meeting.",
        options: [
            { text: "Take deep breaths and say 'HasbunAllahu wa ni\'mal Wakeel'", patient: true },
            { text: "Honk repeatedly and complain loudly", patient: false },
            { text: "Accept the situation and use the time for dhikr", patient: true },
        ],
    },
    {
        id: 'criticism',
        situation: "Someone criticizes your work unfairly in front of others.",
        options: [
            { text: "Respond calmly and thank them for feedback", patient: true },
            { text: "Argue back immediately to defend yourself", patient: false },
            { text: "Stay silent, seek Allah's help, and address it privately later", patient: true },
        ],
    },
    {
        id: 'delay',
        situation: "A project you've been waiting for gets delayed again.",
        options: [
            { text: "Trust that Allah's timing is perfect", patient: true },
            { text: "Give up and abandon the entire effort", patient: false },
            { text: "Use the extra time to improve and prepare better", patient: true },
        ],
    },
];

/**
 * Dua Library - Categorized Supplications
 */
interface DuaItem {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    category: string;
    benefit: string;
    source?: string;
}

const DUA_CATEGORIES = [
    { id: 'morning', name: 'Morning', icon: '🌅', color: 'from-amber-400 to-orange-400' },
    { id: 'evening', name: 'Evening', icon: '🌙', color: 'from-indigo-400 to-purple-400' },
    { id: 'forgiveness', name: 'Forgiveness', icon: '🙏', color: 'from-emerald-400 to-teal-400' },
    { id: 'guidance', name: 'Guidance', icon: '✨', color: 'from-cyan-400 to-blue-400' },
    { id: 'health', name: 'Health', icon: '💪', color: 'from-green-400 to-emerald-400' },
    { id: 'protection', name: 'Protection', icon: '🛡️', color: 'from-purple-400 to-pink-400' },
];

const DUA_LIBRARY: DuaItem[] = [
    // Morning Duas
    {
        id: 'morning-1',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
        transliteration: "Asbahna wa asbahal mulku lillah",
        english: "We have entered the morning and the dominion belongs to Allah",
        category: 'morning',
        benefit: 'Start your day acknowledging Allah\'s sovereignty',
        source: 'Muslim',
    },
    {
        id: 'morning-2',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا',
        transliteration: "Allahumma bika asbahna wa bika amsayna",
        english: "O Allah, by You we enter the morning and by You we enter the evening",
        category: 'morning',
        benefit: 'Seeking Allah\'s presence in all moments',
        source: 'Abu Dawud',
    },
    // Evening Duas
    {
        id: 'evening-1',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
        transliteration: "Amsayna wa amsal mulku lillah",
        english: "We have entered the evening and the dominion belongs to Allah",
        category: 'evening',
        benefit: 'End your day with gratitude and peace',
        source: 'Muslim',
    },
    {
        id: 'evening-2',
        arabic: 'بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        transliteration: "Bismika Allahumma amootu wa ahya",
        english: "In Your name, O Allah, I die and I live",
        category: 'evening',
        benefit: 'Protection while sleeping',
        source: 'Bukhari',
    },
    // Forgiveness Duas
    {
        id: 'forgive-1',
        arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ',
        transliteration: "Rabbi-ghfir li wa tub alayya innaka antat-Tawwabur-Rahim",
        english: "My Lord, forgive me and accept my repentance. You are the Acceptor of repentance, the Merciful",
        category: 'forgiveness',
        benefit: 'Seek Allah\'s forgiveness and mercy',
        source: 'Abu Dawud',
    },
    {
        id: 'forgive-2',
        arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
        transliteration: "Allahumma innaka Afuwwun tuhibbul afwa fa'fu anni",
        english: "O Allah, You are Forgiving and love forgiveness, so forgive me",
        category: 'forgiveness',
        benefit: 'The Prophet\'s favorite dua for Laylatul Qadr',
        source: 'Tirmidhi',
    },
    // Guidance Duas
    {
        id: 'guide-1',
        arabic: 'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',
        transliteration: "Allahumma-hdini wa saddidni",
        english: "O Allah, guide me and keep me on the right path",
        category: 'guidance',
        benefit: 'For clarity in decisions',
        source: 'Muslim',
    },
    {
        id: 'guide-2',
        arabic: 'رَبِّ زِدْنِي عِلْماً',
        transliteration: "Rabbi zidni ilma",
        english: "My Lord, increase me in knowledge",
        category: 'guidance',
        benefit: 'For seeking beneficial knowledge',
        source: 'Quran 20:114',
    },
    // Health Duas
    {
        id: 'health-1',
        arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي',
        transliteration: "Allahumma aafini fi badani",
        english: "O Allah, grant me health in my body",
        category: 'health',
        benefit: 'Prayer for physical wellbeing',
        source: 'Abu Dawud',
    },
    {
        id: 'health-2',
        arabic: 'أَذْهِبِ الْبَأسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي',
        transliteration: "Adhhibil ba's Rabban-nas, washfi antash-Shafi",
        english: "Remove the hardship, O Lord of mankind, and heal, for You are the Healer",
        category: 'health',
        benefit: 'For healing from illness',
        source: 'Bukhari',
    },
    // Protection Duas
    {
        id: 'protect-1',
        arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ',
        transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un",
        english: "In the name of Allah, with whose name nothing can harm",
        category: 'protection',
        benefit: 'Protection from all harm',
        source: 'Abu Dawud',
    },
    {
        id: 'protect-2',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ',
        transliteration: "HasbiyAllahu la ilaha illa Huwa",
        english: "Allah is sufficient for me. There is no god but Him",
        category: 'protection',
        benefit: 'Complete trust and reliance on Allah',
        source: 'Quran 9:129',
    },
];

/**
 * Mood Tracker Component
 */
const MoodTracker: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const today = new Date().toISOString().split('T')[0];
    const todayMood = data.moods.find((m) => m.date === today);

    const handleMoodSelect = useCallback((moodId: string) => {
        const newMood: MoodEntry = {
            date: today,
            mood: moodId,
        };

        // Remove existing today entry and add new one
        const filteredMoods = data.moods.filter((m) => m.date !== today);

        const newData = {
            ...data,
            moods: [newMood, ...filteredMoods].slice(0, 30), // Keep last 30 days
        };
        onUpdate(newData);
    }, [data, onUpdate, today]);

    // Calculate mood stats for the week
    const weekMoods = useMemo(() => {
        const last7Days = data.moods.slice(0, 7);
        const positive = last7Days.filter((m) =>
            ['grateful', 'peaceful', 'content', 'hopeful'].includes(m.mood)
        ).length;
        return { tracked: last7Days.length, positive };
    }, [data.moods]);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                💭 How&apos;s Your Heart Today?
            </h4>

            <div className="grid grid-cols-4 gap-2 mb-6">
                {MOODS.map((mood) => (
                    <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.id)}
                        className={`p-3 rounded-xl text-center transition-all hover:scale-105 ${todayMood?.mood === mood.id
                            ? `bg-gradient-to-br ${mood.color} shadow-lg`
                            : 'bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800'
                            }`}
                    >
                        <span className="text-2xl block">{mood.emoji}</span>
                        <span className={`text-xs font-bold ${todayMood?.mood === mood.id ? 'text-white' : 'text-slate-600 dark:text-slate-400'
                            }`}>
                            {mood.label}
                        </span>
                    </button>
                ))}
            </div>

            {todayMood && (
                <div className="p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-center mb-4">
                    <p className="text-sm text-emerald-500">
                        ✓ Today you&apos;re feeling <strong>{MOODS.find((m) => m.id === todayMood.mood)?.label}</strong>
                    </p>
                </div>
            )}

            {/* Week Summary */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">This Week</p>
                    <p className="text-xs text-slate-500">{weekMoods.tracked}/7 days tracked</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-emerald-500">{weekMoods.positive} positive</p>
                    <p className="text-xs text-slate-500">{weekMoods.tracked - weekMoods.positive} challenging</p>
                </div>
            </div>

            {/* Mood History */}
            {data.moods.length > 0 && (
                <div className="mt-4 flex gap-1 flex-wrap">
                    {data.moods.slice(0, 14).map((m, idx) => {
                        const mood = MOODS.find((mo) => mo.id === m.mood);
                        return (
                            <span
                                key={idx}
                                className="text-lg cursor-pointer hover:scale-125 transition-all"
                                title={`${m.date}: ${mood?.label}`}
                            >
                                {mood?.emoji}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

MoodTracker.displayName = 'MoodTracker';

/**
 * Patience Tracker Component with Scenario Exercises
 */
const PatienceTracker: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const [showScenario, setShowScenario] = useState(false);
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showLesson, setShowLesson] = useState(false);
    const [lessonInput, setLessonInput] = useState({ situation: '', response: '', lesson: '' });

    const scenario = PATIENCE_SCENARIOS[currentScenario];

    const handleOptionSelect = useCallback((optionIdx: number) => {
        setSelectedOption(optionIdx);
        const isPatient = scenario.options[optionIdx].patient;

        // Update patience score
        const newData = {
            ...data,
            patience: {
                ...data.patience,
                score: data.patience.score + (isPatient ? 10 : -5),
            },
        };
        onUpdate(newData);
    }, [data, onUpdate, scenario]);

    const handleNextScenario = useCallback(() => {
        setSelectedOption(null);
        setCurrentScenario((prev) => (prev + 1) % PATIENCE_SCENARIOS.length);
    }, []);

    const handleLogLesson = useCallback(() => {
        if (!lessonInput.situation.trim() || !lessonInput.lesson.trim()) return;

        const moment: PatienceMoment = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            situation: lessonInput.situation,
            response: lessonInput.response,
            lesson: lessonInput.lesson,
        };

        const newData = {
            ...data,
            patience: {
                moments: [moment, ...data.patience.moments].slice(0, 20),
                score: data.patience.score + 15,
            },
        };
        onUpdate(newData);
        setLessonInput({ situation: '', response: '', lesson: '' });
        setShowLesson(false);
    }, [data, onUpdate, lessonInput]);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    🧘 Patience (Sabr) Training
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Score:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${data.patience.score >= 50 ? 'bg-emerald-400/20 text-emerald-500' :
                        data.patience.score >= 0 ? 'bg-amber-400/20 text-amber-500' :
                            'bg-red-400/20 text-red-500'
                        }`}>
                        {data.patience.score}
                    </span>
                </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => { setShowScenario(true); setShowLesson(false); }}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all ${showScenario && !showLesson
                        ? 'bg-cyan-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    🎮 Practice Scenario
                </button>
                <button
                    onClick={() => { setShowLesson(true); setShowScenario(false); }}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all ${showLesson
                        ? 'bg-purple-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    📝 Log Real Moment
                </button>
            </div>

            {/* Practice Scenario */}
            {showScenario && !showLesson && (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/20">
                        <p className="text-sm font-bold text-cyan-500 mb-2">Scenario:</p>
                        <p className="text-slate-700 dark:text-slate-300">{scenario.situation}</p>
                    </div>

                    <div className="space-y-2">
                        {scenario.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={selectedOption !== null}
                                className={`w-full p-4 rounded-xl text-left text-sm transition-all ${selectedOption === idx
                                    ? opt.patient
                                        ? 'bg-emerald-400/20 border-2 border-emerald-400'
                                        : 'bg-red-400/20 border-2 border-red-400'
                                    : selectedOption !== null
                                        ? 'bg-slate-100 dark:bg-slate-900/30 opacity-50'
                                        : 'bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {selectedOption === idx && (
                                    <span className="mr-2">{opt.patient ? '✅' : '❌'}</span>
                                )}
                                {opt.text}
                            </button>
                        ))}
                    </div>

                    {selectedOption !== null && (
                        <div className="flex justify-between items-center pt-4">
                            <p className={`text-sm font-bold ${scenario.options[selectedOption].patient ? 'text-emerald-500' : 'text-red-500'
                                }`}>
                                {scenario.options[selectedOption].patient
                                    ? '✨ Beautiful patience! +10 points'
                                    : '💡 Remember: Patience brings reward. -5 points'}
                            </p>
                            <button
                                onClick={handleNextScenario}
                                className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 text-sm font-bold hover:bg-cyan-300 transition-all"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Log Real Patience Moment */}
            {showLesson && (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                            What situation tested your patience?
                        </label>
                        <input
                            type="text"
                            value={lessonInput.situation}
                            onChange={(e) => setLessonInput({ ...lessonInput, situation: e.target.value })}
                            placeholder="e.g., Long wait at the hospital..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                            How did you respond?
                        </label>
                        <input
                            type="text"
                            value={lessonInput.response}
                            onChange={(e) => setLessonInput({ ...lessonInput, response: e.target.value })}
                            placeholder="e.g., Made dhikr and stayed calm..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                            What did you learn? (Hardship → Lesson)
                        </label>
                        <input
                            type="text"
                            value={lessonInput.lesson}
                            onChange={(e) => setLessonInput({ ...lessonInput, lesson: e.target.value })}
                            placeholder="e.g., Patience creates inner peace..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleLogLesson}
                        disabled={!lessonInput.situation.trim() || !lessonInput.lesson.trim()}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-slate-900 font-bold hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        Save Lesson (+15 points) 📝
                    </button>
                </div>
            )}

            {/* Recent Patience Moments */}
            {data.patience.moments.length > 0 && !showScenario && !showLesson && (
                <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Recent patience moments:</p>
                    {data.patience.moments.slice(0, 3).map((m) => (
                        <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{m.situation}</p>
                            <p className="text-xs text-purple-500 mt-1">💡 {m.lesson}</p>
                        </div>
                    ))}
                </div>
            )}

            {!showScenario && !showLesson && data.patience.moments.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm py-4">
                    Choose a mode above to start training your patience! 🌱
                </p>
            )}
        </div>
    );
});

PatienceTracker.displayName = 'PatienceTracker';

/**
 * Dua Library Component with Categories and Answered Dua Tracker
 */
const DuaLibrary: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showAnswered, setShowAnswered] = useState(false);
    const [expandedDua, setExpandedDua] = useState<string | null>(null);
    const [newAnswered, setNewAnswered] = useState({ duaText: '', howAnswered: '' });

    const filteredDuas = selectedCategory
        ? DUA_LIBRARY.filter((d) => d.category === selectedCategory)
        : DUA_LIBRARY;

    const handleToggleFavorite = useCallback((duaId: string) => {
        const isFavorite = data.duas.favorites.includes(duaId);
        const newFavorites = isFavorite
            ? data.duas.favorites.filter((id) => id !== duaId)
            : [...data.duas.favorites, duaId];

        const newData = {
            ...data,
            duas: { ...data.duas, favorites: newFavorites },
        };
        onUpdate(newData);
    }, [data, onUpdate]);

    const handleAddAnswered = useCallback(() => {
        if (!newAnswered.duaText.trim() || !newAnswered.howAnswered.trim()) return;

        const answered: AnsweredDua = {
            id: Date.now().toString(),
            duaText: newAnswered.duaText,
            dateAsked: '', // User didn't specify
            dateAnswered: new Date().toISOString().split('T')[0],
            howAnswered: newAnswered.howAnswered,
        };

        const newData = {
            ...data,
            duas: {
                ...data.duas,
                answered: [answered, ...data.duas.answered].slice(0, 50),
            },
        };
        onUpdate(newData);
        setNewAnswered({ duaText: '', howAnswered: '' });
    }, [data, onUpdate, newAnswered]);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    🤲 Dua Library
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{data.duas.favorites.length} ⭐</span>
                    <span className="text-xs text-slate-500">{data.duas.answered.length} ✓</span>
                </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setShowAnswered(false)}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!showAnswered
                        ? 'bg-cyan-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    📖 Browse Duas
                </button>
                <button
                    onClick={() => setShowAnswered(true)}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${showAnswered
                        ? 'bg-emerald-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    ✨ Answered Duas
                </button>
            </div>

            {!showAnswered ? (
                <>
                    {/* Category Filter */}
                    <div className="flex gap-2 flex-wrap mb-6">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === null
                                ? 'bg-purple-400 text-slate-900'
                                : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            All
                        </button>
                        {DUA_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${selectedCategory === cat.id
                                    ? `bg-gradient-to-r ${cat.color} text-slate-900`
                                    : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                <span>{cat.icon}</span> {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Dua List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredDuas.map((dua) => {
                            const isFavorite = data.duas.favorites.includes(dua.id);
                            const isExpanded = expandedDua === dua.id;
                            const category = DUA_CATEGORIES.find((c) => c.id === dua.category);

                            return (
                                <div
                                    key={dua.id}
                                    className={`p-4 rounded-xl border transition-all ${isExpanded
                                        ? 'bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border-cyan-400/30'
                                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 hover:border-cyan-400/30'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <button
                                            onClick={() => setExpandedDua(isExpanded ? null : dua.id)}
                                            className="flex-1 text-left"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm">{category?.icon}</span>
                                                <span className="text-xs text-slate-500">{category?.name}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {dua.english}
                                            </p>
                                        </button>
                                        <button
                                            onClick={() => handleToggleFavorite(dua.id)}
                                            className={`text-xl transition-transform hover:scale-125 ${isFavorite ? 'text-amber-400' : 'text-slate-300'
                                                }`}
                                        >
                                            {isFavorite ? '⭐' : '☆'}
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 space-y-3 border-t border-slate-200 dark:border-white/10 pt-4">
                                            <div className="text-right">
                                                <p className="text-xl font-arabic text-slate-900 dark:text-white leading-loose">
                                                    {dua.arabic}
                                                </p>
                                            </div>
                                            <p className="text-sm text-cyan-600 dark:text-cyan-400 italic">
                                                {dua.transliteration}
                                            </p>
                                            <p className="text-xs text-purple-500">
                                                ✨ {dua.benefit}
                                            </p>
                                            {dua.source && (
                                                <p className="text-xs text-slate-400">
                                                    Source: {dua.source}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    {/* Add Answered Dua */}
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 border border-emerald-400/20">
                        <p className="text-sm font-bold text-emerald-500 mb-3">
                            🎉 Record an Answered Dua
                        </p>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={newAnswered.duaText}
                                onChange={(e) => setNewAnswered({ ...newAnswered, duaText: e.target.value })}
                                placeholder="What dua was answered?"
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-sm"
                            />
                            <input
                                type="text"
                                value={newAnswered.howAnswered}
                                onChange={(e) => setNewAnswered({ ...newAnswered, howAnswered: e.target.value })}
                                placeholder="How did Allah answer it?"
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-sm"
                            />
                            <button
                                onClick={handleAddAnswered}
                                disabled={!newAnswered.duaText.trim() || !newAnswered.howAnswered.trim()}
                                className="w-full py-2 rounded-xl bg-emerald-400 text-slate-900 text-sm font-bold hover:bg-emerald-300 disabled:opacity-50 transition-all"
                            >
                                Save to Journal ✨
                            </button>
                        </div>
                    </div>

                    {/* Answered Duas List */}
                    {data.duas.answered.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {data.duas.answered.map((answered) => (
                                <div
                                    key={answered.id}
                                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5"
                                >
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                        {answered.duaText}
                                    </p>
                                    <p className="text-xs text-emerald-500">
                                        ✓ {answered.howAnswered}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {answered.dateAnswered}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 text-sm py-8">
                            No answered duas recorded yet. When Allah answers your prayers, record them here! 🤲
                        </p>
                    )}
                </>
            )}
        </div>
    );
});

DuaLibrary.displayName = 'DuaLibrary';

/**
 * 99 Names of Allah (Asma ul Husna)
 */
interface NameOfAllah {
    number: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    benefit?: string;
}

const NAMES_OF_ALLAH: NameOfAllah[] = [
    { number: 1, arabic: 'الرَّحْمَنُ', transliteration: 'Ar-Rahman', meaning: 'The Most Gracious', benefit: 'Recite for mercy and compassion' },
    { number: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Raheem', meaning: 'The Most Merciful', benefit: 'For Allah\'s mercy in all affairs' },
    { number: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', meaning: 'The King', benefit: 'For respect and honor' },
    { number: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddus', meaning: 'The Most Holy', benefit: 'For purification of the heart' },
    { number: 5, arabic: 'السَّلاَمُ', transliteration: 'As-Salam', meaning: 'The Source of Peace', benefit: 'For peace and tranquility' },
    { number: 6, arabic: 'الْمُؤْمِنُ', transliteration: 'Al-Mu\'min', meaning: 'The Granter of Security', benefit: 'For protection from fear' },
    { number: 7, arabic: 'الْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', meaning: 'The Guardian', benefit: 'For protection and watchfulness' },
    { number: 8, arabic: 'الْعَزِيزُ', transliteration: 'Al-Aziz', meaning: 'The Almighty', benefit: 'For strength and honor' },
    { number: 9, arabic: 'الْجَبَّارُ', transliteration: 'Al-Jabbar', meaning: 'The Compeller', benefit: 'For overcoming difficulties' },
    { number: 10, arabic: 'الْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', meaning: 'The Supreme', benefit: 'For dignity and greatness' },
    { number: 11, arabic: 'الْخَالِقُ', transliteration: 'Al-Khaliq', meaning: 'The Creator', benefit: 'For creativity and solutions' },
    { number: 12, arabic: 'الْبَارِئُ', transliteration: 'Al-Bari', meaning: 'The Evolver', benefit: 'For new beginnings' },
    { number: 13, arabic: 'الْمُصَوِّرُ', transliteration: 'Al-Musawwir', meaning: 'The Fashioner', benefit: 'For beauty and form' },
    { number: 14, arabic: 'الْغَفَّارُ', transliteration: 'Al-Ghaffar', meaning: 'The Forgiver', benefit: 'For forgiveness of sins' },
    { number: 15, arabic: 'الْقَهَّارُ', transliteration: 'Al-Qahhar', meaning: 'The Subduer', benefit: 'For overcoming enemies' },
    { number: 16, arabic: 'الْوَهَّابُ', transliteration: 'Al-Wahhab', meaning: 'The Bestower', benefit: 'For receiving gifts and blessings' },
    { number: 17, arabic: 'الرَّزَّاقُ', transliteration: 'Ar-Razzaq', meaning: 'The Provider', benefit: 'For sustenance and provision' },
    { number: 18, arabic: 'الْفَتَّاحُ', transliteration: 'Al-Fattah', meaning: 'The Opener', benefit: 'For opening doors of opportunity' },
    { number: 19, arabic: 'اَلْعَلِيْمُ', transliteration: 'Al-Alim', meaning: 'The All-Knowing', benefit: 'For knowledge and understanding' },
    { number: 20, arabic: 'الْقَابِضُ', transliteration: 'Al-Qabid', meaning: 'The Withholder', benefit: 'For patience in difficulties' },
    { number: 21, arabic: 'الْبَاسِطُ', transliteration: 'Al-Basit', meaning: 'The Expander', benefit: 'For expansion of provisions' },
    { number: 22, arabic: 'الْخَافِضُ', transliteration: 'Al-Khafid', meaning: 'The Abaser', benefit: 'For humility' },
    { number: 23, arabic: 'الرَّافِعُ', transliteration: 'Ar-Rafi', meaning: 'The Exalter', benefit: 'For elevation in status' },
    { number: 24, arabic: 'الْمُعِزُّ', transliteration: 'Al-Mu\'izz', meaning: 'The Bestower of Honor', benefit: 'For honor and respect' },
    { number: 25, arabic: 'المُذِلُّ', transliteration: 'Al-Mudhill', meaning: 'The Humiliator', benefit: 'For protection from arrogance' },
    { number: 26, arabic: 'السَّمِيعُ', transliteration: 'As-Sami', meaning: 'The All-Hearing', benefit: 'For prayers to be heard' },
    { number: 27, arabic: 'الْبَصِيرُ', transliteration: 'Al-Basir', meaning: 'The All-Seeing', benefit: 'For insight and clarity' },
    { number: 28, arabic: 'الْحَكَمُ', transliteration: 'Al-Hakam', meaning: 'The Judge', benefit: 'For justice in matters' },
    { number: 29, arabic: 'الْعَدْلُ', transliteration: 'Al-Adl', meaning: 'The Just', benefit: 'For fairness and balance' },
    { number: 30, arabic: 'اللَّطِيفُ', transliteration: 'Al-Latif', meaning: 'The Subtle One', benefit: 'For ease in hardship' },
    { number: 31, arabic: 'الْخَبِيرُ', transliteration: 'Al-Khabir', meaning: 'The All-Aware', benefit: 'For awareness and wisdom' },
    { number: 32, arabic: 'الْحَلِيمُ', transliteration: 'Al-Halim', meaning: 'The Forbearing', benefit: 'For patience and tolerance' },
    { number: 33, arabic: 'الْعَظِيمُ', transliteration: 'Al-Azim', meaning: 'The Magnificent', benefit: 'For respect and awe' },
    { number: 34, arabic: 'الْغَفُورُ', transliteration: 'Al-Ghafur', meaning: 'The Forgiving', benefit: 'For forgiveness' },
    { number: 35, arabic: 'الشَّكُورُ', transliteration: 'Ash-Shakur', meaning: 'The Appreciative', benefit: 'For gratitude and rewards' },
    { number: 36, arabic: 'الْعَلِيُّ', transliteration: 'Al-Ali', meaning: 'The Most High', benefit: 'For elevation' },
    { number: 37, arabic: 'الْكَبِيرُ', transliteration: 'Al-Kabir', meaning: 'The Greatest', benefit: 'For greatness' },
    { number: 38, arabic: 'الْحَفِيظُ', transliteration: 'Al-Hafiz', meaning: 'The Preserver', benefit: 'For protection' },
    { number: 39, arabic: 'المُقيِت', transliteration: 'Al-Muqit', meaning: 'The Sustainer', benefit: 'For sustenance' },
    { number: 40, arabic: 'الْحسِيبُ', transliteration: 'Al-Hasib', meaning: 'The Reckoner', benefit: 'For accountability' },
    { number: 41, arabic: 'الْجَلِيلُ', transliteration: 'Al-Jalil', meaning: 'The Majestic', benefit: 'For majesty and honor' },
    { number: 42, arabic: 'الْكَرِيمُ', transliteration: 'Al-Karim', meaning: 'The Generous', benefit: 'For generosity' },
    { number: 43, arabic: 'الرَّقِيبُ', transliteration: 'Ar-Raqib', meaning: 'The Watchful', benefit: 'For protection' },
    { number: 44, arabic: 'الْمُجِيبُ', transliteration: 'Al-Mujib', meaning: 'The Responsive', benefit: 'For answered prayers' },
    { number: 45, arabic: 'الْوَاسِعُ', transliteration: 'Al-Wasi', meaning: 'The All-Encompassing', benefit: 'For abundance' },
    { number: 46, arabic: 'الْحَكِيمُ', transliteration: 'Al-Hakim', meaning: 'The Wise', benefit: 'For wisdom' },
    { number: 47, arabic: 'الْوَدُودُ', transliteration: 'Al-Wadud', meaning: 'The Loving', benefit: 'For love and affection' },
    { number: 48, arabic: 'الْمَجِيدُ', transliteration: 'Al-Majid', meaning: 'The Glorious', benefit: 'For glory and honor' },
    { number: 49, arabic: 'الْبَاعِثُ', transliteration: 'Al-Ba\'ith', meaning: 'The Resurrector', benefit: 'For new life' },
    { number: 50, arabic: 'الشَّهِيدُ', transliteration: 'Ash-Shahid', meaning: 'The Witness', benefit: 'For truthfulness' },
    { number: 51, arabic: 'الْحَقُّ', transliteration: 'Al-Haqq', meaning: 'The Truth', benefit: 'For truth and reality' },
    { number: 52, arabic: 'الْوَكِيلُ', transliteration: 'Al-Wakil', meaning: 'The Trustee', benefit: 'For trust in Allah' },
    { number: 53, arabic: 'الْقَوِيُّ', transliteration: 'Al-Qawiyy', meaning: 'The Strong', benefit: 'For strength' },
    { number: 54, arabic: 'الْمَتِينُ', transliteration: 'Al-Matin', meaning: 'The Firm', benefit: 'For steadfastness' },
    { number: 55, arabic: 'الْوَلِيُّ', transliteration: 'Al-Waliyy', meaning: 'The Protecting Friend', benefit: 'For friendship with Allah' },
    { number: 56, arabic: 'الْحَمِيدُ', transliteration: 'Al-Hamid', meaning: 'The Praiseworthy', benefit: 'For praise' },
    { number: 57, arabic: 'الْمُحْصِي', transliteration: 'Al-Muhsi', meaning: 'The Counter', benefit: 'For accounting' },
    { number: 58, arabic: 'الْمُبْدِئُ', transliteration: 'Al-Mubdi', meaning: 'The Originator', benefit: 'For new projects' },
    { number: 59, arabic: 'الْمُعِيدُ', transliteration: 'Al-Mu\'id', meaning: 'The Restorer', benefit: 'For restoration' },
    { number: 60, arabic: 'الْمُحْيِي', transliteration: 'Al-Muhyi', meaning: 'The Giver of Life', benefit: 'For vitality' },
    { number: 61, arabic: 'اَلْمُمِيتُ', transliteration: 'Al-Mumit', meaning: 'The Bringer of Death', benefit: 'For remembrance of death' },
    { number: 62, arabic: 'الْحَيُّ', transliteration: 'Al-Hayy', meaning: 'The Ever-Living', benefit: 'For life and energy' },
    { number: 63, arabic: 'الْقَيُّومُ', transliteration: 'Al-Qayyum', meaning: 'The Self-Subsisting', benefit: 'For independence' },
    { number: 64, arabic: 'الْوَاجِدُ', transliteration: 'Al-Wajid', meaning: 'The Finder', benefit: 'For finding what is lost' },
    { number: 65, arabic: 'الْمَاجِدُ', transliteration: 'Al-Majid', meaning: 'The Noble', benefit: 'For nobility' },
    { number: 66, arabic: 'الْوَاحِدُ', transliteration: 'Al-Wahid', meaning: 'The One', benefit: 'For unity with Allah' },
    { number: 67, arabic: 'اَلاَحَدُ', transliteration: 'Al-Ahad', meaning: 'The Unique', benefit: 'For uniqueness' },
    { number: 68, arabic: 'الصَّمَدُ', transliteration: 'As-Samad', meaning: 'The Eternal', benefit: 'For eternity' },
    { number: 69, arabic: 'الْقَادِرُ', transliteration: 'Al-Qadir', meaning: 'The Able', benefit: 'For ability' },
    { number: 70, arabic: 'الْمُقْتَدِرُ', transliteration: 'Al-Muqtadir', meaning: 'The Powerful', benefit: 'For power' },
    { number: 71, arabic: 'الْمُقَدِّمُ', transliteration: 'Al-Muqaddim', meaning: 'The Expediter', benefit: 'For speeding things up' },
    { number: 72, arabic: 'الْمُؤَخِّرُ', transliteration: 'Al-Mu\'akhkhir', meaning: 'The Delayer', benefit: 'For patience' },
    { number: 73, arabic: 'الأوَّلُ', transliteration: 'Al-Awwal', meaning: 'The First', benefit: 'For beginnings' },
    { number: 74, arabic: 'الآخِرُ', transliteration: 'Al-Akhir', meaning: 'The Last', benefit: 'For endings' },
    { number: 75, arabic: 'الظَّاهِرُ', transliteration: 'Az-Zahir', meaning: 'The Manifest', benefit: 'For manifestation' },
    { number: 76, arabic: 'الْبَاطِنُ', transliteration: 'Al-Batin', meaning: 'The Hidden', benefit: 'For inner knowledge' },
    { number: 77, arabic: 'الْوَالِي', transliteration: 'Al-Wali', meaning: 'The Governor', benefit: 'For governance' },
    { number: 78, arabic: 'الْمُتَعَالِي', transliteration: 'Al-Muta\'ali', meaning: 'The Most Exalted', benefit: 'For exaltation' },
    { number: 79, arabic: 'الْبَرُّ', transliteration: 'Al-Barr', meaning: 'The Source of Goodness', benefit: 'For goodness' },
    { number: 80, arabic: 'التَّوَّابُ', transliteration: 'At-Tawwab', meaning: 'The Acceptor of Repentance', benefit: 'For repentance' },
    { number: 81, arabic: 'الْمُنْتَقِمُ', transliteration: 'Al-Muntaqim', meaning: 'The Avenger', benefit: 'For justice' },
    { number: 82, arabic: 'العَفُوُّ', transliteration: 'Al-Afuww', meaning: 'The Pardoner', benefit: 'For pardon' },
    { number: 83, arabic: 'الرَّؤُوفُ', transliteration: 'Ar-Ra\'uf', meaning: 'The Compassionate', benefit: 'For compassion' },
    { number: 84, arabic: 'مَالِكُ الْمُلْكِ', transliteration: 'Malik-ul-Mulk', meaning: 'Owner of Sovereignty', benefit: 'For authority' },
    { number: 85, arabic: 'ذُوالْجَلاَلِ وَالإكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', meaning: 'Lord of Majesty & Generosity', benefit: 'For honor' },
    { number: 86, arabic: 'الْمُقْسِطُ', transliteration: 'Al-Muqsit', meaning: 'The Equitable', benefit: 'For equity' },
    { number: 87, arabic: 'الْجَامِعُ', transliteration: 'Al-Jami', meaning: 'The Gatherer', benefit: 'For unity' },
    { number: 88, arabic: 'الْغَنِيُّ', transliteration: 'Al-Ghaniyy', meaning: 'The Self-Sufficient', benefit: 'For sufficiency' },
    { number: 89, arabic: 'الْمُغْنِي', transliteration: 'Al-Mughni', meaning: 'The Enricher', benefit: 'For wealth' },
    { number: 90, arabic: 'اَلْمَانِعُ', transliteration: 'Al-Mani', meaning: 'The Preventer', benefit: 'For protection' },
    { number: 91, arabic: 'الضَّارَّ', transliteration: 'Ad-Darr', meaning: 'The Distresser', benefit: 'For understanding trials' },
    { number: 92, arabic: 'النَّافِعُ', transliteration: 'An-Nafi', meaning: 'The Benefiter', benefit: 'For benefit' },
    { number: 93, arabic: 'النُّورُ', transliteration: 'An-Nur', meaning: 'The Light', benefit: 'For guidance' },
    { number: 94, arabic: 'الْهَادِي', transliteration: 'Al-Hadi', meaning: 'The Guide', benefit: 'For guidance' },
    { number: 95, arabic: 'الْبَدِيعُ', transliteration: 'Al-Badi', meaning: 'The Incomparable', benefit: 'For uniqueness' },
    { number: 96, arabic: 'اَلْبَاقِي', transliteration: 'Al-Baqi', meaning: 'The Everlasting', benefit: 'For permanence' },
    { number: 97, arabic: 'الْوَارِثُ', transliteration: 'Al-Warith', meaning: 'The Inheritor', benefit: 'For inheritance' },
    { number: 98, arabic: 'الرَّشِيدُ', transliteration: 'Ar-Rashid', meaning: 'The Guide to Right Path', benefit: 'For righteous guidance' },
    { number: 99, arabic: 'الصَّبُورُ', transliteration: 'As-Sabur', meaning: 'The Patient', benefit: 'For patience' },
];

/**
 * 99 Names of Allah Explorer Component
 */
const NamesOfAllah: React.FC = memo(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredNames = useMemo(() => {
        if (!searchQuery.trim()) return NAMES_OF_ALLAH;
        const query = searchQuery.toLowerCase();
        return NAMES_OF_ALLAH.filter(
            (name) =>
                name.transliteration.toLowerCase().includes(query) ||
                name.meaning.toLowerCase().includes(query) ||
                name.number.toString() === query
        );
    }, [searchQuery]);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    ✨ 99 Names of Allah
                </h4>
                <span className="text-xs text-slate-500">Asma ul Husna</span>
            </div>

            {/* Search and View Toggle */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, meaning, or number..."
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-sm"
                />
                <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 text-slate-500 hover:text-purple-500 transition-colors"
                >
                    {viewMode === 'grid' ? '📋' : '⊞'}
                </button>
            </div>

            {/* Selected Name Detail */}
            {selectedName && (
                <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20">
                    <button
                        onClick={() => setSelectedName(null)}
                        className="text-xs text-slate-500 hover:text-purple-500 mb-4"
                    >
                        ← Back to all names
                    </button>
                    <div className="text-center">
                        <span className="text-sm text-purple-500 font-bold">#{selectedName.number}</span>
                        <h3 className="text-4xl font-arabic text-slate-900 dark:text-white mt-2 mb-4">
                            {selectedName.arabic}
                        </h3>
                        <p className="text-xl font-bold text-purple-500 mb-1">
                            {selectedName.transliteration}
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                            {selectedName.meaning}
                        </p>
                        {selectedName.benefit && (
                            <p className="text-sm text-emerald-500 bg-emerald-400/10 px-4 py-2 rounded-lg inline-block">
                                ✨ {selectedName.benefit}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Names Grid/List */}
            {!selectedName && (
                <div className={`max-h-96 overflow-y-auto ${viewMode === 'grid'
                    ? 'grid grid-cols-3 md:grid-cols-5 gap-2'
                    : 'space-y-2'
                    }`}>
                    {filteredNames.map((name) => (
                        <button
                            key={name.number}
                            onClick={() => setSelectedName(name)}
                            className={`text-left transition-all hover:scale-105 ${viewMode === 'grid'
                                ? 'p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-purple-400/30'
                                : 'w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-purple-400/30 flex items-center justify-between'
                                }`}
                        >
                            {viewMode === 'grid' ? (
                                <div className="text-center">
                                    <span className="text-xs text-slate-400">#{name.number}</span>
                                    <p className="text-lg font-arabic text-slate-900 dark:text-white">
                                        {name.arabic}
                                    </p>
                                    <p className="text-xs text-purple-500 truncate">
                                        {name.transliteration}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-400 w-6">#{name.number}</span>
                                        <span className="text-lg font-arabic text-slate-900 dark:text-white">
                                            {name.arabic}
                                        </span>
                                        <span className="text-sm text-purple-500 font-bold">
                                            {name.transliteration}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500">{name.meaning}</span>
                                </>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Count */}
            <p className="text-center text-xs text-slate-400 mt-4">
                Showing {filteredNames.length} of 99 names
            </p>
        </div>
    );
});

NamesOfAllah.displayName = 'NamesOfAllah';

/**
 * Morning/Evening Adhkar Routine Items
 */
interface AdhkarItem {
    id: string;
    arabic: string;
    transliteration: string;
    meaning: string;
    count: number;
    period: 'morning' | 'evening';
}

const ADHKAR_ITEMS: AdhkarItem[] = [
    // Morning Adhkar
    { id: 'am1', arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', transliteration: "Asbahna wa asbahal mulku lillah", meaning: 'We enter morning & dominion is Allah\'s', count: 1, period: 'morning' },
    { id: 'am2', arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا', transliteration: "Allahumma bika asbahna", meaning: 'O Allah, by You we enter the morning', count: 1, period: 'morning' },
    { id: 'am3', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: "SubhanAllah wa bihamdihi", meaning: 'Glory be to Allah and His praise', count: 100, period: 'morning' },
    { id: 'am4', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', transliteration: "La ilaha illallah", meaning: 'None has the right to be worshipped but Allah', count: 100, period: 'morning' },
    { id: 'am5', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: "Astaghfirullah", meaning: 'I seek forgiveness from Allah', count: 100, period: 'morning' },
    { id: 'am6', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', transliteration: "Allahumma salli ala Muhammad", meaning: 'O Allah, send blessings upon Muhammad', count: 10, period: 'morning' },
    // Evening Adhkar
    { id: 'pm1', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', transliteration: "Amsayna wa amsal mulku lillah", meaning: 'We enter evening & dominion is Allah\'s', count: 1, period: 'evening' },
    { id: 'pm2', arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا', transliteration: "Allahumma bika amsayna", meaning: 'O Allah, by You we enter the evening', count: 1, period: 'evening' },
    { id: 'pm3', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: "SubhanAllah wa bihamdihi", meaning: 'Glory be to Allah and His praise', count: 100, period: 'evening' },
    { id: 'pm4', arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ', transliteration: "A'udhu bikalimatillah", meaning: 'I seek refuge in the words of Allah', count: 3, period: 'evening' },
    { id: 'pm5', arabic: 'بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', transliteration: "Bismika Allahumma amootu", meaning: 'In Your name, O Allah, I die and live', count: 1, period: 'evening' },
    { id: 'pm6', arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ', transliteration: "Allahumma qini adhabak", meaning: 'O Allah, protect me from Your punishment', count: 3, period: 'evening' },
];

/**
 * Daily Routine Builder Component
 */
const DailyRoutine: React.FC = memo(() => {
    const [period, setPeriod] = useState<'morning' | 'evening'>('morning');
    const [completed, setCompleted] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem('nur-routine-completed');
            const data = saved ? JSON.parse(saved) : {};
            const today = new Date().toISOString().split('T')[0];
            return data.date === today ? new Set(data.items) : new Set();
        } catch {
            return new Set();
        }
    });

    // Save completed items
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('nur-routine-completed', JSON.stringify({
            date: today,
            items: Array.from(completed)
        }));
    }, [completed]);

    const filteredItems = ADHKAR_ITEMS.filter((item) => item.period === period);

    const handleToggle = useCallback((id: string) => {
        setCompleted((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
                if (navigator.vibrate) navigator.vibrate(50);
            }
            return next;
        });
    }, []);

    const progress = filteredItems.filter((item) => completed.has(item.id)).length;
    const total = filteredItems.length;
    const percentage = Math.round((progress / total) * 100);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {period === 'morning' ? '🌅 Morning' : '🌙 Evening'} Adhkar
                </h4>
                <span className="text-sm font-bold text-purple-500">{progress}/{total}</span>
            </div>

            {/* Period Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setPeriod('morning')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all ${period === 'morning'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    🌅 Morning
                </button>
                <button
                    onClick={() => setPeriod('evening')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all ${period === 'evening'
                        ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                        : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    🌙 Evening
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="h-3 bg-slate-100 dark:bg-slate-900/50 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${period === 'morning'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                            : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                            }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {percentage === 100 && (
                    <p className="text-center text-sm text-emerald-500 font-bold mt-2">
                        🎉 Mashallah! Routine complete!
                    </p>
                )}
            </div>

            {/* Adhkar List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleToggle(item.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${completed.has(item.id)
                            ? 'bg-emerald-400/10 border-emerald-400/30'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 hover:border-purple-400/30'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${completed.has(item.id)
                                ? 'bg-emerald-400 border-emerald-400 text-white text-xs'
                                : 'border-slate-300 dark:border-white/20'
                                }`}>
                                {completed.has(item.id) && '✓'}
                            </span>
                            <div className="flex-1">
                                <p className={`text-lg font-arabic mb-1 ${completed.has(item.id)
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-900 dark:text-white'
                                    }`}>
                                    {item.arabic}
                                </p>
                                <p className="text-sm text-purple-500 italic">{item.transliteration}</p>
                                <p className="text-xs text-slate-500 mt-1">{item.meaning}</p>
                                {item.count > 1 && (
                                    <span className="text-xs bg-cyan-400/20 text-cyan-500 px-2 py-0.5 rounded-full mt-2 inline-block">
                                        ×{item.count}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
});

DailyRoutine.displayName = 'DailyRoutine';

/**
 * Sincerity Checker Component
 */
const SincerityChecker: React.FC<{
    data: SpiritualData;
    onUpdate: (data: SpiritualData) => void;
}> = memo(({ data, onUpdate }) => {
    const [intention, setIntention] = useState('');
    const [showQuote, setShowQuote] = useState(true);

    const quotes = [
        "Actions are judged by intentions. — Prophet Muhammad ﷺ",
        "Allah does not look at your forms and possessions, but looks at your hearts and deeds.",
        "The most beloved deeds to Allah are those done consistently, even if small.",
        "Whoever does a deed sincerely for Allah, Allah will suffice him.",
    ];

    const randomQuote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

    const handleSetIntention = useCallback(() => {
        if (intention.trim() === '') return;

        const newData = {
            ...data,
            intentions: [intention, ...data.intentions.slice(0, 6)],
        };
        onUpdate(newData);
        setIntention('');
    }, [intention, data, onUpdate]);

    const handleHiddenDeed = useCallback(() => {
        const newData = {
            ...data,
            hiddenDeeds: data.hiddenDeeds + 1,
        };
        onUpdate(newData);
    }, [data, onUpdate]);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                💎 Sincerity Check-In
            </h4>

            {/* Quote */}
            {showQuote && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-400/20">
                    <p className="text-sm italic text-slate-600 dark:text-slate-300">"{randomQuote}"</p>
                </div>
            )}

            {/* Daily Intention Setter */}
            <div className="mb-6">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                    Set Your Intention for Today
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        placeholder="Today, I intend to..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400"
                    />
                    <button
                        onClick={handleSetIntention}
                        className="px-4 py-3 rounded-xl bg-purple-400 text-slate-900 font-bold hover:bg-purple-300 transition-all"
                    >
                        Set
                    </button>
                </div>
            </div>

            {/* Hidden Deeds Counter */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Secret Good Deeds</p>
                        <p className="text-xs text-slate-500">Done only for Allah, never shared</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-purple-500">{data.hiddenDeeds}</span>
                        <button
                            onClick={handleHiddenDeed}
                            className="w-10 h-10 rounded-full bg-purple-400 text-slate-900 text-xl hover:bg-purple-300 transition-all"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Intentions */}
            {data.intentions.length > 0 && (
                <div className="mt-6">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Recent Intentions:</p>
                    <div className="space-y-1">
                        {data.intentions.slice(0, 3).map((int, idx) => (
                            <p key={idx} className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                <span className="text-purple-400">•</span> {int}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

SincerityChecker.displayName = 'SincerityChecker';

/**
 * Spiritual Dashboard Component
 */
const SpiritualDashboard: React.FC<{ data: SpiritualData }> = memo(({ data }) => {
    const healthScore = useMemo(() => {
        let score = 0;
        if (data.dhikr.totalCount > 0) score += 25;
        if (data.dhikr.streak > 0) score += 25;
        if (data.gratitude.entries.length > 0) score += 25;
        if (data.hiddenDeeds > 0) score += 25;
        return score;
    }, [data]);

    const healthLevel = healthScore >= 75 ? 'Flourishing' : healthScore >= 50 ? 'Growing' : healthScore >= 25 ? 'Developing' : 'Beginning';
    const healthColor = healthScore >= 75 ? 'text-emerald-500' : healthScore >= 50 ? 'text-cyan-500' : healthScore >= 25 ? 'text-amber-500' : 'text-slate-500';

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950 border border-white/10 shadow-xl text-white">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                📊 Your Spiritual Dashboard
            </h4>

            {/* Health Meter */}
            <div className="text-center mb-8">
                <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${healthScore * 3.52} 352`}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{healthScore}%</span>
                    </div>
                </div>
                <p className={`text-lg font-bold mt-2 ${healthColor}`}>{healthLevel}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold">{data.dhikr.totalCount}</p>
                    <p className="text-xs text-slate-400">Total Dhikr</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold">{data.dhikr.streak}🔥</p>
                    <p className="text-xs text-slate-400">Day Streak</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold">{data.gratitude.entries.length}</p>
                    <p className="text-xs text-slate-400">Gratitude Entries</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold">{data.hiddenDeeds}</p>
                    <p className="text-xs text-slate-400">Secret Deeds</p>
                </div>
            </div>
        </div>
    );
});

SpiritualDashboard.displayName = 'SpiritualDashboard';

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

type TabId = 'intro' | 'dhikr' | 'patience' | 'dua' | 'sincerity';

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">✨</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">📿</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float">🤲</div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/30 border border-purple-400/50 text-purple-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🌱</span> Spiritual Development
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Spiritual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Growth</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Cultivate your inner self through mindfulness, sincerity, and connection with Allah
            </p>
        </div>
    </div>
));

HeroSection.displayName = 'HeroSection';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto">
        {[
            { id: 'intro' as TabId, label: 'Overview', icon: '✨' },
            { id: 'dhikr' as TabId, label: 'Dhikr', icon: '📿' },
            { id: 'patience' as TabId, label: 'Patience', icon: '🌱' },
            { id: 'dua' as TabId, label: 'Dua Power', icon: '🤲' },
            { id: 'sincerity' as TabId, label: 'Sincerity', icon: '💎' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                `}
            >
                <span>{tab.icon}</span>
                {tab.label}
            </button>
        ))}
    </div>
));

TabNavigation.displayName = 'TabNavigation';

export const SpiritualGrowthPage: React.FC = memo(() => {
    // State
    const [activeTab, setActiveTab] = useState<TabId>('intro');
    const [data, setData] = useState<SpiritualData>(() =>
        getStorageItem(STORAGE_KEY, getDefaultData())
    );

    // Persist data
    useEffect(() => {
        setStorageItem(STORAGE_KEY, data);
    }, [data]);

    const updateData = useCallback((newData: SpiritualData) => {
        setData(newData);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <HeroSection />

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* INTRO TAB */}
                {activeTab === 'intro' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Your Spiritual Journey</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                In Islam, spiritual growth is about nurturing your relationship with Allah through consistent practice,
                                sincere intentions, and mindful reflection. This page provides practical tools to help you on this journey.
                            </p>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-500/20">
                                <p className="text-sm font-bold text-purple-800 dark:text-purple-300">
                                    Start small, be consistent. <span className="font-normal text-slate-600 dark:text-slate-400">The Prophet Muhammad ﷺ said: "The most beloved deeds to Allah are those done consistently, even if they are small."</span>
                                </p>
                            </div>
                        </div>

                        {/* Quick Dashboard */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-center">
                                <span className="text-3xl block mb-2">📿</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.dhikr.totalCount}</span>
                                <p className="text-xs text-slate-500">Total Dhikr</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-center">
                                <span className="text-3xl block mb-2">🙏</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.gratitude.entries.length}</span>
                                <p className="text-xs text-slate-500">Gratitude Entries</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-center">
                                <span className="text-3xl block mb-2">🔥</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.dhikr.streak}</span>
                                <p className="text-xs text-slate-500">Day Streak</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-center">
                                <span className="text-3xl block mb-2">💎</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.hiddenDeeds}</span>
                                <p className="text-xs text-slate-500">Hidden Deeds</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span>✨</span> 99 Names of Allah
                            </h2>
                            <NamesOfAllah />
                        </div>
                    </div>
                )}

                {/* DHIKR TAB */}
                {activeTab === 'dhikr' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dhikr & Mindfulness</h2>
                            <p className="text-slate-600 dark:text-slate-400">Remember Allah in every moment</p>
                        </div>
                        <DhikrCounter data={data} onUpdate={updateData} />
                        <DailyRoutine />
                    </div>
                )}

                {/* PATIENCE TAB */}
                {activeTab === 'patience' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Patience & Gratitude</h2>
                            <p className="text-slate-600 dark:text-slate-400">The twin pillars of faith</p>
                        </div>
                        <MoodTracker data={data} onUpdate={updateData} />
                        <GratitudeJournal data={data} onUpdate={updateData} />
                        <PatienceTracker data={data} onUpdate={updateData} />
                    </div>
                )}

                {/* DUA TAB */}
                {activeTab === 'dua' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Power of Dua</h2>
                            <p className="text-slate-600 dark:text-slate-400">Supplications for every moment of your day</p>
                        </div>
                        <DuaLibrary data={data} onUpdate={updateData} />
                    </div>
                )}

                {/* SINCERITY TAB */}
                {activeTab === 'sincerity' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ikhlas (Sincerity)</h2>
                            <p className="text-slate-600 dark:text-slate-400">Purify your intentions for Allah alone</p>
                        </div>
                        <SincerityChecker data={data} onUpdate={updateData} />
                    </div>
                )}

            </div>
        </div>
    );
});

SpiritualGrowthPage.displayName = 'SpiritualGrowthPage';

export default SpiritualGrowthPage;
