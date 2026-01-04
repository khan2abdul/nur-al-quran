
import React, { memo } from 'react';
import { PERSECUTION_EVENTS } from '@/data/meccanPeriodData';

const PersecutionSection: React.FC = memo(() => {
    return (
        <section className="py-24 bg-white dark:bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The Years of Trial</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        "Do people think they will be left to say, 'We believe' and they will not be tried?" <span className="text-sm font-bold text-amber-600 dark:text-amber-500 block mt-2">Surah Al-Ankabut (29:2)</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    {PERSECUTION_EVENTS.map((event, idx) => (
                        <div key={idx} className="group relative bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            {/* Intensity Bar */}
                            <div className={`absolute top-0 left-0 w-1.5 h-full 
                                ${event.intensity === 'High' ? 'bg-orange-500' :
                                    event.intensity === 'Severe' ? 'bg-red-500' :
                                        event.intensity === 'Critical' ? 'bg-red-700' : 'bg-emerald-500'
                                }
                            `}></div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="text-3xl font-bold text-slate-200 dark:text-slate-800 absolute right-6 top-6 select-none opacity-50 group-hover:opacity-100 transition-opacity">
                                    {event.year}
                                </span>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 relative z-10
                                    ${event.intensity === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                        event.intensity === 'Severe' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                            event.intensity === 'Critical' ? 'bg-slate-900 text-white dark:bg-slate-700 dark:text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    }
                                `}>
                                    {event.title}
                                </span>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed relative z-10">
                                {event.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Visual Storytelling: The Boycott Document */}
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-8 md:p-12 text-center border border-amber-200 dark:border-amber-800/20 max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl">📜</div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Miracle of the Termite</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                        After 3 years of starvation in Shi'b Abi Talib, the Prophet (SAW) informed his uncle that the boycott document was destroyed by Allah. When they checked the Kaaba, a termite had eaten the entire unjust pact, leaving only the words:
                    </p>
                    <div className="text-4xl md:text-5xl font-amiri text-amber-600 dark:text-amber-500 mb-2">
                        بِسْمِكَ اللَّهُمَّ
                    </div>
                    <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">"In Your Name, O Allah"</p>
                </div>
            </div>
        </section>
    );
});

export default PersecutionSection;
