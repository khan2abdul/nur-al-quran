/**
 * Surah Header Component for Nur-Al-Quran
 * 
 * Displays Surah information including name, meaning,
 * verse count, and revelation type.
 * 
 * @module components/quran/SurahHeader
 */

import React, { memo } from 'react';
import type { Surah } from '@/types';

interface SurahHeaderProps {
    /** Surah data */
    readonly surah: Surah;

    /** Background history */
    readonly history?: {
        readonly history: string;
        readonly historyEn: string;
        readonly contextBullets?: readonly {
            readonly icon: string;
            readonly label: string;
            readonly text: string;
        }[];
    };
}

/**
 * Bismillah Component
 */
const Bismillah: React.FC = memo(() => (
    <div className="flex flex-col items-center justify-center py-12 mb-10 transition-colors">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent mb-6" />
        <p className="font-arabic text-3xl md:text-5xl text-slate-900 dark:text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] leading-loose opacity-100 transition-all">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400/50 uppercase tracking-[0.4em] mt-4 font-bold">
            In the name of Allah, the Most Kind and Caring
        </p>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent mt-6" />
    </div>
));

Bismillah.displayName = 'Bismillah';

/**
 * Surah Header Component
 */
export const SurahHeader: React.FC<SurahHeaderProps> = memo(({ surah, history }) => {
    return (
        <div className="mb-12">
            {/* Main Header Card */}
            <div className="rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 text-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden transition-colors duration-300">
                {/* Radial Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-[100px] -ml-32 -mt-32 pointer-events-none" />

                <div className="relative z-10">
                    {/* Surah Number Badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-6 shadow-inner">
                        {surah.id}
                    </div>

                    {/* Arabic Name */}
                    <h1 className="font-arabic text-4xl md:text-7xl text-slate-900 dark:text-white mb-4 leading-normal">
                        {surah.arabicName}
                    </h1>

                    {/* English Name */}
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        {surah.name}
                    </h2>

                    {/* Meaning */}
                    <p className="text-emerald-500 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-8 opacity-80">
                        {surah.englishMeaning}
                    </p>

                    {/* Bullet Context */}
                    {history?.contextBullets && (
                        <div className="flex flex-wrap justify-center gap-4 my-8">
                            {history.contextBullets.map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-400/30 transition-all">
                                    <span className="text-xl">{bullet.icon}</span>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block tracking-widest mb-0.5">
                                            {bullet.label}
                                        </span>
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                            {bullet.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-6 text-[10px] md:text-xs mt-8 pt-8 border-t border-slate-200 dark:border-white/5">
                        <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
                            {surah.totalVerses} Ayahs
                        </span>

                        <span className="hidden xs:inline text-slate-300 dark:text-white/20">•</span>

                        <span className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap ${surah.revelationType === 'makkah'
                            ? 'bg-amber-100 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-400/20'
                            : 'bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-400/20'
                            }`}>
                            {surah.revelationType === 'makkah' ? 'Makkah' : 'Madinah'}
                        </span>

                        <span className="hidden xs:inline text-slate-300 dark:text-white/20">•</span>

                        <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
                            Order #{surah.revelationOrder}
                        </span>
                    </div>

                    {/* Background History */}
                    {history && (
                        <div className="mt-10 pt-10 border-t border-slate-200 dark:border-white/5 text-left max-w-3xl mx-auto">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl opacity-80">📜</span>
                                <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">
                                    Background & Context
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                                {history.history}
                            </p>
                            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 italic leading-relaxed border-l-4 border-emerald-400/30 pl-4 py-1">
                                {history.historyEn}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bismillah (except for Surah At-Tawbah which is #9) */}
            {surah.id !== 9 && <Bismillah />}
        </div>
    );
});

SurahHeader.displayName = 'SurahHeader';

export default SurahHeader;
