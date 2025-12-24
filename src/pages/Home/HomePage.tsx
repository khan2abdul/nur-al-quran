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
            <section className="text-center py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                    <span className="text-4xl md:text-5xl">🌙</span>
                    <br />
                    Nur Al-Quran
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
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

            {/* Quick Actions */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Quick Access
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    <QuickAction
                        icon="📖"
                        title="All Surahs"
                        description={`Browse ${QURAN_CONFIG.TOTAL_SURAHS} chapters`}
                        to={ROUTES.SURAHS}
                        color="emerald"
                    />
                    <QuickAction
                        icon="📚"
                        title="By Juz"
                        description={`${QURAN_CONFIG.TOTAL_JUZ} parts`}
                        to={ROUTES.JUZ}
                        color="amber"
                    />
                    <QuickAction
                        icon="🔖"
                        title="Bookmarks"
                        description="Your saved verses"
                        to={ROUTES.BOOKMARKS}
                        color="blue"
                    />
                    <QuickAction
                        icon="⚙️"
                        title="Settings"
                        description="Theme & language"
                        to={ROUTES.SETTINGS}
                        color="purple"
                    />
                </div>
            </section>

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
