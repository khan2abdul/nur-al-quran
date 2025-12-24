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
            className="card p-4 hover:shadow-md transition-all duration-200 group"
        >
            <div className="flex items-center gap-3">
                <div className="verse-number flex-shrink-0">{surah.id}</div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {surah.name}
                        </h3>
                        <span className="font-arabic text-lg text-slate-700 dark:text-slate-300 flex-shrink-0">
                            {surah.arabicName}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {surah.englishMeaning}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {surah.totalVerses} verses
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${surah.revelationType === 'makkah'
                                ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                                : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                            }`}>
                            {surah.revelationType === 'makkah' ? 'Makkah' : 'Madinah'}
                        </span>
                    </div>
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
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${active
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
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
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    📖 Surahs
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Browse all 114 chapters of the Holy Quran
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search by name, meaning, or number..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
                <div className="space-y-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="card p-4 animate-pulse">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-48" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredSurahs.length === 0 ? (
                <div className="card p-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                        No surahs found matching "{searchQuery}"
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
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
