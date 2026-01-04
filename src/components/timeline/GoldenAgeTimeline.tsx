
import React, { memo, useState } from 'react';
import { GOLDEN_AGE_SCIENTISTS } from '@/data/timelineData';

const GoldenAgeTimeline: React.FC = memo(() => {
    const [selectedScientist, setSelectedScientist] = useState<string | null>(null);

    return (
        <div className="animate-fade-in space-y-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 mb-6">
                    The Islamic Golden Age
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    (700-1200 CE) A beacon of knowledge when Muslim scholars preserved ancient wisdom and pioneered modern science, medicine, and mathematics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GOLDEN_AGE_SCIENTISTS.map((scientist) => (
                    <div
                        key={scientist.id}
                        className={`group relative bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/5 cursor-pointer transition-all duration-300 ${selectedScientist === scientist.id
                                ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 scale-105 z-10'
                                : 'hover:shadow-xl hover:translate-y-1'
                            }`}
                        onClick={() => setSelectedScientist(selectedScientist === scientist.id ? null : scientist.id)}
                    >
                        {/* Period Badge */}
                        <div className="absolute -top-3 right-6 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                            {scientist.period}
                        </div>

                        {/* Icon/Avatar Placeholder */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                            {scientist.name.charAt(0)}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {scientist.name}
                        </h3>
                        <p className="text-sm text-blue-500 font-medium mb-4 uppercase tracking-wider">{scientist.field}</p>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {scientist.legacy}
                        </p>

                        {/* Collapsible Details */}
                        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${selectedScientist === scientist.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <div className="border-t border-slate-100 dark:border-white/5 pt-4">
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Key Contributions</h4>
                                <ul className="space-y-1">
                                    {scientist.contributions.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {scientist.inventions && (
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Inventions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scientist.inventions.map((inv, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                                                {inv}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default GoldenAgeTimeline;
