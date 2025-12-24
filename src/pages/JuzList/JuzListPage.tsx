/**
 * Juz List Page
 * 
 * Displays a grid of all 30 Juz (parts) of the Quran,
 * with information about their starting and ending verses.
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJuzList } from '@/services/quranApi';
import type { Juz } from '@/types';
import { ROUTES } from '@/config/routes';
import { toArabicNumerals } from '@/utils/helpers';

const JuzCard: React.FC<{ juz: Juz }> = memo(({ juz }) => (
    <Link
        to={`/surah/${juz.start.surahId}`}
        state={{ startingVerse: juz.start.verseNumber }}
        className="block group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg shadow-sm"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    {juz.id}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        Juz {juz.id}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Part {juz.id}
                    </p>
                </div>
            </div>
            <span className="font-arabic text-2xl text-slate-400 dark:text-slate-600 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {toArabicNumerals(juz.id)}
            </span>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        Starts
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                        Surah {juz.start.surahId}, Verse {juz.start.verseNumber}
                    </span>
                </div>
                <div className="text-right">
                    <span className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        Ends
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                        Surah {juz.end.surahId}, Verse {juz.end.verseNumber}
                    </span>
                </div>
            </div>
        </div>
    </Link>
));

JuzCard.displayName = 'JuzCard';

export const JuzListPage: React.FC = memo(() => {
    const [juzs, setJuzs] = useState<Juz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadJuzs = async () => {
            try {
                setLoading(true);
                const data = await fetchJuzList();
                setJuzs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load Juz list');
            } finally {
                setLoading(false);
            }
        };

        loadJuzs();
    }, []);

    if (error) {
        return (
            <div className="py-12 text-center">
                <span className="text-5xl mb-4 block">⚠️</span>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Failed to Load Juz List
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-light dark:bg-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Juz Index
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Browse the Quran by its 30 parts (Juz)
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 h-48 animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                    <div className="space-y-2">
                                        <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                                    </div>
                                </div>
                                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {juzs.map((juz) => (
                            <JuzCard key={juz.id} juz={juz} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

JuzListPage.displayName = 'JuzListPage';

export default JuzListPage;
