import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'overview' | 'work' | 'family' | 'modern' | 'knowledge' | 'community';

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-950 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🌿</span> Practical Guidance for Modern Life
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Living Islam <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Daily</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Navigate work, family, technology, and modern challenges with Islamic wisdom and practical solutions.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                A comprehensive toolkit to help you live your faith confidently in the 21st century.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-emerald-400">30+</span>
                    <span className="text-white/80 ml-2">Tools</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-teal-400">6</span>
                    <span className="text-white/80 ml-2">Areas of Life</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-cyan-400">100%</span>
                    <span className="text-white/80 ml-2">Practical</span>
                </div>
            </div>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto">
        {[
            { id: 'overview' as TabId, label: 'Overview', icon: '🏠' },
            { id: 'work' as TabId, label: 'Work & Money', icon: '💼' },
            { id: 'family' as TabId, label: 'Family & Home', icon: '👨‍👩‍👧‍👦' },
            { id: 'modern' as TabId, label: 'Modern Life', icon: '📱' },
            { id: 'knowledge' as TabId, label: 'Knowledge', icon: '📚' },
            { id: 'community' as TabId, label: 'Community', icon: '🤝' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                `}
            >
                <span>{tab.icon}</span>
                {tab.label}
            </button>
        ))}
    </div>
));

// --- Placeholders for Sections ---
const OverviewSection = memo(() => {
    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Your Daily Toolkit</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Select a category above or choose a quick action below to start your journey of living Islam daily.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Check Work Ethics", icon: "⚖️", action: "Start Simulator", desc: "Face workplace dilemmas with confidence.", color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600" },
                    { title: "Family Harmony", icon: "🏡", action: "View Rights", desc: "Strengthen bonds with your spouse and kids.", color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600" },
                    { title: "Social Detox", icon: "📱", action: "Start Checklist", desc: "Purify your feed and digital habits.", color: "bg-sky-50 dark:bg-sky-900/20 text-sky-600" },
                    { title: "Zakat Calculator", icon: "💰", action: "Calculate Now", desc: "Cleanse your wealth instantly.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" },
                    { title: "Daily Planner", icon: "📅", action: "Plan Day", desc: "Organize your life around Salah.", color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" },
                    { title: "Crisis Support", icon: "🆘", action: "Get Help", desc: "Duas and advice for hard times.", color: "bg-slate-100 dark:bg-slate-800 text-slate-600" }
                ].map((card, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${card.color}`}>
                            {card.icon}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{card.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{card.desc}</p>
                        <button className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline">
                            {card.action} →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});

// --- Work & Finance Section Components ---

const WorkEthicsSimulator = memo(() => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const scenarios = [
        {
            title: "The Dishonest Request",
            situation: "Your manager asks you to slightly exaggerate a product's features to close a deal with a hesitant client.",
            options: [
                { text: "Do it just this once to keep the boss happy.", score: 0, feedback: "Incorrect. Obedience to creation cannot involve disobedience to the Creator." },
                { text: "Refuse politely and explain you cannot lie.", score: 10, feedback: "Excellent. Truthfulness (Siddiq) is a core Islamic virtue. 'Truthfulness leads to righteousness.' (Bukhari)" },
                { text: "Ignore the request and avoid the client.", score: 5, feedback: "Avoidance protects you but doesn't address the ethical issue professionally." }
            ]
        },
        {
            title: "Prayer Time Clash",
            situation: "An important meeting is scheduled exactly during Asr prayer time. You fear missing the prayer.",
            options: [
                { text: "Skip prayer, it's a valid excuse.", score: 0, feedback: "Incorrect. Work is not a valid excuse to miss obligatory prayer." },
                { text: "Request a 10-minute break for prayer or ask to reschedule.", score: 10, feedback: "Perfect. Most employers respect religious needs if communicated professionally." },
                { text: "Pray quickly in your mind during the meeting.", score: 2, feedback: "Ritual prayer requires physical movements and wudu, unless in extreme danger." }
            ]
        },
        {
            title: "The Credit Stealer",
            situation: "A colleague presents your idea as their own in a meeting. Everyone is impressed.",
            options: [
                { text: "Interrupt and angrily claim your right.", score: 3, feedback: "Anger is discouraged. 'The strong man is not the wrestler, but the one who controls himself in anger.' (Bukhari)" },
                { text: "Stay silent and resent them.", score: 2, feedback: "Holding grudges harms your own heart. Speak up or forgive." },
                { text: "Privately speak to them or calmly clarify your contribution later.", score: 10, feedback: "Wisdom (Hikmah). You defended your right without causing a scene." }
            ]
        }
    ];

    const handleAnswer = (index: number) => {
        setSelectedOption(index);
        setScore(prev => prev + scenarios[currentScenario].options[index].score);
    };

    const nextScenario = () => {
        setSelectedOption(null);
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const reset = () => {
        setCurrentScenario(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">⚖️</span> Work Ethics Simulator
            </h3>

            {!showResult ? (
                <div className="space-y-6">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Scenario {currentScenario + 1} of {scenarios.length}</span>
                        <span>Score: {score}</span>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100">{scenarios[currentScenario].title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">{scenarios[currentScenario].situation}</p>

                        <div className="space-y-3">
                            {scenarios[currentScenario].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selectedOption !== null}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedOption === idx
                                        ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 ring-1 ring-teal-500'
                                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedOption !== null && (
                        <div className={`p-4 rounded-xl animate-fade-in ${scenarios[currentScenario].options[selectedOption].score === 10
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                            }`}>
                            <p className="font-bold mb-1">{scenarios[currentScenario].options[selectedOption].score === 10 ? '✅ Excellent Choice' : '⚠️ Guidance'}</p>
                            <p className="text-sm">{scenarios[currentScenario].options[selectedOption].feedback}</p>
                            <button onClick={nextScenario} className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold">
                                {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">{score === 30 ? '🏆' : score > 15 ? '👍' : '📚'}</div>
                    <h4 className="text-2xl font-bold mb-2">You scored {score}/30</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {score === 30 ? "MashaAllah! You have a strong grasp of Islamic work ethics." : "Keep learning! Ethical challenges require wisdom and patience."}
                    </p>
                    <button onClick={reset} className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
});

const HalalCareerNavigator = memo(() => {
    const [industry, setIndustry] = useState('tech');
    const [role, setRole] = useState('developer');

    // Simplistic logic for demo - in real app would be a complex decision tree
    const assessment = {
        status: 'Likely Halal',
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        advice: "Generally, technology roles are permissible as long as the product itself is not haram (e.g., gambling apps, interest-based banking software)."
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🧭</span> Halal Career Navigator
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select Industry</label>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                    >
                        <option value="tech">Technology & Software</option>
                        <option value="finance">Banking & Finance</option>
                        <option value="food">Food & Hospitality</option>
                        <option value="ent">Entertainment</option>
                    </select>
                </div>

                <div className={`p-4 rounded-xl ${assessment.bg}`}>
                    <p className={`font-bold ${assessment.color} mb-2`}>{assessment.status}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{assessment.advice}</p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">
                    <h4 className="font-bold text-sm mb-2">Red Flags to Watch 🚩</h4>
                    <ul className="text-sm text-slate-500 space-y-1 list-disc pl-4">
                        <li>Interest/Usury (Riba) involvement</li>
                        <li>Selling alcohol or pork</li>
                        <li>Gambling/Betting elements</li>
                        <li>Deceptive marketing practices</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

const IslamicFinanceManager = memo(() => {
    const [savings, setSavings] = useState('');
    const [gold, setGold] = useState('');

    const nisab = 6000; // Example value
    const totalAssets = (parseFloat(savings) || 0) + (parseFloat(gold) || 0);
    const zakatDue = totalAssets >= nisab ? totalAssets * 0.025 : 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">💰</span> Islamic Finance & Zakat
            </h3>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Cash/Savings ($)</label>
                        <input
                            type="number"
                            value={savings}
                            onChange={(e) => setSavings(e.target.value)}
                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Gold/Silver Value ($)</label>
                        <input
                            type="number"
                            value={gold}
                            onChange={(e) => setGold(e.target.value)}
                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Estimated Zakat Due</span>
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${zakatDue.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">
                        {totalAssets < nisab
                            ? `* Below Nisab threshold ($${nisab}). No Zakat due yet.`
                            : "* Based on 2.5% of eligible assets held for one lunar year."}
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Quick Tools</h4>
                    <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 transition-colors text-sm flex justify-between">
                        <span>📊 Monthly Budget Planner</span>
                        <span>→</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 transition-colors text-sm flex justify-between">
                        <span>🚫 Interest Detox Guide</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
});

const WorkSection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Earning with Integrity</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In Islam, work is a form of worship (Ibadah) when done with good intention and excellence (Ihsan).
                Your earnings must be pure (Halal) for your prayers and charity to be accepted.
                Use these tools to navigate the modern workplace ethically.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <WorkEthicsSimulator />
            <div className="space-y-8">
                <HalalCareerNavigator />
                <IslamicFinanceManager />
            </div>
        </div>
    </div>
);

// --- Family & Relationships Section Components ---

const FamilyHarmonyBuilder = memo(() => {
    const [activeRole, setActiveRole] = useState<'parent' | 'spouse' | 'child'>('spouse');

    const roleContent = {
        spouse: {
            title: "For Spouses",
            icon: "💍",
            rights: [
                "Mutual kindness and emotional support (Mawaddah wa Rahmah)",
                "Respectful communication even during disagreements",
                "Financial maintenance (Nafaqah) - Husband's duty",
                "Guarding privacy and secrets of the home"
            ],
            tips: [
                "Express gratitude daily. The Prophet ﷺ said: 'He who does not thank people is not thankful to Allah.'",
                "Consult each other (Shura) in major decisions.",
                "Be your spouse's garment (Quran 2:187) - protect and beautify each other."
            ]
        },
        parent: {
            title: "For Parents",
            icon: "👨‍👩‍👧‍👦",
            rights: [
                "Providing Islamic upbringing (Tarbiyah)",
                "Treating all children fairly (Adl)",
                "Giving good names and lawful sustenance",
                "Teaching Quran, prayer, and good manners"
            ],
            tips: [
                "Be the role model you want them to copy.",
                "Balance love with discipline. Avoid harshness.",
                "Make dua for them constantly. A parent's dua is accepted."
            ]
        },
        child: {
            title: "For Children (Adults too)",
            icon: "🤲",
            rights: [
                "Kindness and respect (Birr al-Walidayn)",
                "Obedience in all that is not haram",
                "Financial support in their old age",
                "Making dua for them after they pass"
            ],
            tips: [
                "Speak to them gently, never say 'Uff' (Quran 17:23).",
                "Visit them often if living apart.",
                "Seek their advice and blessing in life decisions."
            ]
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🏡</span> Family Harmony Builder
            </h3>

            <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
                {(['spouse', 'parent', 'child'] as const).map(role => (
                    <button
                        key={role}
                        onClick={() => setActiveRole(role)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeRole === role
                            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="text-2xl">{roleContent[activeRole].icon}</span>
                    {roleContent[activeRole].title}
                </h4>

                <div className="space-y-6">
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">Key Rights & Duties</h5>
                        <ul className="space-y-2">
                            {roleContent[activeRole].rights.map((right, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="text-teal-500">•</span>
                                    {right}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">Prophetic Tips</h5>
                        <ul className="space-y-2">
                            {roleContent[activeRole].tips.map((tip, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="text-amber-500">💡</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});

const FamilyCommunicationHub = memo(() => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Check Your Intention (Niyyah)",
            desc: "Are you arguing to win, or to resolve the issue for Allah's sake? Anger comes from Shaytan.",
            action: "Pause. Say 'A'udhu billahi min ash-shaytan ir-rajim'. Perform Wudu if angry.",
            color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 border-indigo-200"
        },
        {
            title: "Listen First",
            desc: "The believer speaks little and listens much. Do not interrupt.",
            action: "Let them finish completely. Repeat back what you heard to ensure understanding.",
            color: "bg-sky-50 dark:bg-sky-900/20 text-sky-800 dark:text-sky-300 border-sky-200"
        },
        {
            title: "Speak with Hikmah (Wisdom)",
            desc: "'Speak a good word or remain silent.' Avoid insults, bringing up the past, or using 'You always...' statements.",
            action: "Use 'I' statements: 'I felt hurt when...' instead of 'You hurt me'.",
            color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200"
        },
        {
            title: "Forgive & Move Forward",
            desc: "The best of two disputants is the one who initiates the Salam.",
            action: "Shake hands/hug. Making up wipes away sins. Don't go to sleep angry.",
            color: "bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 border-rose-200"
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🤝</span> Conflict Resolution Hub
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Islamic guide to resolving disputes peacefully.
            </p>

            <div className="space-y-4">
                {steps.map((s, idx) => (
                    <div
                        key={idx}
                        className={`relative pl-8 pb-4 border-l-2 ${idx === steps.length - 1 ? 'border-transparent' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                        <button
                            onClick={() => setStep(idx)}
                            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${step >= idx ? 'bg-teal-500 border-teal-500' : 'bg-white border-slate-300'
                                }`}
                        />
                        <div className={`p-4 rounded-xl border transition-all cursor-pointer ${step === idx ? s.color + ' border-current' : 'border-slate-100 dark:border-slate-700 opacity-60 hover:opacity-100'
                            }`} onClick={() => setStep(idx)}>
                            <h4 className="font-bold text-sm mb-1">{idx + 1}. {s.title}</h4>
                            {step === idx && (
                                <div className="animate-fade-in mt-2 text-sm">
                                    <p className="mb-2 opacity-90">{s.desc}</p>
                                    <div className="flex gap-2 items-start bg-white/50 dark:bg-black/20 p-2 rounded-lg">
                                        <span>⚡</span>
                                        <p className="font-semibold">{s.action}</p>
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

const ParentingTips = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🌱</span> Raising Righteous Kids
            </h3>

            <div className="space-y-4 h-[calc(100%-4rem)] overflow-y-auto pr-2 custom-scrollbar">
                {[
                    { age: "0-7 Years", focus: "Love & Play", icon: "🧸", desc: "Let them play. Show immense love and mercy. Teach by example. No harsh discipline." },
                    { age: "7-14 Years", focus: "Discipline & Teaching", icon: "📚", desc: "Teach Salah gently. Instill manners (Adab). Explain 'Why'. Monitor friends." },
                    { age: "14+ Years", focus: "Friendship & Guidance", icon: "🤝", desc: "Treat them as adults. Consult them. Be their best friend to protect them from outside bad influence." }
                ].map((stage, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                        <span className="text-2xl">{stage.icon}</span>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-slate-900 dark:text-white">{stage.age}</h4>
                                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 px-2 py-0.5 rounded-full">{stage.focus}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{stage.desc}</p>
                        </div>
                    </div>
                ))}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-4">
                    <h4 className="font-bold text-sm mb-2 text-slate-800 dark:text-slate-200">Daily Parenting Checklist</h4>
                    <div className="space-y-2">
                        {["Made Dua for them", "Kissed/Hugged them", "Taught one Islamic thing", "Listened to their day"].map((item, i) => (
                            <label key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                                <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const FamilySection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Building a Strong Islamic Home</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The home is the foundation of the Ummah. "The best of you is the one who is best to his family" (Tirmidhi).
                Use these tools to strengthen your bonds, resolve conflicts, and raise the next generation.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <FamilyHarmonyBuilder />
            </div>
            <div className="lg:col-span-1">
                <FamilyCommunicationHub />
            </div>
            <div className="lg:col-span-1">
                <ParentingTips />
            </div>
        </div>
    </div>
);

// --- Modern Life & Identity Section Components ---

const ModernChallengeHelper = memo(() => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const topics = [
        {
            id: 'shaking',
            title: "Gender Interaction",
            icon: "🤝",
            question: "Checking hands or mixing?",
            answer: "Islam promotes modest interactions. Unrelated men and women should lower their gaze and maintain boundaries. Shaking hands with the opposite gender is generally impermissible in the 4 Madhabs. Use a polite nod or hand over heart gesture instead.",
            tip: "Say: 'I don't shake hands for religious reasons, but I'm very happy to meet you.' Most people respect confidence."
        },
        {
            id: 'peer',
            title: "Peer Pressure",
            icon: "👯",
            question: "Friends going to haram places?",
            answer: "'A person is on the religion of his close friend.' (Tirmidhi). You don't have to cut them off instantly, but you must not join in sin. Suggest halal alternatives (coffee, sports, hiking).",
            tip: "Be the leader, not the follower. Often, others are waiting for someone to suggest a wholesome activity."
        },
        {
            id: 'identity',
            title: "Muslim Identity",
            icon: "🧕",
            question: "Feeling awkward about Hijab/Beard?",
            answer: "Your visible identity is a flag of Islam. It attracts angels and good people, and repels bad situations. Remember, you are an ambassador of the Prophet ﷺ.",
            tip: "When you honor Allah's commands, He honors you in the eyes of people. Confidence is key."
        },
        {
            id: 'celebrations',
            title: "Non-Muslim Holidays",
            icon: "🎄",
            question: "Christmas parties/Halloween?",
            answer: "We treat neighbors kindly, exchange gifts (if not religious), and eat together. However, we do not celebrate religious festivals of other faiths as we have our own two Eids.",
            tip: "Politely decline participation in rituals, but share food or gifts on other neutral days to build bridges."
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🧭</span> Modern Challenge Helper
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {topics.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setSelectedTopic(t.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedTopic === t.id
                            ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 ring-1 ring-teal-500'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                    >
                        <span className="text-2xl mb-1 block">{t.icon}</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.title}</span>
                    </button>
                ))}
            </div>

            {selectedTopic ? (
                <div className="animate-fade-in bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                        {topics.find(t => t.id === selectedTopic)?.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {topics.find(t => t.id === selectedTopic)?.answer}
                    </p>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-600 flex gap-3">
                        <span className="text-xl">💡</span>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic">
                            "{topics.find(t => t.id === selectedTopic)?.tip}"
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-slate-400">
                    <p>Select a topic above to get Islamic guidance.</p>
                </div>
            )}
        </div>
    );
});

const SocialMediaGuide = memo(() => {
    const [checklist, setChecklist] = useState<Record<string, boolean>>({});

    const items = [
        "My content is free from music/awrah/slander.",
        "I don't follow accounts that trigger envy or lust.",
        "I verify news before sharing ('Fitrah of checking').",
        "I limit scrolling to 30 mins/day.",
        "I use my platform to share good or remain silent."
    ];

    const toggle = (item: string) => {
        setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
    };

    const progress = Math.round((Object.values(checklist).filter(Boolean).length / items.length) * 100);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">📱</span> Ethical Social Media
            </h3>

            <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Detox Progress</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-teal-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <label key={idx} className="flex gap-3 items-start cursor-pointer group">
                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklist[item]
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-teal-400'
                            }`}>
                            {checklist[item] && <span className="text-xs">✓</span>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={!!checklist[item]}
                            onChange={() => toggle(item)}
                        />
                        <span className={`text-sm transition-colors ${checklist[item]
                            ? 'text-slate-400 line-through'
                            : 'text-slate-700 dark:text-slate-300'
                            }`}>
                            {item}
                        </span>
                    </label>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs text-center text-slate-500 italic">
                    "Whoever believes in Allah and the Last Day, let him speak good or remain silent." (Bukhari)
                </p>
            </div>
        </div>
    );
});

const IdentityBuilder = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full pointer-events-none"></div>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white relative z-10">
                <span className="text-2xl">💪</span> Confidence Booster
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-1">Affirmation of the Day</h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-200 italic">
                        "My value comes from my Creator, not the creation. I am honored to be a servant of Allah."
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Halal Entertainment Ideas</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {['Nature Hikes', 'Calligraphy', 'Beneficial Podcasts', 'Community Volunteering', 'Reading History', 'Sports/Archery'].map((idea, i) => (
                            <div key={i} className="text-xs text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400">
                                {idea}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-2">
                    <button className="w-full py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-transform">
                        Generate New Ideas 🎲
                    </button>
                </div>
            </div>
        </div>
    );
});

const ModernLifeSection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Faith in the Information Age</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Holding onto faith in modern times can feel like holding hot coal.
                But with the right mindset and boundaries, technology and modernity can serve your Deen, not destroy it.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <ModernChallengeHelper />
            </div>
            <div className="lg:col-span-1">
                <SocialMediaGuide />
            </div>
            <div className="lg:col-span-1">
                <IdentityBuilder />
            </div>
        </div>
    </div>
);

// --- Knowledge & Growth Section Components ---

const KnowledgeQuest = memo(() => {
    const levels = [
        { id: 1, title: "Seeker", desc: "Learn the basics of Tawheed and Salah.", icon: "🌱", unlocked: true },
        { id: 2, title: "Student", desc: "Memorize the last 10 Surahs.", icon: "📖", unlocked: false },
        { id: 3, title: "Scholar in Training", desc: "Study 40 Hadith of Imam Nawawi.", icon: "🎓", unlocked: false },
        { id: 4, title: "Wise One", desc: "Master the Fiqh of transactions.", icon: "🕌", unlocked: false }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🗺️</span> Knowledge Quest
            </h3>

            <div className="relative">
                {/* Path Line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

                <div className="space-y-6">
                    {levels.map((level) => (
                        <div key={level.id} className={`flex items-start gap-4 ${!level.unlocked ? 'opacity-50 grayscale' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-white dark:bg-slate-800 ${level.unlocked
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400 shadow-md shadow-teal-500/20'
                                : 'border-slate-300 dark:border-slate-600 text-slate-400'
                                }`}>
                                <span className="text-lg">{level.icon}</span>
                            </div>
                            <div className={`flex-1 p-3 rounded-xl border ${level.unlocked
                                ? 'bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-900/50'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                                }`}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{level.title}</h4>
                                    {!level.unlocked && <span className="text-xs text-slate-400">🔒 Locked</span>}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{level.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="mt-6 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-colors">
                Start Next Lesson
            </button>
        </div>
    );
});

const DailyPlanner = memo(() => {
    const habits = [
        { id: 'fajr', label: 'Pray Fajr on time', icon: '🌅' },
        { id: 'quran', label: 'Read 1 page of Quran', icon: '📖' },
        { id: 'dhikr', label: 'Morning Adhkar', icon: '📿' },
        { id: 'help', label: 'Help someone today', icon: '🤝' },
        { id: 'isha', label: 'Pray Isha & Witr', icon: '🌌' }
    ];

    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">📅</span> Daily Barakah Planner
            </h3>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl mb-6">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Hadith of the Day</p>
                <p className="text-sm text-amber-900 dark:text-amber-200 italic">
                    "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your preoccupation, and your life before your death." (Hakim)
                </p>
            </div>

            <div className="space-y-3">
                {habits.map((habit) => (
                    <label key={habit.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked[habit.id]
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500 group-hover:border-teal-400'
                            }`}>
                            {checked[habit.id] && <span className="text-xs">✓</span>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={!!checked[habit.id]}
                            onChange={() => toggle(habit.id)}
                        />
                        <span className="text-xl">{habit.icon}</span>
                        <span className={`text-sm font-medium transition-colors ${checked[habit.id] ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'
                            }`}>
                            {habit.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
});

const PersonalDevelopment = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🚀</span> Muslim Personal Growth
            </h3>

            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                    <h4 className="font-bold text-lg mb-1">Define Your 'Why'</h4>
                    <p className="text-sm text-blue-100 mb-3">Your intention (Niyyah) transforms habits into worship.</p>
                    <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
                        Set Intention
                    </button>
                </div>

                <div>
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">Growth Areas</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: "Spiritual", icon: "🕌", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
                            { label: "Physical", icon: "💪", color: "text-rose-500 bg-rose-50 dark:bg-rose-900/20" },
                            { label: "Intellectual", icon: "🧠", color: "text-sky-500 bg-sky-50 dark:bg-sky-900/20" },
                            { label: "Social", icon: "🤝", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" }
                        ].map((area, i) => (
                            <div key={i} className={`p-3 rounded-xl flex items-center gap-2 ${area.color}`}>
                                <span className="text-lg">{area.icon}</span>
                                <span className="text-xs font-bold">{area.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">My Current Goal</h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="e.g., Learn 5 new Arabic words..."
                            className="flex-1 text-sm p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                        />
                        <button className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity">
                            ➕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

const KnowledgeSection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Path of Knowledge</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                "Seeking knowledge is obligatory upon every Muslim." (Ibn Majah).
                Start small, be consistent, and act upon what you learn.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <KnowledgeQuest />
            </div>
            <div className="lg:col-span-1">
                <DailyPlanner />
            </div>
            <div className="lg:col-span-1">
                <PersonalDevelopment />
            </div>
        </div>
    </div>
);

// --- Community & Crisis Section Components ---

const CrisisNavigator = memo(() => {
    const [crisisType, setCrisisType] = useState('grief');

    const content = {
        grief: {
            title: "Grief & Loss",
            dua: "Inna lillahi wa inna ilayhi raji'un (Verily to Allah we belong and to Him we return).",
            action: "Patience (Sabr) does not mean not crying. The Prophet ﷺ cried. Sabr is accepting Allah's decree without complaining. Give Sadaqah on their behalf.",
            resource: "Read Surah Yusuf for comfort."
        },
        debt: {
            title: "Financial Debt",
            dua: "Allahumma inni a'udhu bika min al-ma'tham wa al-maghram (O Allah, I seek refuge in You from sin and heavy debt).",
            action: "Cut expenses immediately. Contact creditors to arrange a plan. Avoid Riba-based consolidation acts. Intend sincerely to repay, and Allah will help.",
            resource: "Check 'Islamic Finance' tab for budgeting."
        },
        doubt: {
            title: "Spiritual Doubt (Waswasa)",
            dua: "Aamantu billahi wa rusulihi (I believe in Allah and His Messengers).",
            action: "Doubts often come from lack of knowledge or Shaytan's whispers. Do not argue with the thoughts. Seek knowledge from a qualified scholar, not Google.",
            resource: "Visit 'Yaqeen Institute' for answers."
        },
        loneliness: {
            title: "Loneliness",
            dua: "Rabbi la tadharni fardan wa anta khairul warithin (O my Lord, do not leave me alone, and You are the best of inheritors).",
            action: "You are never alone; Allah is closer than your jugular vein. Volunteer at a mosque or charity to find righteous company.",
            resource: "Join the 'Community Events' below."
        }
    };

    const activeContent = content[crisisType as keyof typeof content];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🆘</span> Crisis Navigator
            </h3>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                {Object.entries(content).map(([key, data]) => (
                    <button
                        key={key}
                        onClick={() => setCrisisType(key)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${crisisType === key
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        {data.title}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-l-4 border-amber-500">
                    <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">Prophetic Dua</h4>
                    <p className="text-lg font-arabic leading-loose text-slate-800 dark:text-slate-200">{activeContent.dua}</p>
                </div>

                <div>
                    <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">Action Plan</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">{activeContent.action}</p>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <span>📚 Recommended:</span>
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{activeContent.resource}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

const ConvertSupport = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">🤝</span> Revert/Convert Support
            </h3>

            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                    <h4 className="font-bold text-lg mb-1">Welcome to the Family!</h4>
                    <p className="text-sm text-teal-50 opacity-90 mb-3">
                        "Islam began as something strange and will revert to being strange as it began, so give glad tidings to the strangers." (Muslim)
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">New Muslim Toolkit</h4>
                    {[
                        { title: "How to Pray (Step-by-Step)", icon: "🕌" },
                        { title: "Finding a Mentor (Buddy System)", icon: "👥" },
                        { title: "Dealing with Non-Muslim Family", icon: "❤️" },
                        { title: "Common Mistakes to Avoid", icon: "⚠️" }
                    ].map((item, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-lg group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">{item.icon}</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.title}</span>
                            </div>
                            <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

const LegalLiteracy = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">⚖️</span> Know Your Rights
            </h3>

            <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Basic Islamic legal (Fiqh) awareness for daily life situations.
                </p>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { title: "Islamic Will (Wasiyyah)", desc: "It is a duty for every Muslim with assets to have a will written.", alert: "Critical" },
                        { title: "Marriage Contracts", desc: "Understand the Mahr and conditions in your Nikah.", alert: "Important" },
                        { title: "Business Contracts", desc: "All terms must be clear. No uncertainty (Gharar).", alert: "Guide" }
                    ].map((item, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${item.alert === 'Critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                    item.alert === 'Important' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                    }`}>{item.alert}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-2 py-2 text-center text-teal-600 dark:text-teal-400 text-sm font-bold border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                    Find a Local Scholar 🔍
                </button>
            </div>
        </div>
    );
});

const CommunitySection = () => (
    <div className="animate-fade-in space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">You Are Never Alone</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                "The believers are like one body." (Muslim). Whether you are new to the faith,
                going through a hard time, or need legal clarity, the community is here for you.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <CrisisNavigator />
            </div>
            <div className="lg:col-span-1">
                <ConvertSupport />
            </div>
            <div className="lg:col-span-1">
                <LegalLiteracy />
            </div>
        </div>
    </div>
);

/**
 * Living Islam Daily Page
 */
const LivingIslamPage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Tab order for keyboard navigation
    const tabOrder: TabId[] = ['overview', 'work', 'family', 'modern', 'knowledge', 'community'];

    // Handle tab change with scroll to top
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

            <div className="container mx-auto px-6 mt-10">
                {activeTab === 'overview' && <OverviewSection />}
                {activeTab === 'work' && <WorkSection />}
                {activeTab === 'family' && <FamilySection />}
                {activeTab === 'modern' && <ModernLifeSection />}
                {activeTab === 'knowledge' && <KnowledgeSection />}
                {activeTab === 'community' && <CommunitySection />}
            </div>

            {/* Floating Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/30 flex items-center justify-center hover:scale-110 transition-transform z-40 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </div>
    );
});

LivingIslamPage.displayName = 'LivingIslamPage';

export default LivingIslamPage;
