import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'tibb' | 'fitness' | 'mental' | 'detox' | 'buddy';

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Dynamic Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🍃</span> The Amanah of Body
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Health & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Wellness</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Honoring your physical trust through Prophetic wisdom and holistic science.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                "Your body has a right over you." — Prophet Muhammad (SAW)
            </p>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-5xl mx-auto">
        {[
            { id: 'tibb' as TabId, label: 'Tibb & Nutrition', icon: '🍯' },
            { id: 'fitness' as TabId, label: 'Fitness & Light', icon: '🏃' },
            { id: 'mental' as TabId, label: 'Mental', icon: '🧠' },
            { id: 'detox' as TabId, label: 'Detox Dojo', icon: '🛡️' },
            { id: 'buddy' as TabId, label: 'Health Buddy', icon: '🤝' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
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

const TibbCoach = () => {
    const [symptom, setSymptom] = useState('');
    const [result, setResult] = useState<{ remedy: string, hadith: string } | null>(null);

    const checkSymptom = (s: string) => {
        setSymptom(s);
        // Simple mock logic
        if (s.toLowerCase().includes('stomach') || s.toLowerCase().includes('pain')) {
            setResult({
                remedy: "Honey & Warm Water",
                hadith: "The Prophet (SAW) said: 'Healing is in three things: a gulp of honey, cupping, and branding with fire (cauterizing).' But I forbid my followers to use branding."
            });
        } else if (s.toLowerCase().includes('tired') || s.toLowerCase().includes('energy')) {
            setResult({
                remedy: "Talbina (Barley Soup)",
                hadith: "It soothes the grieving heart and cleanses the ailing heart just as one of you cleanses dirt from his face with water."
            });
        } else {
            setResult({
                remedy: "Black Seed (Nigella Sativa)",
                hadith: "Use the black seed, for indeed, it is a cure for all diseases except death."
            });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                🌿 AI Tibb Coach
            </h3>
            <p className="text-sm text-slate-500 mb-4">*Not medical advice. For spiritual & holistic support.</p>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <input
                        className="flex-1 p-3 rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-600"
                        placeholder="e.g., Stomach pain, low energy..."
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                    />
                    <button onClick={() => checkSymptom(symptom)} className="bg-emerald-600 text-white px-4 rounded-xl font-bold hover:bg-emerald-700">Ask</button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                    <button onClick={() => checkSymptom('Low Energy')} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Low Energy</button>
                    <button onClick={() => checkSymptom('Stomach Issues')} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Stomach Pain</button>
                    <button onClick={() => checkSymptom('Anxiety')} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Anxiety</button>
                </div>

                {result && (
                    <div className="animate-fade-in bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 className="font-bold text-lg mb-2 text-emerald-800 dark:text-emerald-300">💡 Sunnah Remedy: {result.remedy}</h4>
                        <p className="text-sm italic opacity-80">"{result.hadith}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const BodyOfLight = () => {
    // Mock health stats
    const [stats, setStats] = useState({ food: 50, move: 30, sleep: 70, soul: 40 });

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col items-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>

            <h3 className="text-2xl font-bold mb-2 relative z-10">🧘 Body of Light</h3>
            <p className="text-sm opacity-60 mb-6 relative z-10">Balance your Noor</p>

            <div className="relative w-48 h-64 mb-6 z-10">
                {/* Visual Representation of Glowing Avatar */}
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    {/* Head (Sleep) */}
                    <circle cx="50" cy="30" r="20" fill={`rgba(255, 255, 255, ${stats.sleep / 100})`} />
                    {/* Chest (Soul) */}
                    <rect x="30" y="55" width="40" height="40" rx="5" fill={`rgba(16, 185, 129, ${stats.soul / 100})`} />
                    {/* Stomach (Food) */}
                    <rect x="35" y="100" width="30" height="30" rx="5" fill={`rgba(245, 158, 11, ${stats.food / 100})`} />
                    {/* Legs (Move) */}
                    <path d="M 35 135 L 35 190 M 65 135 L 65 190" stroke={`rgba(59, 130, 246, ${stats.move / 100})`} strokeWidth="12" strokeLinecap="round" />
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full relative z-10">
                <button onClick={() => setStats(s => ({ ...s, food: Math.min(100, s.food + 10) }))} className="p-2 bg-amber-600/20 text-amber-200 text-xs rounded border border-amber-500/30">
                    Eat Tayyib (+Gut)
                </button>
                <button onClick={() => setStats(s => ({ ...s, move: Math.min(100, s.move + 10) }))} className="p-2 bg-blue-600/20 text-blue-200 text-xs rounded border border-blue-500/30">
                    Walk 1k (+Legs)
                </button>
                <button onClick={() => setStats(s => ({ ...s, sleep: Math.min(100, s.sleep + 10) }))} className="p-2 bg-white/10 text-white text-xs rounded border border-white/20">
                    Sleep Early (+Head)
                </button>
                <button onClick={() => setStats(s => ({ ...s, soul: Math.min(100, s.soul + 10) }))} className="p-2 bg-emerald-600/20 text-emerald-200 text-xs rounded border border-emerald-500/30">
                    Dhikr (+Heart)
                </button>
            </div>
        </div>
    );
};

const AddictionKiller = () => {
    const [streak, setStreak] = useState(12);
    const [panicMode, setPanicMode] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col items-center text-center">
            {!panicMode ? (
                <>
                    <h3 className="text-2xl font-bold mb-2 text-rose-600">🛡️ Detox Dojo</h3>
                    <div className="w-32 h-32 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center mb-6">
                        <span className="text-4xl font-black">{streak}</span>
                        <span className="text-xs uppercase font-bold text-slate-500">Days Clean</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 max-w-xs">"Indeed, Allah loves those who are constantly repentant and loves those who purify themselves." (2:222)</p>

                    <button
                        onClick={() => setPanicMode(true)}
                        className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-500/30 animate-pulse"
                    >
                        🚨 PANIC BUTTON (URGE)
                    </button>
                </>
            ) : (
                <div className="animate-fade-in space-y-6">
                    <h3 className="text-3xl font-bold text-emerald-600">BREATHE...</h3>
                    <div className="text-6xl animate-bounce">🌊</div>
                    <p className="text-xl font-medium">"Verily, in the remembrance of Allah do hearts find rest."</p>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        Say: <strong className="block text-lg mt-2">A'udhu billahi minash-shaytan ir-rajim</strong>
                    </div>
                    <button onClick={() => setPanicMode(false)} className="text-sm text-slate-400 font-bold hover:text-slate-600">I'm okay now</button>
                </div>
            )}
        </div>
    );
};

const HealthWellnessPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('tibb');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* 1. TIBB & NUTRITION */}
                {activeTab === 'tibb' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Healing from the Source</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                Prophetic Medicine is not just history—it's a lifestyle of prevention and holistic cures.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 rounded-xl text-center">
                                    <span className="text-3xl block mb-2">🍯</span>
                                    <strong className="block text-yellow-800 dark:text-yellow-400">Honey</strong>
                                    <span className="text-xs text-yellow-700">Gut Health & Immunity</span>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 rounded-xl text-center">
                                    <span className="text-3xl block mb-2">🌱</span>
                                    <strong className="block">Black Seed</strong>
                                    <span className="text-xs text-slate-500">Cure for everything</span>
                                </div>
                            </div>
                        </div>
                        <TibbCoach />
                    </div>
                )}

                {/* 2. FITNESS */}
                {activeTab === 'fitness' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4">Strength for Worship</h2>
                            <p className="text-lg opacity-80">
                                "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both."
                            </p>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg mb-4">🏹 Sunnah Sports</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">🏊</div>
                                        <div><strong>Swimming</strong><p className="text-xs text-slate-500">Full body endurance</p></div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🐎</div>
                                        <div><strong>Horse Riding</strong><p className="text-xs text-slate-500">Core stability & confidence</p></div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">🎯</div>
                                        <div><strong>Archery</strong><p className="text-xs text-slate-500">Focus & upper body</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BodyOfLight />
                    </div>
                )}

                {/* 3. MENTAL & SLEEP */}
                {activeTab === 'mental' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center">
                                <h3 className="text-2xl font-bold mb-6">🌙 Sleep Sunnah Calculator</h3>
                                <div className="space-y-4 text-left">
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Target Fajr Wake Up</label>
                                        <select className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border text-lg">
                                            <option>5:00 AM</option>
                                            <option>5:30 AM</option>
                                            <option>6:00 AM</option>
                                        </select>
                                    </div>
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                        <strong className="block text-indigo-700 dark:text-indigo-400">Results:</strong>
                                        <ul className="text-sm mt-2 space-y-1">
                                            <li>📵 Screens Off: 9:00 PM</li>
                                            <li>🛏️ Bedtime: 10:00 PM</li>
                                            <li>💤 Qailulah (Nap): 1:30 PM (20m)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-sm flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-4">Daily Heart Check</h3>
                                <p className="mb-6 opacity-70">How is your heart feeling today?</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">😰 Anxious</button>
                                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">🙁 Heavy</button>
                                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">😌 Grateful</button>
                                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">😶 Numb</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. DETOX DOJO */}
                {activeTab === 'detox' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8 h-[400px]">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Breaking Chains</h2>
                            <p className="text-lg mb-6 opacity-80">
                                Addiction is a test, not just a sin. Recovery requires spiritual tawbah and physical discipline.
                            </p>
                            <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 rounded-r-xl">
                                <strong>Safety Tip:</strong> Use the "Ghost Mode" to blur your screen if someone walks in.
                            </div>
                        </div>
                        <AddictionKiller />
                    </div>
                )}

                {/* 5. HEALTH BUDDY */}
                {activeTab === 'buddy' && (
                    <div className="animate-fade-in text-center py-10">
                        <div className="text-6xl mb-4">🤝</div>
                        <h2 className="text-3xl font-bold mb-4">Health Buddy</h2>
                        <p className="max-w-md mx-auto text-slate-500 mb-8">Prophet Muhammad (SAW) would race with Aisha (RA). Fitness is better together.</p>

                        <div className="flex flex-col max-w-sm mx-auto gap-4">
                            <div className="p-4 border rounded-xl flex items-center justify-between bg-white dark:bg-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">👤</div>
                                    <div className="text-left">
                                        <strong>You</strong>
                                        <div className="text-xs text-slate-500">5,432 steps</div>
                                    </div>
                                </div>
                                <span className="text-emerald-600 font-bold">Today</span>
                            </div>

                            <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                + Invite Buddy (Share Link)
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HealthWellnessPage;
