import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import {
    MessageCircle,
    Info,
    BookOpen,
    Mic,
    Smartphone,
    HelpCircle,
    User,
    History,
    Compass,
    Search,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Play,
    Share2,
    Video,
    Shield,
    Brain,
    Heart,
    Clock,
    Zap,
    Users
} from 'lucide-react';
import {
    DAWAH_PILLARS,
    DAWAH_LEVELS,
    MISCONCEPTIONS,
    DAWAH_SCENARIOS,
    DIALOGUE_FRAMEWORKS,
    DAWAH_ARCHETYPES
} from '@/data/dawahData';

// ============================================================================
// TYPES
// ============================================================================

type TrackId = 'foundations' | 'methodology' | 'misconceptions' | 'dialogue' | 'speaking' | 'digital' | 'qa' | 'personality';

// ============================================================================
// COMPONENTS
// ============================================================================

const DawahHero: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 text-white overflow-hidden pb-16 pt-12">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10 animate-spin-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/90"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 border border-blue-400/50 text-blue-300 text-xs font-bold mb-6 backdrop-blur-sm">
                <Shield size={14} /> The Complete Da'wah Training Academy
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white font-serif">
                Da'wah & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">Outreach</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed font-light">
                "Transforming hearts and minds through wisdom, compassion, and eloquence."
                <span className="text-blue-400 block mt-2 text-sm font-bold">— The Art of Beautiful Preaching</span>
            </p>
        </div>
    </div>
));

const TrackTabs: React.FC<{ activeTrack: TrackId; onTrackChange: (id: TrackId) => void }> = memo(({ activeTrack, onTrackChange }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-7xl mx-auto mb-16">
        {[
            { id: 'foundations' as TrackId, label: 'Foundations', icon: <Brain size={16} /> },
            { id: 'methodology' as TrackId, label: 'Methodology', icon: <Compass size={16} /> },
            { id: 'misconceptions' as TrackId, label: 'Misconceptions', icon: <Search size={16} /> },
            { id: 'dialogue' as TrackId, label: 'Dialogue', icon: <Users size={16} /> },
            { id: 'speaking' as TrackId, label: 'Public Speaking', icon: <Mic size={16} /> },
            { id: 'digital' as TrackId, label: 'Digital Lab', icon: <Smartphone size={16} /> },
            { id: 'qa' as TrackId, label: 'Q&A Skills', icon: <HelpCircle size={16} /> },
            { id: 'personality' as TrackId, label: 'Archetype', icon: <User size={16} /> },
        ].map((track) => (
            <button
                key={track.id}
                onClick={() => onTrackChange(track.id)}
                className={`
                    px-5 py-4 rounded-2xl font-bold transition-all text-xs flex items-center justify-center gap-2 min-w-[130px]
                    ${activeTrack === track.id
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                `}
            >
                {track.icon}
                {track.label}
            </button>
        ))}
    </div>
));

// --- Track Sections ---

const FoundationsTrack: React.FC = memo(() => (
    <div className="space-y-24 animate-fade-in">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAWAH_PILLARS.map(pillar => (
                <div key={pillar.id} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5 group hover:-translate-y-2 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        {pillar.icon === 'BookOpen' && <BookOpen size={24} />}
                        {pillar.icon === 'Brain' && <Brain size={24} />}
                        {pillar.icon === 'Heart' && <Heart size={24} />}
                        {pillar.icon === 'Clock' && <Clock size={24} />}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">{pillar.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
            ))}
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid lg:grid-cols-3 gap-8">
                {DAWAH_LEVELS.map((level, i) => (
                    <div key={i} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-blue-500 opacity-50">0{i + 1}</span>
                            <div>
                                <h4 className="text-xl font-bold font-serif">{level.title}</h4>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">{level.subtitle}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{level.description}</p>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] italic text-slate-300 italic">
                            {level.story}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
));

const MethodologyTrack: React.FC = memo(() => (
    <div className="space-y-24 animate-fade-in text-left">
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { title: 'Common Ground', desc: 'Find shared values (God, morality, family) before differences.', icon: '🤝' },
                { title: 'Listen More', desc: 'Understand their worldview before you respond.', icon: '👂' },
                { title: 'Focus on Message', desc: 'Aim for curiosity-driven dialogue, not ego-driven wins.', icon: '🎯' },
                { title: 'Dua First', desc: 'Guidance comes from Allah, not your eloquence.', icon: '🤲' },
                { title: 'Honesty', desc: 'Admit when you don\'t know; research and return.', icon: '⚖️' },
            ].map((rule, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5">
                    <span className="text-4xl mb-6 block">{rule.icon}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{rule.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{rule.desc}</p>
                </div>
            ))}
        </section>

        <section className="bg-slate-900 text-white rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-5"></div>
            <div className="relative z-10 text-center">
                <h2 className="text-4xl font-bold font-serif mb-12">The BRIDGE Method</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { letter: 'B', title: 'Build Rapport', desc: 'Establish trust.' },
                        { letter: 'R', title: 'Recognize', desc: 'Validate worldview.' },
                        { letter: 'I', title: 'Introduce', desc: 'Islamic perspective.' },
                        { letter: 'D', title: 'Demonstrate', desc: 'Logic and evidence.' },
                        { letter: 'G', title: 'Guide', desc: 'The invitation.' },
                        { letter: 'E', title: 'Engage', desc: 'Follow-up.' },
                    ].map((step, i) => (
                        <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center">
                            <span className="text-6xl font-black text-blue-500 mb-4 block">{step.letter}</span>
                            <h4 className="font-bold mb-2 text-xs">{step.title}</h4>
                            <p className="text-[10px] text-slate-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
));

const MisconceptionHub: React.FC = memo(() => {
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState<string>('All');
    const categories = ['All', 'Women', 'Violence', 'Science', 'Prophets', 'Quran', 'Sharia'];

    const filtered = MISCONCEPTIONS.filter(m =>
        (activeCat === 'All' || m.category === activeCat) &&
        (m.claim.toLowerCase().includes(search.toLowerCase()) || m.response.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-12 animate-fade-in text-left">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold font-serif mb-6">Misconception Database</h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search myths..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 outline-none focus:border-blue-500 text-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeCat === cat ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {filtered.map(m => (
                    <div key={m.id} className="p-10 rounded-[3rem] bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/5">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase mb-4 inline-block">{m.category}</span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">"{m.claim}"</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{m.response}</p>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-l-4 border-blue-500 text-xs italic">
                            <span className="text-[10px] font-bold text-blue-500 uppercase block mb-1">Try saying this:</span>
                            {m.script}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const DialogueTrack: React.FC = memo(() => (
    <div className="space-y-24 animate-fade-in text-left">
        {DIALOGUE_FRAMEWORKS.map((framework, i) => (
            <section key={i} className="bg-white dark:bg-slate-800 rounded-[3rem] p-12 shadow-xl border border-slate-100 dark:border-white/5">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-serif mb-2">Dialogue with {framework.group}</h2>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {framework.commonGround.map(g => (
                                    <span key={g} className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-bold uppercase">{g}</span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Differences</h4>
                            {framework.keyDifferences.map(d => (
                                <div key={d} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center gap-3 text-xs border border-slate-100 dark:border-slate-700">
                                    <Info size={14} className="text-blue-500" /> {d}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl">
                        <span className="text-[10px] font-bold text-blue-400 uppercase mb-4 block">Recommended Script</span>
                        <p className="text-xl font-serif italic mb-6">"{framework.script}"</p>
                        {framework.biblicalProphecies?.map((p, idx) => (
                            <div key={idx} className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h5 className="text-xs font-bold text-amber-400 mb-2">{p.verse}</h5>
                                <p className="text-[11px] text-slate-400 leading-relaxed">{p.fulfillment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        ))}
    </div>
));

const PublicSpeakingTrack: React.FC = memo(() => {
    const [step, setStep] = useState(0);
    const framework = [
        { label: 'The Hook', desc: 'First 2 minutes: Story, Question, or Shocking Stat.', icon: <Zap size={20} /> },
        { label: 'The Core', desc: 'Main body: Use the "Rule of Three" and relate back to Quran.', icon: <Users size={20} /> },
        { label: 'The CTA', desc: 'Conclusion: Invite to action or reflection.', icon: <Mic size={20} /> },
    ];

    return (
        <div className="space-y-24 animate-fade-in text-left">
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold font-serif leading-tight">Talk Structure Builder</h2>
                        <div className="flex gap-4">
                            {framework.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={() => setStep(i)}
                                    className={`flex-1 p-6 rounded-3xl border-2 transition-all text-center ${step === i ? 'bg-white text-blue-600 border-white' : 'bg-white/10 border-white/10'}`}
                                >
                                    <span className="block text-2xl font-black mb-1">{i + 1}</span>
                                    <span className="text-[10px] font-bold uppercase">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                {framework[step].icon}
                            </div>
                            <h4 className="text-2xl font-black">{framework[step].label}</h4>
                        </div>
                        <p className="text-slate-500 mb-6">{framework[step].desc}</p>
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 italic text-xs">
                            "Focus on clarity and emotional resonance."
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

const DigitalTrack: React.FC = memo(() => (
    <div className="space-y-24 animate-fade-in text-left">
        <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold font-serif leading-tight">Digital Da'wah Lab</h2>
                    <p className="text-slate-400">Master strategic content creation and reach millions online.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {['The 3-Second Rule', 'Visual Excellence', 'Algorithm strategy', 'Community Hubs'].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all text-xs font-bold">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
));

const QASkillsTrack: React.FC = memo(() => {
    const [activeScenario, setActiveScenario] = useState<string | null>(null);
    const scenario = DAWAH_SCENARIOS[0];

    return (
        <div className="space-y-24 animate-fade-in text-left">
            <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[3rem] p-12 text-white shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold font-serif leading-tight">Conversation Simulator</h2>
                        <p className="text-emerald-100 italic">"Practice makes perfect." Practice responding to different personality types.</p>
                    </div>
                    <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-2xl min-h-[300px] flex flex-col justify-between">
                        <div>
                            <p className="text-sm border-l-4 border-slate-200 pl-4 py-2 bg-slate-50 rounded-r-xl italic mb-6">"{scenario.initialQuestion}"</p>
                            {activeScenario && (
                                <p className="text-sm bg-blue-50 text-blue-700 p-4 rounded-2xl italic border-l-4 border-blue-500">
                                    {scenario.responses.find(r => r.trigger.includes(activeScenario))?.reply}
                                </p>
                            )}
                        </div>
                        <div className="mt-8 space-y-2">
                            {scenario.responses.map((resp, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveScenario(resp.trigger[0])}
                                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 text-xs font-bold transition-all"
                                >
                                    "{resp.reply.substring(0, 50)}..."
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

const PersonalityTrack: React.FC = memo(() => (
    <div className="space-y-24 animate-fade-in text-left">
        <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl text-center">
            <h2 className="text-4xl font-bold font-serif mb-12">Discover Your Dawah Archetype</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
                {DAWAH_ARCHETYPES.map(a => (
                    <div key={a.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white hover:text-slate-900 transition-all">
                        <h4 className="text-xl font-bold mb-2">{a.name}</h4>
                        <p className="text-[10px] text-slate-400 mb-4">{a.description}</p>
                        <span className="text-[10px] font-bold text-blue-500 uppercase">Strength: {a.strength}</span>
                    </div>
                ))}
            </div>
        </section>
    </div>
));

const DawahPage: React.FC = () => {
    const [activeTrack, setActiveTrack] = useState<TrackId>('foundations');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 overflow-x-hidden">
            <DawahHero />
            <TrackTabs activeTrack={activeTrack} onTrackChange={setActiveTrack} />

            <div className="max-w-7xl mx-auto px-4">
                {activeTrack === 'foundations' && <FoundationsTrack />}
                {activeTrack === 'methodology' && <MethodologyTrack />}
                {activeTrack === 'misconceptions' && <MisconceptionHub />}
                {activeTrack === 'dialogue' && <DialogueTrack />}
                {activeTrack === 'speaking' && <PublicSpeakingTrack />}
                {activeTrack === 'digital' && <DigitalTrack />}
                {activeTrack === 'qa' && <QASkillsTrack />}
                {activeTrack === 'personality' && <PersonalityTrack />}
            </div>
        </div>
    );
};

export default DawahPage;
