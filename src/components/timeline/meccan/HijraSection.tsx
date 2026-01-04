
import React, { memo, useState } from 'react';
import { HIJRA_JOURNEY, TAIF_EVENT } from '@/data/meccanPeriodData';

const HijraSection: React.FC = memo(() => {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-4 uppercase tracking-widest border border-emerald-500/30">
                        622 CE • The Turning Point
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The Journey to Hope</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        From the rejection at Ta'if to the miraculous Night Journey, leading to the Hijra that marked the beginning of the Islamic Calendar.
                    </p>
                </div>

                {/* Ta'if & Isra Wal Mi'raj Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
                    {/* Ta'if Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border-l-4 border-red-500 relative overflow-hidden group hover:shadow-2xl transition-all">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl group-hover:scale-110 transition-transform">🏔️</div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{TAIF_EVENT.title}</h3>
                        <span className="text-xs font-mono text-red-500 font-bold uppercase block mb-4">{TAIF_EVENT.year}</span>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">{TAIF_EVENT.description}</p>
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl italic text-slate-600 dark:text-slate-400 text-sm border-l-2 border-slate-300 dark:border-slate-700">
                            "{TAIF_EVENT.dua}"
                        </div>
                    </div>

                    {/* Mi'raj Card */}
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-lg border-l-4 border-indigo-500 relative overflow-hidden group hover:shadow-2xl transition-all text-white">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl group-hover:scale-110 transition-transform">🌌</div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-20"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Isra & Mi'raj</h3>
                            <span className="text-xs font-mono text-indigo-400 font-bold uppercase block mb-4">The Night Journey</span>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs">1</span>
                                    <span>Journey to Jerusalem (Al-Aqsa)</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs">2</span>
                                    <span>Ascension to 7 Heavens</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs">3</span>
                                    <span>Gift of 5 Daily Prayers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Interactive Hijra Map/Stepper */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-12 uppercase tracking-widest">The Great Migration (Al-Hijra)</h3>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 md:-ml-0.5"></div>

                        <div className="space-y-12">
                            {HIJRA_JOURNEY.map((step, idx) => (
                                <div key={step.step} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Marker */}
                                    <div
                                        className={`absolute left-[28px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-slate-900 transition-all cursor-pointer
                                            ${activeStep >= step.step ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'}
                                        `}
                                        onClick={() => setActiveStep(step.step)}
                                    >
                                        <span className="text-xs font-bold">{step.step}</span>
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                        <div
                                            className={`p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md transition-all duration-300 cursor-pointer
                                                ${activeStep === step.step ? 'ring-2 ring-emerald-500 shadow-xl transform scale-[1.02]' : 'hover:shadow-lg opacity-80 hover:opacity-100'}
                                            `}
                                            onClick={() => setActiveStep(step.step)}
                                        >
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 block">{step.location}</span>
                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.event}</h4>

                                            {/* Step specific visuals */}
                                            {step.location === 'Cave Thawr' && activeStep === step.step && (
                                                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs italic text-slate-500">
                                                    "If they look down, they will see us!" - Abu Bakr (RA)
                                                    <br />
                                                    "Do not grieve; indeed Allah is with us." - Prophet (SAW)
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="hidden md:block flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-24">
                    <button className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                        <span>🕌</span> Continue to Madinan Era
                    </button>
                    <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest">End of Meccan Period</p>
                </div>
            </div>
        </section>
    );
});

export default HijraSection;
