
import React, { memo, useState } from 'react';
import { INDIA_TIMELINE } from '@/data/timelineData';

const IndiaTimeline: React.FC = memo(() => {
    const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);

    return (
        <div className="animate-fade-in space-y-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500 mb-6">
                    Islam in India
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    (712-1947 CE) A saga of empires, cultural synthesis, and architectural marvels that shaped the Indian subcontinent.
                </p>
            </div>

            <div className="relative border-l-4 border-slate-200 dark:border-slate-700 ml-4 md:ml-12 space-y-16">
                {INDIA_TIMELINE.map((dynasty, idx) => (
                    <div key={dynasty.id} className="relative pl-8 md:pl-12">
                        {/* Timeline Marker */}
                        <div className={`absolute -left-[14px] md:-left-[18px] top-6 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 ${dynasty.color}`}></div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-white/5 pb-6">
                                <div>
                                    <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-2 ${dynasty.color}`}>
                                        {dynasty.period}
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                                        {dynasty.name}
                                    </h3>
                                </div>
                                <div className="flex gap-2 text-xs font-medium">
                                    {dynasty.highlights.map((highlight, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-xl">👑</span> Key Rulers
                                </h4>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dynasty.rulers.map((ruler, i) => (
                                        <div key={i} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <h5 className="font-bold text-slate-800 dark:text-slate-200">{ruler.name}</h5>
                                                <span className="text-xs text-slate-400 font-mono">{ruler.reign}</span>
                                            </div>
                                            <ul className="space-y-2">
                                                {ruler.achievements.map((ach, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${dynasty.color.replace('bg-', 'bg-opacity-50 text-')}`}></span>
                                                        {ach}
                                                    </li>
                                                ))}
                                            </ul>
                                            {ruler.architecture && (
                                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                                                    <span className="text-xs text-slate-400 block mb-2">🕌 Architecture</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ruler.architecture.map((arch, k) => (
                                                            <span key={k} className="px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] rounded border border-slate-200 dark:border-slate-700">
                                                                {arch}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default IndiaTimeline;
