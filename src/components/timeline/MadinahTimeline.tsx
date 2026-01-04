
import React, { memo, useState } from 'react';
import { MADINAH_TIMELINE } from '@/data/timelineData';

const MadinahTimeline: React.FC = memo(() => {
    const [expandedYear, setExpandedYear] = useState<string | null>('1 AH');

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 mb-6">
                    The Madinan Era
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    The Golden Decade (1-11 AH). Witness the establishment of the first Islamic state, the defense of faith, and the perfection of religion.
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Year Navigation (Sticky Sidebar) */}
                <div className="md:col-span-3">
                    <div className="sticky top-24 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {MADINAH_TIMELINE.map((event) => (
                            <button
                                key={event.year}
                                onClick={() => setExpandedYear(event.year)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-between group ${expandedYear === event.year
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg scale-105'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                <span>{event.year}</span>
                                <span className={`text-xs opacity-70 font-normal ${expandedYear === event.year ? 'text-emerald-100' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                    {event.ceYear}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9 space-y-6">
                    {MADINAH_TIMELINE.map((event) => (
                        <div
                            key={event.year}
                            id={event.year}
                            className={`transform transition-all duration-500 ease-in-out ${expandedYear === event.year ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'
                                }`}
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                                {/* Decorative Background Icon */}
                                <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl select-none pointer-events-none">
                                    {event.type === 'battle' ? '⚔️' : event.type === 'revelation' ? '📜' : event.type === 'political' ? '🤝' : '💔'}
                                </div>

                                {/* Header */}
                                <div className="relative z-10 mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.type === 'battle' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                event.type === 'revelation' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                                    event.type === 'political' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span>📝</span> Key Events
                                        </h4>
                                        <ul className="space-y-3">
                                            {event.details?.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        {event.quranRef && (
                                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/30">
                                                <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2 text-sm">
                                                    <span>📖</span> Revelation Context
                                                </h4>
                                                <p className="text-slate-700 dark:text-slate-300 font-serif italic">
                                                    "{event.quranRef}"
                                                </p>
                                            </div>
                                        )}

                                        {event.outcome && (
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30">
                                                <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2 text-sm">
                                                    <span>🚩</span> Outcome
                                                </h4>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium">
                                                    {event.outcome}
                                                </p>
                                            </div>
                                        )}

                                        {event.casualties && (
                                            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-800/30">
                                                <h4 className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2 text-sm">
                                                    <span>⚔️</span> Casualties
                                                </h4>
                                                <p className="text-slate-700 dark:text-slate-300 text-sm">
                                                    {event.casualties}
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

export default MadinahTimeline;
