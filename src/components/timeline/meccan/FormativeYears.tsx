
import React, { memo, useState } from 'react';
import { FORMATIVE_YEARS_TIMELINE, PROPHET_FAMILY } from '@/data/meccanPeriodData';

const FormativeYears: React.FC = memo(() => {
    const [sliderValue, setSliderValue] = useState(0);
    const currentEvent = FORMATIVE_YEARS_TIMELINE.reduce((prev, curr) =>
        Math.abs(curr.age - sliderValue) < Math.abs(prev.age - sliderValue) ? curr : prev
    );

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">The Formative Years</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">From birth to the first revelation (0-40 Years)</p>
                </div>

                {/* Timeline Interaction */}
                <div className="max-w-4xl mx-auto mb-24">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative">
                        <div className="text-center mb-8">
                            <span className="text-6xl font-bold text-amber-500 block mb-2">{sliderValue}</span>
                            <span className="text-sm uppercase tracking-widest text-slate-500">Years Old</span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                            className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-8"
                        />

                        <div className="flex justify-between text-xs text-slate-400 font-mono uppercase tracking-widest mb-8">
                            <span>Birth</span>
                            <span>Youth</span>
                            <span>Marriage</span>
                            <span>Analysis</span>
                            <span>Prophethood</span>
                        </div>

                        {/* Event Card */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="text-center md:text-left flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="px-2 py-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 text-xs font-bold rounded">{currentEvent.year}</span>
                                        {currentEvent.location && <span className="text-xs text-slate-500 flex items-center gap-1">📍 {currentEvent.location}</span>}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{currentEvent.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{currentEvent.description}</p>

                                    {currentEvent.details && (
                                        <ul className="space-y-1">
                                            {currentEvent.details.map((d, i) => (
                                                <li key={i} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5"></span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Family Tree */}
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">The Blessed Lineage</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {PROPHET_FAMILY.map((member) => (
                            <div key={member.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 w-64 text-center hover:-translate-y-1 transition-transform cursor-default">
                                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl mb-4">
                                    {member.id === 'wife' ? '💍' : member.id === 'uncle' ? '🛡️' : '👤'}
                                </div>
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{member.name}</h4>
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 block mb-2">{member.relation}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default FormativeYears;
