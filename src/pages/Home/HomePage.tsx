/**
 * Home Page for Nur-Al-Quran
 * 
 * Landing page with quick access to continue reading,
 * daily verse, and navigation to Surahs/Juz.
 * 
 * @module pages/Home/HomePage
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, getSurahRoute } from '@/config/routes';
import { QURAN_CONFIG } from '@/config/appConfig';
import { fetchSurahs } from '@/services/quranApi';
import type { Surah } from '@/types';

/**
 * Quick Action Card Component
 */
interface QuickActionProps {
    readonly icon: React.ReactNode;
    readonly title: string;
    readonly description: string;
    readonly to: string;
    readonly color: 'emerald' | 'amber' | 'blue' | 'purple';
}

const QuickAction: React.FC<QuickActionProps> = memo(({
    icon, title, description, to, color
}) => {
    const colorClasses = {
        emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
        amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50',
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50',
    };

    return (
        <Link
            to={to}
            className={`block p-4 rounded-xl transition-all duration-200 ${colorClasses[color]}`}
        >
            <div className="flex items-center gap-3">
                <div className="text-2xl">{icon}</div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm opacity-80">{description}</p>
                </div>
            </div>
        </Link>
    );
});

QuickAction.displayName = 'QuickAction';

/**
 * Featured Surah Card
 */
interface FeaturedSurahProps {
    readonly surah: Surah;
}

const FeaturedSurah: React.FC<FeaturedSurahProps> = memo(({ surah }) => {
    return (
        <Link
            to={getSurahRoute(surah.id)}
            className="card p-4 hover:shadow-lg transition-all duration-200 group"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="verse-number">{surah.id}</div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {surah.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {surah.englishMeaning} • {surah.totalVerses} verses
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-arabic text-lg text-slate-900 dark:text-white">
                        {surah.arabicName}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${surah.revelationType === 'makkah'
                        ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                        }`}>
                        {surah.revelationType === 'makkah' ? 'Makkah' : 'Madinah'}
                    </span>
                </div>
            </div>
        </Link>
    );
});

FeaturedSurah.displayName = 'FeaturedSurah';

/**
 * Home Page Component
 */
export const HomePage: React.FC = memo(() => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    // Get featured surahs (Al-Fatihah, Al-Baqarah, Yasin, Al-Mulk)
    const featuredIds = [1, 2, 36, 67];
    const featuredSurahs = surahs.filter(s => featuredIds.includes(s.id));

    return (
        <div className="py-6 space-y-8">
            {/* Hero Section */}
            <section className="text-center py-8 md:py-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    The Quranic Experience
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Nur <span className="text-cyan-400">Al-Quran</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Bringing Divine Light to Everyone
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500 dark:text-slate-400">
                    <div>
                        <span className="font-bold text-slate-900 dark:text-white">{QURAN_CONFIG.TOTAL_SURAHS}</span> Surahs
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <div>
                        <span className="font-bold text-slate-900 dark:text-white">{QURAN_CONFIG.TOTAL_JUZ}</span> Juz
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <div>
                        <span className="font-bold text-slate-900 dark:text-white">{QURAN_CONFIG.TOTAL_VERSES.toLocaleString()}</span> Verses
                    </div>
                </div>
            </section>

            {/* Premium Hub Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Action - Surahs */}
                <Link
                    to={ROUTES.SURAHS}
                    className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 md:p-12 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-500">📖</span>
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Explore <span className="text-emerald-500">Surahs</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                            Browse all 114 chapters and immerse yourself in the divine message.
                        </p>
                    </div>
                </Link>

                {/* Vertical Secondary Actions */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <Link
                        to={ROUTES.BOOKMARKS}
                        className="flex-1 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-blue-400/30 transition-all duration-500 hover:scale-[1.02] shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-6 flex items-center gap-4 h-full">
                            <span className="text-4xl flex-shrink-0">🔖</span>
                            <div className="min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-0.5">Saved</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Your favorite verses</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to={ROUTES.SETTINGS}
                        className="flex-1 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02] shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-6 flex items-center gap-4 h-full">
                            <span className="text-4xl flex-shrink-0">⚙️</span>
                            <div className="min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-0.5">Settings</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">App preferences</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Featured Wisdom Card */}
                <Link
                    to={ROUTES.WISDOM}
                    className="md:col-span-12 group relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl mt-4"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                                Premium Resource
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Divine <span className="text-cyan-400">Wisdom Hub</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                                Explore the core of Islamic faith, character, and guidance. Embark on a journey to deepen your understanding of Islam.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-cyan-400/10 flex items-center justify-center text-6xl md:text-8xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                                ✨
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-slate-900 animate-pulse">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Featured Surahs */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Popular Surahs
                    </h2>
                    <Link
                        to={ROUTES.SURAHS}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        View all →
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="card p-4 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2" />
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="card p-6 text-center">
                        <p className="text-red-600 dark:text-red-400 mb-2">⚠️ {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {featuredSurahs.map(surah => (
                            <FeaturedSurah key={surah.id} surah={surah} />
                        ))}
                    </div>
                )}
            </section>

            {/* Bismillah */}
            <section className="text-center py-6">
                <p className="font-arabic text-2xl md:text-3xl text-slate-900 dark:text-white leading-loose">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    In the name of Allah, the Most Gracious, the Most Merciful
                </p>
            </section>
        </div>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;
