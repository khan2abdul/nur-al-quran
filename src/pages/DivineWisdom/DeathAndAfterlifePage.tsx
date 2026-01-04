
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { SECTIONS, MORTALITY_CONTENT, JANAZAH_STEPS, BARZAKH_QUESTIONS, JUDGMENT_SIGNS, JANNAH_LEVELS, JAHANNAM_LEVELS, GRIEF_RESOURCES, DEATH_QUIZ } from '@/data/deathAndAfterlifeData';

// ============================================================================
// COMPONENTS
// ============================================================================

const HeroSection: React.FC<{ gentleMode: boolean; setGentleMode: (v: boolean) => void }> = memo(({ gentleMode, setGentleMode }) => (
    <div className="relative bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-800 overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🌿</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">✨</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float">🕊️</div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🍂</span> The Eternal Journey
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white font-serif">
                Death & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Afterlife</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
                From the certainty of our return to the promise of the Hereafter.
                A guide to understanding, preparing, and finding hope.
            </p>

            {/* Gentle Mode Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex items-center gap-2 border border-white/20">
                    <button
                        onClick={() => setGentleMode(true)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${gentleMode ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
                    >
                        Gentle Mode
                    </button>
                    <button
                        onClick={() => setGentleMode(false)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!gentleMode ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
                    >
                        Full Detail
                    </button>
                </div>
            </div>
            <p className="text-xs text-slate-400">
                {gentleMode ? "Graphic descriptions of punishment are blurred/hidden." : "All descriptions shown as per texts."}
            </p>
        </div>
    </div>
));

type TabId = 'overview' | 'journey' | 'destinations' | 'healing' | 'quiz';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 lg:flex lg:justify-center gap-3 -mt-8 relative z-20 px-4 mb-12">
        {[
            { id: 'overview' as TabId, label: 'Mortality', icon: '⏳' },
            { id: 'journey' as TabId, label: 'The Journey', icon: '⚰️' },
            { id: 'destinations' as TabId, label: 'Destinations', icon: '🗝️' },
            { id: 'healing' as TabId, label: 'Grief & Healing', icon: '💔' },
            { id: 'quiz' as TabId, label: 'Quiz', icon: '📝' },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full lg:w-auto px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2 ${activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
            >
                <span>{tab.icon}</span>
                {tab.label}
            </button>
        ))}
    </div>
));

/**
 * Janazah Stepper Component
 * Allows user to step through the funeral rites interactively
 */
const JanazahStepper: React.FC = memo(() => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="mt-8">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {JANAZAH_STEPS.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2 flex-1 rounded-full transition-all ${idx <= activeStep ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                    />
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Step Content */}
                <div className="order-2 md:order-1">
                    <span className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2 block">Step {activeStep + 1} of {JANAZAH_STEPS.length}</span>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{JANAZAH_STEPS[activeStep].title}</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 min-h-[100px]">
                        {JANAZAH_STEPS[activeStep].description}
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                            disabled={activeStep === 0}
                            className="px-6 py-2 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setActiveStep(prev => Math.min(JANAZAH_STEPS.length - 1, prev + 1))}
                            disabled={activeStep === JANAZAH_STEPS.length - 1}
                            className="px-6 py-2 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
                        >
                            Next Step
                        </button>
                    </div>
                </div>

                {/* Visual Representation (Icon) */}
                <div className="order-1 md:order-2 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-8xl shadow-inner border border-emerald-500/10">
                        {activeStep === 0 && '🚑'}
                        {activeStep === 1 && '💧'}
                        {activeStep === 2 && '🧖'}
                        {activeStep === 3 && '🤲'}
                        {activeStep === 4 && '🪦'}
                    </div>
                </div>
            </div>
        </div>
    );
});
JanazahStepper.displayName = 'JanazahStepper';

/**
 * Quiz Section Component
 */
const QuizSection: React.FC = memo(() => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleOptionClick = (index: number) => {
        if (selectedOption !== null) return; // Prevent multiple clicks

        setSelectedOption(index);
        setShowExplanation(true);

        if (index === DEATH_QUIZ[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < DEATH_QUIZ.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setShowExplanation(false);
    };

    if (!DEATH_QUIZ || DEATH_QUIZ.length === 0) {
        return <div>No quiz available.</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl">
            {showScore ? (
                <div className="text-center py-10">
                    <span className="text-6xl mb-4 block">🏆</span>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz Completed!</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        You scored <span className="font-bold text-emerald-500">{score}</span> out of <span className="font-bold">{DEATH_QUIZ.length}</span>
                    </p>
                    <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                    >
                        Retake Quiz
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-bold text-slate-500 dark:text-slate-400">Question {currentQuestion + 1}/{DEATH_QUIZ.length}</span>
                        <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-bold">
                            Score: {score}
                        </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        {DEATH_QUIZ[currentQuestion].question}
                    </h3>

                    <div className="space-y-3 mb-8">
                        {DEATH_QUIZ[currentQuestion].options.map((option, idx) => {
                            let btnClass = "w-full text-left p-4 rounded-xl border-2 font-medium transition-all ";

                            if (selectedOption === null) {
                                btnClass += "border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20";
                            } else {
                                if (idx === DEATH_QUIZ[currentQuestion].correctAnswer) {
                                    btnClass += "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200";
                                } else if (idx === selectedOption) {
                                    btnClass += "border-rose-500 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200";
                                } else {
                                    btnClass += "border-slate-100 dark:border-slate-800 opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(idx)}
                                    disabled={selectedOption !== null}
                                    className={btnClass}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {showExplanation && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 p-6 rounded-xl animate-fade-in">
                            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Explanation</h4>
                            <p className="text-blue-800 dark:text-blue-200 mb-6">{DEATH_QUIZ[currentQuestion].explanation}</p>
                            <button
                                onClick={nextQuestion}
                                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentQuestion < DEATH_QUIZ.length - 1 ? 'Next Question' : 'See Results'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
});
QuizSection.displayName = 'QuizSection';

// ============================================================================
// MAIN PAGE
// ============================================================================

const DeathAndAfterlifePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [gentleMode, setGentleMode] = useState(true);
    const [age, setAge] = useState<number | ''>('');
    const [lifeExpectancy] = useState(73);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
            <HeroSection gentleMode={gentleMode} setGentleMode={setGentleMode} />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-5xl mx-auto px-4">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif text-center">Understanding Mortality</h2>

                            <div className="prose dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                                <p className="text-center max-w-3xl mx-auto">
                                    In Islam, death is not a termination but a transition. It is the moment the soul leaves the temporary vessel of the body to enter the next stage of existence.
                                </p>

                                <div className="my-8 p-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border-l-4 border-amber-500 italic text-center">
                                    <p className="text-xl font-serif text-amber-800 dark:text-amber-400">
                                        "{MORTALITY_CONTENT.hadith}"
                                    </p>
                                    <span className="text-sm font-bold text-amber-600 dark:text-amber-500 mt-2 block">— Prophet Muhammad ﷺ</span>
                                </div>
                            </div>

                            {/* Life Counter Widget */}
                            <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                    ⏳ The Life Awareness Tool
                                </h4>
                                <div className="text-center">
                                    <p className="text-sm text-slate-500 mb-6">Enter your age to reflect on the passage of time. (Based on avg lifespan of {lifeExpectancy} years)</p>
                                    <input
                                        type="number"
                                        placeholder="Your Age"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="w-32 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-center font-bold text-xl mb-8 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />

                                    {age !== '' && typeof age === 'number' && (
                                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                            <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                                                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{Math.floor(age * 365).toLocaleString()}</div>
                                                <div className="text-xs uppercase tracking-wide text-slate-500">Days Lived</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20">
                                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                                    {Math.max(0, Math.floor((lifeExpectancy - age) * 365)).toLocaleString()}
                                                </div>
                                                <div className="text-xs uppercase tracking-wide text-slate-500">Est. Days Left</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* JOURNEY TAB */}
                {activeTab === 'journey' && (
                    <div className="animate-fade-in space-y-12">
                        {/* Janazah */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif flex items-center gap-3">
                                <span className="text-3xl">⚰️</span> The Final Rites (Janazah)
                            </h3>
                            <JanazahStepper />
                        </div>

                        {/* Barzakh */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif flex items-center gap-3">
                                <span className="text-3xl">🌑</span> The Grave (Barzakh)
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {BARZAKH_QUESTIONS.map((q, idx) => (
                                    <div key={idx} className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-center">
                                        <div className="text-xs uppercase tracking-widest text-indigo-400 mb-2">Question {idx + 1}</div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">"{q.question}"</h3>
                                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm mb-4">
                                            <p className="font-bold text-indigo-600 dark:text-indigo-400">{q.answer}</p>
                                        </div>
                                        <p className="text-xs text-slate-500">{q.context}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Judgment Day */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif flex items-center gap-3">
                                <span className="text-3xl">⚖️</span> Day of Judgment
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl">
                                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">Minor Signs</h4>
                                    <ul className="space-y-3">
                                        {JUDGMENT_SIGNS.minor.map((sign, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                                <span className="text-slate-300">✓</span> {sign}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-500/10">
                                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700 dark:text-red-400">Major Signs</h4>
                                    <ul className="space-y-3">
                                        {JUDGMENT_SIGNS.major.map((sign, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                                <span className="text-red-300">⚠️</span> {sign}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* DESTINATIONS TAB */}
                {activeTab === 'destinations' && (
                    <div className="animate-fade-in space-y-12">
                        {/* Jannah */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 md:p-12 border border-emerald-100 dark:border-emerald-500/20 shadow-xl relative overflow-hidden">
                            <div className="relative z-10 text-center mb-12">
                                <span className="text-6xl mb-4 block">🌿</span>
                                <h2 className="text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 font-serif">Jannah: Eternal Bliss</h2>
                                <p className="text-lg text-emerald-700 dark:text-emerald-400 max-w-2xl mx-auto">
                                    "No eye has seen, no ear has heard, and no mind has imagined what Allah has prepared for His righteous servants."
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                                {JANNAH_LEVELS.slice(0, 4).map((level, i) => (
                                    <div key={i} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur p-6 rounded-2xl text-center border border-emerald-100 dark:border-emerald-500/20">
                                        <div className="text-xs uppercase tracking-widest text-emerald-500 mb-1">Gate {i + 1}</div>
                                        <div className="font-bold text-slate-800 dark:text-emerald-200 text-sm">{level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jahannam */}
                        <div className={`bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl transition-all duration-300 ${!gentleMode ? 'border-red-500/30' : ''}`}>
                            <div className="text-center mb-8">
                                <span className="text-6xl mb-4 block">🔥</span>
                                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2 font-serif">Jahannam: The Warning</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                    Created as ultimate justice. A persistent warning to turn back to Allah.
                                </p>
                            </div>

                            <div className={`relative transition-all duration-500 ${gentleMode ? 'blur-md select-none opacity-40' : 'opacity-100'}`}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {JAHANNAM_LEVELS.slice(0, 4).map((level, i) => (
                                        <div key={i} className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl text-center border border-rose-100 dark:border-rose-900/30">
                                            <div className="font-bold text-rose-800 dark:text-rose-400 text-sm">{level}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-center text-rose-700 dark:text-rose-400 max-w-2xl mx-auto italic">
                                    "O you who have believed, protect yourselves and your families from a Fire..."
                                </p>
                            </div>

                            {gentleMode && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div className="bg-slate-200/90 dark:bg-slate-800/90 px-6 py-3 rounded-full text-sm font-bold text-slate-500 border border-slate-300 dark:border-slate-600 shadow-lg">
                                        Content blurred (Gentle Mode)
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* HEALING TAB */}
                {activeTab === 'healing' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif text-center">Healing Through Grief</h2>
                            <blockquote className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl mb-12">
                                <p className="font-serif text-xl text-emerald-800 dark:text-emerald-300 mb-4 leading-loose">{GRIEF_RESOURCES.comfortingDuas[0].arabic}</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200 italic">"{GRIEF_RESOURCES.comfortingDuas[0].translation}"</p>
                            </blockquote>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Etiquette of Mourning</h3>
                                    <ul className="space-y-3">
                                        {GRIEF_RESOURCES.etiquette.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                                <span className="text-emerald-500">♡</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-500/20">
                                    <h3 className="font-bold mb-4 text-cyan-900 dark:text-cyan-300">Helping the Deceased</h3>
                                    <ul className="space-y-3">
                                        {GRIEF_RESOURCES.actions.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                                <span className="text-cyan-500">✨</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* QUIZ TAB */}
                {activeTab === 'quiz' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Test Your Understanding</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Reflect on what you've learned about the journey of the soul.
                            </p>
                        </div>
                        <QuizSection />
                    </div>
                )}

            </div>
        </div>
    );
};

export default DeathAndAfterlifePage;
