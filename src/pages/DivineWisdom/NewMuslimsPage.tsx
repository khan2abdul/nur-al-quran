
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { ArrowLeft } from 'lucide-react';
import { SHAHADA_CONTENT, ISLAM_BASICS, PRAYER_STEPS, FAMILY_SCRIPTS, COMMON_FAQS, WUDU_STEPS, COMMON_FEARS, MYTHS_REALITY, RAKAH_GUIDE, COMMUNITY_TIPS, FIRST_VISIT_CHECKLIST, EMERGENCY_RESOURCES } from '@/data/newMuslimsData';

// ============================================================================
// COMPONENTS
// ============================================================================

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 overflow-hidden pb-16 pt-20">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 text-6xl opacity-10 animate-pulse">🌱</div>
        <div className="absolute bottom-20 left-10 text-6xl opacity-10 animate-pulse delay-700">🕊️</div>

        <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/30 border border-teal-400/50 text-teal-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🌱</span> A Journal of New Beginnings
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white font-serif">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Islam</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
                Whether you're exploring, just converted, or renewing your faith—you are welcome here.
                This is your safe space to learn, grow, and connect at your own pace.
            </p>
        </div>
    </div>
));

type TabId = 'shahada' | 'basics' | 'prayer' | 'family' | 'community';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 mb-8">
        <div className="container mx-auto overflow-x-auto">
            <div className="flex md:justify-center p-2 min-w-max gap-2">
                {[
                    { id: 'shahada', label: 'The Beginning', icon: '☝️' },
                    { id: 'basics', label: 'The Basics', icon: '📚' },
                    { id: 'prayer', label: 'Prayer (Salah)', icon: '🤲' },
                    { id: 'family', label: 'Family & Friends', icon: '👨‍👩‍👧‍👦' },
                    { id: 'community', label: 'Community', icon: '🕌' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id as TabId)}
                        className={`px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    </div>
));

const ShahadaSection: React.FC = memo(() => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5 text-center">
                <span className="text-6xl mb-4 block">☝️</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Declaration of Faith</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                    {SHAHADA_CONTENT.intro}
                </p>

                <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-2xl mb-8 border border-teal-100 dark:border-teal-500/20">
                    <p className="text-3xl md:text-4xl font-arabic text-teal-800 dark:text-teal-300 mb-6 leading-loose" dir="rtl">
                        {SHAHADA_CONTENT.arabic}
                    </p>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic mb-4">
                        "{SHAHADA_CONTENT.transliteration}"
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                        {SHAHADA_CONTENT.translation}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
                    {SHAHADA_CONTENT.meaning.map((m, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                            <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">{m.part}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">{m.detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Common Fears Section */}
            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-8 border border-orange-100 dark:border-orange-500/20">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    🛡️ Facing Your Fears
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {COMMON_FEARS.map((fear, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
                            <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">"{fear.title}"</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{fear.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

const BasicsSection: React.FC = memo(() => (
    <div className="space-y-8 animate-fade-in">
        {/* Myths vs Reality */}
        <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-500/20">
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-6">🚫 Myths vs. Reality</h3>
            <div className="grid md:grid-cols-2 gap-4">
                {MYTHS_REALITY.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-indigo-100 dark:border-white/5">
                        <div className="flex items-center gap-2 text-red-500 font-bold text-sm mb-1">
                            <span>❌ Myth:</span> {item.myth}
                        </div>
                        <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                            <span>✅ Reality:</span> {item.reality}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {ISLAM_BASICS.map((section, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                        {section.title}
                    </h3>
                    <ul className="space-y-4">
                        {section.items.map((item, i) => (
                            <li key={i} className="flex gap-3">
                                <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <div>
                                    <strong className="block text-slate-800 dark:text-slate-200">{item.label}</strong>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
));

const PrayerSection: React.FC = memo(() => {
    const [activeWuduStep, setActiveWuduStep] = useState(0);

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Wudu Guide */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    💧 Preparation (Wudu)
                </h3>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        {WUDU_STEPS.map((step, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveWuduStep(idx)}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${activeWuduStep === idx
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20'
                                    : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${activeWuduStep === idx ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                                    }`}>
                                    {step.step}
                                </div>
                                <div>
                                    <strong className={`block ${activeWuduStep === idx ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {step.action}
                                    </strong>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-blue-500/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] border border-blue-500/10">
                        <span className="text-6xl mb-6 block animate-bounce-slow">🚿</span>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2">{WUDU_STEPS[activeWuduStep].action}</h4>
                        <p className="text-blue-800 dark:text-blue-300/80 max-w-sm">
                            {WUDU_STEPS[activeWuduStep].desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Salah Times */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {PRAYER_STEPS.map((prayer, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center hover:border-teal-400 transition-colors">
                        <span className="text-xs uppercase tracking-widest text-slate-400 mb-1 block">{prayer.time}</span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{prayer.name}</h4>
                        <span className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold">
                            {prayer.units} Units
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const FamilySection: React.FC = memo(() => {
    const [activeScript, setActiveScript] = useState<'direct' | 'gentle' | 'letter'>('gentle');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Script Selector */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Navigating Conversations</h2>
                <div className="flex justify-center gap-4 mb-8">
                    {Object.entries(FAMILY_SCRIPTS).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveScript(key as any)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeScript === key
                                ? 'bg-indigo-500 text-white shadow-lg'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            {data.title}
                        </button>
                    ))}
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 relative">
                    <span className="absolute top-4 left-4 text-4xl text-indigo-200 dark:text-indigo-800 opacity-50">"</span>
                    <p className="text-xl text-indigo-900 dark:text-indigo-100 leading-relaxed font-serif relative z-10 px-6">
                        {FAMILY_SCRIPTS[activeScript].script}
                    </p>
                    <div className="mt-8 pt-6 border-t border-indigo-200 dark:border-indigo-800/50">
                        <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-3 text-sm uppercase tracking-wide">Helpful Tips</h4>
                        <div className="flex flex-wrap gap-2">
                            {FAMILY_SCRIPTS[activeScript].tips.map((tip, i) => (
                                <span key={i} className="px-3 py-1 bg-white dark:bg-slate-900 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                                    💡 {tip}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* New: Emergency Resources */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300 text-lg">⚠️ Need Emergency Help?</h4>
                    <p className="text-red-600/80 dark:text-red-300/70 text-sm">If you are in danger or have been kicked out.</p>
                </div>
                <div className="flex gap-4">
                    {EMERGENCY_RESOURCES.map((res, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-red-200 text-center">
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">{res.title}</span>
                            <span className="block font-bold text-red-600 dark:text-red-400">{res.contact}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div className="grid md:grid-cols-2 gap-6">
                {COMMON_FAQS.map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">"{faq.q}"</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const CommunitySection: React.FC = memo(() => (
    <div className="space-y-8 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Finding Friends (Red/Green Flags) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Finding Your People</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">✅ Green Flags (Seek These)</h4>
                        <ul className="space-y-2">
                            {COMMUNITY_TIPS.greenFlags.map((flag, i) => (
                                <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {flag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-red-500 dark:text-red-400 mb-2 flex items-center gap-2">🚩 Red Flags (Avoid These)</h4>
                        <ul className="space-y-2">
                            {COMMUNITY_TIPS.redFlags.map((flag, i) => (
                                <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {flag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* First Visit Checklist */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Mosque First Visit Checklist</h3>
                <div className="space-y-3">
                    {FIRST_VISIT_CHECKLIST.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                                {/* Checkbox visual */}
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-colors">
                    Find Nearest Mosque
                </button>
            </div>
        </div>
    </div>
));

// ============================================================================
// MAIN PAGE
// ============================================================================

const NewMuslimsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('shahada');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 pb-20">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-5xl mx-auto px-4">
                {activeTab === 'shahada' && <ShahadaSection />}
                {activeTab === 'basics' && <BasicsSection />}
                {activeTab === 'prayer' && <PrayerSection />}
                {activeTab === 'family' && <FamilySection />}

                {activeTab === 'community' && <CommunitySection />}
            </div>
        </div>
    );
};

export default NewMuslimsPage;
