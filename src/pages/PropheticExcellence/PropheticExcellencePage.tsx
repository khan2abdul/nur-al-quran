import React, { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

// --- Types ---
interface CharacterTrait {
    id: string;
    title: string;
    arabic: string;
    description: string;
    icon: string;
    color: string;
    stories: number;
    challenges: number;
}

interface AssessmentQuestion {
    id: number;
    text: string;
    trait: string;
    options: { value: number; label: string }[];
}

interface Story {
    id: number;
    title: string;
    trait: string;
    summary: string;
    fullText: string;
    source: string;
}

interface Hadith {
    id: number;
    text: string;
    narrator: string;
    source: string;
    tags: string[];
}

interface Scenario {
    id: number;
    title: string;
    situation: string;
    options: {
        id: string;
        text: string;
        outcome: string;
        score: number;
    }[];
}

interface RoutineItem {
    time: string;
    period: string;
    activity: string;
    icon: string;
    details: string;
}

interface RoadmapStage {
    id: number;
    level: string;
    title: string;
    description: string;
    requirements: string[];
    color: string;
}

// --- Data ---
const CHARACTER_TRAITS: CharacterTrait[] = [
    {
        id: 'kindness',
        title: 'Kindness & Compassion',
        arabic: 'الرِّفْق',
        description: 'Gentleness with all creation, mercy to the weak, and grace in interactions.',
        icon: '❤️',
        color: 'from-pink-500 to-rose-500',
        stories: 7,
        challenges: 5
    },
    {
        id: 'honesty',
        title: 'Honesty & Integrity',
        arabic: 'الصِّدْق',
        description: 'Unwavering truthfulness, trustworthiness (Al-Amin), and ethical dealings.',
        icon: '⚖️',
        color: 'from-blue-500 to-cyan-500',
        stories: 6,
        challenges: 4
    },
    {
        id: 'humility',
        title: 'Humility & Service',
        arabic: 'التَّوَاضُع',
        description: 'Serving others without pride, simplicity in living, and lack of arrogance.',
        icon: '🌱',
        color: 'from-emerald-500 to-teal-500',
        stories: 8,
        challenges: 6
    },
    {
        id: 'brotherhood',
        title: 'Brotherhood & Community',
        arabic: 'الْأُخُوَّة',
        description: 'Building strong bonds, fulfilling rights of neighbors, and unity.',
        icon: '🤝',
        color: 'from-amber-500 to-orange-500',
        stories: 5,
        challenges: 5
    }
];

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
    {
        id: 1,
        text: "When someone hurts or angers me, I tend to...",
        trait: 'kindness',
        options: [
            { value: 1, label: "React effectively with anger" },
            { value: 2, label: "Hold a grudge silently" },
            { value: 3, label: "Try to forgive but struggle" },
            { value: 4, label: "Forgive and move on" },
            { value: 5, label: "Respond with kindness and pray for them" }
        ]
    },
    {
        id: 2,
        text: "In my daily conversations, regarding the truth...",
        trait: 'honesty',
        options: [
            { value: 1, label: "I often exaggerate or lie" },
            { value: 2, label: "I sometimes tell 'white lies'" },
            { value: 3, label: "I am mostly honest but hide hard truths" },
            { value: 4, label: "I am honest even when difficult" },
            { value: 5, label: "I am always truthful in word and intent" }
        ]
    },
    {
        id: 3,
        text: "When dealing with people of lower status or power...",
        trait: 'humility',
        options: [
            { value: 1, label: "I feel superior to them" },
            { value: 2, label: "I treat them politely but distantly" },
            { value: 3, label: "I respect them as equals" },
            { value: 4, label: "I actively look for ways to help them" },
            { value: 5, label: "I serve them with genuine humility" }
        ]
    },
    {
        id: 4,
        text: "Regarding my neighbors and community...",
        trait: 'brotherhood',
        options: [
            { value: 1, label: "I don't know or care about them" },
            { value: 2, label: "I avoid disturbing them" },
            { value: 3, label: "I greet them when I see them" },
            { value: 4, label: "I help them when asked" },
            { value: 5, label: "I proactively care for their needs" }
        ]
    }
];

const CHALLENGES = [
    { day: 1, trait: 'kindness', title: "Smile Sunnah", task: "Smile at 5 people today (Sunnah: 'Smiling in the face of your brother is charity')" },
    { day: 2, trait: 'kindness', title: "Help Unasked", task: "Do a small favor for someone before they ask for it." },
    { day: 3, trait: 'honesty', title: "Truthful Tongue", task: "Commit to not telling even a single 'white lie' today." },
    { day: 4, trait: 'humility', title: "Secret Service", task: "Clean something or do a chore that no one will see or know about." },
    { day: 5, trait: 'brotherhood', title: "Check-in", task: "Call or text a friend/relative you haven't spoken to in a while." },
];

const STORIES: Story[] = [
    {
        id: 1,
        title: "The Crying Camel",
        trait: "Mercy to Animals",
        summary: "The Prophet ﷺ comforted a distressed camel and admonished its owner for mistreating it.",
        fullText: "One day, the Prophet ﷺ entered the garden of a man from the Ansar. Suddenly, there was a camel which, when it saw the Prophet ﷺ, groaned and tears flowed from its eyes. The Prophet ﷺ wiped its tears and it became calm. He asked, 'Who is the owner of this camel?' The owner came and said, 'It is mine, O Messenger of Allah.' The Prophet ﷺ said, 'Do you not fear Allah regarding this animal which He has stripped into your possession? It has complained to me that you starve it and overwork it.'",
        source: "Sunan Abi Dawud"
    },
    {
        id: 2,
        title: "The Bedouin in the Mosque",
        trait: "Gentleness & Teaching",
        summary: "Instead of scolding a Bedouin who made a mistake in the mosque, the Prophet ﷺ taught him with kindness.",
        fullText: "A Bedouin urinated in the mosque. Some of the people rushed to beat him. The Prophet ﷺ said, 'Leave him alone and pour a bucket of water over it. You have been sent to make things easy and not to make them difficult.' Afterward, he explained to the man gently that mosques are for prayer and remembrance of Allah, not for filth.",
        source: "Sahih Bukhari"
    },
    {
        id: 3,
        title: "The Shortened Prayer",
        trait: "Consideration for Others",
        summary: "The Prophet ﷺ would shorten his prayer when he heard a baby crying to ease the mother's heart.",
        fullText: "The Prophet ﷺ said, 'I stand for prayer intending to prolong it. Then I hear the crying of a child, so I shorten my prayer because I know how deeply his mother feels his crying.' This shows his immense sensitivity to the needs and feelings of others, even during the most sacred act of worship.",
        source: "Sahih Bukhari"
    }
];

const HADITHS: Hadith[] = [
    { id: 1, text: "The most perfect of believers in faith are those with the best character.", narrator: "Abu Hurairah (RA)", source: "Tirmidhi", tags: ["Character", "Faith"] },
    { id: 2, text: "Verily, I was sent only to perfect noble character.", narrator: "Abu Hurairah (RA)", source: "Musnad Ahmad", tags: ["Purpose", "Mission"] },
    { id: 3, text: "Nothing is heavier on the Scale of the Believer on the Day of Resurrection than good character.", narrator: "Abu Darda (RA)", source: "Tirmidhi", tags: ["Hereafter", "Reward"] }
];

const SCENARIOS: Scenario[] = [
    {
        id: 1,
        title: "The Borrowed Money",
        situation: "A close friend borrowed money from you a month ago and promised to pay it back last week. They haven't mentioned it, and you see them buying new clothes. What do you do?",
        options: [
            { id: 'a', text: "Confront them angrily in public about their irresponsibility.", outcome: "This may get your money back, but it damages the brotherhood and lacks gentleness.", score: 2 },
            { id: 'b', text: "Gossip to others about how untrustworthy they are.", outcome: "This is backbiting (Gheebah) and destroys your own good deeds.", score: 1 },
            { id: 'c', text: "Remind them gently and privately, giving them the benefit of the doubt.", outcome: "This follows the Sunnah of gentleness and preserving honor.", score: 4 },
            { id: 'd', text: "Forgive the debt if you can afford it, intending it as charity.", outcome: "This is the highest level of Ihsan (Excellence) and has immense reward.", score: 5 }
        ]
    }
];

// --- Phase 5 Data: Routine & Roadmap ---
const PROPHETIC_ROUTINE: RoutineItem[] = [
    { time: "Pre-Fajr", period: "Tahajjud", activity: "Night Prayer & Dua", icon: "🌙", details: "Waking up before dawn to pray, seek forgiveness, and connect with Allah in solitude." },
    { time: "Fajr", period: "Early Morning", activity: "Fajr Prayer & Dhikr", icon: "🕌", details: "Praying in congregation, followed by remembrance of Allah until sunrise." },
    { time: "Morning", period: "Duha", activity: "Community & Service", icon: "☀️", details: "Spending time with family, visiting the sick, earning a livelihood, and helping others." },
    { time: "Noon", period: "Dhuhr", activity: "Prayer & Siesta (Qaylula)", icon: "💤", details: "Midday prayer followed by a short nap to re-energize for the night prayers." },
    { time: "Night", period: "Isha", activity: "Prayer & Family", icon: "🏠", details: "Praying Isha, spending quality time with family, and going to sleep early." },
];

const ROADMAP: RoadmapStage[] = [
    { id: 1, level: "Muslim", title: "The Submitter", description: "Establishing the foundation of rituals and belief.", requirements: ["5 Daily Prayers", "Fasting Ramadan", "Paying Zakat"], color: "bg-slate-500" },
    { id: 2, level: "Mu'min", title: "The Believer", description: "Internalizing faith and embodying good character.", requirements: ["Control Anger", "Truthfulness", "Love for Brother"], color: "bg-emerald-500" },
    { id: 3, level: "Muhsin", title: "The Excellent", description: "Worshipping Allah as if you see Him.", requirements: ["Forgiveness", "Selflessness", "Constant Dhikr"], color: "bg-amber-500" }
];

// --- Components ---

const PropheticRoutine: React.FC = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
                🕰️ The Blessed Routine
            </h3>
            <div className="relative border-l-2 border-emerald-500/20 ml-6 space-y-8">
                {PROPHETIC_ROUTINE.map((item, index) => (
                    <div key={index} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-800"></div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider">{item.time}</span>
                            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{item.period}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <span>{item.icon}</span> {item.activity}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {item.details}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const CharacterRoadmap: React.FC = memo(() => {
    return (
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] opacity-5"></div>

            <h3 className="text-2xl font-bold mb-2 relative z-10">🗺️ Your Character Journey</h3>
            <p className="text-slate-300 mb-8 relative z-10 max-w-2xl">
                The path of self-purification (Tazkiyah) has stages. Where are you on your journey to Excellence?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {ROADMAP.map((stage) => (
                    <div key={stage.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 ${stage.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${stage.color.replace('bg-', 'bg-') + '/20 text-white border border-white/20'}`}>
                                {stage.id}
                            </span>
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{stage.level}</span>
                        </div>

                        <h4 className="text-xl font-bold mb-2">{stage.title}</h4>
                        <p className="text-sm text-slate-300 mb-6 h-10">{stage.description}</p>

                        <div className="space-y-2">
                            {stage.requirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    {req}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const StoryLibrary: React.FC = memo(() => {
    const [selectedStory, setSelectedStory] = useState<number | null>(null);

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Stories from the Seerah</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STORIES.map(story => (
                    <div key={story.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all flex flex-col h-full">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">{story.trait}</span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{story.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            {story.summary}
                        </p>
                        <button
                            onClick={() => setSelectedStory(story.id)}
                            className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors"
                        >
                            Read Full Story
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for full story */}
            {selectedStory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-white/10">
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
                        >
                            ✕
                        </button>

                        {(() => {
                            const story = STORIES.find(s => s.id === selectedStory);
                            if (!story) return null;
                            return (
                                <>
                                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4">
                                        {story.trait}
                                    </span>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{story.title}</h3>
                                    <div className="prose dark:prose-invert max-w-none mb-8">
                                        <p className="text-lg leading-loose text-slate-700 dark:text-slate-300">
                                            {story.fullText}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-400 border-t border-slate-100 dark:border-white/5 pt-4">
                                        <span>Source: <span className="font-semibold text-slate-600 dark:text-slate-400">{story.source}</span></span>
                                        <button className="text-emerald-500 font-bold hover:underline">Share Story</button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
});

const WisdomVault: React.FC = memo(() => {
    return (
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-3xl p-8 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">Pearls of Prophetic Wisdom</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {HADITHS.map(hadith => (
                    <div key={hadith.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-4xl text-emerald-500/30 font-serif absolute -mt-4 -ml-2">“</div>
                        <p className="text-lg font-medium leading-relaxed mb-6 relative z-10">
                            {hadith.text}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>{hadith.narrator}</span>
                            <span className="px-2 py-1 rounded bg-white/5 text-xs">{hadith.source}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const MorningIntention: React.FC = memo(() => {
    const [intention, setIntention] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const handleSet = (trait: string) => {
        setIntention(trait);
        setSaved(true);
    };

    if (saved) {
        return (
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center animate-fade-in h-full flex flex-col justify-center">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">Today's Intention Set</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">
                    "I will embody <span className="text-emerald-500">{intention}</span> today."
                </p>
                <div className="mt-4 text-sm text-slate-500">
                    Come back this evening to reflect on your progress.
                </div>
                <button
                    onClick={() => setSaved(false)}
                    className="mt-4 text-xs text-slate-400 hover:text-emerald-500 underline"
                >
                    Change Intention
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl h-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                ☀️ Morning Intention
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                The Prophet ﷺ said: "Actions are but by intentions." Set a character goal for today to focus your spiritual energy.
            </p>
            <div className="flex flex-wrap gap-2">
                {['Kindness', 'Patience', 'Honesty', 'Humility', 'Generosity'].map(trait => (
                    <button
                        key={trait}
                        onClick={() => handleSet(trait)}
                        className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:-translate-y-0.5"
                    >
                        {trait}
                    </button>
                ))}
            </div>
        </div>
    );
});

const DailyCharacterChallenge: React.FC = memo(() => {
    const [currentDay, setCurrentDay] = useState(1);
    const [completedDays, setCompletedDays] = useState<number[]>([1]); // Mock completed days

    const challenge = CHALLENGES.find(c => c.day === currentDay) || CHALLENGES[0];
    const isCompleted = completedDays.includes(currentDay);

    const toggleComplete = () => {
        if (isCompleted) {
            setCompletedDays(prev => prev.filter(d => d !== currentDay));
        } else {
            setCompletedDays(prev => [...prev, currentDay]);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold mb-3 border border-white/20 uppercase tracking-wider">
                            Day {currentDay} of 30
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{challenge.title}</h3>
                        <div className="flex items-center gap-2 text-indigo-200 text-sm">
                            <span className="capitalize bg-white/10 px-2 py-0.5 rounded text-xs">{challenge.trait}</span>
                            <span>•</span>
                            <span>30 Day Challenge</span>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold">{completedDays.length}</div>
                        <div className="text-xs text-indigo-200 uppercase tracking-wider font-bold">Day Streak</div>
                    </div>
                </div>

                <div className="bg-black/20 p-6 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm">
                    <p className="text-lg md:text-xl text-indigo-50 leading-relaxed font-medium">
                        {challenge.task}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {[1, 2, 3, 4, 5].map(day => (
                            <button
                                key={day}
                                onClick={() => setCurrentDay(day)}
                                className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all ${currentDay === day
                                    ? 'bg-white text-indigo-600 scale-110 shadow-lg'
                                    : completedDays.includes(day)
                                        ? 'bg-emerald-500 text-white border border-emerald-400'
                                        : 'bg-indigo-800/50 text-indigo-300 border border-indigo-700'
                                    }`}
                            >
                                {completedDays.includes(day) && currentDay !== day ? '✓' : day}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={toggleComplete}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 ${isCompleted
                            ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                            : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-black/20'
                            }`}
                    >
                        {isCompleted ? (
                            <><span>✓</span> Completed</>
                        ) : (
                            <><span>○</span> Mark Complete</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
});

const KindnessTracker: React.FC = memo(() => {
    const [acts, setActs] = useState([
        { id: 1, text: "Gave water to a stray cat", category: 'Animals', date: '2h ago' },
        { id: 2, text: "Helped mom with the dishes", category: 'Family', date: '5h ago' }
    ]);
    const [newAct, setNewAct] = useState('');

    const handleAdd = () => {
        if (!newAct.trim()) return;
        setActs(prev => [{ id: Date.now(), text: newAct, category: 'General', date: 'Just now' }, ...prev]);
        setNewAct('');
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-white/5 h-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                ❤️ Kindness Tracker
            </h3>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newAct}
                    onChange={(e) => setNewAct(e.target.value)}
                    placeholder="I smiled at..."
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-emerald-500/20"
                >
                    Log
                </button>
            </div>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {acts.map(act => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 flex justify-between items-center group hover:border-emerald-500/20 transition-colors">
                        <div>
                            <p className="text-slate-800 dark:text-slate-200 font-medium text-sm mb-1">{act.text}</p>
                            <span className="text-[10px] text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full inline-block">
                                {act.category}
                            </span>
                        </div>
                        <span className="text-xs text-slate-400">{act.date}</span>
                    </div>
                ))}
                {acts.length === 0 && (
                    <div className="text-center text-slate-400 text-sm py-8 flex flex-col items-center">
                        <span className="text-2xl mb-2">🌱</span>
                        No acts logged yet.<br />Be the first to do good!
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Total Acts: <strong className="text-emerald-500">{acts.length}</strong></span>
                <span>This Week</span>
            </div>
        </div>
    );
});

const CharacterScenarios: React.FC = memo(() => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const scenario = SCENARIOS[currentScenarioIndex];

    const handleSelect = (optionId: string) => {
        setSelectedOption(optionId);
        setShowResult(true);
    };

    const handleNext = () => {
        // For MVP, just reset
        setSelectedOption(null);
        setShowResult(false);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Character Lab: What Would You Do?</h3>

            {!showResult ? (
                <div className="animate-fade-in">
                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                        {scenario.situation}
                    </p>
                    <div className="space-y-4">
                        {scenario.options.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-emerald-500/30 transition-all flex items-center group"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center justify-center font-bold mr-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    {option.id.toUpperCase()}
                                </div>
                                <span className="text-slate-700 dark:text-slate-300">{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in text-center">
                    {(() => {
                        const option = scenario.options.find(o => o.id === selectedOption);
                        if (!option) return null;
                        const isExcellent = option.score >= 4;

                        return (
                            <>
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl ${isExcellent ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {isExcellent ? '🌟' : '🤔'}
                                </div>
                                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                                    {isExcellent ? 'Excellent Choice!' : 'Reflect on this...'}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                                    {option.outcome}
                                </p>
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
                                >
                                    Try Another Situation
                                </button>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
});

const ForgivenessMercyLab: React.FC = memo(() => {
    const [text, setText] = useState('');
    const [isLettingGo, setIsLettingGo] = useState(false);
    const [cleared, setCleared] = useState(false);

    const handleLetGo = () => {
        setIsLettingGo(true);
        setTimeout(() => {
            setCleared(true);
            setIsLettingGo(false);
            setText('');
        }, 3000);
    };

    if (cleared) {
        return (
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-500/20 text-center animate-fade-in h-64 flex flex-col justify-center items-center">
                <div className="text-4xl mb-4">🕊️</div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">You've taken a step towards peace.</h3>
                <p className="text-emerald-600/80 dark:text-emerald-400/70 text-sm">May Allah replace your hurt with tranquility.</p>
                <button
                    onClick={() => setCleared(false)}
                    className="mt-6 text-xs font-bold text-emerald-500 hover:underline"
                >
                    Reset Lab
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl h-64 relative overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                💧 Forgiveness Lab
            </h3>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write the name of someone you need to forgive, or a grievance you are holding onto..."
                className={`w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition-all duration-[3s] ${isLettingGo ? 'opacity-0 scale-95 blur-sm' : ''}`}
                disabled={isLettingGo}
            />
            {text && !isLettingGo && (
                <button
                    onClick={handleLetGo}
                    className="absolute bottom-8 right-8 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-600 transition-all animate-fade-in"
                >
                    Let it Go
                </button>
            )}
        </div>
    );
});

/**
 * Prophetic Excellence Page
 */
const PropheticExcellencePage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<'overview' | 'stories' | 'practice' | 'labs' | 'assessment'>('overview');
    const [assessmentScores, setAssessmentScores] = useState<Record<string, number>>({});
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);

    const handleTakeAssessment = useCallback((answers: Record<number, number>) => {
        const scores: Record<string, number> = {
            kindness: 0,
            honesty: 0,
            humility: 0,
            brotherhood: 0
        };

        Object.entries(answers).forEach(([qId, score]) => {
            const question = ASSESSMENT_QUESTIONS.find(q => q.id === Number(qId));
            if (question) {
                scores[question.trait] = score;
            }
        });

        setAssessmentScores(scores);
        setAssessmentCompleted(true);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 text-white overflow-hidden pb-16">
                <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

                <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
                    <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Divine Wisdom
                    </Link>

                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-bold mb-6 tracking-wide uppercase">
                        Prophetic Series
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Prophetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Excellence</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        "I was sent only to perfect noble character." <span className="text-emerald-400 block mt-2 text-sm font-bold">— Prophet Muhammad ﷺ</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'overview'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('stories')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'stories'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Stories & Wisdom
                        </button>
                        <button
                            onClick={() => setActiveTab('practice')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'practice'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Daily Practice
                        </button>
                        <button
                            onClick={() => setActiveTab('labs')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'labs'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Labs
                        </button>
                        <button
                            onClick={() => setActiveTab('assessment')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'assessment'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Self Assessment
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                {/* Introduction - Only show on Overview tab */}
                {activeTab === 'overview' && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/5 mb-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Who Was the Prophet ﷺ?</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                Even before his prophethood, Muhammad ﷺ was known among his people as <strong>Al-Amin (The Trustworthy)</strong> and <strong>As-Sadiq (The Truthful)</strong>.
                                His character was not just a set of rules, but a living example of mercy, integrity, and humility.
                                God Almighty described him in the Quran as having "sublime character."
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <span className="block text-2xl mb-1">🤲</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Compassionate</span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <span className="block text-2xl mb-1">⚖️</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Just</span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <span className="block text-2xl mb-1">🛡️</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Protector</span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <span className="block text-2xl mb-1">🎁</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Generous</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                {activeTab === 'overview' && (
                    <div className="space-y-12 animate-fade-in">
                        <CharacterRoadmap />

                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Core Character Traits</h3>
                            <button className="text-sm text-emerald-500 font-bold hover:underline">View All Traits →</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {CHARACTER_TRAITS.map(trait => (
                                <div key={trait.id} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${trait.color}`}></div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                {trait.icon}
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-300">
                                                {trait.stories} Stories
                                            </span>
                                        </div>

                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                                            {trait.title}
                                        </h4>
                                        <p className="text-lg font-arabic text-slate-400 mb-4">{trait.arabic}</p>
                                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                            {trait.description}
                                        </p>

                                        <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-6">
                                            <button
                                                onClick={() => setActiveTab('stories')}
                                                className="flex-1 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all"
                                            >
                                                Read Stories
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('practice')}
                                                className="flex-1 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all"
                                            >
                                                Start Challenge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stories Tab Content */}
                {activeTab === 'stories' && (
                    <div className="space-y-12 animate-fade-in">
                        <PropheticRoutine />
                        <StoryLibrary />
                        <WisdomVault />
                    </div>
                )}

                {/* Daily Practice Tab Content */}
                {activeTab === 'practice' && (
                    <div className="space-y-8 animate-fade-in">
                        <DailyCharacterChallenge />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <MorningIntention />
                            <KindnessTracker />
                        </div>
                    </div>
                )}

                {/* Labs Tab Content */}
                {activeTab === 'labs' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-500/20 text-center mb-8">
                            <span className="text-4xl mb-2 block">🧪</span>
                            <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400">Excellence Lab</h3>
                            <p className="text-amber-800/80 dark:text-amber-300/80 max-w-2xl mx-auto mt-2">
                                Interactive tools to simulate real-world situations and practice the internal state of the believer.
                            </p>
                        </div>

                        <CharacterScenarios />
                        <div className="max-w-2xl mx-auto">
                            <ForgivenessMercyLab />
                        </div>
                    </div>
                )}

                {activeTab === 'assessment' && (
                    <div className="max-w-3xl mx-auto animate-fade-in">
                        {!assessmentCompleted ? (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                                <div className="text-center mb-10">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Character Self-Assessment</h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Answer honestly to see how your character aligns with the Prophetic example.
                                        Your results are private and for your own reflection.
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    {ASSESSMENT_QUESTIONS.map((q) => (
                                        <div key={q.id} className="space-y-4">
                                            <p className="font-bold text-lg text-slate-900 dark:text-white">
                                                <span className="text-emerald-500 mr-2">{q.id}.</span>
                                                {q.text}
                                            </p>
                                            <div className="grid grid-cols-1 gap-3">
                                                {q.options.map((opt) => (
                                                    <label key={opt.value} className="flex items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all group">
                                                        <input
                                                            type="radio"
                                                            name={`q-${q.id}`}
                                                            className="w-5 h-5 text-emerald-500 border-slate-300 focus:ring-emerald-500"
                                                            onChange={() => {
                                                                // In a real app update state
                                                            }}
                                                        />
                                                        <span className="ml-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => handleTakeAssessment({ 1: 3, 2: 4, 3: 3, 4: 5 })} // Mock data for demo
                                        className="px-10 py-4 rounded-full bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all hover:-translate-y-1"
                                    >
                                        Show My Results
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl text-center">
                                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    ✨
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Assessment Complete!</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-8">
                                    Here is your character profile based on your answers.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {Object.entries(assessmentScores).map(([trait, score]) => (
                                        <div key={trait} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                                            <p className="text-xs uppercase text-slate-500 font-bold mb-1">{trait}</p>
                                            <div className="flex items-end justify-center gap-1">
                                                <span className="text-3xl font-bold text-emerald-500">{score}</span>
                                                <span className="text-sm text-slate-400 mb-1">/5</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setAssessmentCompleted(false)}
                                    className="px-6 py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-bold"
                                >
                                    Retake Assessment
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

PropheticExcellencePage.displayName = 'PropheticExcellencePage';

export default PropheticExcellencePage;
