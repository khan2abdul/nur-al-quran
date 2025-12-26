/**
 * Surah List Page for Nur-Al-Quran
 * 
 * Displays all 114 Surahs with search and filter functionality.
 * 
 * @module pages/SurahList/SurahListPage
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getSurahRoute } from '@/config/routes';
import { fetchSurahs } from '@/services/quranApi';
import type { Surah, RevelationType } from '@/types';

/**
 * Surah Card Component
 */
interface SurahCardProps {
    readonly surah: Surah;
}

const SurahCard: React.FC<SurahCardProps> = memo(({ surah }) => {
    return (
        <Link
            to={getSurahRoute(surah.id)}
            className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] shadow-xl h-full flex flex-col justify-center"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-5 md:p-6 flex items-center gap-4 md:gap-5">
                {/* Surah ID Badge */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex flex-shrink-0 items-center justify-center text-slate-400 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all font-bold text-lg md:text-xl shadow-inner relative z-10">
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
}

const FilterChip: React.FC<FilterChipProps> = memo(({ label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-2xl text-sm font-bold transition-all border whitespace-nowrap ${active
                ? 'bg-emerald-400 border-emerald-400 text-slate-900 shadow-lg shadow-emerald-400/20'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-emerald-400/30'
                }`}
        >
            {label}
        </button>
    );
});

FilterChip.displayName = 'FilterChip';

/**
 * Surah List Page Component
 */
export const SurahListPage: React.FC = memo(() => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | RevelationType>('all');

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

    // Filter and search surahs
    const filteredSurahs = useMemo(() => {
        return surahs.filter(surah => {
            // Filter by revelation type
            if (filter !== 'all' && surah.revelationType !== filter) {
                return false;
            }

            // Search query
            if (searchQuery) {
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
    }, [surahs, filter, searchQuery]);

    const handleFilterChange = useCallback((newFilter: 'all' | RevelationType) => {
        setFilter(newFilter);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
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
        <div className="py-6 space-y-6">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    The Quranic Revelation
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                    Holy <span className="text-emerald-400">Surahs</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Browse all 114 chapters of the final revelation.
                </p>
            </div>

            {/* Search */}
            <div className="relative group max-w-2xl mx-auto md:mx-0">
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search by name, meaning, or number..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-5 py-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800/80 backdrop-blur-xl text-slate-900 dark:text-white placeholder:text-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all shadow-xl"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <FilterChip
                    label="All"
                    active={filter === 'all'}
                    onClick={() => handleFilterChange('all')}
                />
                <FilterChip
                    label="🕋 Makkah"
                    active={filter === 'makkah'}
                    onClick={() => handleFilterChange('makkah')}
                />
                <FilterChip
                    label="🕌 Madinah"
                    active={filter === 'madinah'}
                    onClick={() => handleFilterChange('madinah')}
                />
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {filteredSurahs.length} of {surahs.length} surahs
            </p>

            {/* Surah List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="h-28 rounded-[2rem] bg-white dark:bg-slate-800/50 animate-pulse border border-slate-100 dark:border-white/5" />
                    ))}
                </div>
            ) : filteredSurahs.length === 0 ? (
                <div className="rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 p-16 text-center shadow-xl">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        🔍
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        We couldn't find any surahs matching <span className="text-emerald-400 font-bold">"{searchQuery}"</span>. Try searching by ID or meaning.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSurahs.map(surah => (
                        <SurahCard key={surah.id} surah={surah} />
                    ))}
                </div>
            )}
        </div>
    );
});

SurahListPage.displayName = 'SurahListPage';

export default SurahListPage;
