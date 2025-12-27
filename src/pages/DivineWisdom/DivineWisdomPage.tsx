import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useView } from '@/context/ViewContext';
import { ROUTES } from '@/config/routes';

interface WisdomCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    topics: string[];
    link?: string;
}

const WISDOM_CATEGORIES: WisdomCategory[] = [
    {
        id: 'faith',
        title: 'Fundamentals of Faith',
        description: 'Explore the core beliefs and practices that form the foundation of Islam.',
        icon: '🌙',
        color: 'from-blue-500/20 to-cyan-500/20',
        topics: ['The 5 Pillars of Islam', 'The 6 Pillars of Iman', 'The Concept of Tawhid', 'Prophethood in Islam'],
        link: ROUTES.LEARN,
    },
    {
        id: 'spiritual',
        title: 'Spiritual Growth',
        description: 'Cultivate your inner self through mindfulness, sincerity, and connection with Allah.',
        icon: '✨',
        color: 'from-purple-500/20 to-pink-500/20',
        topics: ['Dhikir & Mindfulness', 'Patience & Gratitude', 'The Power of Dua', 'Sincerity in Action'],
        link: ROUTES.SPIRITUAL,
    },
    {
        id: 'character',
        title: 'Prophetic Excellence',
        description: 'Learn from the beautiful character and manners of the Prophet Muhammad (SAW).',
        icon: '🌿',
        color: 'from-emerald-500/20 to-teal-500/20',
        topics: ['Kindness to Others', 'Honesty & Integrity', 'Humility & Service', 'Brotherhood & Community'],
        link: ROUTES.PROPHETIC,
    },
    {
        id: 'quran',
        title: "The Quran's Message",
        description: 'Understand the depth and miracles of the final revelation to humanity.',
        icon: '📖',
        color: 'from-amber-500/20 to-orange-500/20',
        topics: ['Miracles of the Quran', 'Themes of Guidance', 'Protection of the Text', 'Applying Verse Wisdom'],
        link: ROUTES.THE_QURAN,
    },
    {
        id: 'history',
        title: 'Islamic Legacy',
        description: 'Discover the rich history and contributions of Islamic civilization to the world.',
        icon: '🕌',
        color: 'from-indigo-500/20 to-blue-500/20',
        topics: ['Lives of the Prophets', 'Golden Age of Science', 'Spread of Knowledge', 'Lessons from History']
    },
    {
        id: 'daily',
        title: 'Living Islam Daily',
        description: 'Practical guidance for integrating Islamic values into your modern daily life.',
        icon: '☀️',
        color: 'from-rose-500/20 to-orange-500/20',
        topics: ['Islamic Ethics in Work', 'Family Relationships', 'Modern Challenges', 'Seeking Useful Knowledge']
    }
];

const CategoryCard: React.FC<{ category: WisdomCategory }> = memo(({ category }) => {
    const cardContent = (
        <>
            {/* Decorative Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative p-8 md:p-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{category.icon}</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {category.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {category.description}
                </p>

                <div className="mt-auto space-y-2">
                    {category.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/40 group-hover:text-slate-700 dark:group-hover:text-white/60 transition-colors">
                            <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
                            {topic}
                        </div>
                    ))}
                </div>

                {/* Ready Badge for clickable cards */}
                {category.link && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-emerald-400 text-slate-900 text-[10px] font-bold uppercase tracking-wider">
                        Ready
                    </div>
                )}
            </div>
        </>
    );

    const baseClasses = "group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.02] shadow-2xl";

    if (category.link) {
        return (
            <Link to={category.link} className={baseClasses}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div className={`${baseClasses} cursor-not-allowed opacity-75`}>
            {cardContent}
        </div>
    );
});

CategoryCard.displayName = 'CategoryCard';

export const DivineWisdomPage: React.FC = memo(() => {
    const { isMobile } = useView();

    return (
        <div className="min-h-screen py-8 pb-32 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-0">
                {/* Header Section */}
                <div className="mb-12 md:mb-16 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        Islamic Knowledge Hub
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                        Divine <span className="text-cyan-400">Wisdom</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Embark on a journey to deepen your understanding of Islam through our curated knowledge base of faith, character, and guidance.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {WISDOM_CATEGORIES.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 md:mt-24 p-10 md:p-16 rounded-[3rem] bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all duration-700 group-hover:bg-cyan-400/10" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Continue Your Journey
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Our knowledge base is constantly expanding with fresh insights and lessons. Stay curious and keep seeking the light of knowledge.
                            </p>
                        </div>

                        <button className="px-10 py-5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            Coming Soon: Full Topics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

DivineWisdomPage.displayName = 'DivineWisdomPage';

export default DivineWisdomPage;
