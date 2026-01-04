
import React, { memo, useState } from 'react';
import { PROPHETS_TIMELINE } from '@/data/timelineData';

const ProphetsTimeline: React.FC = memo(() => {
    const [selectedProphet, setSelectedProphet] = useState<string | null>(null);

    return (
        <div className="space-y-12 animate-fade-in relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-400 mb-6">
                    Legacy of the Prophets
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    A journey through time tracing the 25 chosen messengers sent to guide humanity, from Adam (AS) to the Seal of Prophets, Muhammad ﷺ.
                </p>
            </div>

            {/* Central Line */}
            <div className="absolute left-[20px] md:left-1/2 top-40 bottom-20 w-1 bg-gradient-to-b from-amber-500/0 via-amber-500/50 to-amber-500/0 md:-ml-0.5"></div>

            <div className="relative space-y-12 md:space-y-24">
                {PROPHETS_TIMELINE.map((prophet, idx) => (
                    <div
                        key={prophet.id}
                        className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Timeline Node */}
                        <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>

                        {/* Content Side */}
                        <div className={`flex-1 ${idx % 2 === 0 ? 'md:pl-16 pl-12' : 'md:pr-16 pl-12 md:pl-0 md:text-right'}`}>
                            <div
                                className={`
                                    group relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer
                                    ${selectedProphet === prophet.id ? 'ring-2 ring-amber-500' : ''}
                                `}
                                onClick={() => setSelectedProphet(selectedProphet === prophet.id ? null : prophet.id)}
                            >
                                <div className={`flex items-center gap-4 mb-4 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse md:justify-end'}`}>
                                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xl border border-amber-200 dark:border-amber-700">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                        {prophet.name}
                                    </h3>
                                </div>

                                <div className={`flex gap-3 mb-6 text-sm text-slate-500 dark:text-slate-400 font-mono ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">{prophet.period}</span>
                                    {prophet.scripture && (
                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
                                            📖 {prophet.scripture}
                                        </span>
                                    )}
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                    {prophet.description}
                                </p>

                                {/* Expanded Details */}
                                <div className={`
                                    space-y-4 overflow-hidden transition-all duration-500 ease-in-out
                                    ${selectedProphet === prophet.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                `}>
                                    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-5 border border-amber-100 dark:border-amber-800/30">
                                        <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-3 text-sm uppercase tracking-wide">Key Events</h4>
                                        <ul className={`space-y-2 ${idx % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                                            {prophet.keyEvents.map((event, i) => (
                                                <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                                    {event}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {prophet.references && (
                                        <div className="text-xs text-slate-400 flex items-center gap-2 justify-end">
                                            <span>📚 Reference:</span>
                                            <span className="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                                                {prophet.references}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Expand Hint */}
                                <div className={`mt-4 text-center text-xs text-slate-400 transition-opacity duration-300 ${selectedProphet === prophet.id ? 'opacity-0' : 'opacity-100'}`}>
                                    Click to reveal details
                                </div>
                            </div>
                        </div>

                        {/* Empty Side for Balance */}
                        <div className="hidden md:block flex-1"></div>
                    </div>
                ))}
            </div>

            {/* End Marker */}
            <div className="text-center mt-20 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-2xl shadow-xl animate-bounce">
                    🔚
                </div>
                <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-sm">End of Prophethood</p>
            </div>
        </div>
    );
});

export default ProphetsTimeline;
