import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { getHijriDate, getDateAdjustment, setDateAdjustment, getUpcomingEvent, getRamadanCalendar, type HijriDate, type RamadanDay } from '@/services/calendarApi';
import ProphetsTimeline from '@/components/timeline/ProphetsTimeline';
import MeccanPeriodPage from '@/components/timeline/meccan/MeccanPeriodPage';
import MadinahTimeline from '@/components/timeline/MadinahTimeline';
import GoldenAgeTimeline from '@/components/timeline/GoldenAgeTimeline';
import IndiaTimeline from '@/components/timeline/IndiaTimeline';

// --- Types ---
type TabId = 'overview' | 'ramadan' | 'hajj' | 'timeline';

interface UserLocation {
    city: string;
    country: string;
}

// --- Sub-Components ---

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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🕰️</span> Spiritual Clock
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Time</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                "By Time, indeed mankind is in loss, except..." <span className="text-amber-400 block mt-2 text-sm font-bold">Surah Al-Asr</span>
            </p>
        </div>
    </div>
));
HeroSection.displayName = 'HeroSection';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto mb-10">
        {[
            { id: 'overview' as TabId, label: 'Overview', icon: '🌌' },
            { id: 'ramadan' as TabId, label: 'Blessed Months', icon: '🌙' },
            { id: 'hajj' as TabId, label: 'Pilgrimage', icon: '🕋' },
            { id: 'timeline' as TabId, label: 'Timeline', icon: '⏳' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
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

// --- Tab Components ---

const OverviewTab: React.FC<{
    hijriDate: HijriDate | null;
    sliderValue: number;
    setSliderValue: (val: number) => void;
    projected: { label: string; event: string };
    dateAdjustment: number;
    setShowSettings: (val: boolean) => void;
    barakah: { level: string; color: string };
    moonPhase: string;
    checkedItems: string[];
    toggleCheck: (item: string) => void;
    jumuahStreak: number;
}> = memo(({ hijriDate, sliderValue, setSliderValue, projected, dateAdjustment, setShowSettings, barakah, moonPhase, checkedItems, toggleCheck, jumuahStreak }) => (
    <div className="space-y-6">
        {/* Time Travel Slider */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl pointer-events-none">⏳</div>
            <div className="relative z-10 text-center mb-8">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-2 block">Live Hijri Date</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {sliderValue === 0 ? (hijriDate ? `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}` : 'Loading...') : projected.label}
                </h2>
                <p className="text-slate-400">
                    {sliderValue === 0 ? "Today's Sacred Date" : `Event: ${projected.event}`}
                </p>
                <button
                    onClick={() => setShowSettings(true)}
                    className="mt-4 px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white transition-colors border border-slate-700 inline-flex items-center gap-2"
                >
                    <span>⚙️</span> Adjust Date ({dateAdjustment > 0 ? `+${dateAdjustment}` : dateAdjustment})
                </button>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4 text-slate-500 text-xs font-mono uppercase tracking-widest">
                    <span>Present</span>
                    <span>Time Travel (+12 Months)</span>
                    <span>Future</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="12"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard Widgets */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Moon Phase</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{moonPhase}</div>
                <div className="text-xs text-slate-400 mt-1">Illumination: 12%</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Barakah Status</span>
                <div className={`text-2xl font-bold ${barakah.color}`}>{barakah.level}</div>
                <div className="text-xs text-slate-400 mt-1">Based on Sacred Month</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Daily Sunnah</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white">Make Istighfar 70x</div>
                <div className="text-xs text-slate-400 mt-1">Prophetic Habit</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jumu'ah Card */}
            <div className="bg-emerald-900/10 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl text-emerald-500">🕌</div>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 relative z-10">Jumu'ah Reset</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm relative z-10">Don't miss the weekly purification.</p>

                <div className="space-y-3 relative z-10 flex-grow">
                    {['Ghusl (Ritual Bath)', 'Surah Al-Kahf', 'Send Salawat (x100)', 'Dua at Asr'].map((task, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/50 select-none">
                            <input
                                type="checkbox"
                                checked={checkedItems.includes(task)}
                                onChange={() => toggleCheck(task)}
                                className="w-5 h-5 rounded border-slate-400 dark:border-slate-600 text-emerald-500 focus:ring-emerald-500/50"
                            />
                            <span className={`text-slate-700 dark:text-slate-200 transition-all ${checkedItems.includes(task) ? 'line-through opacity-50' : ''}`}>{task}</span>
                        </label>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-emerald-500/20 pt-4 relative z-10">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Current Streak</span>
                    <span className="text-2xl font-bold text-emerald-500">🔥 {jumuahStreak} Weeks</span>
                </div>
            </div>

            {/* Sacred Month Guard */}
            <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-500/20 p-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4 opacity-80">🛡️</div>
                <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300 mb-1">
                    Sacred Month Guard
                </h3>
                <p className="text-sm text-rose-600 dark:text-rose-400 mb-6">"Sins are heavier in the sacred months."</p>

                <div className="py-4">
                    <div className="text-5xl border-4 border-rose-200 dark:border-rose-500/30 rounded-full w-32 h-32 flex items-center justify-center font-bold text-rose-600 dark:text-rose-400 animate-pulse bg-white dark:bg-slate-800">
                        100%
                    </div>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-4">Shield Integrity</p>
            </div>
        </div>
    </div>
));
OverviewTab.displayName = 'OverviewTab';

const RamadanTab: React.FC<{
    userLocation: UserLocation | null;
    setUserLocation: (loc: UserLocation | null) => void;
}> = memo(({ userLocation, setUserLocation }) => {
    const [calendar, setCalendar] = useState<RamadanDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputCity, setInputCity] = useState('');
    const [inputCountry, setInputCountry] = useState('');
    const [timeToIftar, setTimeToIftar] = useState<string>('--:--');

    // Fetch Calendar when location changes
    useEffect(() => {
        if (userLocation) {
            setLoading(true);
            getRamadanCalendar(userLocation.city, userLocation.country).then((data) => {
                setCalendar(data);
                setLoading(false);
            });
        }
    }, [userLocation]);

    // Live Countdown Logic
    useEffect(() => {
        const timer = setInterval(() => {
            if (calendar.length > 0) {
                const today = calendar.find(d => d.isToday) || calendar[0]; // fallback to first day if not started or ended
                // Use a simple mock countdown for now based on iftar time string
                // In a real app, parse "18:15" to Date and diff
                // Here we just display the time for simplicity or mock it
                setTimeToIftar(`Iftar: ${today.iftar}`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [calendar]);

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputCity && inputCountry) {
            setUserLocation({ city: inputCity, country: inputCountry });
        }
    };

    const handleResetLocation = () => {
        setUserLocation(null);
        localStorage.removeItem('nur-al-quran:ramadan-location');
        setCalendar([]);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 mb-8 border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
                            RAMADAN MODE ACTIVE
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Command Center</h2>
                        <p className="text-indigo-200/60 max-w-lg">Maximize every second of the blessed month.</p>
                        {userLocation && <p className="text-xs text-amber-500 mt-2 flex items-center gap-1">📍 {userLocation.city}, {userLocation.country} <button onClick={handleResetLocation} className="underline opacity-70 hover:opacity-100 ml-2">Change</button></p>}
                    </div>
                    <div className="text-right">
                        <span className="block text-4xl font-mono font-bold text-amber-400">{timeToIftar}</span>
                        <span className="text-xs text-indigo-300 uppercase tracking-wider">Maghrib Time</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    {/* Goal Generator */}
                    <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                        <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🎯</span>
                        <h4 className="font-bold text-white mb-2">Good Deed Generator</h4>
                        <p className="text-sm text-slate-400">Spin for a random sunnah act to perform right now.</p>
                    </div>

                    {/* Khatam Calculator */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-3xl">📖</span>
                            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">On Track</span>
                        </div>
                        <h4 className="font-bold text-white mb-1">Khatam Tracker</h4>
                        <div className="space-y-3 mt-4">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Read 4 pages today</span>
                                <span>Goal: 20</span>
                            </div>
                            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-[20%] bg-amber-500"></div>
                            </div>
                        </div>
                    </div>

                    {/* Multiplier */}
                    <div className="bg-purple-900/20 p-6 rounded-2xl text-center border border-purple-500/30">
                        <span className="text-5xl mb-4 block">🌌</span>
                        <h4 className="font-bold text-purple-200 mb-2">Laylatul Qadr Calc</h4>
                        <div className="bg-slate-900/50 rounded-xl p-3 mb-2">
                            <p className="text-xs text-slate-400 uppercase mb-1">Your Donation</p>
                            <p className="text-2xl font-bold text-white">$10</p>
                        </div>
                        <div className="text-2xl font-bold text-emerald-400"> = 83 Years</div>
                        <p className="text-[10px] text-purple-300/80 mt-1">of continuous charity</p>
                    </div>
                </div>
            </div>

            {/* Ramadan Calendar Widget */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            📅 My Ramadan Calendar
                            {userLocation && (
                                <button
                                    onClick={handleResetLocation}
                                    className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1"
                                >
                                    {userLocation.city} <span className="text-xs">✕</span>
                                </button>
                            )}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Accurate Sehri & Iftar times for your location.</p>
                    </div>
                    <button className="px-5 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        🖨️ Download / Print
                    </button>
                </div>

                {!userLocation ? (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center">
                        <div className="text-4xl mb-4">🌍</div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Set Your Location</h4>
                        <p className="text-slate-500 mb-6 text-sm">To generate your accurate Ramadan timetable, we need to know where you are.</p>

                        <form onSubmit={handleLocationSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                            <input
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="City (e.g. London)"
                                value={inputCity}
                                onChange={(e) => setInputCity(e.target.value)}
                            />
                            <input
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Country (e.g. UK)"
                                value={inputCountry}
                                onChange={(e) => setInputCountry(e.target.value)}
                            />
                            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
                                Generate
                            </button>
                        </form>
                        <p className="text-xs text-slate-400 mt-4">We store this locally on your device.</p>
                    </div>
                ) : loading ? (
                    <div className="py-20 text-center">
                        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500">Fetching accurate timings from AlAdhan...</p>
                    </div>
                ) : calendar.length === 0 ? (
                    <div className="py-16 text-center bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                        <div className="text-4xl mb-3">⚠️</div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Timings Found</h4>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                            We couldn't fetch the Ramadan calendar for <strong>{userLocation.city}, {userLocation.country}</strong>.
                            The location might be misspelled or unavailable in the database.
                        </p>
                        <button
                            onClick={handleResetLocation}
                            className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Try Different Location
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {calendar.map((day) => (
                            <div
                                key={day.day}
                                className={`
                                    relative p-4 rounded-xl border transition-all hover:-translate-y-1
                                    ${day.isToday
                                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border-amber-400 dark:border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                                    }
                                `}
                            >
                                {day.isToday && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-sm">
                                        Today
                                    </span>
                                )}

                                <div className="flex justify-between items-center mb-3">
                                    <span className={`font-bold ${day.isToday ? 'text-amber-700 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                                        Ramadan {day.day}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{day.weekday}</span>
                                </div>

                                <div className="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                                    {day.gregorianDate}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 flex items-center gap-1">🌅 Sehri</span>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{day.sehri}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 flex items-center gap-1">🌃 Iftar</span>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{day.iftar}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});
RamadanTab.displayName = 'RamadanTab';

const HajjTab: React.FC = memo(() => (
    <div className="bg-slate-900 p-1 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px] border border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565552629235-3873d4b35e5c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>

        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
            <div className="mb-auto pt-8">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800/80 backdrop-blur text-white border border-white/20 text-xs font-bold mb-4">
                    DHUL-HIJJAH SIMULATOR
                </span>
                <h2 className="text-4xl font-bold text-white mb-2">The Sacred Journey</h2>
                <p className="text-slate-300 max-w-md">Experience the rituals of Hajj through an interactive map and plan your savings.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">💰 Hajj Savings Jar</h4>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-xs uppercase">Current Savings</span>
                        <span className="text-white font-bold">$5,000</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
                        <div className="h-full w-[50%] bg-emerald-500"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>Target: $10,000</span>
                        <span>50% Complete</span>
                    </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-white/10 flex flex-col justify-center text-center">
                    <p className="text-slate-300 text-sm mb-4">"And proclaim to the people the Hajj..."</p>
                    <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                        Start Virtual Tawaf 360°
                    </button>
                </div>
            </div>
        </div>

        {/* Floating Hotspots (Mock) */}
        <div className="absolute top-1/3 left-1/4 group cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-amber-500 animate-ping absolute"></div>
            <div className="w-4 h-4 rounded-full bg-amber-500 relative z-10 border-2 border-white"></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Mina - Tent City
            </div>
        </div>
    </div>
));
HajjTab.displayName = 'HajjTab';

const TimelineTab: React.FC = memo(() => {
    const [selectedEra, setSelectedEra] = useState<'prophets' | 'meccan' | 'madinah' | 'golden' | 'india'>('prophets');

    const timelineOptions = [
        { id: 'prophets', label: 'Prophets (AS)', icon: '📜' },
        { id: 'meccan', label: 'Meccan Period', icon: '🕋' },
        { id: 'madinah', label: 'Madinah Era', icon: '🕌' },
        { id: 'golden', label: 'Golden Age', icon: '🔭' },
        { id: 'india', label: 'Islam in India', icon: '🏰' },
    ];

    return (
        <div className="space-y-8">
            {/* Sub-Navigation for Eras */}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl flex flex-wrap justify-center gap-2 shadow-sm border border-slate-200 dark:border-white/5">
                {timelineOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setSelectedEra(opt.id as any)}
                        className={`
                            px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                            ${selectedEra === opt.id
                                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }
                        `}
                    >
                        <span>{opt.icon}</span>
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Timeline Content */}
            <div className="min-h-[600px]">
                {selectedEra === 'prophets' && <ProphetsTimeline />}
                {selectedEra === 'meccan' && <MeccanPeriodPage />}
                {selectedEra === 'madinah' && <MadinahTimeline />}
                {selectedEra === 'golden' && <GoldenAgeTimeline />}
                {selectedEra === 'india' && <IndiaTimeline />}
            </div>
        </div>
    );
});
TimelineTab.displayName = 'TimelineTab';

const SettingsModal: React.FC<{
    dateAdjustment: number;
    close: () => void;
    handleAdjustmentChange: (val: number) => void;
}> = ({ dateAdjustment, close, handleAdjustmentChange }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl w-full max-w-sm border border-slate-200 dark:border-slate-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Date Adjustment</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Adjust the Hijri date based on local moon sighting.</p>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
                <button
                    onClick={() => handleAdjustmentChange(dateAdjustment - 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl text-slate-600 dark:text-white shadow-sm hover:scale-105 transition-transform"
                >
                    -
                </button>
                <span className="font-bold text-2xl text-amber-500">{dateAdjustment > 0 ? `+${dateAdjustment}` : dateAdjustment}</span>
                <button
                    onClick={() => handleAdjustmentChange(dateAdjustment + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl text-slate-600 dark:text-white shadow-sm hover:scale-105 transition-transform"
                >
                    +
                </button>
            </div>

            <button
                onClick={close}
                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
                Done
            </button>
        </div>
    </div>
);

// --- Main Page Component ---

const SacredTimesPage: React.FC = memo(() => {
    // --- State ---
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    // Live Dashboard State
    const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
    const [, setLoadingDate] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [dateAdjustment, setLocalAdjustment] = useState(getDateAdjustment());

    // Ramadan Location State
    const [userLocation, setUserLocation] = useState<UserLocation | null>(() => {
        const stored = localStorage.getItem('nur-al-quran:ramadan-location');
        return stored ? JSON.parse(stored) : null;
    });

    // Time Travel State
    const [sliderValue, setSliderValue] = useState(0);

    // Jumu'ah State
    const [jumuahStreak,] = useState(() => parseInt(localStorage.getItem('jumuah_streak') || '0'));
    const [checkedItems, setCheckedItems] = useState<string[]>(() =>
        JSON.parse(localStorage.getItem('jumuah_checked_items') || '[]')
    );

    // Mock moon phase
    const [moonPhase, setMoonPhase] = useState('Wait for it...');

    // --- Effects ---

    // Fetch Date
    useEffect(() => {
        const fetchDate = async () => {
            setLoadingDate(true);
            const date = await getHijriDate();
            setHijriDate(date);
            setLoadingDate(false);
        };
        fetchDate();
    }, [dateAdjustment]);

    // Simulate Moon Phase
    useEffect(() => {
        setTimeout(() => setMoonPhase('Waxing Crescent 🌒'), 1500);
    }, []);

    // Jumu'ah Persistence
    useEffect(() => {
        localStorage.setItem('jumuah_checked_items', JSON.stringify(checkedItems));
    }, [checkedItems]);

    // Persist Location
    useEffect(() => {
        if (userLocation) {
            localStorage.setItem('nur-al-quran:ramadan-location', JSON.stringify(userLocation));
        }
    }, [userLocation]);

    // --- Handlers ---
    const handleAdjustmentChange = useCallback((val: number) => {
        setLocalAdjustment(val);
        setDateAdjustment(val);
    }, []);

    const toggleCheck = useCallback((item: string) => {
        setCheckedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    // Helper for Time Travel Visualization (Memoized)
    const getProjectedDate = useCallback((offsetMonths: number) => {
        if (!hijriDate) return { label: 'Loading...', event: '...' };

        let currentMonth = hijriDate.month.number;
        let projectedMonthNum = (currentMonth + offsetMonths);
        let yearsAdded = 0;

        while (projectedMonthNum > 12) {
            projectedMonthNum -= 12;
            yearsAdded++;
        }

        const hijriMonthNames = ['Muharram', 'Safar', 'Rabi Al-Awwal', 'Rabi Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhul-Qa\'dah', 'Dhul-Hijjah'];
        const monthName = hijriMonthNames[projectedMonthNum - 1];
        const year = parseInt(hijriDate.year) + yearsAdded;
        const upcoming = getUpcomingEvent(projectedMonthNum);

        return {
            label: `${monthName} ${year}`,
            event: upcoming
        };
    }, [hijriDate]);

    const projected = getProjectedDate(sliderValue);

    // Barakah Meter Logic
    const getBarakahLevel = () => {
        if (!hijriDate) return { level: 'Normal', color: 'text-slate-400' };
        const m = hijriDate.month.number;
        if (m === 9 || m === 12) return { level: 'Maximum 🟢', color: 'text-emerald-500' };
        if (m === 1 || m === 7 || m === 11) return { level: 'High (Sacred) 🟡', color: 'text-amber-500' };
        return { level: 'Steady ⚪', color: 'text-slate-400' };
    };

    const barakah = getBarakahLevel();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            {showSettings && (
                <SettingsModal
                    dateAdjustment={dateAdjustment}
                    close={() => setShowSettings(false)}
                    handleAdjustmentChange={handleAdjustmentChange}
                />
            )}

            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
                {activeTab === 'overview' && (
                    <OverviewTab
                        hijriDate={hijriDate}
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                        projected={projected}
                        dateAdjustment={dateAdjustment}
                        setShowSettings={setShowSettings}
                        barakah={barakah}
                        moonPhase={moonPhase}
                        checkedItems={checkedItems}
                        toggleCheck={toggleCheck}
                        jumuahStreak={jumuahStreak}
                    />
                )}
                {activeTab === 'ramadan' && <RamadanTab userLocation={userLocation} setUserLocation={setUserLocation} />}
                {activeTab === 'hajj' && <HajjTab />}
                {activeTab === 'timeline' && <TimelineTab />}
            </div>
        </div>
    );
});

export default SacredTimesPage;
