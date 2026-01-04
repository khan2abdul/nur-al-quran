import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'identity' | 'academics' | 'peer-pressure' | 'career' | 'social' | 'mental-health' | 'tools';

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Dynamic Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-indigo-200 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🚀</span> For Gen Z & Young Millennials
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Youth & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">Students</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Navigate identity, success, and modern challenges with confidence and faith.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                A judgment-free zone giving you the tools to thrive as a young Muslim in today's world.
            </p>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto">
        {[
            { id: 'identity' as TabId, label: 'Identity', icon: '🆔' },
            { id: 'academics' as TabId, label: 'Academics', icon: '📚' },
            { id: 'peer-pressure' as TabId, label: 'Peer Pressure', icon: '🛡️' },
            { id: 'career' as TabId, label: 'Career', icon: '💼' },
            { id: 'social' as TabId, label: 'Social Life', icon: '🤝' },
            { id: 'mental-health' as TabId, label: 'Mental Health', icon: '🧠' },
            { id: 'tools' as TabId, label: 'More Tools', icon: '🛠️' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/30'
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

const IdentityNavigator = () => {
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const questions = [
        { q: "How connected do you feel to Islam right now?", options: ["Deeply connected", "It varies", "Feeling distant"], weights: [3, 2, 1] },
        { q: "Do you hide your faith at school or work?", options: ["Never, I'm open", "Sometimes", "Mostly/Always"], weights: [3, 2, 1] },
        { q: "Are you proud to say you're Muslim?", options: ["Yes, absolutely", "Usually", "I struggle with it"], weights: [3, 2, 1] },
        { q: "Do you feel torn between cultures?", options: ["No, I'm balanced", "Sometimes", "Often feel confused"], weights: [3, 2, 1] },
    ];

    const handleAnswer = (idx: number, weight: number) => {
        setScore(prev => prev + weight);
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">🧭 Identity Navigator</h3>
            {!completed ? (
                <div className="space-y-6">
                    {questions.map((q, qIdx) => (
                        <div key={qIdx} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0">
                            <p className="font-medium mb-3 text-lg">{q.q}</p>
                            <div className="flex flex-wrap gap-2">
                                {q.options.map((opt, oIdx) => (
                                    <button
                                        key={oIdx}
                                        onClick={() => {
                                            handleAnswer(qIdx, q.weights[oIdx]);
                                            if (qIdx === questions.length - 1) setCompleted(true);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-sm"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <p className="text-sm text-slate-500 italic">Select the answer that feels most true to you today.</p>
                </div>
            ) : (
                <div className="text-center animate-fade-in py-8">
                    <div className="text-6xl mb-4">
                        {score >= 10 ? '🌟' : score >= 7 ? '🌱' : '❤️'}
                    </div>
                    <h4 className="text-2xl font-bold mb-2">
                        {score >= 10 ? 'Strong Identity' : score >= 7 ? 'Growing Identity' : 'Identity In Progress'}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                        {score >= 10
                            ? "MashaAllah! You seem confident and integrated. Use your strength to help others who might be struggling."
                            : score >= 7
                                ? "You're on the right path! It's normal to have ups and downs. Keep feeding your soul with knowledge and good company."
                                : "It's okay to feel this way. Many youth struggle with belonging. You are valuable to Allah regardless of where you are right now."}
                    </p>
                    <button onClick={() => { setScore(0); setCompleted(false); }} className="text-indigo-500 hover:underline">Retake Assessment</button>
                </div>
            )}
        </div>
    );
};

const PeerPressureSimulator = () => {
    const [scenario, setScenario] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    const scenarios = [
        {
            title: "The Party Invite",
            desc: "Everyone's going to a party tonight. There will be alcohol and mixed dancing. Your crush asks you to come.",
            options: [
                { text: "Go but promise yourself not to drink.", correct: false, reason: "Risky! Being in that environment compromises your values and spiritual state." },
                { text: "Lie and say you're sick.", correct: false, reason: "Lying isn't the prophetic way. Better to be honest or polite." },
                { text: "Politely decline: 'Not my scene, but have fun.'", correct: true, reason: "Perfect. Confident, polite, and protects your deen without being preachy." },
            ]
        },
        {
            title: "Dating Pressure",
            desc: "Your friends are all dating. They ask why you aren't and say you're missing out.",
            options: [
                { text: "Get defensive and lecture them.", correct: false, reason: "Anger pushes people away. Show the beauty of your values instead." },
                { text: "Explain: 'I'm waiting for the right time and the right way (marriage). I value my heart too much.'", correct: true, reason: "Beautiful response. Shows self-worth and adherence to Allah's wisdom." },
                { text: "Make up a fake partner.", correct: false, reason: "Honesty is a core trait of a believer." },
            ]
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">🎭 Peer Pressure Sim</h3>

            {scenario < scenarios.length ? (
                <div>
                    <div className="mb-6">
                        <h4 className="font-bold text-xl mb-2 text-indigo-600 dark:text-indigo-400">{scenarios[scenario].title}</h4>
                        <p className="text-lg">{scenarios[scenario].desc}</p>
                    </div>

                    <div className="space-y-3">
                        {scenarios[scenario].options.map((opt, idx) => (
                            <button
                                key={idx}
                                disabled={feedback !== null}
                                onClick={() => setFeedback(opt.reason)}
                                className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all font-medium"
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>

                    {feedback && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl animate-fade-in border border-indigo-100 dark:border-indigo-800">
                            <p className="font-bold mb-2">Analysis:</p>
                            <p className="mb-4">{feedback}</p>
                            <button
                                onClick={() => { setFeedback(null); setScenario(prev => prev + 1); }}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold"
                            >
                                Next Scenario
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h4 className="text-2xl font-bold mb-4">Simulation Complete! 🎉</h4>
                    <p>You're building the muscles to stand strong in real life.</p>
                    <button onClick={() => setScenario(0)} className="mt-4 text-indigo-500">Restart</button>
                </div>
            )}
        </div>
    );
};

const AcademicPlanner = () => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">📅 Study & Prayer Planner</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Align your study sessions with your Salah for maximum barakah.</p>

            <div className="space-y-4">
                {[
                    { time: "Fajr Time", activity: "Memorization / Hard Subjects", icon: "🌅", reason: "Brain is freshest." },
                    { time: "Dhuhr Break", activity: "Prayer + Lunch + Power Nap", icon: "☀️", reason: "Reset focus." },
                    { time: "Afternoon", activity: "Reading / Writing / Assignments", icon: "📝", reason: "Steady energy." },
                    { time: "Maghrib/Isha", activity: "Review / Light Study", icon: "🌙", reason: "Wind down." },
                ].map((slot, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                        <span className="text-3xl">{slot.icon}</span>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{slot.time}</h4>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">{slot.activity}</p>
                            <p className="text-xs text-slate-500 mt-1">{slot.reason}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HalalCareerExplorer = () => {
    const [selectedField, setSelectedField] = useState('tech');

    const careers = {
        tech: { title: "Tech & Engineering", salary: "£60k - £150k+", whyHalal: "Building beneficial solutions for humanity.", roles: ["Software Dev", "Data Scientist", "Civil Engineer"] },
        health: { title: "Healthcare", salary: "£80k - £200k+", whyHalal: "Saving lives is like saving all of humanity.", roles: ["Doctor", "Nurse", "Pharmacist"] },
        finance: { title: "Islamic Finance", salary: "£70k - £180k+", whyHalal: "Providing ethical, interest-free alternatives.", roles: ["Sharia Advisor", "Ethical Banker", "Validating Assets"] },
        edu: { title: "Education", salary: "£40k - £100k+", whyHalal: "Spreading knowledge is Sadaqah Jariyah.", roles: ["Teacher", "Professor", "Admin"] },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">💼 Halal Career Explorer</h3>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {Object.keys(careers).map(key => (
                    <button
                        key={key}
                        onClick={() => setSelectedField(key)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${selectedField === key ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                    >
                        {careers[key as keyof typeof careers].title}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xl font-bold mb-2">{careers[selectedField as keyof typeof careers].title}</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase">Potential Salary</p>
                        <p className="font-bold text-green-600">{careers[selectedField as keyof typeof careers].salary}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase">Impact</p>
                        <p className="font-bold text-indigo-600">High</p>
                    </div>
                </div>
                <p className="mb-4 text-slate-700 dark:text-slate-300"><strong>Why it's Halal/Good:</strong> {careers[selectedField as keyof typeof careers].whyHalal}</p>
                <div>
                    <strong className="block mb-2 text-sm">Common Roles:</strong>
                    <div className="flex flex-wrap gap-2">
                        {careers[selectedField as keyof typeof careers].roles.map(role => (
                            <span key={role} className="px-3 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-xs font-medium">
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const YouthGuidePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('identity');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {activeTab === 'identity' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Who Am I?</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                Caught between two worlds? Feeling "too Muslim" for school but "too Western" for home? You're not alone.
                                Creating a harmony between your faith and your environment is the key to confidence.
                            </p>
                            <IdentityNavigator />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10 text-9xl">🌍</div>
                                <h3 className="text-2xl font-bold mb-4">Dual Identity Harmony</h3>
                                <p className="mb-6 opacity-90 text-lg">
                                    You don't have to choose. You can be fully Muslim AND fully yourself.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✅</div>
                                        <span>My nationality is my home.</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✅</div>
                                        <span>My faith is my compass.</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✅</div>
                                        <span>My culture is my flavor.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'academics' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Excellence is Worship</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                Did you know that studying with the right intention counts as Ibadah?
                                Muslims who pray 5 times a day actually have higher GPAs on average due to discipline!
                            </p>
                            <AcademicPlanner />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold mb-4">🎓 Campus Survival Guide</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Find the quiet prayer spots on campus immediately.",
                                        "Join the MSA (Muslim Student Association) - it's your lifeline.",
                                        "Schedule classes around Jummah if possible.",
                                        "Keep wudu socks handy for quick ablutions.",
                                    ].map((tip, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="text-indigo-500 font-bold">{i + 1}.</span>
                                            <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'peer-pressure' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Standing Strong</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                48% of Muslim youth face bullying or pressure. Being different isn't easy, but it's powerful.
                                Practicing saying "No" respectfully is a superpower.
                            </p>
                            <PeerPressureSimulator />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-4">📱 Social Media Reality Check</h3>
                                <p className="mb-6 text-slate-300">
                                    Your feed shapes your mind. Are you consuming content that makes you anxious or content that empowers you?
                                </p>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/10 rounded-xl">
                                        <h4 className="font-bold text-yellow-400 mb-1">Challenge</h4>
                                        <p>Unfollow 3 accounts today that make you feel feeling 'less than'.</p>
                                    </div>
                                    <div className="p-4 bg-white/10 rounded-xl">
                                        <h4 className="font-bold text-green-400 mb-1">Tip</h4>
                                        <p>Don't scroll first thing in the morning. Start with Bismillah and gratitude.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'career' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Future Starts Now</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                You don't have to choose between success and Islam. The world's top doctors, engineers, and innovators include devout Muslims.
                            </p>
                            <HalalCareerExplorer />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                                <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-300">💰 Financial Literacy 101</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <span className="text-2xl">🚫</span>
                                        <div>
                                            <strong>Avoid Riba (Interest)</strong>
                                            <p className="text-sm opacity-80">Credit cards and loans can be traps. Look for halal alternatives.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-2xl">💻</span>
                                        <div>
                                            <strong>Side Hustles</strong>
                                            <p className="text-sm opacity-80">Tutoring, design, or coding can earn you halal income while studying.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'mental-health' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">It's Okay Not To Be Okay</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                The Prophet ﷺ experienced sadness. Seeking help is a sign of strength, not weak faith.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm text-center">
                                <span className="text-4xl block mb-4">🧘</span>
                                <h3 className="font-bold mb-2">Anxiety</h3>
                                <p className="text-sm text-slate-500">Practice deep breathing (count to 4) + Dhikr ("Ala bi dhikrillahi tatma'innul qulub").</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm text-center">
                                <span className="text-4xl block mb-4">💔</span>
                                <h3 className="font-bold mb-2">Loneliness</h3>
                                <p className="text-sm text-slate-500">Connect with Allah in Sujood. You are never truly alone when He is with you.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm text-center">
                                <span className="text-4xl block mb-4">🆘</span>
                                <h3 className="font-bold mb-2">Need Help?</h3>
                                <p className="text-sm text-slate-500">Reach out to a counselor or trusted adult. <a href="#" className="text-indigo-500 underline">Helpline Resources</a></p>
                            </div>
                        </div>

                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-8 rounded-3xl text-center">
                            <h3 className="text-xl font-bold mb-4">❓ Am I Normal? Q&A</h3>
                            <p className="italic text-lg mb-4">"I have intrusive thoughts about faith. Am I a bad Muslim?"</p>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl inline-block text-left max-w-2xl">
                                <p><strong>Answer:</strong> Absolutely not! The Sahaba asked the Prophet ﷺ this same question. He said "That is clear faith." Establishing that you hate the thought proves your faith is real. Shaitan attacks treasure, not empty houses.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'social' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold mb-4">🤝 Friendship Analyzer</h3>
                            <p className="mb-4">"A person is on the religion of their friend." Who is in your circle?</p>
                            <div className="space-y-2">
                                {["Do they remind you to pray?", "Do you feel safe avoiding haram with them?", "Do they encourage your goals?"].map((q, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                        <span className="text-sm">{q}</span>
                                        <div className="flex gap-2">
                                            <button className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">Yes</button>
                                            <button className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">No</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold mb-4">👨‍👩‍👧‍👦 Parent-Teen Bridge</h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <h4 className="font-bold text-sm uppercase text-indigo-500 mb-1">Scenario</h4>
                                    <p className="font-medium">"My parents don't understand my mental health struggles."</p>
                                </div>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                                    <h4 className="font-bold text-sm mb-2">Try saying:</h4>
                                    <p className="italic">"I want to be the best version of myself for Allah and for you. Right now, I'm struggling with something internal. Can we talk about it without judgment?"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tools' && (
                    <div className="animate-fade-in text-center py-12">
                        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">More Tools Coming Soon</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['Goal Setter', 'Ramadan Guide', 'Leadership', 'Halal Entertainment'].map(tool => (
                                <div key={tool} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-60">
                                    <span className="block text-3xl mb-2">🚧</span>
                                    <span className="font-bold">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouthGuidePage;
