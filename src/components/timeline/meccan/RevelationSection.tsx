
import React, { memo } from 'react';
import { EARLY_MUSLIMS } from '@/data/meccanPeriodData';

const RevelationSection: React.FC = memo(() => {
    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?bg=navy&color=black&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-bold mb-4 uppercase tracking-widest border border-indigo-500/30">
                        610 CE • The Night of Power
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">The Dawn of Revelation</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        In the solitude of Cave Hira, the Angel Jibril descends with a command that would change the world forever.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
                    {/* Visual Card */}
                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-slate-800 rounded-3xl p-1 border border-white/10 shadow-2xl overflow-hidden transform transition-transform group-hover:scale-[1.02]">
                            <div className="bg-slate-950 p-8 md:p-12 rounded-[22px] min-h-[400px] flex flex-col justify-center items-center text-center">
                                <span className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500 font-amiri mb-6 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                                    اقْرَأْ
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-2">"Iqra!" (Read!)</h3>
                                <p className="text-slate-400 italic mb-6">"I am not a reader..."</p>
                                <div className="text-justify text-slate-300 text-sm md:text-base leading-loose font-serif">
                                    "Read in the name of your Lord who created - Created man from a clinging substance. Read, and your Lord is the most Generous - Who taught by the pen - Taught man that which he knew not."
                                    <br />
                                    <span className="text-amber-500 block text-right mt-2 text-xs font-sans not-italic font-bold tracking-widest is-visible">SURAH AL-ALAQ (96:1-5)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline/Narrative */}
                    <div className="text-left space-y-8">
                        <div className="pl-6 border-l-2 border-indigo-900 space-y-8">
                            <div className="relative group">
                                <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-slate-900 group-hover:ring-indigo-900/50 transition-all"></div>
                                <h4 className="text-xl font-bold text-white mb-2">The Embrace</h4>
                                <p className="text-slate-400">Jibril embraced the Prophet (SAW) three times, squeezing him tightly until he could bear it no more, commanding him to read.</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-slate-700 ring-4 ring-slate-900 group-hover:ring-indigo-900/50 transition-all"></div>
                                <h4 className="text-xl font-bold text-white mb-2">The Fear</h4>
                                <p className="text-slate-400">Trembling, he returned to Khadijah (RA) crying "Zammiluni!" (Cover me!). She comforted him: "Allah will never disgrace you."</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-slate-700 ring-4 ring-slate-900 group-hover:ring-indigo-900/50 transition-all"></div>
                                <h4 className="text-xl font-bold text-white mb-2">The Confirmation</h4>
                                <p className="text-slate-400">Waraqah ibn Nawfal confirmed this was the Namus (Angel) sent to Moses, but warned: "I wish I could be alive when your people drive you out."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* First Believers */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg uppercase tracking-widest text-slate-500 font-bold mb-8">The First Believers (As-Sabiqun)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {EARLY_MUSLIMS.map((person, i) => (
                            <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-center hover:bg-slate-800 transition-colors">
                                <div className="text-2xl mb-2 text-indigo-400">✨</div>
                                <p className="text-white text-sm font-bold leading-tight mb-1">{person.name}</p>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{person.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default RevelationSection;
