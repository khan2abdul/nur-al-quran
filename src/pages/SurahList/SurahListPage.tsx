/**
 * Surah List Page for Nur-Al-Quran
 * 
 * Displays all 114 Surahs with search and filter functionality.
 * 
 * @module pages/SurahList/SurahListPage
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getSurahRoute, ROUTES } from '@/config/routes';
import { fetchSurahs } from '@/services/quranApi';
import { useReadSurahs } from '@/hooks/useReadSurahs';
import { smartSearchSurahs, type SmartSearchResult } from '@/services/geminiService';
import { searchVersesByKeywords } from '@/services/verseSearchService';
import type { Surah, RevelationType } from '@/types';

/**
 * Surah Card Component
 */
interface SurahCardProps {
    readonly surah: Surah;
    readonly isRead?: boolean;
    readonly matchReason?: string;
}

const SurahCard: React.FC<SurahCardProps> = memo(({ surah, isRead = false, matchReason }) => {
    return (
        <Link
            to={getSurahRoute(surah.id)}
            className={`group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800/50 border transition-all duration-500 hover:scale-[1.01] shadow-xl h-full flex flex-col justify-center ${isRead
                ? 'border-emerald-400/50 ring-2 ring-emerald-400/20'
                : 'border-slate-200 dark:border-white/5 hover:border-emerald-400/30'
                }`}
        >
            {/* Read Badge */}
            {isRead && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900 shadow-lg z-20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </div>
            )}

            {/* Decorative Background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 transition-opacity duration-500 ${isRead ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`} />

            <div className="relative p-5 md:p-6 flex items-center gap-4 md:gap-5">
                {/* Surah ID Badge */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex flex-shrink-0 items-center justify-center transition-all font-bold text-lg md:text-xl shadow-inner relative z-10 ${isRead
                    ? 'bg-emerald-400 text-slate-900'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-emerald-400 group-hover:text-slate-900'
                    }`}>
                    <span className="relative top-[1px]">{surah.id}</span>
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate transition-colors group-hover:text-emerald-500 leading-tight">
                            {surah.name}
                        </h3>
                        <span className="font-arabic text-xl md:text-2xl text-slate-700 dark:text-slate-300 flex-shrink-0 leading-none">
                            {surah.arabicName}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate max-w-[120px] sm:max-w-none">
                            {surah.englishMeaning}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                {surah.totalVerses} verses
                            </span>
                            <div className={`flex items-center gap-1 text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap ${surah.revelationType === 'makkah'
                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
                                : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                                }`}>
                                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                {surah.revelationType === 'makkah' ? 'Makkah' : 'Madinah'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Arrow Decor */}
                <div className="hidden lg:flex w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 items-center justify-center text-slate-300 group-hover:text-emerald-400 transition-all flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Smart Match Reason */}
            {matchReason && (
                <div className="px-5 pb-4 -mt-2">
                    <div className="bg-emerald-400/5 dark:bg-emerald-400/10 rounded-xl p-3 border border-emerald-400/10">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            Smart Match
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight italic">
                            "{matchReason}"
                        </p>
                    </div>
                </div>
            )}
        </Link>
    );
});

SurahCard.displayName = 'SurahCard';

/**
 * Filter Chip Component
 */
interface FilterChipProps {
    readonly label: string;
    readonly active: boolean;
    readonly onClick: () => void;
    readonly icon?: React.ReactNode;
}

const FilterChip: React.FC<FilterChipProps> = memo(({ label, active, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-2xl text-sm font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${active
                ? 'bg-emerald-400 border-emerald-400 text-slate-900 shadow-lg shadow-emerald-400/20'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-emerald-400/30'
                }`}
        >
            {icon}
            {label}
        </button>
    );
});

FilterChip.displayName = 'FilterChip';

/**
 * Custom Style For Animations
 */
const SearchStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
    `}} />
);

/**
 * Emotion Chip Component
 */
interface EmotionChipProps {
    readonly id: string;
    readonly label: string;
    readonly icon: string;
    readonly isSelected: boolean;
    readonly onClick: (id: string) => void;
}

const EmotionChip: React.FC<EmotionChipProps> = memo(({ id, label, icon, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            aria-label={`Filter by ${label}`}
            aria-pressed={isSelected}
            className={`px-4 py-2 rounded-xl border transition-all duration-200 flex items-center gap-2 group shadow-sm whitespace-nowrap ${isSelected
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-400/10 font-medium'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/5 hover:bg-emerald-50 dark:hover:bg-white/10 hover:shadow-md hover:border-emerald-400/30 text-slate-600 dark:text-slate-300'
                }`}
        >
            <span className="text-sm">{icon}</span>
            <span className={`uppercase text-[10px] font-bold tracking-wider transition-colors ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'group-hover:text-emerald-400'
                }`}>
                {label}
            </span>
            {isSelected && (
                <span className="ml-1 text-emerald-500 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            )}
        </button>
    );
});

EmotionChip.displayName = 'EmotionChip';

type FilterType = 'all' | RevelationType | 'read' | 'unread';

/**
 * Topic/Emotion chips data - defined outside component for stable reference
 */
const TOPICS_ARR = [
    { id: 'sad', label: 'Feeling Sad', icon: '😔' },
    { id: 'happy', label: 'Gratitude', icon: '✨' },
    { id: 'namaz', label: 'Prayer/Salah', icon: '🧎' },
    { id: 'dua', label: 'Supplication', icon: '🤲' },
    { id: 'donation', label: 'Charity/Zakat', icon: '💰' },
    { id: 'divorce', label: 'Family/Life', icon: '🏠' },
] as const;

/**
 * Toast Component
 */
const SearchToast: React.FC<{ message: string; onDismiss: () => void }> = memo(({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 2000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed top-20 right-6 z-[100] animate-fade-in">
            <div className="bg-emerald-500 text-white rounded-xl shadow-2xl px-5 py-3 flex items-center gap-3">
                <span className="text-lg">✨</span>
                <span className="font-bold text-sm tracking-tight">{message}</span>
            </div>
        </div>
    );
});

SearchToast.displayName = 'SearchToast';

/**
 * Search Suggestion Component
 */
interface TypeaheadProps {
    readonly items: string[];
    readonly onSelect: (val: string) => void;
    readonly activeIndex: number;
}

const TypeaheadDropdown: React.FC<TypeaheadProps> = memo(({ items, onSelect, activeIndex }) => {
    if (items.length === 0) return null;

    return (
        <div
            className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 animate-fade-in"
            role="listbox"
            aria-label="Search suggestions"
        >
            {items.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(item)}
                    className={`w-full px-5 py-3 text-left text-sm transition-colors border-b last:border-0 border-slate-100 dark:border-white/5 flex items-center gap-3 ${activeIndex === idx
                        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                    role="option"
                    aria-selected={activeIndex === idx}
                >
                    <span className="opacity-40 select-none">🔍</span>
                    <span className="font-medium">{item}</span>
                </button>
            ))}
        </div>
    );
});

TypeaheadDropdown.displayName = 'TypeaheadDropdown';

/**
 * Journey Progress Card Component - Expanded Width Design
 */
const JourneyCard: React.FC<{ completed: number; total: number }> = memo(({ completed, total }) => {
    const percentage = Math.round((completed / total) * 100);
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl px-6 py-4 border border-slate-200 dark:border-white/5 shadow-lg flex items-center justify-between gap-6 w-full">
            {/* Left - Progress Ring */}
            <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-emerald-100 dark:text-emerald-900/30" />
                    <circle cx="30" cy="30" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} className="text-emerald-400 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                {/* Quran Book Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 6h7v12H4V6zm16 12h-7V6h7v12z" />
                    </svg>
                </div>
            </div>

            {/* Center - Empty space for expansion */}
            <div className="flex-1" />

            {/* Right - Text Content */}
            <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">My Journey</span>
                </div>
                <p className="text-2xl font-bold text-emerald-500">{percentage}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{completed} of {total} Surahs read</p>
            </div>
        </div>
    );
});

JourneyCard.displayName = 'JourneyCard';

/**
 * Surah List Page Component
 */
export const SurahListPage: React.FC = memo(() => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [isSmartSearch, setIsSmartSearch] = useState(false);
    const [smartResults, setSmartResults] = useState<SmartSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const suggestions = useMemo(() => [
        "Feeling anxious about future",
        "Verses about patience",
        "Guidance for hardship",
        "I'm heartbroken",
        "Verses about anger",
        "Focus and mindfulness"
    ], []);

    const filteredSuggestions = useMemo(() => {
        if (searchQuery.length < 2) return [];
        return suggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);
    }, [searchQuery, suggestions]);

    // Use stable TOPICS_ARR constant defined outside component

    const { isRead, readCount } = useReadSurahs();

    useEffect(() => {
        const loadSurahs = async () => {
            try {
                setLoading(true);
                const data = await fetchSurahs();
                setSurahs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load surahs');
            } finally {
                setLoading(false);
            }
        };

        loadSurahs();
    }, []);

    // Handle Hybrid Smart Search
    const handleSmartSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSmartResults([]);
            return;
        }

        try {
            setIsSearching(true);

            // 1. Start both searches in parallel
            const [aiResults, dbResults] = await Promise.all([
                smartSearchSurahs(query),
                searchVersesByKeywords(query)
            ]);

            // 2. Process and merge results
            // Convert DB matches to the SmartSearchResult format
            const dbMapped: SmartSearchResult[] = dbResults.map(match => ({
                surahId: match.surahId,
                reason: `Contains matching verses: ${match.verseNumbers.slice(0, 3).join(', ')}${match.verseNumbers.length > 3 ? '...' : ''}`,
                verseRef: match.verseNumbers.join(',')
            }));

            // 3. Merge: Prioritize AI results but add DB results if they aren't already there
            const merged = [...aiResults];
            const seenIds = new Set(merged.map(r => r.surahId));

            dbMapped.forEach(res => {
                if (!seenIds.has(res.surahId)) {
                    merged.push(res);
                }
            });

            console.log(`🔍 Search Results: AI(${aiResults.length}), DB(${dbResults.length}), Merged(${merged.length})`);
            setSmartResults(merged);
        } catch (err) {
            console.error('Hybrid search failed:', err);
            // Fallback: If everything fails, at least try a direct Surah metadata search
            setSmartResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounced search for smart search (handles both input and chips)
    useEffect(() => {
        const query = searchQuery || (selectedTopics.length > 0
            ? selectedTopics.map(id => TOPICS_ARR.find(t => t.id === id)?.label).join(' + ')
            : '');

        if (isSmartSearch && query) {
            const timer = setTimeout(() => {
                handleSmartSearch(query);
            }, 800);
            return () => clearTimeout(timer);
        } else if (!query) {
            setSmartResults([]);
        }
    }, [searchQuery, selectedTopics, isSmartSearch, handleSmartSearch]);

    // Filter and search surahs
    const filteredSurahs = useMemo(() => {
        // If smart search is active and we have results, show only those
        if (isSmartSearch && smartResults.length > 0) {
            const surahIds = smartResults.map(r => r.surahId);
            return surahs
                .filter(s => surahIds.includes(s.id))
                .sort((a, b) => surahIds.indexOf(a.id) - surahIds.indexOf(b.id));
        }

        return surahs.filter(surah => {
            // Filter by revelation type
            if (filter === 'makkah' && surah.revelationType !== 'makkah') return false;
            if (filter === 'madinah' && surah.revelationType !== 'madinah') return false;

            // Filter by read status
            if (filter === 'read' && !isRead(surah.id)) return false;
            if (filter === 'unread' && isRead(surah.id)) return false;

            // Search query
            if (searchQuery && !isSmartSearch) {
                const query = searchQuery.toLowerCase();
                return (
                    surah.name.toLowerCase().includes(query) ||
                    surah.arabicName.includes(searchQuery) ||
                    surah.englishMeaning.toLowerCase().includes(query) ||
                    surah.id.toString() === query
                );
            }

            return true;
        });
    }, [surahs, filter, searchQuery, isRead, isSmartSearch, smartResults]);

    const handleFilterChange = useCallback((newFilter: FilterType) => {
        setFilter(newFilter);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
        setSuggestionIndex(-1);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (filteredSuggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSuggestionIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSuggestionIndex(prev => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
        } else if (e.key === 'Enter' && suggestionIndex >= 0) {
            e.preventDefault();
            const selected = filteredSuggestions[suggestionIndex];
            setSearchQuery(selected);
            setShowSuggestions(false);
            if (isSmartSearch) handleSmartSearch(selected);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    }, [filteredSuggestions, suggestionIndex, isSmartSearch, handleSmartSearch]);

    const toggleTopic = useCallback((topicId: string) => {
        setIsSmartSearch(true);
        setSelectedTopics(prev => {
            if (prev.includes(topicId)) {
                return prev.filter(id => id !== topicId);
            }
            return [...prev, topicId];
        });
        setSearchQuery(''); // Clear input when using chips
    }, []);

    const clearAllFilters = useCallback(() => {
        setSelectedTopics([]);
        setSearchQuery('');
        setSmartResults([]);
    }, []);

    const toggleSmartSearch = useCallback(() => {
        setIsSmartSearch(prev => {
            const next = !prev;
            setToast(next
                ? "Smart On: Now searching by emotions and feelings"
                : "Smart Off: Now searching by exact keywords only"
            );
            return next;
        });
    }, []);

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">⚠️ {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="py-6 space-y-5 animate-fade-in">
            <SearchStyles />

            {/* Main Content Container - Full Width */}
            <div className="max-w-7xl mx-auto space-y-6 w-full">
                {/* Header - Title Only */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        The Quranic Revelation
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Holy <span className="text-emerald-400">Surahs</span>
                    </h1>
                </div>

                {/* Search Section - Full Width */}
                <div className="w-full space-y-4">
                    <div className="space-y-3 w-full">
                        {toast && <SearchToast message={toast || ""} onDismiss={() => setToast(null)} />}

                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative">
                                <input
                                    type="search"
                                    aria-label="Search verses by emotion or keyword"
                                    placeholder={isSmartSearch ? "Describe how you feel or what you're looking for..." : "Search by name, playing..."}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setShowSuggestions(true)}
                                    className="w-full px-5 py-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800/80 backdrop-blur-xl text-slate-900 dark:text-white placeholder:text-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg focus:shadow-emerald-100 dark:focus:shadow-none transition-all shadow-xl"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {isSearching ? (
                                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <svg
                                            className={`w-5 h-5 ${isSmartSearch ? 'text-emerald-400 animate-pulse' : 'text-slate-400'} transition-colors`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )}
                                </div>

                                <button
                                    onClick={toggleSmartSearch}
                                    aria-label="Toggle smart search mode"
                                    aria-pressed={isSmartSearch}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${isSmartSearch
                                        ? 'bg-emerald-400 border-emerald-400 text-slate-900 shadow-lg shadow-emerald-400/20'
                                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-emerald-400/30'
                                        }`}
                                >
                                    {isSmartSearch ? '✨ Smart On' : 'Smart Search'}
                                </button>

                                {showSuggestions && (
                                    <TypeaheadDropdown
                                        items={filteredSuggestions}
                                        activeIndex={suggestionIndex}
                                        onSelect={(val) => {
                                            setSearchQuery(val);
                                            setShowSuggestions(false);
                                            if (isSmartSearch) handleSmartSearch(val);
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Helper Texts */}
                        <div className="px-2 min-h-[1.5rem]">
                            {!searchQuery && (
                                <p className="text-xs text-slate-400 italic animate-fade-in">
                                    Try: <span className="text-emerald-400/80">"I'm heartbroken"</span>, <span className="text-emerald-400/80">"verses about anger"</span>, or <span className="text-emerald-400/80">"guidance on divorce"</span>
                                </p>
                            )}
                            {isSmartSearch && (
                                <p className="text-xs text-slate-500 mt-1 transition-opacity duration-300 animate-fade-in">
                                    Smart On: understands emotions like <span className="text-emerald-500 font-medium">'sad'</span>, <span className="text-emerald-500 font-medium">'angry'</span>, <span className="text-emerald-500 font-medium">'lonely'</span> and finds matching verses
                                </p>
                            )}
                            {isSearching && (
                                <p className="text-xs text-emerald-600 animate-pulse mt-1">
                                    Understanding your query...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Topic/Emotion Chips - Wrapped to show all */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mr-2 whitespace-nowrap">Explore Topics:</span>
                        {TOPICS_ARR.map(topic => (
                            <EmotionChip
                                key={topic.id}
                                id={topic.id}
                                label={topic.label}
                                icon={topic.icon}
                                isSelected={selectedTopics.includes(topic.id)}
                                onClick={toggleTopic}
                            />
                        ))}
                    </div>

                    {/* Active Filters */}
                    {selectedTopics.length > 0 && (
                        <div className="flex items-center justify-between pb-2 animate-fade-in">
                            <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-400 font-medium">
                                <span className="opacity-60">Showing verses for:</span>
                                <div className="flex items-center gap-1 flex-wrap">
                                    {selectedTopics.map((id, idx) => (
                                        <React.Fragment key={id}>
                                            <span className="bg-emerald-100 dark:bg-emerald-400/20 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-400/20 shadow-sm">
                                                {TOPICS_ARR.find(t => t.id === id)?.label}
                                            </span>
                                            {idx < selectedTopics.length - 1 && <span className="mx-0.5 opacity-40">+</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={clearAllFilters}
                                aria-label="Clear all filters"
                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5 px-2 py-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Filters - Wrapped to show all */}
                    <div className="flex flex-wrap items-center gap-2">
                        <FilterChip
                            label="All"
                            active={filter === 'all'}
                            onClick={() => handleFilterChange('all')}
                        />
                        <FilterChip
                            label="Makkah"
                            icon={<span>🕋</span>}
                            active={filter === 'makkah'}
                            onClick={() => handleFilterChange('makkah')}
                        />
                        <FilterChip
                            label="Madinah"
                            icon={<span>🕌</span>}
                            active={filter === 'madinah'}
                            onClick={() => handleFilterChange('madinah')}
                        />
                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1" />
                        <FilterChip
                            label="Read"
                            icon={<span>✅</span>}
                            active={filter === 'read'}
                            onClick={() => handleFilterChange('read')}
                        />
                        <FilterChip
                            label="Unread"
                            icon={<span>📖</span>}
                            active={filter === 'unread'}
                            onClick={() => handleFilterChange('unread')}
                        />
                    </div>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {filteredSurahs.length} of {surahs.length} surahs
            </p>

            {/* Surah List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 space-y-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-2/3 bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
                                    <div className="h-3 w-1/2 bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
                                </div>
                            </div>
                            <div className="h-12 w-full bg-slate-50 dark:bg-white/5 animate-pulse rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : filteredSurahs.length === 0 ? (
                <div className="rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 p-12 md:p-16 text-center shadow-xl animate-fade-in">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                        🌱
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No verses found for this feeling</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
                        {filter === 'read' ? "You haven't marked any surahs as read yet." :
                            filter === 'unread' ? "You've read all surahs! Masha'Allah!" :
                                <>We couldn't find matches for <span className="text-emerald-400 font-bold">"{searchQuery}"</span>. Try another spiritual query:</>}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {["Verses about patience", "Focus in prayer", "Facing hardship"].map(q => (
                            <button
                                key={q}
                                onClick={() => {
                                    setSearchQuery(q);
                                    if (isSmartSearch) handleSmartSearch(q);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-400/50 hover:text-emerald-500 transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={clearAllFilters}
                        className="btn-primary flex items-center gap-2 mx-auto"
                    >
                        Browse all topics
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSurahs.map(surah => {
                        const smartMatch = isSmartSearch ? smartResults.find(r => r.surahId === surah.id) : null;
                        return (
                            <SurahCard
                                key={surah.id}
                                surah={surah}
                                isRead={isRead(surah.id)}
                                matchReason={smartMatch?.reason}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
});

SurahListPage.displayName = 'SurahListPage';

export default SurahListPage;
