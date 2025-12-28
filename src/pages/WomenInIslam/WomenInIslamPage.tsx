import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'overview' | 'rights' | 'hijab' | 'scholars' | 'motherhood' | 'health' | 'career';

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-fuchsia-900 via-purple-900 to-slate-950 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Divine Wisdom
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>👑</span> Celebrating Dignity, Rights, and Excellence
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                The Women in <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-rose-300">Islam</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Discover the honored status of women in Islam—from revolutionary historical rights to modern empowerment.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                A comprehensive guide to reclaiming your narrative and rising with confidence.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-fuchsia-400">1,400+</span>
                    <span className="text-white/80 ml-2">Years of Rights</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-rose-400">7+</span>
                    <span className="text-white/80 ml-2">Focus Areas</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-indigo-400">100%</span>
                    <span className="text-white/80 ml-2">Empowerment</span>
                </div>
            </div>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="flex flex-wrap justify-center gap-3 -mt-6 relative z-20 px-4">
        {[
            { id: 'overview' as TabId, label: 'Overview', icon: '🏠' },
            { id: 'rights' as TabId, label: 'Rights', icon: '📜' },
            { id: 'hijab' as TabId, label: 'Hijab', icon: '🧕' },
            { id: 'scholars' as TabId, label: 'Scholars', icon: '🎓' },
            { id: 'motherhood' as TabId, label: 'Mother', icon: '❤️' },
            { id: 'health' as TabId, label: 'Health', icon: '🌿' },
            { id: 'career' as TabId, label: 'Career', icon: '💼' },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center gap-2 ${activeTab === tab.id
                    ? 'bg-slate-900 dark:bg-fuchsia-600 text-white shadow-xl translate-y-[-2px]'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
            >
                <span>{tab.icon}</span>
                {tab.label}
            </button>
        ))}
    </div>
));

// --- Overview Section Components ---

const StereotypeBuster = memo(() => {
    const [activeMyth, setActiveMyth] = useState(0);

    const myths = [
        {
            myth: "Islam oppresses women",
            reality: "Islam established women's rights 1,400 years ago.",
            evidence: "Before Islam, women were property. Islam gave them the right to own property, inherit, work, vote (bay'ah), and choose a spouse. (Quran 4:7, 4:19)",
            emoji: "⚖️"
        },
        {
            myth: "Women can't work",
            reality: "The Prophet's wife Khadijah (RA) was a successful CEO.",
            evidence: "She employed the Prophet ﷺ. Throughout history, Muslim women were scholars, market inspectors, and business owners. Work is permitted if it's halal and dignified.",
            emoji: "💼"
        },
        {
            myth: "Hijab is forced",
            reality: "Hijab is a personal act of worship and spiritual empowerment.",
            evidence: "The Quran commands modesty for both men and women. For women, it is a choice to submit to Allah, not men, and to be valued for character over body.",
            emoji: "🧕"
        },
        {
            myth: "Second-class believers",
            reality: "Men and women are spiritual equals.",
            evidence: "'Whoever does righteousness, whether male or female, while he is a believer - We will surely cause him to live a good life.' (Quran 16:97)",
            emoji: "✨"
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">💥</span> Stereotype Buster
            </h3>

            {/* Changed from flex-row to grid to ensure consistent column sizing on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-12 gap-6 flex-1">
                {/* Changed width from w-1/3 to col-span-4 to give more breathing room */}
                <div className="flex flex-col gap-3 md:col-span-5 lg:col-span-4">
                    {myths.map((m, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveMyth(idx)}
                            // Removed w-full fixed sizing issues and added min-w-0 for ellipsis
                            className={`text-left p-3 lg:p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${activeMyth === idx
                                ? 'bg-purple-700 border-purple-700 text-white shadow-md'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                                }`}
                        >
                            <span className="text-xl lg:text-2xl relative z-10 flex-shrink-0">{m.emoji}</span>
                            <span className={`font-bold text-sm lg:text-base leading-tight relative z-10 ${activeMyth === idx ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'}`}>
                                {m.myth}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Reality card takes remaining space */}
                <div className="md:col-span-7 lg:col-span-8 flex-1 animate-fade-in bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-6 lg:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center min-h-[300px] shadow-inner">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-fuchsia-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-fuchsia-50 backdrop-blur-sm border border-white/10">The Reality</span>
                        </div>
                        <h4 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 leading-tight text-white">{myths[activeMyth].reality}</h4>
                        <div className="bg-white/10 p-4 lg:p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                            <p className="text-fuchsia-50 text-base lg:text-lg leading-relaxed font-medium">
                                {myths[activeMyth].evidence}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const EmpowermentAffirmations = memo(() => {
    const affirmations = [
        "I am honored by Allah perfectly as I am.",
        "My hijab is a crown of dignity, not a chain.",
        "I walk in the footsteps of Khadijah and Aisha.",
        "My voice and mind matter to my Creator.",
        "I can balance my faith and my ambitions.",
        "Paradise lies at the feet of mothers."
    ];

    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent(p => (p + 1) % affirmations.length), [affirmations.length]);

    return (
        <div className="bg-gradient-to-br from-rose-100/50 to-fuchsia-100/50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border border-rose-200/50 dark:border-slate-700 h-full flex flex-col shadow-xl relative overflow-hidden text-center group min-h-[400px]">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-fuchsia-500"></div>
            <div className="absolute -right-10 top-10 w-32 h-32 bg-rose-200/50 dark:bg-rose-900/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

            <h3 className="text-xs lg:text-sm font-bold mb-6 lg:mb-8 text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <span>✨</span> Daily Affirmation
            </h3>

            <div className="flex-1 flex items-center justify-center mb-6 lg:mb-8">
                <p key={current} className="text-xl lg:text-3xl font-serif font-bold text-slate-800 dark:text-white leading-tight animate-fade-in">
                    "{affirmations[current]}"
                </p>
            </div>

            <button
                onClick={next}
                className="w-full py-3 lg:py-4 rounded-xl bg-white dark:bg-slate-700/50 text-fuchsia-600 dark:text-fuchsia-300 font-bold border-2 border-fuchsia-100 dark:border-slate-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 hover:text-fuchsia-700 dark:hover:text-white transition-all shadow-sm hover:shadow-md text-sm lg:text-base"
            >
                Next Affirmation →
            </button>
        </div>
    );
});


const OverviewSection: React.FC<{ onNavigate: (tab: TabId) => void }> = memo(({ onNavigate }) => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Your Empowerment Hub</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
                Explore the revolutionary rights, honored status, and inspiring legacy of women in Islam.
                Select a category above or choose a quick action below.
            </p>
        </div>

        {/* Action Hub Grid - Matching Living Islam Daily pattern */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
                { title: "Know Your Rights", icon: "📜", tab: "rights", desc: "Inheritance, education, and financial independence.", color: "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600" },
                { title: "The Modesty Journey", icon: "🧕", tab: "hijab", desc: "Understanding the wisdom and dignity of Hijab.", color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600" },
                { title: "Scholar Hall of Fame", icon: "🎓", tab: "scholars", desc: "Meet the women who shaped Islamic history.", color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" },
                { title: "Honored Motherhood", icon: "❤️", tab: "motherhood", desc: "Why Paradise lies at the feet of mothers.", color: "bg-rose-100 dark:bg-rose-900/40 text-rose-700" },
                { title: "Holistic Wellness", icon: "🌿", tab: "health", desc: "Faith-based health and mental well-being.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" },
                { title: "Faith & Career", icon: "💼", tab: "career", desc: "Balancing professional life with Islamic values.", color: "bg-slate-100 dark:bg-slate-800 text-slate-600" }
            ].map((card, idx) => (
                <button
                    key={idx}
                    onClick={() => onNavigate(card.tab as TabId)}
                    className="group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col h-full"
                >
                    <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                        {card.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{card.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-2">{card.desc}</p>
                    <span className="text-purple-700 dark:text-purple-400 font-bold text-sm flex items-center gap-1">
                        Explore Now <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </span>
                </button>
            ))}
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                <div className="lg:col-span-2">
                    <StereotypeBuster />
                </div>
                <div className="lg:col-span-1">
                    <EmpowermentAffirmations />
                </div>
            </div>
        </div>
    </div>
));


// --- Rights Section Components ---
const PreIslamComparison = memo(() => {
    const [era, setEra] = useState<'jahiliyyah' | 'islam'>('jahiliyyah');

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">⏳</span> The Revolution: Before & After
            </h3>

            <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl mb-6">
                <button
                    onClick={() => setEra('jahiliyyah')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${era === 'jahiliyyah'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    Pre-Islamic Era (Jahiliyyah)
                </button>
                <button
                    onClick={() => setEra('islam')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${era === 'islam'
                        ? 'bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-500/20'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    The Islamic Revolution (610 CE)
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 animate-fade-in key={era}">
                {[
                    {
                        title: "Right to Life",
                        before: "Female infanticide was common practice.",
                        after: "Strictly forbidden. 'And when the girl [who was] buried alive is asked, for what sin she was killed?' (Quran 81:8-9)",
                        icon: "👶"
                    },
                    {
                        title: "Inheritance",
                        before: "Women were inherited as property; owned nothing.",
                        after: "Guaranteed specific share. Right to own and manage wealth independently. (Quran 4:7)",
                        icon: "💰"
                    },
                    {
                        title: "Marriage",
                        before: "Forced marriages; unlimited polygamy; no divorce rights.",
                        after: "Consent required. Dowry (Mahr) given TO her. Right to divorce (Khula).",
                        icon: "💍"
                    }
                ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-xl border-l-4 ${era === 'jahiliyyah' ? 'bg-slate-50 dark:bg-slate-900 border-slate-400' : 'bg-fuchsia-50 dark:bg-fuchsia-900/10 border-fuchsia-500'}`}>
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                        <p className={`text-sm leading-relaxed ${era === 'jahiliyyah' ? 'text-slate-500 line-through decoration-red-500/50' : 'text-slate-700 dark:text-slate-300'}`}>
                            {era === 'jahiliyyah' ? item.before : item.after}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const RightsExplorer = memo(() => {
    const rights = [
        {
            category: "Financial",
            icon: "💳",
            points: ["Keep own surname", "Keep own earnings completely", "Independent property ownership", "Financial maintenance by husband/father"]
        },
        {
            category: "Spiritual",
            icon: "🕌",
            points: ["Equal reward for deeds", "Direct connection to Allah", "No intermediary needed", "Paradise accessible equally"]
        },
        {
            category: "Social & Legal",
            icon: "⚖️",
            points: ["Education is obligatory", "Right to testify", "Right to choose spouse", "Protection from harm"]
        },
        {
            category: "Political",
            icon: "🗳️",
            points: ["Right to vote (Bay'ah)", "Right to advise leaders", "Participation in public affairs", "Voice in community"]
        }
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Comprehensive Rights Database</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {rights.map((cat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700 group">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl bg-slate-100 dark:bg-slate-700 p-3 rounded-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <h4 className="text-xl font-bold text-slate-800 dark:text-white">{cat.category} Rights</h4>
                        </div>
                        <ul className="space-y-3">
                            {cat.points.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                    <span className="text-fuchsia-500 mt-1">✓</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
});

const RightsSection = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Revolutionary Then, Relevant Now</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                1,400 years ago, Islam granted women rights that recognized their independent legal, spiritual, and financial status—rights that Western women fought for until the 20th century.
            </p>
        </div>
        <PreIslamComparison />
        <RightsExplorer />
    </div>
);

// --- Hijab Section Components ---

const HijabJourneySimulator = memo(() => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Your Intention",
            question: "Why do you want to wear hijab?",
            advice: "The most powerful hijab is worn for Allah alone. Not for family, not for society. When it's for Him, He makes it easy.",
            action: "Renew your Niyyah (intention) daily."
        },
        {
            title: "Inner Modesty",
            question: "Does your character match your cloth?",
            advice: "Hijab is not just a cloth; it's high manners, guarding speech, and kindness. Work on your heart while you work on your appearance.",
            action: "Practice patience today."
        },
        {
            title: "Facing the World",
            question: "Worried about questions?",
            advice: "Confidence is your best accessory. When people ask, simply say: 'It's my personal act of devotion to God.' Most people respect conviction.",
            action: "Prepare a simple 1-sentence answer."
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🧕</span> Hijab Journey Reflection
            </h3>

            <div className="flex flex-col h-[300px]">
                <div className="flex-1 bg-fuchsia-50 dark:bg-fuchsia-900/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <h4 className="text-2xl font-bold text-fuchsia-800 dark:text-fuchsia-200 mb-2">{steps[step].title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">{steps[step].question}</p>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-4">"{steps[step].advice}"</p>
                    <div className="mt-auto bg-white dark:bg-slate-800 py-2 px-4 rounded-full text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 inline-block shadow-sm">
                        Tip: {steps[step].action}
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                        ← Back
                    </button>
                    <div className="flex gap-2 items-center">
                        {steps.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'w-6 bg-fuchsia-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                        ))}
                    </div>
                    <button
                        onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                        disabled={step === steps.length - 1}
                        className="px-4 py-2 rounded-lg text-sm font-bold bg-fuchsia-600 text-white hover:bg-fuchsia-700 disabled:opacity-30 disabled:bg-slate-300 transition"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
});

const WorkplaceRights = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🏢</span> Workplace Rights Guide
            </h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                    { title: "Discrimination Protection", desc: "In many countries, it is illegal to deny employment based on religious dress.", icon: "⚖️" },
                    { title: "Professional Styling", desc: "Opt for cohesive colours and neat styles. Your professionalism speaks louder than prejudice.", icon: "👔" },
                    { title: "Answering Questions", desc: "Q: 'Aren't you hot?' A: 'I'd rather face the heat of the sun than the displeasure of my Creator.' (with a smile!)", icon: "💬" },
                    { title: "Safety Modifications", desc: "In labs or factories, sport hijabs or tucking in is perfectly acceptable for safety.", icon: "⛑️" }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-default group">
                        <div className="text-2xl mt-1 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Download Rights Reference PDF 📥
            </button>
        </div>
    );
});

const HijabSection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Modesty as Power</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In a world that constantly objectifies women, hijab is a radical act of ownership. It says: "I choose who sees me. I choose to be valued for my mind and soul."
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <HijabJourneySimulator />
            <WorkplaceRights />
        </div>
    </div>
);

// --- Scholars Section Components ---
const ScholarsHallOfFame = memo(() => {
    const [activeScholar, setActiveScholar] = useState<number | null>(null);

    const scholars = [
        {
            name: "Aisha bint Abu Bakr",
            role: "The Scholar of Scholars",
            era: "600s CE",
            desc: "Narrated 2,210 Hadiths. Expert in medicine, poetry, and law. Corrected senior Sahaba on religious rulings.",
            image: "/scholars/aisha.png" // Placeholder
        },
        {
            name: "Fatima al-Fihri",
            role: "University Founder",
            era: "859 CE",
            desc: "Founded Al-Qarawiyyin, the world's first degree-granting university still operating today.",
            image: "/scholars/fatima.png"
        },
        {
            name: "Zainab Al-Ghazali",
            role: "Modern Da'iyah",
            era: "20th Century",
            desc: "Pioneering female Islamic activist and author who founded the Muslim Women's Association.",
            image: "/scholars/zainab.png"
        },
        {
            name: "Maryam al-Asturlabi",
            role: "Scientist",
            era: "10th Century",
            desc: "Master astrolabe maker whose inventions advanced navigation and astronomy.",
            image: "/scholars/maryam.png"
        }
    ];

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-8">
                Hall of Fame: Women Who Shaped History
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scholars.map((scholar, idx) => (
                    <div
                        key={idx}
                        className={`cursor-pointer rounded-2xl p-6 transition-all border ${activeScholar === idx
                            ? 'bg-fuchsia-600 text-white border-fuchsia-600 shadow-xl scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-900 border-slate-200 dark:border-slate-700 hover:border-fuchsia-400'
                            }`}
                        onClick={() => setActiveScholar(idx)}
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 mx-auto flex items-center justify-center text-2xl">
                            👩‍🎓
                        </div>
                        <h4 className={`text-lg font-bold text-center mb-1 ${activeScholar === idx ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                            {scholar.name}
                        </h4>
                        <p className={`text-xs text-center uppercase tracking-wider ${activeScholar === idx ? 'text-fuchsia-200' : 'text-fuchsia-600 dark:text-fuchsia-400'}`}>
                            {scholar.role}
                        </p>
                    </div>
                ))}
            </div>

            {activeScholar !== null && (
                <div className="animate-fade-in bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl"></div>
                    <h4 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{scholars[activeScholar].name}</h4>
                    <p className="text-sm font-bold text-fuchsia-600 uppercase tracking-widest mb-4">{scholars[activeScholar].era}</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                        {scholars[activeScholar].desc}
                    </p>
                    <button className="mt-6 px-6 py-2 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-bold transition-colors">
                        Read Full Biography →
                    </button>
                    <button className="absolute top-4 right-4 text-slate-400 hover:text-red-500" onClick={(e) => { e.stopPropagation(); setActiveScholar(null); }}>✖</button>
                </div>
            )}
        </div>
    );
});

const ScholarsSection = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Keepers of Knowledge</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                History often overlooks them, but women were central to the preservation of Islam. From narrating Hadith to funding universities, their legacy is undeniable.
            </p>
        </div>
        <ScholarsHallOfFame />
    </div>
);

// --- Motherhood Section Components ---
const MotherhoodHub = memo(() => {
    return (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 text-center">
            <h3 className="text-3xl font-bold mb-6 text-rose-900 dark:text-rose-100">"Paradise lies at the feet of mothers"</h3>
            <p className="max-w-2xl mx-auto mb-10 text-rose-800 dark:text-rose-200">
                In Islam, the status of a mother is unmatched. She is the first school, the emotional anchor, and the gateway to Jannah.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl mb-4">🤰</div>
                    <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Honored Status</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Three times more deserving of good company than the father.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl mb-4">🍼</div>
                    <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Rights as Mothers</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Right to love, respect, financial support, and obedience from children.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl mb-4">🤲</div>
                    <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Daily Worship</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Every act of caregiving, when done with intention, is recorded as worship.</p>
                </div>
            </div>
        </div>
    );
});

const MotherhoodSection = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Most Honored Role</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Islam elevated the status of mothers to such a degree that kindness to them is second only to worshiping Allah.
            </p>
        </div>
        <MotherhoodHub />
    </div>
);

// --- Health Section Components ---
const WellnessWheel = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">Holistic Wellness Wheel</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Spiritual", desc: "Salah, Dhikr, Quran", color: "text-purple-500" },
                    { label: "Physical", desc: "Nutrition, Sleep, Movement", color: "text-emerald-500" },
                    { label: "Emotional", desc: "Boundaries, Self-compassion", color: "text-blue-500" },
                    { label: "Intellectual", desc: "Learning, Growth, Reading", color: "text-amber-500" }
                ].map((item, i) => (
                    <div key={i} className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                        <h4 className={`text-xl font-bold mb-2 ${item.color}`}>{item.label}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <p className="text-slate-500 dark:text-slate-400 italic mb-4">"Your body has a right over you." - Prophet Muhammad ﷺ</p>
                <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold transition-colors">
                    Open Health Tracker 🩺
                </button>
            </div>
        </div>
    );
});

const HealthSection = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Holistic Care</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A Muslim woman's body is an Amanah (trust). Caring for your physical and mental health is not selfishness—it's stewardship of Allah's gift.
            </p>
        </div>
        <WellnessWheel />
    </div>
);

// --- Career Section Components ---
const CareerDashboard = memo(() => {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">💼 Career & Faith Balance</h3>
                <ul className="space-y-4">
                    {[
                        "Is my income Halal?",
                        "Does this role compromise my modesty?",
                        "Am I fulfilling my primary duties?",
                        "How can I serve the Ummah through this work?"
                    ].map((q, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">?</span>
                            {q}
                        </li>
                    ))}
                </ul>
                <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium">
                        Remember: Khadijah (RA) was a successful merchant. A woman's wealth is her own.
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center text-center">
                <h3 className="text-2xl font-bold mb-4">Connect with Mentors</h3>
                <p className="text-slate-300 mb-8">Join a network of Muslim women professionals who are navigating the same path.</p>
                <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                    Find a Mentor 🤝
                </button>
            </div>
        </div>
    );
});

const CareerSection = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Thriving Professionally</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Islam does not forbid women from working; it empowers them to contribute to society while maintaining their dignity and balance.
            </p>
        </div>
        <CareerDashboard />
    </div>
);

// --- Main Page Component ---
const WomenInIslamPage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Tab order for keyboard navigation
    const tabOrder: TabId[] = ['overview', 'rights', 'hijab', 'scholars', 'motherhood', 'health', 'career'];

    const handleTabChange = useCallback((tab: TabId) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const currentIndex = tabOrder.indexOf(activeTab);
                if (e.key === 'ArrowRight' && currentIndex < tabOrder.length - 1) {
                    handleTabChange(tabOrder[currentIndex + 1]);
                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    handleTabChange(tabOrder[currentIndex - 1]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, handleTabChange]);

    // Scroll-to-top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 overflow-x-hidden">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="container mx-auto px-4 md:px-6 mt-10">
                {activeTab === 'overview' && <OverviewSection onNavigate={handleTabChange} />}
                {activeTab === 'rights' && <RightsSection />}
                {activeTab === 'hijab' && <HijabSection />}
                {activeTab === 'scholars' && <ScholarsSection />}
                {activeTab === 'motherhood' && <MotherhoodSection />}
                {activeTab === 'health' && <HealthSection />}
                {activeTab === 'career' && <CareerSection />}
            </div>

            {/* Floating Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 flex items-center justify-center hover:scale-110 transition-transform z-40 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </div>
    );
});

WomenInIslamPage.displayName = 'WomenInIslamPage';

export default WomenInIslamPage;
