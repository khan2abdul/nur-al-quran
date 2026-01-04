import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'intro' | 'miracles' | 'themes' | 'preservation' | 'application' | 'studio';

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

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 text-white overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-bold mb-6 tracking-wide uppercase">
                The Final Revelation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                The Quran's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Message</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Discover the depth, miracles, and timeless wisdom of Allah's words to humanity.
            </p>
        </div>
    </div>
));
HeroSection.displayName = 'HeroSection';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto mb-12">
        {[
            { id: 'intro', label: 'Introduction', icon: '✨' },
            { id: 'miracles', label: 'Miracles', icon: '🔬' },
            { id: 'themes', label: 'Themes', icon: '🌍' },
            { id: 'preservation', label: 'Preservation', icon: '🛡️' },
            { id: 'application', label: 'Application', icon: '🤲' },
            { id: 'studio', label: 'Studio', icon: '🎙️' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as TabId)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
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
TabNavigation.displayName = 'TabNavigation';

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
    const [expandedMiracle, setExpandedMiracle] = useState<string | null>(null);

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
                    <div
                        key={miracle.id}
                        onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:scale-[1.01] shadow-lg group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-300">
                                {miracle.category}
                            </span>
                            <span className="text-4xl group-hover:scale-110 transition-transform">{miracle.icon}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{miracle.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{miracle.description}</p>

                        <div className={`overflow-hidden transition-all duration-500 ${expandedMiracle === miracle.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 italic mb-4">
                                "{miracle.details}"
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                                    📖 View Verses
                                </span>
                                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                                    🔬 Scientific Source
                                </span>
                            </div>
                        </div>

                        {/* Expand Indicator */}
                        <div className="flex items-center justify-center mt-4 text-slate-400 text-xs">
                            <span>{expandedMiracle === miracle.id ? '▲ Collapse' : '▼ Tap to Explore'}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mathematical Miracles Section */}
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl p-8 border border-purple-500/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-purple-500/20 flex items-center justify-center text-5xl">
                        🔢
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">Mathematical Patterns</h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                            The Quran contains remarkable numerical patterns. The word "day" appears 365 times. "Month" appears 12 times.
                            The ratio of "land" to "sea" matches Earth's actual ratio.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                <span className="text-lg">365</span> × Day
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                <span className="text-lg">12</span> × Month
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                <span className="text-lg">29%</span> Land : <span className="text-lg">71%</span> Sea
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const ThemesNavigator: React.FC = memo(() => {
    const [activeStory, setActiveStory] = useState(0);

    const STORIES = [
        { id: 'yusuf', title: 'Prophet Yusuf (Joseph)', theme: 'Patience & Trust', summary: 'From a well to the throne of Egypt—a story of betrayal, temptation, and ultimate triumph through faith.', verse: 'Surah 12' },
        { id: 'musa', title: 'Prophet Musa (Moses)', theme: 'Courage & Liberation', summary: 'The confrontation with Pharaoh, the parting of the sea, and the guidance of an entire nation.', verse: 'Surah 20, 26, 28' },
        { id: 'maryam', title: 'Maryam (Mary)', theme: 'Purity & Miracle', summary: 'The miraculous birth of Isa (Jesus) and the strength of a woman who trusted Allah completely.', verse: 'Surah 19' },
        { id: 'kahf', title: 'People of the Cave', theme: 'Faith Under Oppression', summary: "Young believers who fled persecution and were put to sleep for 300 years by Allah's mercy.", verse: 'Surah 18' },
    ];

    return (
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

            {/* Interactive Stories Carousel */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                        <span>📖</span> Stories of the Quran
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveStory(Math.max(0, activeStory - 1))}
                            className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setActiveStory(Math.min(STORIES.length - 1, activeStory + 1))}
                            className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-3xl shrink-0">
                            📜
                        </div>
                        <div className="flex-1">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{STORIES[activeStory].theme}</span>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{STORIES[activeStory].title}</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{STORIES[activeStory].summary}</p>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                                    {STORIES[activeStory].verse}
                                </span>
                                <button className="text-indigo-500 text-xs font-bold hover:underline">Read Full Story →</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Story Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {STORIES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveStory(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${activeStory === idx ? 'bg-indigo-500 w-6' : 'bg-slate-300 dark:bg-slate-600'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
});

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

const ReadingPlanTracker: React.FC = memo(() => {
    const [selectedPlan, setSelectedPlan] = useState<'7' | '30' | '60'>('30');
    const [currentDay, setCurrentDay] = useState(5); // Mock progress

    const plans = {
        '7': { label: '7 Days', desc: 'Intensive short Surahs', daily: '~16 pages/day' },
        '30': { label: '30 Days', desc: 'Complete Quran in a Month', daily: '~20 pages/day' },
        '60': { label: '60 Days', desc: 'Relaxed Pace', daily: '~10 pages/day' },
    };

    const progress = Math.round((currentDay / parseInt(selectedPlan)) * 100);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>📅</span> Reading Plan
                </h3>

                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-full p-1">
                    {Object.entries(plans).map(([key, plan]) => (
                        <button
                            key={key}
                            onClick={() => { setSelectedPlan(key as any); setCurrentDay(1); }}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedPlan === key
                                ? 'bg-emerald-500 text-white'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                        >
                            {plan.label}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                {plans[selectedPlan].desc} • <span className="font-bold text-emerald-600">{plans[selectedPlan].daily}</span>
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Day {currentDay} of {selectedPlan}</span>
                    <span>{progress}% Complete</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Today's Reading */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Today's Reading</span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Juz {currentDay} • Surah Al-Baqarah</h4>
                        <p className="text-sm text-slate-500">Pages 21-40</p>
                    </div>
                    <button
                        onClick={() => setCurrentDay(Math.min(parseInt(selectedPlan), currentDay + 1))}
                        className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
                    >
                        ✓ Mark Complete
                    </button>
                </div>
            </div>
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

// --- Phase 6 Components ---

const TajweedGuide: React.FC = memo(() => {
    const [selectedRule, setSelectedRule] = useState<number | null>(null);

    const TAJWEED_RULES = [
        { id: 1, name: 'Idgham', arabic: 'إدغام', color: 'bg-green-500', desc: 'Merging of a noon saakin or tanween with certain letters', example: 'مِن يَّقُولُ', letters: 'ي ن م و ل ر' },
        { id: 2, name: 'Ikhfa', arabic: 'إخفاء', color: 'bg-orange-500', desc: 'Hiding the noon saakin with a light nasalization', example: 'مِنْ قَبْلِ', letters: '15 letters' },
        { id: 3, name: 'Iqlab', arabic: 'إقلاب', color: 'bg-pink-500', desc: 'Converting noon saakin to meem when followed by Ba', example: 'مِنْ بَعْدِ', letters: 'ب' },
        { id: 4, name: 'Izhar', arabic: 'إظهار', color: 'bg-blue-500', desc: 'Clear pronunciation of noon saakin', example: 'مِنْ عِلْمٍ', letters: 'ء ه ع ح غ خ' },
        { id: 5, name: 'Qalqalah', arabic: 'قلقلة', color: 'bg-purple-500', desc: 'Echoing sound on sukoon letters', example: 'خَلَقْ', letters: 'ق ط ب ج د' },
        { id: 6, name: 'Madd', arabic: 'مد', color: 'bg-red-500', desc: 'Elongation of vowel sounds', example: 'قَالَ', letters: 'ا و ي' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                    <span>🎵</span> Tajweed Rules
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Master the art of Quranic pronunciation</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {TAJWEED_RULES.map(rule => (
                    <button
                        key={rule.id}
                        onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
                        className={`p-4 rounded-2xl border transition-all text-center ${selectedRule === rule.id
                            ? 'border-2 border-slate-900 dark:border-white shadow-lg scale-105'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <div className={`w-4 h-4 rounded-full ${rule.color} mx-auto mb-2`}></div>
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">{rule.arabic}</span>
                        <span className="block text-xs text-slate-500">{rule.name}</span>
                    </button>
                ))}
            </div>

            {selectedRule && (
                <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    {(() => {
                        const rule = TAJWEED_RULES.find(r => r.id === selectedRule);
                        if (!rule) return null;
                        return (
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className={`w-16 h-16 rounded-2xl ${rule.color} flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
                                    {rule.arabic.charAt(0)}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{rule.name} ({rule.arabic})</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{rule.desc}</p>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold">Example: {rule.example}</span>
                                        <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold">Letters: {rule.letters}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
});

const CommentaryViewer: React.FC = memo(() => {
    const [activeScholar, setActiveScholar] = useState('tafsir-ibn-kathir');

    const SCHOLARS = [
        { id: 'tafsir-ibn-kathir', name: 'Ibn Kathir', era: '14th Century', style: 'Classical' },
        { id: 'tafsir-saadi', name: 'As-Saadi', era: '20th Century', style: 'Simplified' },
        { id: 'tafsir-qurtubi', name: 'Al-Qurtubi', era: '13th Century', style: 'Legal/Fiqh' },
    ];

    const SAMPLE_COMMENTARY = {
        'tafsir-ibn-kathir': "Ibn Kathir explains that 'Bismillah' means seeking Allah's blessing before any action. The Prophet ﷺ said: 'Any important matter that does not begin with Bismillah is cut off from blessings.'",
        'tafsir-saadi': "As-Saadi says: Beginning with Allah's name is an acknowledgment that all success comes from Him alone. It reminds the reader of their dependency on the Creator.",
        'tafsir-qurtubi': "Al-Qurtubi notes the legal implications: Scholars agree that saying Bismillah before eating is Sunnah, and some consider it obligatory before slaughtering.",
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                    <span>📚</span> Verse Commentary (Tafsir)
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Compare interpretations from renowned scholars</p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 mb-6 text-center border border-amber-100 dark:border-amber-500/20">
                <p className="text-2xl font-quran text-slate-900 dark:text-white mb-2">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Surah Al-Fatiha 1:1</p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
                {SCHOLARS.map(scholar => (
                    <button
                        key={scholar.id}
                        onClick={() => setActiveScholar(scholar.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeScholar === scholar.id
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200'
                            }`}
                    >
                        {scholar.name}
                    </button>
                ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-l-4 border-amber-500">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl shrink-0">
                        📖
                    </div>
                    <div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {SAMPLE_COMMENTARY[activeScholar as keyof typeof SAMPLE_COMMENTARY]}
                        </p>
                        <p className="text-xs text-slate-400 mt-4">
                            — {SCHOLARS.find(s => s.id === activeScholar)?.name} ({SCHOLARS.find(s => s.id === activeScholar)?.era})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

const ManuscriptViewer: React.FC = memo(() => {
    const [compareMode, setCompareMode] = useState(false);

    return (
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/patterns/paper-texture.png')] opacity-5"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <span>🏛️</span> Manuscript Heritage
                        </h3>
                        <p className="text-slate-400 text-sm">1400 years of unchanged preservation</p>
                    </div>
                    <button
                        onClick={() => setCompareMode(!compareMode)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${compareMode ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        {compareMode ? '✓ Compare Mode' : 'Compare'}
                    </button>
                </div>

                <div className={`grid gap-6 ${compareMode ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Ancient Manuscript */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Birmingham Manuscript (645 CE)</span>
                        </div>
                        <div className="bg-amber-900/20 rounded-xl p-6 text-center border border-amber-500/20">
                            <p className="text-3xl font-quran text-amber-200 leading-loose">
                                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                            </p>
                            <p className="text-xs text-amber-400/60 mt-2">Parchment, Hijazi Script</p>
                        </div>
                    </div>

                    {/* Modern Text */}
                    {compareMode && (
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10 animate-fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Modern Print (2024)</span>
                            </div>
                            <div className="bg-emerald-900/20 rounded-xl p-6 text-center border border-emerald-500/20">
                                <p className="text-3xl font-quran text-emerald-200 leading-loose">
                                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                                </p>
                                <p className="text-xs text-emerald-400/60 mt-2">Digital Uthmani Script</p>
                            </div>
                        </div>
                    )}
                </div>

                {compareMode && (
                    <div className="mt-6 text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                            <span>✓</span> 100% Match - Zero Alterations
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

// --- Phase 7 Components: Gamification ---

const AchievementBadges: React.FC = memo(() => {
    const BADGES = [
        { id: 'first-read', name: 'First Steps', icon: '🌱', desc: 'Read your first verse', unlocked: true },
        { id: 'week-streak', name: '7-Day Streak', icon: '🔥', desc: 'Read daily for a week', unlocked: true },
        { id: 'fatiha-memorized', name: 'Al-Fatiha Master', icon: '🧠', desc: 'Memorized Surah Al-Fatiha', unlocked: true },
        { id: 'themes-explorer', name: 'Theme Explorer', icon: '🧭', desc: 'Explored all 6 themes', unlocked: false },
        { id: 'tajweed-learner', name: 'Tajweed Student', icon: '🎵', desc: 'Learned 3 Tajweed rules', unlocked: false },
        { id: 'month-streak', name: '30-Day Champion', icon: '🏆', desc: 'Read daily for a month', unlocked: false },
        { id: 'juz-complete', name: 'Juz Completed', icon: '📖', desc: 'Finished one Juz', unlocked: false },
        { id: 'reflection-writer', name: 'Deep Thinker', icon: '✍️', desc: 'Wrote 5 reflections', unlocked: false },
    ];

    const unlockedCount = BADGES.filter(b => b.unlocked).length;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🏅</span> Your Achievements
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Celebrate your Quranic journey milestones</p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-amber-500">{unlockedCount}</span>
                    <span className="text-slate-400">/{BADGES.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BADGES.map(badge => (
                    <div
                        key={badge.id}
                        className={`p-4 rounded-2xl border text-center transition-all ${badge.unlocked
                            ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-500/30'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 opacity-50'
                            }`}
                    >
                        <span className={`text-4xl block mb-2 ${badge.unlocked ? '' : 'grayscale'}`}>{badge.icon}</span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{badge.name}</h4>
                        <p className="text-xs text-slate-500">{badge.desc}</p>
                        {badge.unlocked && (
                            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                                ✓ Unlocked
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});

const CelebrationBanner: React.FC = memo(() => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-[url('/patterns/confetti.svg')] opacity-20"></div>

            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl animate-bounce">
                        🎉
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Congratulations!</h3>
                        <p className="text-white/80 text-sm">You've completed your 7-day reading streak! Keep going!</p>
                    </div>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
});

const CommunityInspiration: React.FC = memo(() => {
    const REFLECTIONS = [
        { id: 1, user: 'Abdullah M.', location: 'Malaysia', text: "Surah Ar-Rahman always brings tears to my eyes. The repetition of 'Which of the favors of your Lord will you deny?' is so powerful.", likes: 42, verse: '55:13' },
        { id: 2, user: 'Fatima K.', location: 'Egypt', text: "When I was going through hardship, Surah Ad-Duha reminded me that Allah never abandons us.", likes: 87, verse: '93:3' },
        { id: 3, user: 'Omar S.', location: 'USA', text: "The story of Prophet Yusuf taught me true patience. No matter how long it takes, Allah's plan is always better.", likes: 156, verse: '12:87' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                    <span>💬</span> Community Reflections
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">See how the Quran touches hearts around the world</p>
            </div>

            <div className="space-y-4">
                {REFLECTIONS.map(reflection => (
                    <div key={reflection.id} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-white/5">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                {reflection.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-slate-900 dark:text-white">{reflection.user}</span>
                                    <span className="text-xs text-slate-400">• {reflection.location}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                    "{reflection.text}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Verse {reflection.verse}</span>
                                    <button className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors text-sm">
                                        <span>❤️</span> {reflection.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors">
                    Share Your Reflection
                </button>
            </div>
        </div>
    );
});


/**
 * The Quran's Message Page
 */
const TheQuranPage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<TabId>('intro');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 overflow-x-hidden">
            <HeroSection />

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="container mx-auto px-6 relative z-20">
                {activeTab === 'intro' && <IntroductionSection />}
                {activeTab === 'miracles' && <MiraclesLab />}
                {activeTab === 'themes' && <ThemesNavigator />}
                {activeTab === 'preservation' && <PreservationTimeline />}
                {activeTab === 'application' && (
                    <div className="space-y-8 animate-fade-in">
                        <CelebrationBanner />
                        <DailyWisdomTool />
                        <EmotionMatcher />
                        <ReadingPlanTracker />
                        <AchievementBadges />
                        <CommunityInspiration />
                    </div>
                )}
                {activeTab === 'studio' && (
                    <div className="space-y-8 animate-fade-in">
                        <MemorizationStudio />
                        <div className="max-w-2xl mx-auto">
                            <RecitationLab />
                        </div>
                        <TajweedGuide />
                        <CommentaryViewer />
                        <ManuscriptViewer />
                    </div>
                )}
            </div>
        </div>
    );
});

TheQuranPage.displayName = 'TheQuranPage';

export default TheQuranPage;
