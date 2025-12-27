import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'intro' | 'miracles' | 'themes' | 'preservation' | 'application';

interface MiracleCard {
    id: string;
    category: 'Scientific' | 'Linguistic' | 'Historical' | 'Mathematical';
    title: string;
    description: string;
    icon: string;
    details: string;
}

// --- Data ---
const MIRACLES: MiracleCard[] = [
    {
        id: 'embryology',
        category: 'Scientific',
        title: 'Embryological Accuracy',
        description: 'Detailed stages of fetal development described 1400 years ago.',
        icon: '👶',
        details: "The Quran describes the stages of the embryo as 'Nutfah' (drop), 'Alaqah' (clinging substance/leech-like), and 'Mudghah' (chewed substance). Modern embryology confirms these precise visual descriptions align with micoscopic stages unknown in the 7th century."
    },
    {
        id: 'mountains',
        category: 'Scientific',
        title: 'Mountains as Pegs',
        description: 'Geological function of mountains stabilizing the earth.',
        icon: '🏔️',
        details: "Surah An-Naba (78:7) asks: 'Have We not made the earth a resting place? And the mountains as stakes?' Geology confirms mountains have deep roots (isostasy) acting like pegs to stabilize tectonic plates."
    },
    {
        id: 'eloquence',
        category: 'Linguistic',
        title: 'The Challenge',
        description: 'The standing challenge to produce one chapter like it.',
        icon: '✒️',
        details: "The Quran challenged the masters of Arabic poetry to produce a single chapter (Surah) comparable to its eloquence. Despite their hostility and linguistic prowess, they failed. The challenge remains unmet for 1400 years."
    },
    {
        id: 'preservation',
        category: 'Historical',
        title: 'Perfect Preservation',
        description: 'The only religious text with identical copies worldwide.',
        icon: '🛡️',
        details: "Unlike other scriptures, the Quran has not been altered. A Quran from 1000 years ago in China matches exactly with one printed today in Morocco. Allah promised: 'We have sent down the Reminder, and We will surely be its Guardian.' (15:9)"
    }
];

const THEMES = [
    { id: 'tawhid', title: 'Oneness of God', icon: '☝️', desc: 'The central message: There is no god but Allah.', verses: '112:1-4' },
    { id: 'justice', title: 'Justice & Mercy', icon: '⚖️', desc: 'Upholding justice even against oneself.', verses: '4:135' },
    { id: 'purpose', title: 'Purpose of Life', icon: '🌱', desc: 'We were created to know and worship our Creator.', verses: '51:56' },
    { id: 'ethics', title: 'Moral Character', icon: '🤝', desc: 'Truthfulness, patience, and kindness to all.', verses: '33:21' },
    { id: 'social', title: 'Social Justice', icon: '🤲', desc: 'Rights of the poor, orphans, and neighbors.', verses: '90:11-16' },
    { id: 'nature', title: 'Nature & Signs', icon: '🌍', desc: 'Reflecting on the universe founds faith.', verses: '3:190' },
];

const TIMELINE_EVENTS = [
    { year: '610 CE', title: 'First Revelation', desc: 'Prophet Muhammad ﷺ receives the first verses in Cave Hira.', icon: 'cave' },
    { year: '610-632 CE', title: 'Oral & Written Recording', desc: 'Verses memorized by hundreds and written on parchment, bone, and stone immediately.', icon: 'writing' },
    { year: '632 CE', title: 'First Compilation', desc: 'Caliph Abu Bakr orders the collection of all spread manuscripts into one master copy.', icon: 'book' },
    { year: '650 CE', title: 'Standardization', desc: 'Caliph Uthman ensures standard pronunciation copies sent to major cities. (Birmingham Manuscript dates to this era).', icon: 'stamp' },
    { year: 'Today', title: 'Unchanged Text', desc: 'Millions of Huffaz (memorizers) preserve the exact same text recited 1400 years ago.', icon: 'users' },
];


// --- Phase 3 Data ---
const DAILY_VERSES = [
    { text: "And whoever relies upon Allah - then He is sufficient for him.", ref: "65:3", action: "Identify one worry you have today and consciously hand it over to Allah." },
    { text: "Call upon Me; I will respond to you.", ref: "40:60", action: "Make a sincere Dua (supplication) for something you previously thought was impossible." },
    { text: "So remember Me; I will remember you.", ref: "2:152", action: "Take 5 minutes today to disconnect from everything and just engage in Dhikr (remembrance)." }
];

const EMOTIONS = [
    { id: 'anxious', label: 'Anxious', icon: '😰', verse: "Unquestionably, by the remembrance of Allah hearts are assured.", ref: "13:28" },
    { id: 'sad', label: 'Sad', icon: '😢', verse: "Do not weaken and do not griece, and you will be superior if you are [true] believers.", ref: "3:139" },
    { id: 'lonely', label: 'Lonely', icon: '🍂', verse: "And We are closer to him than [his] jugular vein.", ref: "50:16" },
    { id: 'grateful', label: 'Grateful', icon: '✨', verse: "If you are grateful, I will surely increase you [in favor].", ref: "14:7" },
    { id: 'lost', label: 'Lost', icon: '🧭', verse: "And He found you lost and guided [you].", ref: "93:7" },
    { id: 'angry', label: 'Angry', icon: '😠', verse: "Who repress anger and who pardon the people - and Allah loves the doers of good.", ref: "3:134" }
];


// --- Components ---

const HeroSection: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Divine Wisdom
            </Link>

            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-bold mb-6 tracking-wide uppercase">
                The Final Revelation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                The Quran's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Message</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Discover the depth, miracles, and timeless wisdom of Allah's words to humanity.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
                {[
                    { id: 'intro', label: 'Introduction' },
                    { id: 'miracles', label: 'Miracles' },
                    { id: 'themes', label: 'Themes' },
                    { id: 'preservation', label: 'Preservation' },
                    { id: 'application', label: 'Application' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id as TabId)}
                        className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === tab.id
                            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    </div>
));

const IntroductionSection: React.FC = memo(() => (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5 mb-12 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What is the Quran?</h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto">
                The Quran is the literal word of God (Allah) revealed to the Prophet Muhammad ﷺ over a period of 23 years.
                It is the final testament in a long series of divine messages that includes the Torah, the Psalms, and the Gospel.
                Unlike other books, the Quran addresses all of humanity, offering guidance for every aspect of life.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20">
                    <span className="block text-3xl mb-2">📅</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mb-1">23 Years</span>
                    <span className="text-xs text-slate-500">Period of Revelation</span>
                </div>
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20">
                    <span className="block text-3xl mb-2">📑</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mb-1">114 Surahs</span>
                    <span className="text-xs text-slate-500">Chapters</span>
                </div>
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20">
                    <span className="block text-3xl mb-2">🔢</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mb-1">6,236 Ayat</span>
                    <span className="text-xs text-slate-500">Verses</span>
                </div>
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20">
                    <span className="block text-3xl mb-2">🌍</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mb-1">Universal</span>
                    <span className="text-xs text-slate-500">For all Mankind</span>
                </div>
            </div>
        </div>
    </div>
));

const MiraclesLab: React.FC = memo(() => {
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Scientific' | 'Linguistic' | 'Historical'>('All');

    // Filter logic
    const displayedMiracles = selectedCategory === 'All'
        ? MIRACLES
        : MIRACLES.filter(m => m.category === selectedCategory);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Signs of Divine Origin</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                    "We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth." (Quran 41:53)
                </p>

                <div className="flex justify-center gap-2 mb-8">
                    {['All', 'Scientific', 'Linguistic', 'Historical'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {displayedMiracles.map(miracle => (
                    <div key={miracle.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:scale-[1.01] shadow-lg group">
                        <div className="flex items-start justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-300">
                                {miracle.category}
                            </span>
                            <span className="text-4xl group-hover:scale-110 transition-transform">{miracle.icon}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{miracle.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{miracle.description}</p>

                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 italic">
                            "{miracle.details}"
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-8 rounded-3xl border border-emerald-500/20">
                <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Interactive Miracles Lab</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Explore 3D models and detailed scientific analysis in the full lab experience.
                </p>
                <button className="px-6 py-2 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors">
                    Coming in Phase 2
                </button>
            </div>
        </div>
    );
});

const ThemesNavigator: React.FC = memo(() => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Universal Themes</h2>
            <p className="text-slate-600 dark:text-slate-400">
                The Quran is not just a book of laws, but a comprehensive guide for the human soul, society, and existence.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEMES.map(theme => (
                <div key={theme.id} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        {theme.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{theme.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                        {theme.desc}
                    </p>
                    <div className="flex items-center text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <span>Read Verses ({theme.verses})</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

const PreservationTimeline: React.FC = memo(() => (
    <div className="animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Miracle of Preservation</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    "Indeed, it is We who sent down the Quran and indeed, We will be its guardian." (15:9)
                </p>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                <div className="space-y-12">
                    {TIMELINE_EVENTS.map((event, index) => (
                        <div key={index} className="relative flex gap-8 group">
                            {/* Dot */}
                            <div className="relative z-10 w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500">
                                {index === 0 ? '✨' : index === TIMELINE_EVENTS.length - 1 ? '🛡️' : '📜'}
                            </div>

                            <div className="flex-1 pt-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
                                    {event.year}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                    {event.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-3xl">
                    🔍
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Birmingham Manuscript (c. 568-645 CE)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Radiocarbon dating places this manuscript to the lifetime of the Prophet ﷺ or shortly after. The text matches today's Quran exactly.
                    </p>
                </div>
            </div>
        </div>
    </div>
));

const PlaceholderTabs: React.FC<{ title: string; desc: string }> = memo(({ title, desc }) => (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 text-center shadow-xl border border-slate-200 dark:border-white/5 animate-fade-in">
        <span className="text-6xl mb-6 block opacity-50">🚧</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            {desc}
        </p>
        <div className="inline-block px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold text-sm">
            Coming Soon
        </div>
    </div>
));

const DailyWisdomTool: React.FC = memo(() => {
    const verse = DAILY_VERSES[0];
    const [reflected, setReflected] = useState(false);

    return (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-6 backdrop-blur-sm border border-white/20">
                        <span>☀️</span>
                        <span>Verse of the Day</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif leading-relaxed mb-4">
                        "{verse.text}"
                    </h3>
                    <p className="text-emerald-100 font-bold mb-8">— Quran {verse.ref}</p>

                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                        <strong className="block text-emerald-200 text-xs uppercase tracking-wider mb-2">Today's Action Step</strong>
                        <p className="font-medium text-lg">{verse.action}</p>
                    </div>
                </div>

                <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span>📝</span> Daily Reflection
                    </h4>
                    {!reflected ? (
                        <>
                            <p className="text-slate-500 text-sm mb-4">How does this verse apply to your life right now?</p>
                            <textarea
                                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none mb-4"
                                placeholder="I feel that..."
                            ></textarea>
                            <button
                                onClick={() => setReflected(true)}
                                className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
                            >
                                Save Reflection
                            </button>
                        </>
                    ) : (
                        <div className="h-48 flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mb-4 text-emerald-600">
                                ✓
                            </div>
                            <h5 className="font-bold text-xl mb-1">Reflection Saved</h5>
                            <p className="text-slate-500 text-sm">May Allah increase you in wisdom.</p>
                            <button
                                onClick={() => setReflected(false)}
                                className="text-emerald-500 font-bold text-sm mt-4 hover:underline"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const EmotionMatcher: React.FC = memo(() => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-lg">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">How are you feeling?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Select an emotion to find Quranic guidance and comfort.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {EMOTIONS.map(emotion => (
                    <button
                        key={emotion.id}
                        onClick={() => setSelectedEmotion(emotion.id)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${selectedEmotion === emotion.id
                            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 ring-1 ring-amber-500'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <span className="text-3xl">{emotion.icon}</span>
                        <span className={`text-sm font-bold ${selectedEmotion === emotion.id ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                            {emotion.label}
                        </span>
                    </button>
                ))}
            </div>

            {selectedEmotion && (
                <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border-l-4 border-amber-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">📖</div>
                    {(() => {
                        const data = EMOTIONS.find(e => e.id === selectedEmotion);
                        if (!data) return null;
                        return (
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Allah's Guidance for You</p>
                                <h4 className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-4 font-serif">
                                    "{data.verse}"
                                </h4>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-400">— Surah {data.ref}</span>
                                    <button className="text-sm font-bold text-emerald-500 hover:underline">Read Full Surah →</button>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
});

// --- Phase 4 Data ---
const FATIHA_VERSES = [
    { arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", trans: "Bismillah hir-Rahman nir-Rahim", mean: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", trans: "Al-hamdu lillahi Rabbil-'alamin", mean: "[All] praise is [due] to Allah, Lord of the worlds." },
    { arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", trans: "Ar-Rahman nir-Rahim", mean: "The Entirely Merciful, the Especially Merciful." },
    { arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ", trans: "Maliki Yawmid-Din", mean: "Sovereign of the Day of Recompense." },
    { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", trans: "Iyyaka na'budu wa iyyaka nasta'in", mean: "It is You we worship and You we ask for help." },
    { arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", trans: "Ihdinas-Siratal-Mustaqim", mean: "Guide us to the straight path." },
    { arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", trans: "Siratal-ladhina an'amta 'alayhim...", mean: "The path of those upon whom You have bestowed favor..." }
];

// --- Phase 4 Components ---

const MemorizationStudio: React.FC = memo(() => {
    const [level, setLevel] = useState<0 | 1 | 2>(0); // 0: Show All, 1: Hide 50%, 2: Hide All
    const [revealed, setRevealed] = useState<number[]>([]);

    const toggleReveal = (index: number) => {
        if (revealed.includes(index)) {
            setRevealed(revealed.filter(i => i !== index));
        } else {
            setRevealed([...revealed, index]);
        }
    };

    const isHidden = (index: number, type: 'arabic' | 'trans' | 'mean') => {
        if (revealed.includes(index)) return false;
        if (level === 0) return false;
        if (level === 1) return index % 2 !== 0; // Hide every other line
        if (level === 2) return true; // Hide all
        return false;
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🧠</span> Memorization Studio
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Master Surah Al-Fatiha (The Opening)</p>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-full p-1">
                    {['Read', 'Practice', 'Test'].map((mode, idx) => (
                        <button
                            key={mode}
                            onClick={() => setLevel(idx as 0 | 1 | 2)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${level === idx
                                    ? 'bg-amber-500 text-white shadow-md'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {FATIHA_VERSES.map((verse, index) => (
                    <div
                        key={index}
                        onClick={() => level > 0 && toggleReveal(index)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${level > 0 && !revealed.includes(index)
                                ? 'bg-slate-50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-white/5'
                            }`}
                    >
                        {/* Verse Number Bubble */}
                        <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 text-xs flex items-center justify-center font-bold">
                            {index + 1}
                        </div>

                        <div className="text-center space-y-2 pt-2">
                            <p className={`font-quran text-2xl md:text-3xl text-slate-900 dark:text-white leading-relaxed ${isHidden(index, 'arabic') ? 'blur-md opacity-20 select-none' : ''}`}>
                                {verse.arabic}
                            </p>
                            <p className={`text-sm text-emerald-600 dark:text-emerald-400 font-medium ${isHidden(index, 'trans') ? 'opacity-0' : ''}`}>
                                {verse.trans}
                            </p>
                            <p className={`text-sm text-slate-500 italic ${isHidden(index, 'mean') ? 'opacity-0' : ''}`}>
                                {verse.mean}
                            </p>
                        </div>

                        {/* Reveal Hint */}
                        {level > 0 && !revealed.includes(index) && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-slate-900/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                    Click to Reveal
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});

const RecitationLab: React.FC = memo(() => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>

            <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <span>🎙️</span> Recitation Coach
                </h3>
                <p className="text-slate-400 text-sm mb-8">Listen to the expert, then record to compare.</p>

                {/* Visualizer Mockup */}
                <div className="h-32 bg-slate-800/50 rounded-2xl mb-8 flex items-end justify-center px-4 gap-1 border border-white/5 relative">
                    {/* Static Bars */}
                    {[40, 60, 30, 80, 50, 90, 40, 60, 30, 80, 50, 90, 40, 60, 30, 80, 50].map((h, i) => (
                        <div
                            key={i}
                            className={`w-2 rounded-full transition-all duration-300 ${isRecording || isPlaying
                                    ? 'bg-emerald-500 animate-pulse' // Simple pulse for activity
                                    : 'bg-slate-700'
                                }`}
                            style={{ height: (isRecording || isPlaying) ? `${Math.random() * 80 + 20}%` : `${h}%` }}
                        ></div>
                    ))}

                    {!isRecording && !isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-slate-500 text-xs font-mono">READY TO START</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-6">
                    <button
                        onClick={() => { setIsPlaying(!isPlaying); setIsRecording(false); }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${isPlaying
                                ? 'bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                                : 'bg-slate-800 text-amber-500 hover:bg-slate-700'
                            }`}
                    >
                        {isPlaying ? '⏸' : '▶'}
                    </button>

                    <button
                        onClick={() => { setIsRecording(!isRecording); setIsPlaying(false); }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all border-4 ${isRecording
                                ? 'bg-red-500 border-red-900 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse'
                                : 'bg-white border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-100'
                            }`}
                    >
                        {isRecording ? '⏹' : '●'}
                    </button>
                </div>

                <p className="mt-6 text-xs text-slate-500 font-mono">
                    {isRecording ? "RECORDING... 00:04" : isPlaying ? "PLAYING... 00:04" : "TAP TO RECORD"}
                </p>
            </div>
        </div>
    );
});

/**
 * The Quran's Message Page
 */
const TheQuranPage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<TabId | 'studio'>('intro');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 overflow-x-hidden">
            {/* Hero Section Updated Inline for Tab Logic */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden pb-16">
                <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

                <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
                    <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Divine Wisdom
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        The Quran's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Message</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover the depth, miracles, and timeless wisdom of Allah's words to humanity.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { id: 'intro', label: 'Introduction' },
                            { id: 'miracles', label: 'Miracles' },
                            { id: 'themes', label: 'Themes' },
                            { id: 'preservation', label: 'Preservation' },
                            { id: 'application', label: 'Application' },
                            { id: 'studio', label: 'Studio' }, // Added Studio Tab
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 rounded-full font-bold transition-all text-sm md:text-base ${activeTab === tab.id
                                        ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                {activeTab === 'intro' && <IntroductionSection />}
                {activeTab === 'miracles' && <MiraclesLab />}
                {activeTab === 'themes' && <ThemesNavigator />}
                {activeTab === 'preservation' && <PreservationTimeline />}
                {activeTab === 'application' && (
                    <div className="space-y-8 animate-fade-in">
                        <DailyWisdomTool />
                        <EmotionMatcher />
                    </div>
                )}
                {activeTab === 'studio' && (
                    <div className="space-y-8 animate-fade-in">
                        <MemorizationStudio />
                        <div className="max-w-2xl mx-auto">
                            <RecitationLab />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

TheQuranPage.displayName = 'TheQuranPage';

export default TheQuranPage;
