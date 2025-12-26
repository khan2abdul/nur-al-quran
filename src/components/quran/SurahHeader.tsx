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
    <div className="flex flex-col items-center justify-center py-12 mb-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent mb-6" />
        <p className="font-arabic text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] leading-loose opacity-100 transition-opacity">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <p className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-[0.4em] mt-4">
            In the name of Allah, the Most Kind and Caring
        </p>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent mt-6" />
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
            <div className="rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center bg-slate-800 border-0 shadow-2xl relative overflow-hidden">
                {/* Radial Accent */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px] -ml-32 -mt-32 pointer-events-none" />

                <div className="relative z-10">
                    {/* Surah Number Badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold text-xl mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        {surah.id}
                    </div>

                    {/* Arabic Name */}
                    <h1 className="font-arabic text-4xl md:text-7xl text-white mb-4 leading-normal">
                        {surah.arabicName}
                    </h1>

                    {/* English Name */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                        {surah.name}
                    </h2>

                    {/* Meaning */}
                    <p className="text-cyan-400/60 font-medium tracking-wide uppercase text-xs md:text-sm mb-8">
                        {surah.englishMeaning}
                    </p>

                    {/* Bullet Context */}
                    {history?.contextBullets && (
                        <div className="flex flex-wrap justify-center gap-4 my-8">
                            {history.contextBullets.map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-colors">
                                    <span className="text-xl">{bullet.icon}</span>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold text-cyan-400 uppercase block tracking-widest mb-0.5">
                                            {bullet.label}
                                        </span>
                                        <span className="text-xs text-slate-300 font-medium">
                                            {bullet.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-6 text-[10px] md:text-xs mt-8 pt-8 border-t border-white/5 opacity-60">
                        <span className="text-white font-mono uppercase tracking-widest whitespace-nowrap">
                            {surah.totalVerses} Ayahs
                        </span>

                        <span className="hidden xs:inline text-white/20">•</span>

                        <span className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap ${surah.revelationType === 'makkah'
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'bg-cyan-400/10 text-cyan-400'
                            }`}>
                            {surah.revelationType === 'makkah' ? 'Makkah' : 'Madinah'}
                        </span>

                        <span className="hidden xs:inline text-white/20">•</span>

                        <span className="text-white font-mono uppercase tracking-widest whitespace-nowrap">
                            Order #{surah.revelationOrder}
                        </span>
                    </div>

                    {/* Background History */}
                    {history && (
                        <div className="mt-10 pt-10 border-t border-white/5 text-left max-w-3xl mx-auto">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl opacity-80">📜</span>
                                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em]">
                                    Background & Context
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
                                {history.history}
                            </p>
                            <p className="text-xs md:text-sm text-slate-500 italic leading-relaxed border-l-2 border-cyan-400/30 pl-4 py-1">
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
