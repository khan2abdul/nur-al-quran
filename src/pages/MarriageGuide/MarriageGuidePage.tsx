import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'search' | 'nikkah' | 'harmony' | 'conflict' | 'intimacy' | 'divorce' | 'tools';

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-rose-900 via-amber-900 to-slate-900 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Dynamic Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/30 border border-rose-400/50 text-rose-200 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>❤️</span> Half Your Deen
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Marriage & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-200">Relationships</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Building tranquil homes, strong families, and lifelong love through Islamic wisdom.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                A complete guide from the spouse search to building an eternal bond (and everything in between).
            </p>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-5xl mx-auto">
        {[
            { id: 'search' as TabId, label: 'Search & Prep', icon: '🔍' },
            { id: 'nikkah' as TabId, label: 'Nikkah Guide', icon: '✍️' },
            { id: 'harmony' as TabId, label: 'Rights & Harmony', icon: '⚖️' },
            { id: 'conflict' as TabId, label: 'Conflict Dojo', icon: '🥋' },
            { id: 'intimacy' as TabId, label: 'Love & Intimacy', icon: '🌹' },
            { id: 'divorce' as TabId, label: 'Divorce Guide', icon: '💔' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-rose-700 text-white shadow-lg shadow-rose-500/30'
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

// --- Interactive Components ---

const CompatibilityBridge = () => {
    const [step, setStep] = useState(0);
    const [code, setCode] = useState('');
    const [isLinked, setIsLinked] = useState(false);

    // Mock Questions
    const questions = [
        { q: "Where do you want to live?", a: "City", b: "Suburbs" },
        { q: "How many kids?", a: "1-2", b: "3+" },
        { q: "Finances?", a: "Joint", b: "Separate" }
    ];

    const [answers, setAnswers] = useState<number[]>([]);

    const handleLink = () => {
        if (code.length > 3) setIsLinked(true);
    };

    const handleAnswer = (val: number) => {
        setAnswers([...answers, val]);
        if (step < questions.length - 1) setStep(step + 1);
        else setStep(99); // Results
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                🌉 Compatibility Bridge
            </h3>

            {!isLinked ? (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">Sync with a potential spouse to compare answers anonymously.</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Partner Code"
                            className="flex-1 p-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                        <button onClick={handleLink} className="bg-rose-600 text-white px-4 py-2 rounded-lg font-bold">Sync</button>
                    </div>
                    <div className="text-center text-sm text-slate-400">or</div>
                    <button onClick={() => setIsLinked(true)} className="w-full border border-rose-600 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-lg font-bold">
                        Play Solo Mode
                    </button>
                </div>
            ) : step < questions.length ? (
                <div className="animate-fade-in text-center space-y-6">
                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-3xl mx-auto">
                        ❓
                    </div>
                    <h4 className="text-xl font-bold">{questions[step].q}</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(0)} className="p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 transition-all font-bold">
                            {questions[step].a}
                        </button>
                        <button onClick={() => handleAnswer(1)} className="p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 transition-all font-bold">
                            {questions[step].b}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in text-center">
                    <div className="text-6xl mb-4">🔥</div>
                    <h4 className="text-2xl font-bold mb-2">85% Compatibility!</h4>
                    <p className="mb-4 text-slate-500">You align on family size but differ on location.</p>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl text-left border border-amber-200">
                        <strong className="text-amber-800 dark:text-amber-400">Discussion Prompt:</strong>
                        <p className="italic">"What does an ideal weekend look like to you in the city vs suburbs?"</p>
                    </div>
                    <button onClick={() => { setIsLinked(false); setStep(0); setAnswers([]); }} className="mt-6 text-rose-500 underline">Reset</button>
                </div>
            )}
        </div>
    );
};

const ConflictDojo = () => {
    const [scenario, setScenario] = useState<string | null>(null);
    const [chat, setChat] = useState<{ role: 'ai' | 'user', text: string }[]>([]);

    const startScenario = (topic: string) => {
        setScenario(topic);
        setChat([{ role: 'ai', text: "I noticed you've been distant lately. Is it something I did? (Trying to be gentle)" }]);
    };

    const handleReply = (emotional: boolean) => {
        if (emotional) {
            setChat(prev => [
                ...prev,
                { role: 'user', text: "You always ignore me! It's so annoying!" },
                { role: 'ai', text: "⚠️ Feedback: Using 'You always' triggers defensiveness. Try 'I feel ignored when...'." }
            ]);
        } else {
            setChat(prev => [
                ...prev,
                { role: 'user', text: "I've been feeling a bit lonely. Can we spend time together?" },
                { role: 'ai', text: "✅ Excellent. Vulnerability invites connection. My response: 'I'm sorry, I didn't realize. Let's have tea tonight.'" }
            ]);
        }
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">🥋 AI Conflict Dojo</h3>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Beta</span>
            </div>

            {!scenario ? (
                <div className="grid gap-3">
                    <p className="text-slate-400 mb-2">Choose a scenario to practice:</p>
                    {['Feeling Ignored', 'FInancial Stress', 'In-Law Drama'].map(s => (
                        <button key={s} onClick={() => startScenario(s)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-left font-bold transition-colors">
                            {s}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-slate-800/50 rounded-xl p-4 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
                        {chat.map((c, i) => (
                            <div key={i} className={`p-3 rounded-lg max-w-[85%] ${c.role === 'ai' ? 'bg-slate-700 self-start mr-auto' : 'bg-rose-600 self-end ml-auto'}`}>
                                <p className="text-sm">{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                        <button onClick={() => handleReply(true)} className="p-3 bg-red-900/50 hover:bg-red-800/50 rounded-lg text-xs border border-red-500/30">
                            Create Drama 😠
                        </button>
                        <button onClick={() => handleReply(false)} className="p-3 bg-green-900/50 hover:bg-green-800/50 rounded-lg text-xs border border-green-500/30">
                            Islamic Approach 🌿
                        </button>
                    </div>
                    <button onClick={() => { setScenario(null); setChat([]); }} className="mt-4 text-xs text-slate-500 hover:text-white">Exit Dojo</button>
                </div>
            )}
        </div>
    );
};

const SakinahGarden = () => {
    const [growth, setGrowth] = useState(30);

    const actions = [
        { label: "Prayed Together", val: 10, icon: "🕌" },
        { label: "Date Night", val: 15, icon: "🌹" },
        { label: "Said 'I Love You'", val: 5, icon: "❤️" },
        { label: "Forgave a Mistake", val: 20, icon: "🤝" }
    ];

    const waterPlant = (amount: number) => {
        setGrowth(Math.min(100, growth + amount));
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full text-center">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-emerald-600">
                🌿 Sakinah Garden
            </h3>
            <p className="text-sm text-slate-500 mb-6">Nurture your relationship daily.</p>

            <div className="relative w-48 h-48 mx-auto bg-sky-50 dark:bg-sky-900/20 rounded-full flex items-end justify-center overflow-hidden mb-6 border-4 border-sky-100 dark:border-sky-800">
                <div
                    className="w-full bg-emerald-500 transition-all duration-1000 ease-in-out relative"
                    style={{ height: `${growth}%` }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
                        {growth > 80 ? '🌳' : growth > 50 ? '🌱' : '🫘'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {actions.map((act, i) => (
                    <button
                        key={i}
                        onClick={() => waterPlant(act.val)}
                        className="p-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg text-xs font-bold transition-colors border border-slate-100 dark:border-slate-600"
                    >
                        {act.icon} {act.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const MarriageGuidePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('search');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* 1. SEARCH & PREP */}
                {activeTab === 'search' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Finding a Soulmate</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                The search for a spouse is a search for your partner in Jannah. It starts with knowing yourself and trusting Allah's plan.
                            </p>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
                                <h3 className="font-bold text-lg">🚩 Red Flags Checklist</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2">❌ Disrespects parents/waiters</li>
                                    <li className="flex gap-2">❌ Pressures you to break boundaries</li>
                                    <li className="flex gap-2">❌ Avoids questions about past/debt</li>
                                </ul>
                            </div>
                        </div>
                        <CompatibilityBridge />
                    </div>
                )}

                {/* 2. NIKKAH GUIDE */}
                {activeTab === 'nikkah' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">The Sacred Contract</h2>
                            <p className="text-lg opacity-80">A Nikkah is simple yet profound. It requires consent, witnesses, Mahr, and a Wali.</p>

                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200">
                                <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2">📜 Mahr (Dowry) Calculator</h3>
                                <p className="text-sm mb-4">There is no minimum or maximum, but it should be valuable and agreed upon.</p>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-bold uppercase">Amount</label>
                                        <input type="number" placeholder="5000" className="w-full p-2 rounded border bg-white dark:bg-slate-900" />
                                    </div>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="pay" defaultChecked /> Upfront</label>
                                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="pay" /> Deferred</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
                            <h3 className="text-2xl font-bold mb-4">Contract Conditions</h3>
                            <p className="mb-4 text-sm text-slate-500">You can add valid conditions to your Nikkah contract.</p>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer">
                                    <input type="checkbox" className="rounded text-rose-600" />
                                    <span>Right to complete education</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer">
                                    <input type="checkbox" className="rounded text-rose-600" />
                                    <span>Right to work</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer">
                                    <input type="checkbox" className="rounded text-rose-600" />
                                    <span>Location of residence preference</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. RIGHTS & HARMONY */}
                {activeTab === 'harmony' && (
                    <div className="animate-fade-in text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Balance of Rights</h2>
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-200">
                                <h3 className="font-bold text-blue-700 dark:text-blue-300 text-xl mb-4">Husband's Rights</h3>
                                <ul className="text-left space-y-2 text-sm">
                                    <li>• Respect & Leadership</li>
                                    <li>• Obedience (in good)</li>
                                    <li>• Protection of home/honor</li>
                                </ul>
                            </div>
                            <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-200">
                                <h3 className="font-bold text-rose-700 dark:text-rose-300 text-xl mb-4">Wife's Rights</h3>
                                <ul className="text-left space-y-2 text-sm">
                                    <li>• Financial Maintenance (Nafaqah)</li>
                                    <li>• Kind Treatment</li>
                                    <li>• Mahr (Dowry) ownership</li>
                                </ul>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-200 col-span-1 md:col-span-1">
                                <h3 className="font-bold text-purple-700 dark:text-purple-300 text-xl mb-4">Mutual Rights</h3>
                                <ul className="text-left space-y-2 text-sm">
                                    <li>• Intimacy & Love</li>
                                    <li>• Kindness (Mawaddah)</li>
                                    <li>• Raising Children</li>
                                </ul>
                            </div>
                        </div>
                        <SakinahGarden />
                    </div>
                )}

                {/* 4. CONFLICT DOJO */}
                {activeTab === 'conflict' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8 h-[500px]">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Fighting Fairly</h2>
                            <p className="text-lg mb-6 opacity-80">
                                Conflict is inevitable. Destruction is optional. Learn to communicate without wounding.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                                    <span className="text-2xl">🧊</span>
                                    <div>
                                        <strong>Cool Down Rule</strong>
                                        <p className="text-sm">Never argue while angry. Take a 20 min break (Wudu).</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                                    <span className="text-2xl">👂</span>
                                    <div>
                                        <strong>Active Listening</strong>
                                        <p className="text-sm">Repeat what they said before you reply.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <ConflictDojo />
                    </div>
                )}

                {/* 5. INTIMACY */}
                {activeTab === 'intimacy' && (
                    <div className="animate-fade-in max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold mb-4">MODESTY MODE: ON</span>
                            <h2 className="text-3xl font-bold mb-4">Blessed Connection</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                "And they (women) are a garment for you, and you are a garment for them." (2:187)
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-xl mb-2">Myths vs Reality</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 rounded-xl">
                                        <strong className="text-red-700 block mb-1">Myth:</strong>
                                        <p className="text-sm">Intimacy is taboo or 'dirty' in religion.</p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 rounded-xl">
                                        <strong className="text-green-700 block mb-1">Reality:</strong>
                                        <p className="text-sm">It is a rewarded act of charity (Sadaqah) and a right of both spouses.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center">
                                <h3 className="text-2xl font-bold mb-4">❤️ The Sunnah of Romance</h3>
                                <p className="mb-6">The Prophet ﷺ would race with Aisha (RA), drink from the same spot on her cup, and declare his love openly.</p>
                                <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-bold transition-all">
                                    Generate Date Idea 🎲
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. DIVORCE */}
                {activeTab === 'divorce' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">When Paths Part</h2>
                            <p className="text-lg mb-6 opacity-80">
                                Divorce is the most hated permissible act, but sometimes necessary. It must be done with kindness (Ihsan).
                            </p>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold mb-4">The Ethical Process</h3>
                                <ol className="space-y-4 list-decimal pl-4">
                                    <li><strong>Reconciliation Attempt:</strong> Appoint an arbiter from both families.</li>
                                    <li><strong>One Talaq Only:</strong> Pronounced once during a clear period (tuhr).</li>
                                    <li><strong>Iddah Period:</strong> 3 months waiting (stay in same home).</li>
                                    <li><strong>Final Decision:</strong> Retain with honor or release with kindness.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl flex flex-col justify-center items-center text-center">
                            <span className="text-6xl mb-4">🤝</span>
                            <h3 className="text-2xl font-bold mb-2">Co-Parenting Promise</h3>
                            <p className="text-slate-500 mb-6">
                                "Do not forget the grace between you." (2:237)
                                <br />Children are an amanah. Never use them as weapons.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MarriageGuidePage;
