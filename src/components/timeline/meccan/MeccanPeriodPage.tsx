
import React, { memo, useState } from 'react';
import { MECCAN_TIMELINE } from '@/data/meccanPeriodData';

const MeccanPeriodPage: React.FC = memo(() => {
    const [expandedYear, setExpandedYear] = useState<string | null>(MECCAN_TIMELINE[0].year);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-bold mb-4 uppercase tracking-widest border border-amber-500/30">
                    The Seerah • Part 1
                </div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300 mb-6">
                    The Meccan Period
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    52 Years of Patience, Revelation, and the Birth of a New Era. From the Year of the Elephant to the Hijra.
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Timeline Navigation (Sticky Sidebar) */}
                <div className="md:col-span-3">
                    <div className="sticky top-24 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {MECCAN_TIMELINE.map((event) => (
                            <button
                                key={event.year}
                                onClick={() => setExpandedYear(event.year)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-between group ${expandedYear === event.year
                                    ? 'bg-teal-600 text-white shadow-teal-500/30 shadow-lg scale-105'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                <span>{event.year}</span>
                                <span className={`text-xs opacity-70 font-normal ${expandedYear === event.year ? 'text-teal-100' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                    {event.ceYear}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9 space-y-6">
                    {MECCAN_TIMELINE.map((event) => (
                        <div
                            key={event.year}
                            className={`transform transition-all duration-500 ease-in-out ${expandedYear === event.year ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'
                                }`}
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                                {/* Decorative Background Icon */}
                                <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl select-none pointer-events-none filter grayscale">
                                    {event.type === 'revelation' ? '📜' : event.type === 'persecution' ? '🔥' : event.type === 'migration' ? '🐪' : event.type === 'milestone' ? '🚩' : '👶'}
                                </div>

                                {/* Header */}
                                <div className="relative z-10 mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.type === 'revelation' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                event.type === 'persecution' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    event.type === 'migration' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {event.type}
                                        </span>
                                        {event.location && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                📍 {event.location}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
                                        {event.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                    {/* Key Details */}
                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span>📝</span> Key Events
                                        </h4>
                                        <ul className="space-y-3">
                                            {event.details?.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Context & Metadata */}
                                    <div className="space-y-6">
                                        {event.quranRef && (
                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30">
                                                <h4 className="font-bold text-indigo-800 dark:text-indigo-400 mb-2 flex items-center gap-2 text-sm">
                                                    <span>📖</span> Quranic Reference
                                                </h4>
                                                <p className="text-slate-700 dark:text-slate-300 font-serif italic text-lg text-center">
                                                    "{event.quranRef}"
                                                </p>
                                            </div>
                                        )}

                                        {event.outcome && (
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30">
                                                <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2 text-sm">
                                                    <span>🎯</span> Significance
                                                </h4>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium">
                                                    {event.outcome}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default MeccanPeriodPage;
