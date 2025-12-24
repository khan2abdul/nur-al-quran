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
    <div className="text-center py-6">
        <p className="font-arabic text-2xl md:text-3xl text-slate-800 dark:text-slate-200 leading-loose">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            In the name of Allah, the Most Kind and Caring
        </p>
    </div>
));

Bismillah.displayName = 'Bismillah';

/**
 * Surah Header Component
 */
export const SurahHeader: React.FC<SurahHeaderProps> = memo(({ surah, history }) => {
    return (
        <div className="mb-6">
            {/* Main Header Card */}
            <div className="card p-6 text-center bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-900/20 dark:to-emerald-900/20 border-primary-100 dark:border-primary-800">
                {/* Surah Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold text-lg mb-4">
                    {surah.id}
                </div>

                {/* Arabic Name */}
                <h1 className="font-arabic text-4xl md:text-5xl text-slate-900 dark:text-white mb-2">
                    {surah.arabicName}
                </h1>

                {/* English Name */}
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {surah.name}
                </h2>

                {/* Meaning */}
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {surah.englishMeaning}
                </p>

                {/* Bullet Context (New) */}
                {history?.contextBullets && (
                    <div className="flex flex-wrap justify-center gap-3 my-4">
                        {history.contextBullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-primary-100 dark:border-primary-900/50">
                                <span className="text-base">{bullet.icon}</span>
                                <div className="text-left">
                                    <span className="text-[10px] font-bold text-primary-700 dark:text-primary-400 uppercase block leading-none mb-0.5">
                                        {bullet.label}
                                    </span>
                                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                                        {bullet.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-center gap-4 text-sm mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    {/* Verse Count */}
                    <span className="text-slate-500 dark:text-slate-400">
                        {surah.totalVerses} verses
                    </span>

                    <span className="text-slate-300 dark:text-slate-600">•</span>

                    {/* Revelation Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${surah.revelationType === 'makkah'
                        ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                        }`}>
                        {surah.revelationType === 'makkah' ? '🕋 Makkah' : '🕌 Madinah'}
                    </span>

                    <span className="text-slate-300 dark:text-slate-600">•</span>

                    {/* Revelation Order */}
                    <span className="text-slate-500 dark:text-slate-400">
                        Revealed #{surah.revelationOrder}
                    </span>
                </div>
                {/* Background History */}
                {history && (
                    <div className="mt-6 pt-6 border-t border-primary-200/50 dark:border-primary-700/50 text-left max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📜</span>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                Background & Context
                            </h3>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            {history.history}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed border-l-2 border-slate-300 dark:border-slate-600 pl-3">
                            {history.historyEn}
                        </p>
                    </div>
                )}
            </div>

            {/* Bismillah (except for Surah At-Tawbah which is #9) */}
            {surah.id !== 9 && <Bismillah />}
        </div>
    );
});

SurahHeader.displayName = 'SurahHeader';

export default SurahHeader;
