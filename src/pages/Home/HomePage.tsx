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
import { useRecentSurahs } from '@/hooks/useRecentSurahs';
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
 * Recent Surah Card (Divine Wisdom Aesthetic)
 */
interface RecentSurahProps {
    readonly surah: Surah;
    readonly index: number;
}

const RecentSurah: React.FC<RecentSurahProps> = memo(({ surah, index }) => {
    return (
        <Link
            to={getSurahRoute(surah.id)}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.01] shadow-sm"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500" />

            <div className="relative p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-slate-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
                            {surah.id}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[8px] flex items-center justify-center font-bold text-cyan-400">
                            {index + 1}
                        </div>
                    </div>

                    <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors truncate">
                            {surah.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {surah.englishMeaning} • <span className="font-medium text-cyan-400/70">{surah.totalVerses} verses</span>
                        </p>
                    </div>
                </div>

                <div className="text-right flex-shrink-0">
                    <p className="font-arabic text-xl text-slate-900 dark:text-white mb-1 group-hover:scale-110 transition-transform">
                        {surah.arabicName}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${surah.revelationType === 'makkah'
                            ? 'bg-amber-400/10 text-amber-500 border border-amber-400/20'
                            : 'bg-emerald-400/10 text-emerald-500 border border-emerald-400/20'
                            }`}>
                            {surah.revelationType}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
});

RecentSurah.displayName = 'RecentSurah';

/**
 * Home Page Component
 */
export const HomePage: React.FC = memo(() => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const { recentIds } = useRecentSurahs();

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

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };

        loadSurahs();
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Premium Theme-Aware Hero Section */}
            <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden -mt-16 sm:-mt-20">
                {/* Layer 1: Atmospheric Background (Theme-Aware) */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                    <div className="absolute inset-0 bg-mesh opacity-10 dark:opacity-20" />
                    {/* Floating Luminous Blobs - Significant reduction in intensity */}
                    <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-soft" />
                    <div className="absolute bottom-[10%] right-[5%] w-[20rem] h-[20rem] bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-[100px] animate-pulse-soft animation-delay-300" />

                    {/* Interactive Cursor Glow - More subtle */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 transition-opacity duration-1000 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, ${mousePos.x > 0 ? 'rgba(34, 211, 238, 0.05)' : 'transparent'}, transparent 80%)`
                        }}
                    />
                </div>

                {/* Layer 2: Floating Particles (SVG) - Theme-Aware Colors */}
                <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10%" cy="20%" r="1" fill="currentColor" className="text-slate-400 dark:text-white animate-float" />
                        <circle cx="85%" cy="35%" r="1.5" fill="currentColor" className="text-slate-400 dark:text-white animate-float animation-delay-300" />
                        <circle cx="50%" cy="80%" r="1" fill="currentColor" className="text-slate-400 dark:text-white animate-float animation-delay-500" />
                        <circle cx="20%" cy="60%" r="2" fill="cyan" className="animate-float animation-delay-700" />
                        <circle cx="70%" cy="15%" r="1.5" fill="cyan" className="animate-float animation-delay-100" />
                    </svg>
                </div>

                {/* Layer 3: Main Content */}
                <div className="h-20 md:h-32" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-slate-200 dark:border-white/5 text-cyan-600 dark:text-cyan-400 text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.4em] font-bold mb-10 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/5 group cursor-default shadow-sm dark:shadow-none">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        Divine Guidance • {QURAN_CONFIG.TOTAL_SURAHS} Chapters
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 md:mb-10">
                        <span className="block text-slate-400 dark:text-slate-100/30 font-light italic mb-2 animate-slide-up">Discovery of</span>
                        <span className="block text-slate-900 dark:text-slate-100 dark:text-glow animate-slide-up animation-delay-100">
                            Nur <span className="text-cyan-500 dark:text-cyan-400">Al-Quran</span>
                        </span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-base sm:text-xl md:text-3xl max-w-2xl mx-auto leading-relaxed font-light mb-8 animate-slide-up animation-delay-200 balance">
                        Experience the <span className="text-slate-900 dark:text-slate-100 font-medium">Infinite Light</span> through beauty, clarity, and modern elegance.
                    </p>

                    {/* Theme-Aware Stats Glass-Card */}
                    <div className="inline-flex items-center gap-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-2 animate-slide-up animation-delay-300 shadow-md dark:shadow-none">
                        <div className="flex -space-x-3">
                            <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-slate-900 bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-xl">📖</div>
                            <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-slate-900 bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-xl">✨</div>
                            <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-slate-900 bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-xl">🌙</div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-6 ml-3 sm:ml-6">
                            <span className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-sm tracking-wide">
                                <b className="text-slate-900 dark:text-white">{QURAN_CONFIG.TOTAL_VERSES.toLocaleString()}</b> Precise Verses
                            </span>
                            <div className="w-1 h-6 bg-slate-200 dark:bg-white/5" />
                            <span className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-sm tracking-wide">
                                <b className="text-slate-900 dark:text-white">{QURAN_CONFIG.TOTAL_SURAHS}</b> Surahs
                            </span>
                            <div className="w-1 h-6 bg-slate-200 dark:bg-white/10" />
                            <button
                                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                className="w-10 h-10 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-500 transition-all flex items-center justify-center group"
                                title="Scroll to explore"
                            >
                                <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Spacer: Shift content block upwards in the flex center */}
                <div className="h-12 md:h-16" />

                {/* Enhanced Scroll Indicator */}
                <button
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer opacity-80 hover:opacity-100 transition-all duration-500"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 dark:text-white/50 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="relative flex flex-col items-center gap-1">
                        {/* Bouncing Arrow */}
                        <div className="animate-bounce">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        {/* Glowing Line */}
                        <div className="w-[2px] h-12 bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent rounded-full" />
                    </div>
                </button>
            </section>

            {/* Centered Content Sections */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-16 pb-24">
                {/* Premium Hub Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Main Action - Surahs - Expanded to full width */}
                    <Link
                        to={ROUTES.SURAHS}
                        className="md:col-span-12 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl"
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

                    {/* Featured Wisdom Card */}
                    <Link
                        to={ROUTES.WISDOM}
                        className="md:col-span-12 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-8 md:p-12 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-6xl group-hover:scale-110 transition-transform duration-500">✨</span>
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                                    Premium Resource
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                    Divine <span className="text-cyan-400">Wisdom Hub</span>
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                                    Explore the core of Islamic faith, character, and guidance. Embark on a journey to deepen your understanding of Islam.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>


                {/* Recent Surahs */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-lg">🕒</span>
                                Recent Surahs
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-11">Pick up where you left off</p>
                        </div>
                        <Link
                            to={ROUTES.SURAHS}
                            className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-all font-mono"
                        >
                            Library →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-slate-100 dark:border-white/5 animate-pulse h-[88px]" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 text-center border border-red-500/10">
                            <p className="text-red-600 dark:text-red-400 mb-4 font-medium">⚠️ {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 rounded-xl bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentIds.length > 0 ? (
                                surahs
                                    .filter(s => recentIds.includes(s.id))
                                    .sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id))
                                    .map((surah, index) => (
                                        <RecentSurah key={surah.id} surah={surah} index={index} />
                                    ))
                            ) : (
                                // Fallback to featured surahs if no recent history
                                surahs
                                    .filter(s => [1, 2, 36, 67].includes(s.id))
                                    .map((surah, index) => (
                                        <RecentSurah key={surah.id} surah={surah} index={index} />
                                    ))
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;
