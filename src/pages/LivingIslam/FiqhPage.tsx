
import React, { useState, useEffect, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { ChevronRight, Filter, Search, ShieldCheck, Scale, History, BookOpen, Calculator, Landmark, ArrowLeft } from 'lucide-react';
import {
    MADHAB_ISSUES,
    HALAL_HARAM_TREE,
    MODERN_ISSUES,
    FIQH_GLOSSARY,
    FIQH_TIMELINE,
    USUL_SOURCES,
    FIVE_OBJECTIVES,
    MODERN_ISSUES_DETAILS,
    FAMILY_LAW_DETAILS,
    FiqhIssue,
    MadhabPosition,
    TimelineEvent,
    UsulSource,
    ModernIssueDetail,
    FamilyLawDetail
} from '@/data/fiqhData';

// ============================================================================
// COMPONENTS
// ============================================================================

// --- Types ---
type TabId = 'foundations' | 'madhabs' | 'tools' | 'modern' | 'family' | 'resources';

// --- Foundations Components ---

const HistoricalTimeline: React.FC = memo(() => (
    <section className="space-y-8 overflow-hidden py-12">
        <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Historical Evolution of Fiqh</h2>
            <p className="text-slate-500 dark:text-slate-400">From the Prophet's era to modern codification - a 1,400-year journey of legal development.</p>
        </div>

        <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 hidden md:block"></div>
            <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar md:px-12 gap-6 text-left">
                {FIQH_TIMELINE.map((event, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[300px] snap-center group relative pt-12 md:pt-0">
                        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 z-10 group-hover:scale-150 transition-transform"></div>
                        <div className={`p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5 transition-all group-hover:-translate-y-2 md:mt-12`}>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">{event.years}</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{event.era}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{event.description}</p>
                            <div className="pt-4 border-t border-slate-50 dark:border-slate-700">
                                <span className="text-[9px] text-slate-400 uppercase block mb-2">Key Impact</span>
                                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 italic">{event.impact}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
));

const UsulExplorer: React.FC = memo(() => (
    <section className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-700 text-left">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-serif">Methodology of Law (Usul al-Fiqh)</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Islamic jurisprudence is not arbitrary. It follows a rigorous methodology (Usul) to extract rulings from primary and secondary sources. This ensures the law remains rooted in revelation while having the flexibility to adapt.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {['Quran & Sunnah', 'Ijma (Consensus)', 'Qiyas (Analogy)', 'School Preferences'].map(source => (
                        <div key={source} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-emerald-500 mr-2 text-lg">✦</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{source}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {USUL_SOURCES.map((source, i) => (
                    <div key={i} className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 transition-all shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${source.type === 'Primary' ? 'bg-emerald-500/10 text-emerald-500' :
                                source.type === 'Secondary' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                {source.type} Source
                            </span>
                            <div className="flex gap-1">
                                {source.schools?.map(s => (
                                    <span key={s} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[8px] text-slate-500">{s}</span>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{source.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{source.description}</p>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500">
                            <span className="text-[9px] text-emerald-600 font-bold uppercase block mb-1">Application Example</span>
                            <p className="text-[11px] text-slate-700 dark:text-slate-300 italic">{source.example}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
));



const LegalCategoryClassifier: React.FC = memo(() => {
    const [selectedAction, setSelectedAction] = useState<number | null>(null);

    const categories = [
        { id: 1, label: 'Fard / Wajib', color: 'bg-emerald-500', desc: 'Obligatory acts; skipping brings sin.', ex: '5 Daily Prayers, Zakat, Fasting.' },
        { id: 2, label: 'Mustahabb', color: 'bg-emerald-400', desc: 'Recommended; rewarded but not sinful if skipped.', ex: 'Sunnah prayers, Siwak, Charity.' },
        { id: 3, label: 'Mubah', color: 'bg-blue-400', desc: 'Neutral; no reward or sin.', ex: 'Physical activity, choice of food/clothing.' },
        { id: 4, label: 'Makruh', color: 'bg-amber-500', desc: 'Disliked; better to avoid but not sinful.', ex: 'Wasting water, eating onions before mosque.' },
        { id: 5, label: 'Haram', color: 'bg-red-500', desc: 'Forbidden; sinful acts.', ex: 'Interest, Pork, Injustice, Theft.' },
    ];

    return (
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif">The Spectrum of Deeds</h2>
                <p className="text-slate-500 dark:text-slate-400">Understanding how actions are classified in Islamic Law.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-20 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-400 to-red-500 -translate-y-1/2 opacity-20 hidden md:block"></div>
                {categories.map((cat, i) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedAction(i)}
                        className={`z-10 group relative p-6 rounded-2xl text-center transition-all ${selectedAction === i ? `${cat.color} text-white scale-110 shadow-lg` : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:scale-105'
                            }`}
                    >
                        <span className="block text-xl mb-1">{i + 1}</span>
                        <span className="font-bold text-xs uppercase tracking-tighter">{cat.label}</span>
                    </button>
                ))}
            </div>

            <div className="max-w-xl mx-auto min-h-[160px] text-left">
                {selectedAction !== null ? (
                    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 animate-slide-up">
                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{categories[selectedAction].label}</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">{categories[selectedAction].desc}</p>
                        <div className="flex gap-2 items-center text-sm">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase">Examples:</span>
                            <span className="text-slate-700 dark:text-slate-300 italic">{categories[selectedAction].ex}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 italic">
                        Select a category above to learn more about its implications.
                    </div>
                )}
            </div>
        </section>
    );
});

const MaqasidExplorer: React.FC = memo(() => (
    <section className="space-y-12">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Maqasid al-Shari'ah</h2>
            <p className="text-slate-500 dark:text-slate-400">The Ultimate Objectives: Five essentials that every Islamic law aims to protect.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
            {FIVE_OBJECTIVES.map((obj, j) => (
                <div key={obj.id} className="group p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-emerald-500 transition-all shadow-xl text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                        <span className="font-bold">{j + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-white mb-4">{obj.name}</h3>
                    <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 text-left">
                        <div>
                            <span className="text-[9px] font-bold text-white uppercase block mb-1">What it protects</span>
                            <p className="text-[10px] text-white/80 leading-relaxed">{obj.protection}</p>
                        </div>
                        <div className="pt-2 border-t border-white/20">
                            <span className="text-[9px] font-bold text-white uppercase block mb-1">What it prevents</span>
                            <p className="text-[10px] text-white/80 leading-relaxed">{obj.threat}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
));

const HalalHaramDecisionTree: React.FC = memo(() => {
    const [currentNodeId, setCurrentNodeId] = useState('root');
    const currentNode = HALAL_HARAM_TREE[currentNodeId];
    const [history, setHistory] = useState<string[]>([]);

    const handleOption = (nextNodeId?: string) => {
        if (nextNodeId) {
            setHistory([...history, currentNodeId]);
            setCurrentNodeId(nextNodeId);
        }
    };

    const reset = () => {
        setCurrentNodeId('root');
        setHistory([]);
    };

    return (
        <section className="bg-slate-900 dark:bg-black rounded-[3rem] p-12 shadow-2xl border border-emerald-500/20 text-white relative overflow-hidden text-left">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="text-emerald-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold font-serif">Decision Support Matrix</h2>
                        <p className="text-emerald-400/80">Ethical logic for modern scenarios based on Sharia principles.</p>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-12 border border-white/10 min-h-[300px] flex flex-col justify-center text-center">
                    <h3 className="text-3xl font-bold mb-10 leading-relaxed max-w-2xl mx-auto italic font-serif">
                        "{currentNode.question}"
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4">
                        {currentNode.options.map((option, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <button
                                    onClick={() => handleOption(option.nextNodeId)}
                                    className={`px-10 py-4 rounded-2xl font-black transition-all ${option.verdict ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 scale-105' : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {option.label}
                                </button>
                                {option.verdict && (
                                    <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/10 animate-fade-in text-left max-w-xs">
                                        <span className={`text-xl font-black mb-1 block ${option.verdict === 'HALAL' ? 'text-emerald-400' : 'text-red-400'}`}>{option.verdict}</span>
                                        <p className="text-[10px] text-white/60 leading-relaxed italic">{option.evidence}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {(history.length > 0 || currentNodeId !== 'root') && (
                        <button
                            onClick={reset}
                            className="mt-12 text-sm text-emerald-400/60 hover:text-emerald-400 underline underline-offset-4 font-bold"
                        >
                            Reset Analysis Path
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
});

const MadhabNavigator: React.FC = memo(() => {
    const [selectedIssue, setSelectedIssue] = useState<number>(0);
    const [filter, setFilter] = useState<'All' | 'Worship' | 'Food' | 'Social' | 'Finance'>('All');
    const [viewMode, setViewMode] = useState<'Comparison' | 'Matrix'>('Comparison');

    const filteredIssues = MADHAB_ISSUES.filter(issue => filter === 'All' || issue.category === filter);
    const issue = filteredIssues[selectedIssue] || filteredIssues[0];

    return (
        <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl text-left">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Madhab Navigator</h2>
                    <p className="text-slate-500 dark:text-slate-400">Explore how the four major schools of thought approach various legal scenarios, highlighting both their unique methodologies and vast areas of agreement.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2">
                        <Filter size={14} className="text-slate-400" />
                        <select
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value as any); setSelectedIssue(0); }}
                            className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 outline-none"
                        >
                            {['All', 'Worship', 'Food', 'Social', 'Finance'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                        <button
                            onClick={() => setViewMode('Comparison')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'Comparison' ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-500' : 'text-slate-400'}`}
                        >
                            Focus
                        </button>
                        <button
                            onClick={() => setViewMode('Matrix')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'Matrix' ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-500' : 'text-slate-400'}`}
                        >
                            Matrix
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === 'Comparison' ? (
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Issue Selector Sidebar */}
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                        {filteredIssues.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedIssue(idx)}
                                className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${selectedIssue === idx
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className={`text-[9px] uppercase font-bold tracking-widest mb-1 ${selectedIssue === idx ? 'text-emerald-100' : 'text-emerald-500'}`}>{item.category}</span>
                                    <span className="font-bold text-sm leading-tight">{item.title}</span>
                                </div>
                                <ChevronRight size={16} className={selectedIssue === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                            </button>
                        ))}
                    </div>

                    {/* Ruling Display */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-4 animate-fade-in text-left">
                        {[
                            { id: 'hanafi', name: 'Hanafi', color: 'border-blue-500' },
                            { id: 'maliki', name: 'Maliki', color: 'border-emerald-500' },
                            { id: 'shafii', name: 'Shafi\'i', color: 'border-amber-500' },
                            { id: 'hanbali', name: 'Hanbali', color: 'border-red-500' },
                        ].map((school) => (
                            <div
                                key={school.id}
                                className={`bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border-t-8 ${school.color} relative overflow-hidden group`}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-900 -mr-12 -mt-12 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative">{school.name}</h3>
                                <div className="space-y-6 relative">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Ruling</span>
                                        <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                                            {(issue as any)[school.id].ruling}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-50 dark:border-slate-700">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 underline decoration-emerald-500/30">Reasoning</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                                            {(issue as any)[school.id].reasoning}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-700">Legal Issue</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-blue-500 border-b border-slate-200 dark:border-slate-700">Hanafi</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-emerald-500 border-b border-slate-200 dark:border-slate-700">Maliki</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-amber-500 border-b border-slate-200 dark:border-slate-700">Shafi'i</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-red-500 border-b border-slate-200 dark:border-slate-700">Hanbali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIssues.map(item => (
                                <tr key={item.id} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-6 border-b border-slate-100 dark:border-slate-700">
                                        <span className="text-[9px] font-bold text-emerald-500 uppercase block mb-1">{item.category}</span>
                                        <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
                                    </td>
                                    <td className="p-6 border-b border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-medium">{item.hanafi.ruling}</td>
                                    <td className="p-6 border-b border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-medium">{item.maliki.ruling}</td>
                                    <td className="p-6 border-b border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-medium">{item.shafii.ruling}</td>
                                    <td className="p-6 border-b border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-medium">{item.hanbali.ruling}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
});

// --- Halal & Haram Tools ---

const VisualSpectrumSlider: React.FC = memo(() => {
    const [value, setValue] = useState(50);

    const getVerdict = (val: number) => {
        if (val < 20) return { label: 'HARAM', color: 'text-red-500', bg: 'bg-red-500', desc: 'Forbidden Acts', note: 'Explicitly prohibited in primary texts. Engaging in it is sinful.' };
        if (val < 40) return { label: 'MAKRUH', color: 'text-amber-500', bg: 'bg-amber-500', desc: 'Disliked Acts', note: 'Better to avoid for reward, but doing so is not sinful.' };
        if (val < 60) return { label: 'MUBAH', color: 'text-blue-500', bg: 'bg-blue-500', desc: 'Permissible Acts', note: 'Neutral acts with no specific reward or sin attached.' };
        if (val < 80) return { label: 'MUSTAHABB', color: 'text-emerald-400', bg: 'bg-emerald-400', desc: 'Recommended Acts', note: 'Rewarding to perform, but not sinful if omitted.' };
        return { label: 'FARD / WAJIB', color: 'text-emerald-600', bg: 'bg-emerald-600', desc: 'Obligatory Acts', note: 'Required in Islam. Omission is considered a sin.' };
    };

    const verdict = getVerdict(value);

    return (
        <section className="bg-white dark:bg-slate-800 rounded-[3rem] p-12 shadow-xl border border-slate-100 dark:border-white/5">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif">The Spectrum of Permissibility</h2>
                <p className="text-slate-500 dark:text-slate-400">Drag the slider to explore the 5 levels of legal rulings (Al-Ahkam al-Khamsa).</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-12">
                <div className="relative h-4 bg-slate-100 dark:bg-slate-900 rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-500 to-emerald-500 rounded-full opacity-20"></div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg active:[&::-webkit-slider-thumb]:scale-125 transition-all"
                    />
                </div>

                <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Haram</span>
                    <span>Mubah</span>
                    <span>Wajib</span>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-center animate-fade-in">
                    <span className={`text-5xl font-black mb-4 block ${verdict.color}`}>{verdict.label}</span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{verdict.desc}</h4>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">{verdict.note}</p>
                </div>
            </div>
        </section>
    );
});

const HalalAnalyzer: React.FC = memo(() => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any>(null);

    const eNumbers: Record<string, { name: string, status: string, desc: string }> = {
        'E120': { name: 'Carmine', status: 'Haram/Doubtful', desc: 'Extracted from insects. Avoided by many schools.' },
        'E441': { name: 'Gelatin', status: 'Doubtful', desc: 'Depends on animal source (pork is haram, bovine depends on slaughter).' },
        'E100': { name: 'Curcumin', status: 'Halal', desc: 'Natural colorant from turmeric.' },
        'E322': { name: 'Lecithin', status: 'Halal', desc: 'Usually vegetable-based (soy), but check source.' },
    };

    const analyze = () => {
        const q = query.toUpperCase().trim();
        if (eNumbers[q]) setResult(eNumbers[q]);
        else if (q === '') setResult(null);
        else setResult({ name: q, status: 'Check Source', desc: 'Not in our priority database. verify source (plant vs animal).' });
    };

    return (
        <section className="grid lg:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Halal Ingredient Analyzer</h2>
                <p className="text-slate-500 dark:text-slate-400">Quickly verify E-numbers and common additives for financial, medical, or dietary compliance.</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter E-number (e.g. E120)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                        onClick={analyze}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 rounded-2xl shadow-lg transition-all"
                    >
                        Analyze
                    </button>
                </div>
            </div>

            <div className="min-h-[200px] flex items-center justify-center">
                {result ? (
                    <div className="w-full p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl animate-scale-in">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{result.name}</h3>
                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${result.status.includes('Haram') ? 'bg-red-500 text-white' :
                                result.status.includes('Halal') ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                }`}>
                                {result.status}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">{result.desc}</p>
                    </div>
                ) : (
                    <div className="text-slate-400 text-sm italic">
                        Try searching for E120, E100, or E441 to see how it works.
                    </div>
                )}
            </div>
        </section>
    );
});

const StockScreeningTool: React.FC = memo(() => {
    const [inputs, setInputs] = useState({ revenue: 0, interest: 0, debt: 0, marketCap: 0 });
    const [score, setScore] = useState<any>(null);

    const calculate = () => {
        const interestRatio = (inputs.interest / inputs.revenue) * 100;
        const debtRatio = (inputs.debt / inputs.marketCap) * 100;

        setScore({
            interestRatio: interestRatio.toFixed(2),
            debtRatio: debtRatio.toFixed(2),
            isInterestOk: interestRatio < 5,
            isDebtOk: debtRatio < 33,
            isCompliant: interestRatio < 5 && debtRatio < 33
        });
    };

    return (
        <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center relative">
                <div className="space-y-6 text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <Landmark className="text-emerald-400" size={32} />
                        <h2 className="text-4xl font-bold font-serif">Stock Screening Tool</h2>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        Determine if a company meets the standard Sharia compliance criteria for investment. We analyze interest-based debt and impure income ratios.
                    </p>
                    <div className="space-y-4">
                        {[
                            { label: 'Total Revenue ($)', key: 'revenue' },
                            { label: 'Interest/Haram Income ($)', key: 'interest' },
                            { label: 'Total Debt ($)', key: 'debt' },
                            { label: 'Market Capitalization ($)', key: 'marketCap' },
                        ].map(field => (
                            <div key={field.key} className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{field.label}</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-all"
                                    value={(inputs as any)[field.key]}
                                    onChange={(e) => setInputs({ ...inputs, [field.key]: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        ))}
                        <button
                            onClick={calculate}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 rounded-xl transition-all shadow-lg"
                        >
                            Analyze Compliance
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-8">
                    {score ? (
                        <div className="w-full space-y-6 animate-scale-in">
                            <div className={`p-8 rounded-[2.5rem] border-4 text-center ${score.isCompliant ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/10'}`}>
                                <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block">Final Verdict</span>
                                <h3 className="text-5xl font-black">{score.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl bg-slate-800 border ${score.isInterestOk ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                                    <span className="text-[8px] uppercase font-bold text-slate-500 block mb-1">Interest Ratio (Max 5%)</span>
                                    <span className={`text-xl font-bold ${score.isInterestOk ? 'text-emerald-400' : 'text-red-400'}`}>{score.interestRatio}%</span>
                                </div>
                                <div className={`p-4 rounded-2xl bg-slate-800 border ${score.isDebtOk ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                                    <span className="text-[8px] uppercase font-bold text-slate-500 block mb-1">Debt Ratio (Max 33%)</span>
                                    <span className={`text-xl font-bold ${score.isDebtOk ? 'text-emerald-400' : 'text-red-400'}`}>{score.debtRatio}%</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 text-center italic">
                                Disclaimer: This tool provides screening based on general ratios. Consult with a Sharia advisor for professional financial guidance.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center space-y-4 opacity-30">
                            <Calculator size={80} className="mx-auto" />
                            <p className="font-serif italic">Enter financial details to see the compliance analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
});



// ... More components will be added here ...

const FamilyLawSuite: React.FC = memo(() => {
    const [activeTool, setActiveTool] = useState<'inheritance' | 'custody' | 'divorce'>('inheritance');

    return (
        <section className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5">
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Family Law Toolkit</h2>
                <div className="flex flex-wrap gap-4">
                    {[
                        { id: 'inheritance', label: 'Inheritance Shares', icon: '📊' },
                        { id: 'custody', label: 'Custody Rights', icon: '👶' },
                        { id: 'divorce', label: 'Divorce Process', icon: '📜' },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as any)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeTool === tool.id
                                ? 'bg-emerald-500 text-white shadow-lg'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            <span>{tool.icon}</span> {tool.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-8">
                {activeTool === 'inheritance' && (
                    <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Inheritance Shares Calculator</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Fixed Quranic shares for heirs. Input your family structure to see the distribution.
                            </p>

                            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20 text-sm">
                                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Did You Know?</h4>
                                <p className="text-amber-700 dark:text-amber-400/80 leading-relaxed italic">
                                    "Islamic inheritance (Mwarith) is designed to circulate wealth. While sons receive 2 shares to a daughter's 1, this is because sons have mandatory financial duty to provide for their mothers, sisters, and wives, whereas women's wealth is entirely their own."
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                            {/* Simplified visual representation */}
                            <div className="w-48 h-48 rounded-full border-8 border-emerald-500 border-t-amber-500 border-l-blue-500 animate-pulse mb-6"></div>
                            <div className="space-y-2 w-full">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Heirs: Spouse, 2 Sons, 1 Daughter</span>
                                    <span className="font-bold text-emerald-500 tracking-tighter cursor-help" title="Based on Quranic injunctions">Verified Logic</span>
                                </div>
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[12.5%]"></div>
                                </div>
                                <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest pt-2">Detailed report available upon completion of full estate assessment.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTool === 'custody' && (
                    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto">
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-12 rounded-[3rem] border border-blue-100 dark:border-blue-500/20 text-center">
                            <h3 className="text-3xl font-bold text-blue-900 dark:text-white mb-6 font-serif">Priority of Care (Hadhana)</h3>
                            <p className="text-blue-800/80 dark:text-blue-300/80 leading-relaxed mb-10 text-lg italic">
                                "The child's welfare is the supreme consideration in Islamic Law."
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: 'Best Interest', desc: 'Emotional and physical health prioritized.' },
                                    { title: 'Maternal Priority', desc: 'Mothers preferred for young children.' },
                                    { title: 'Moral Standing', desc: 'Caretakers must provide safe environments.' }
                                ].map((principle, idx) => (
                                    <div key={idx} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-blue-500/10">
                                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">{principle.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{principle.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTool === 'divorce' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-4">The Dissolution of Marriage</h3>
                            <p className="text-slate-500">Understanding the ethical and legal pathways for separation.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl group hover:border-red-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 font-bold">T</div>
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Talaq</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                    Husband-initiated divorce. Requires a waiting period (Iddah) and full discharge of financial rights.
                                </p>
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest py-1 px-3 bg-red-500/10 rounded-full">Highly regulated</span>
                            </div>
                            <div className="p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl group hover:border-emerald-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 font-bold">K</div>
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Khula / Faskh</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                    Wife-initiated divorce. Women have the right to end marriage by mutual consent or judicial order if harm is proven.
                                </p>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest py-1 px-3 bg-emerald-500/10 rounded-full">Judicial Right</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

const ModernIssuesExplorer: React.FC = memo(() => (
    <section className="space-y-8 text-left">
        <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Contemporary Fiqh Deep-Dive</h2>
            <p className="text-slate-500 dark:text-slate-400">Navigating the complexities of the 21st century with scholarly precision.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {MODERN_ISSUES_DETAILS.map((issue, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-white/5 hover:border-emerald-500 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                            {issue.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{issue.consensus}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{issue.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{issue.summary}</p>

                    <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Classical Basis</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4">"{issue.classicalBasis}"</p>

                        <div className="space-y-3">
                            {issue.modernOpinions.map((op, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block mb-1">{op.scholar}</span>
                                    <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-tight"><b>{op.stance}:</b> {op.reasoning}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
));

const AskTheMufti: React.FC = memo(() => (
    <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5">
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Ask the Mufti</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 font-light">
                    Have a specific question? Search our fatwa database or submit a private query to our panel of qualified scholars.
                </p>
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search fatwas (e.g. inheritance, prayer, fasting)..."
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all pl-12"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['Prayer', 'Finance', 'Food', 'Marriage'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-emerald-500/5 rounded-2xl p-8 border border-emerald-500/10 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Submit a Question</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 italic">"Questions about your personal situation are handled with strict confidentiality."</p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1">
                    Direct Scholar Q&A
                </button>
            </div>
        </div>
    </section>
));

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 text-white overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-bold mb-6 backdrop-blur-sm">
                <Scale size={14} /> The Living Legal Library
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white font-serif">
                Islamic Law <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">(Fiqh)</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed font-light">
                "Allah intends for you ease and does not intend for you hardship."
                <span className="text-emerald-400 block mt-2 text-sm font-bold">— Quran 2:185</span>
            </p>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-6xl mx-auto mb-16">
        {[
            { id: 'foundations' as TabId, label: 'Foundations', icon: <History size={16} /> },
            { id: 'madhabs' as TabId, label: 'Madhabs', icon: <Scale size={16} /> },
            { id: 'tools' as TabId, label: 'Ethics Lab', icon: <ShieldCheck size={16} /> },
            { id: 'modern' as TabId, label: 'Modern', icon: <Search size={16} /> },
            { id: 'family' as TabId, label: 'Family Law', icon: <BookOpen size={16} /> },
            { id: 'resources' as TabId, label: 'Resources', icon: <Landmark size={16} /> },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-6 py-4 rounded-2xl font-bold transition-all text-sm flex items-center justify-center gap-3 min-w-[140px]
                    ${activeTab === tab.id
                        ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-105'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                `}
            >
                {tab.icon}
                {tab.label}
            </button>
        ))}
    </div>
));

const FiqhPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('foundations');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 overflow-x-hidden">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-6xl mx-auto px-4 space-y-24">
                {activeTab === 'foundations' && (
                    <div className="animate-fade-in space-y-24">
                        <HistoricalTimeline />
                        <UsulExplorer />
                        <LegalCategoryClassifier />
                        <MaqasidExplorer />
                    </div>
                )}

                {activeTab === 'madhabs' && (
                    <div className="animate-fade-in space-y-24">
                        <MadhabNavigator />
                        <VisualSpectrumSlider />
                    </div>
                )}

                {activeTab === 'tools' && (
                    <div className="animate-fade-in space-y-24">
                        <HalalHaramDecisionTree />
                        <HalalAnalyzer />
                        <StockScreeningTool />
                    </div>
                )}

                {activeTab === 'family' && (
                    <div className="animate-fade-in space-y-24">
                        <FamilyLawSuite />
                    </div>
                )}

                {activeTab === 'modern' && (
                    <div className="animate-fade-in space-y-24">
                        <ModernIssuesExplorer />
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="animate-fade-in space-y-24">
                        <AskTheMufti />

                        {/* Women's Rights Section (Moved from main flow) */}
                        <section className="bg-gradient-to-br from-pink-500/5 to-emerald-500/5 rounded-[3rem] p-12 border border-pink-500/10">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <span className="text-pink-500 font-bold text-sm uppercase tracking-widest mb-4 block">Equity & Empowerment</span>
                                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Women's Financial Independence</h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                        Islamic Law established women's right to own property, enter contracts, and manage their own wealth 1,400 years ago—rights that weren't recognized in the West until much later.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Own Property', val: '100% Right' },
                                            { label: 'Inherit Wealth', val: 'Fixed Share' },
                                            { label: 'Keep Mahr', val: 'Bridal Gift' },
                                            { label: 'Work Permissible', val: 'With Rights' },
                                        ].map(item => (
                                            <div key={item.label} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-500/10 text-left">
                                                <span className="block text-[10px] text-pink-500 font-bold uppercase">{item.label}</span>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-pink-500/20 to-emerald-500/20 flex items-center justify-center p-12 relative z-10">
                                        <Scale size={120} className="text-emerald-500/40" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 max-w-[200px] text-left">
                                        <p className="text-xs italic text-slate-500 whitespace-normal">"And for women is a share of what they have earned." - Quran 4:32</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-700 text-left">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Islamic Courts Explained</h2>
                                <p className="text-slate-500 dark:text-slate-400">Demystifying the judicial process and jurisdiction.</p>
                            </div>
                            <div className="grid md:grid-cols-4 gap-4">
                                {[
                                    { step: '1', title: 'Filing', desc: 'Submission of formal claim to the Qadi.' },
                                    { step: '2', title: 'Mediation', desc: 'Mandatory reconciliation attempt (Sulh).' },
                                    { step: '3', title: 'Evidence', desc: 'Presentation of witnesses and oaths.' },
                                    { step: '4', title: 'Verdict', desc: 'Final ruling based on divine law & custom.' },
                                ].map(item => (
                                    <div key={item.step} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
                                        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-4 text-xs">{item.step}</span>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{item.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="text-left">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Fiqh Glossary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {FIQH_GLOSSARY.map(item => (
                                    <div key={item.term} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                        <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">{item.term}</h4>
                                        <span className="text-[10px] text-slate-400 uppercase block mb-3">{item.translation}</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Final Engagement: Fact the the Day & Poll (Visible on Foundations or Resources) */}
                {(activeTab === 'foundations' || activeTab === 'resources') && (
                    <div className="grid md:grid-cols-2 gap-8 animate-fade-in text-left">
                        <div className="bg-emerald-900 text-white rounded-[2rem] p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4 block">💡 Fiqh Fact of the Day</span>
                            <h3 className="text-2xl font-bold mb-4 font-serif">The Principle of Easiness</h3>
                            <p className="text-emerald-100/80 leading-relaxed italic text-sm">
                                "Allah intends for you ease and does not intend for you hardship." (Quran 2:185). This verse is a primary source for the legal maxim that 'Hardship brings about ease' (Al-mashaqqah tajlib al-taysir).
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                            <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-4 block">📊 Community Poll</span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Which Fiqh topic deep-dive next month?</h3>
                            <div className="space-y-3">
                                {['Islamic Bioethics', 'Zakat on Crypto', 'Social Media Etiquette'].map(opt => (
                                    <button key={opt} className="w-full text-left px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 transition-all text-xs font-medium text-slate-600 dark:text-slate-400">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FiqhPage;
