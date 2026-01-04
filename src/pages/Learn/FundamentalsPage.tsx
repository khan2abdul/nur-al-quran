/**
 * Fundamentals of Faith - Educational Page
 * 
 * Interactive guide to Islam's core beliefs and practices.
 * Designed for beginners with no prior knowledge.
 * 
 * @module pages/Learn/FundamentalsPage
 */

import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';

// ============================================================================
// TYPES
// ============================================================================

interface Section {
    id: string;
    title: string;
    icon: string;
    color: string;
    content: React.ReactNode;
}

interface PillarData {
    id: string;
    name: string;
    arabicName: string;
    icon: string;
    description: string;
    details: string[];
}

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEY = 'nur-al-quran:fundamentals-progress';

// ============================================================================
// DATA
// ============================================================================

const FIVE_PILLARS: PillarData[] = [
    {
        id: 'shahadah',
        name: 'Shahadah',
        arabicName: 'الشهادة',
        icon: '🤲',
        description: 'Declaration of Faith - The testimony that there is no god but Allah, and Muhammad is His messenger.',
        details: [
            'This is the most fundamental belief in Islam.',
            'Saying it with sincere belief makes one a Muslim.',
            'It consists of two parts: belief in One God (Allah) and belief in Prophet Muhammad (peace be upon him).',
            'The Arabic phrase is: "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah"',
        ],
    },
    {
        id: 'salah',
        name: 'Salah',
        arabicName: 'الصلاة',
        icon: '🕌',
        description: 'Prayer - Muslims pray five times daily facing Makkah.',
        details: [
            'Fajr: Dawn prayer before sunrise',
            'Dhuhr: Midday prayer after the sun passes its highest point',
            'Asr: Afternoon prayer',
            'Maghrib: Sunset prayer immediately after sunset',
            'Isha: Night prayer after twilight disappears',
            'Prayer involves physical movements (standing, bowing, prostrating) and recitation of Quran.',
        ],
    },
    {
        id: 'zakat',
        name: 'Zakat',
        arabicName: 'الزكاة',
        icon: '💰',
        description: 'Charity - Annual giving of 2.5% of savings to those in need.',
        details: [
            'Zakat purifies wealth and helps the less fortunate.',
            'It is obligatory only if your savings exceed the Nisab (minimum threshold).',
            'The Nisab is approximately 85 grams of gold or 595 grams of silver.',
            'Zakat can be given to the poor, travelers in need, those in debt, and other categories.',
        ],
    },
    {
        id: 'sawm',
        name: 'Sawm',
        arabicName: 'الصوم',
        icon: '🌙',
        description: 'Fasting - Abstaining from food, drink, and other needs from dawn to sunset during Ramadan.',
        details: [
            'Ramadan is the 9th month of the Islamic lunar calendar.',
            'Fasting teaches self-discipline, empathy for the hungry, and gratitude.',
            'The fast is broken at sunset with a meal called Iftar.',
            'Suhoor is the pre-dawn meal before the fast begins.',
            'Those who are ill, traveling, pregnant, or elderly may be exempt.',
        ],
    },
    {
        id: 'hajj',
        name: 'Hajj',
        arabicName: 'الحج',
        icon: '🕋',
        description: 'Pilgrimage - Journey to Makkah at least once in a lifetime for those who are able.',
        details: [
            'Hajj takes place during the 12th month of the Islamic calendar (Dhul Hijjah).',
            'Pilgrims wear simple white garments called Ihram, symbolizing equality.',
            'Key rituals include circling the Kaaba, walking between Safa and Marwa, and standing at Arafat.',
            'Hajj commemorates the story of Prophet Ibrahim (Abraham) and his family.',
            'It is obligatory only for those who are physically and financially able.',
        ],
    },
];

const SIX_PILLARS_IMAN: PillarData[] = [
    {
        id: 'belief-allah',
        name: 'Belief in Allah',
        arabicName: 'الإيمان بالله',
        icon: '✨',
        description: 'Believing in the One True God - Allah is the only God, with no partners or equals.',
        details: [
            'Allah is the Arabic word for God.',
            'He is the Creator of everything in existence.',
            'He has no beginning and no end.',
            'He is All-Knowing, All-Powerful, and Most Merciful.',
        ],
    },
    {
        id: 'belief-angels',
        name: 'Belief in Angels',
        arabicName: 'الإيمان بالملائكة',
        icon: '👼',
        description: 'Believing in angels - Beings created by Allah from light to carry out His commands.',
        details: [
            'Angels do not have free will; they obey Allah completely.',
            'Jibreel (Gabriel) brought revelations to the prophets.',
            'Mikail (Michael) is responsible for nature and sustenance.',
            'Every person has angels who record their deeds.',
        ],
    },
    {
        id: 'belief-books',
        name: 'Belief in Holy Books',
        arabicName: 'الإيمان بالكتب',
        icon: '📖',
        description: 'Believing in divine scriptures - The Quran is the final and preserved word of Allah.',
        details: [
            'Previous scriptures include the Torah (Tawrat), Psalms (Zabur), and Gospel (Injeel).',
            'The Quran was revealed to Prophet Muhammad over 23 years.',
            'It is the only scripture that remains unchanged in its original form.',
            'Muslims believe all original scriptures came from Allah.',
        ],
    },
    {
        id: 'belief-prophets',
        name: 'Belief in Prophets',
        arabicName: 'الإيمان بالرسل',
        icon: '🕊️',
        description: 'Believing in all prophets - From Adam to Muhammad, all were sent by Allah.',
        details: [
            '25 prophets are mentioned by name in the Quran.',
            'All prophets taught the same core message: worship Allah alone.',
            'Muhammad (peace be upon him) is the final prophet.',
            'Prophets include Adam, Noah, Abraham, Moses, Jesus, and Muhammad.',
        ],
    },
    {
        id: 'belief-day-judgment',
        name: 'Belief in the Day of Judgment',
        arabicName: 'الإيمان باليوم الآخر',
        icon: '⚖️',
        description: 'Believing in the Last Day - Everyone will be held accountable for their deeds.',
        details: [
            'Life on Earth is temporary; the afterlife is eternal.',
            'On this day, all humans will be resurrected and judged.',
            'Good deeds lead to Paradise (Jannah), bad deeds lead to Hell (Jahannam).',
            'Allah is the Most Just and Most Merciful in His judgment.',
        ],
    },
    {
        id: 'belief-qadr',
        name: 'Belief in Divine Decree',
        arabicName: 'الإيمان بالقدر',
        icon: '🌌',
        description: 'Believing in Qadr - Allah has knowledge of everything that will happen.',
        details: [
            'Allah knows the past, present, and future.',
            'Humans have free will to make choices, but Allah knows what they will choose.',
            'Believing in Qadr brings peace during hardships.',
            'Both good and difficult times are tests from Allah.',
        ],
    },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Collapsible Pillar Card
 */
interface PillarCardProps {
    pillar: PillarData;
    isExpanded: boolean;
    isRead: boolean;
    onToggle: () => void;
    colorScheme: 'emerald' | 'blue';
}

const PillarCard: React.FC<PillarCardProps> = memo(({ pillar, isExpanded, isRead, onToggle, colorScheme }) => {
    const colors = {
        emerald: {
            bg: 'bg-emerald-400/10',
            border: 'border-emerald-400/20',
            text: 'text-emerald-500',
            hover: 'hover:border-emerald-400/50',
        },
        blue: {
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20',
            text: 'text-blue-500',
            hover: 'hover:border-blue-400/50',
        },
    };

    const c = colors[colorScheme];

    return (
        <div className={`rounded-2xl border ${c.border} ${c.hover} transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800/50`}>
            <button
                onClick={onToggle}
                className="w-full p-5 flex items-center gap-4 text-left"
            >
                <span className={`text-3xl p-3 rounded-xl ${c.bg}`}>{pillar.icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className={`text-lg font-bold ${c.text}`}>{pillar.name}</h3>
                        <span className="text-sm text-slate-400 font-arabic">{pillar.arabicName}</span>
                        {isRead && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{pillar.description}</p>
                </div>
                <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Expandable Content */}
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-white/5">
                    <ul className="space-y-2">
                        {pillar.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <span className={`${c.text} mt-1`}>•</span>
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});

PillarCard.displayName = 'PillarCard';

/**
 * Progress Bar Component
 */
const ProgressBar: React.FC<{ progress: number }> = memo(({ progress }) => (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
        />
    </div>
));

ProgressBar.displayName = 'ProgressBar';

/**
 * Zakat Calculator Widget
 */
const ZakatCalculator: React.FC = memo(() => {
    const [wealth, setWealth] = useState<string>('');
    const [currency, setCurrency] = useState<string>('USD');

    const currencySymbols: Record<string, string> = {
        USD: '$',
        GBP: '£',
        EUR: '€',
        INR: '₹',
        SAR: 'ر.س',
    };

    const nisabInUSD = 5500; // Approximate Nisab in USD
    const zakatAmount = wealth ? parseFloat(wealth) * 0.025 : 0;
    const meetsNisab = parseFloat(wealth || '0') >= nisabInUSD;

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                ðŸ’° Zakat Calculator
            </h4>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                        {Object.keys(currencySymbols).map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Enter your total savings..."
                        value={wealth}
                        onChange={(e) => setWealth(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                </div>

                {/* Nisab Progress */}
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Nisab Threshold</span>
                        <span>{meetsNisab ? 'âœ… Eligible' : 'âŒ Below Nisab'}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${meetsNisab ? 'bg-emerald-400' : 'bg-amber-400'}`}
                            style={{ width: `${Math.min((parseFloat(wealth || '0') / nisabInUSD) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {wealth && parseFloat(wealth) > 0 && (
                    <div className={`p-4 rounded-xl ${meetsNisab ? 'bg-emerald-400/10 border border-emerald-400/20' : 'bg-amber-400/10 border border-amber-400/20'}`}>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {meetsNisab ? (
                                <>
                                    Your Zakat (2.5%): <span className="font-bold text-emerald-500">{currencySymbols[currency]}{zakatAmount.toFixed(2)}</span>
                                </>
                            ) : (
                                <>Your savings are below the Nisab threshold. No Zakat is due.</>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
});

ZakatCalculator.displayName = 'ZakatCalculator';

/**
 * Section Navigation Sidebar
 */
interface SidebarProps {
    sections: { id: string; title: string; icon: string }[];
    activeSection: string;
    progress: Record<string, boolean>;
}

const Sidebar: React.FC<SidebarProps> = memo(({ sections, activeSection, progress }) => (
    <aside className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <nav className="flex flex-col gap-2 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-xl">
            {sections.map((section) => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeSection === section.id
                        ? 'bg-emerald-400 text-slate-900'
                        : progress[section.id]
                            ? 'bg-emerald-400/20 text-emerald-500'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-emerald-400'
                        }`}
                    title={section.title}
                >
                    <span className="text-lg">{section.icon}</span>
                </a>
            ))}
        </nav>
    </aside>
));

Sidebar.displayName = 'Sidebar';

// ============================================================================
// PHASE 2 COMPONENTS
// ============================================================================

/**
 * Prayer Times Timeline with Location Selection
 */
interface PrayerTimeData {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

interface LocationOption {
    city: string;
    country: string;
    label: string;
}

const POPULAR_LOCATIONS: LocationOption[] = [
    { city: 'Mecca', country: 'Saudi Arabia', label: '🕋 Mecca, Saudi Arabia' },
    { city: 'Medina', country: 'Saudi Arabia', label: '🕌 Medina, Saudi Arabia' },
    { city: 'Dubai', country: 'UAE', label: '🇦🇪 Dubai, UAE' },
    { city: 'London', country: 'UK', label: '🇬🇧 London, UK' },
    { city: 'New York', country: 'USA', label: '🇺🇸 New York, USA' },
    { city: 'Toronto', country: 'Canada', label: '🇨🇦 Toronto, Canada' },
    // India - Major cities with different prayer times
    { city: 'Mumbai', country: 'India', label: '🇮🇳 Mumbai, India' },
    { city: 'Delhi', country: 'India', label: '🇮🇳 Delhi, India' },
    { city: 'Hyderabad', country: 'India', label: '🇮🇳 Hyderabad, India' },
    { city: 'Chennai', country: 'India', label: '🇮🇳 Chennai, India' },
    { city: 'Kolkata', country: 'India', label: '🇮🇳 Kolkata, India' },
    { city: 'Bangalore', country: 'India', label: '🇮🇳 Bangalore, India' },
    { city: 'Lucknow', country: 'India', label: '🇮🇳 Lucknow, India' },
    // Other countries
    { city: 'Karachi', country: 'Pakistan', label: '🇵🇰 Karachi, Pakistan' },
    { city: 'Jakarta', country: 'Indonesia', label: '🇮🇩 Jakarta, Indonesia' },
    { city: 'Cairo', country: 'Egypt', label: '🇪🇬 Cairo, Egypt' },
    { city: 'Istanbul', country: 'Turkey', label: '🇹🇷 Istanbul, Turkey' },
    { city: 'Kuala Lumpur', country: 'Malaysia', label: '🇲🇾 Kuala Lumpur, Malaysia' },
];

const PRAYER_STORAGE_KEY = 'nur-al-quran:prayer-location';

const PrayerTimeline: React.FC = memo(() => {
    const [selectedLocation, setSelectedLocation] = useState<LocationOption>(() => {
        const saved = getStorageItem<LocationOption | null>(PRAYER_STORAGE_KEY, null);
        return saved || POPULAR_LOCATIONS[0];
    });
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            setLoading(true);
            setError(null);
            try {
                const today = new Date();
                const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(selectedLocation.city)}&country=${encodeURIComponent(selectedLocation.country)}&method=2`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                if (data.code === 200 && data.data?.timings) {
                    setPrayerTimes({
                        fajr: data.data.timings.Fajr,
                        dhuhr: data.data.timings.Dhuhr,
                        asr: data.data.timings.Asr,
                        maghrib: data.data.timings.Maghrib,
                        isha: data.data.timings.Isha,
                    });
                } else throw new Error('Invalid response');
            } catch {
                setError('Using default times');
                setPrayerTimes({ fajr: '05:30', dhuhr: '12:30', asr: '15:45', maghrib: '18:15', isha: '20:00' });
            } finally {
                setLoading(false);
            }
        };
        fetchPrayerTimes();
        setStorageItem(PRAYER_STORAGE_KEY, selectedLocation);
    }, [selectedLocation]);

    const parseHour = (timeStr: string): number => parseInt(timeStr.split(':')[0], 10);

    const getCurrentPrayer = (): string => {
        if (!prayerTimes) return 'fajr';
        const now = currentHour * 60 + currentMinutes;
        const times = [
            { id: 'fajr', mins: parseHour(prayerTimes.fajr) * 60 },
            { id: 'dhuhr', mins: parseHour(prayerTimes.dhuhr) * 60 },
            { id: 'asr', mins: parseHour(prayerTimes.asr) * 60 },
            { id: 'maghrib', mins: parseHour(prayerTimes.maghrib) * 60 },
            { id: 'isha', mins: parseHour(prayerTimes.isha) * 60 },
        ];
        for (let i = times.length - 1; i >= 0; i--) {
            if (now >= times[i].mins) return times[i].id;
        }
        return 'isha';
    };

    const currentPrayer = getCurrentPrayer();
    const prayers = [
        { id: 'fajr', name: 'Fajr', time: prayerTimes?.fajr || '--:--', icon: '🌅' },
        { id: 'dhuhr', name: 'Dhuhr', time: prayerTimes?.dhuhr || '--:--', icon: '☀ï¸' },
        { id: 'asr', name: 'Asr', time: prayerTimes?.asr || '--:--', icon: '🌤ï¸' },
        { id: 'maghrib', name: 'Maghrib', time: prayerTimes?.maghrib || '--:--', icon: '🌅' },
        { id: 'isha', name: 'Isha', time: prayerTimes?.isha || '--:--', icon: '🌙' },
    ];

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    🕐 Daily Prayer Times
                    {!loading && <span className="text-xs font-normal text-emerald-500 bg-emerald-400/10 px-2 py-1 rounded-full">Current: {prayers.find(p => p.id === currentPrayer)?.name}</span>}
                </h4>
                <select
                    value={`${selectedLocation.city},${selectedLocation.country}`}
                    onChange={(e) => {
                        const [city, country] = e.target.value.split(',');
                        const loc = POPULAR_LOCATIONS.find(l => l.city === city && l.country === country);
                        if (loc) setSelectedLocation(loc);
                    }}
                    className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white cursor-pointer"
                >
                    {POPULAR_LOCATIONS.map((loc) => (
                        <option key={`${loc.city}-${loc.country}`} value={`${loc.city},${loc.country}`}>{loc.label}</option>
                    ))}
                </select>
            </div>
            {error && <div className="mb-4 p-2 text-xs text-amber-600 bg-amber-400/10 rounded-lg">âš ï¸ {error}</div>}
            <div className="relative">
                {loading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-400 rounded-full animate-spin" /></div>
                ) : (
                    <>
                        <div className="absolute top-8 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-700 rounded-full" />
                        <div className="absolute top-8 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${(prayers.findIndex(p => p.id === currentPrayer) + 1) / prayers.length * 100}%` }} />
                        <div className="relative flex justify-between">
                            {prayers.map((prayer, idx) => {
                                const isPast = prayers.findIndex(p => p.id === currentPrayer) >= idx;
                                const isCurrent = prayer.id === currentPrayer;
                                return (
                                    <div key={prayer.id} className="flex flex-col items-center">
                                        <span className="text-2xl mb-2">{prayer.icon}</span>
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all z-10 ${isCurrent ? 'bg-emerald-400 border-emerald-400 ring-4 ring-emerald-400/30 animate-pulse' : isPast ? 'bg-emerald-400 border-emerald-400' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`} />
                                        <span className={`mt-2 text-xs font-bold ${isCurrent ? 'text-emerald-500' : 'text-slate-500'}`}>{prayer.name}</span>
                                        <span className="text-[10px] text-slate-400">{prayer.time}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-center">
                <p className="text-xs text-slate-400">📍 {selectedLocation.city}, {selectedLocation.country} • Powered by Aladhan API</p>
            </div>
        </div>
    );
});

PrayerTimeline.displayName = 'PrayerTimeline';

/**
 * Prophet Timeline
 */
const PROPHETS = [
    { id: 'adam', name: 'Adam', arabicName: 'آدم', era: 'Beginning', message: 'First human and prophet', icon: '🌿' },
    { id: 'nuh', name: 'Noah (Nuh)', arabicName: 'نوح', era: '~3000 BCE', message: 'Built the Ark, warned his people', icon: '🚢' },
    { id: 'ibrahim', name: 'Abraham (Ibrahim)', arabicName: 'إبراهيم', era: '~2000 BCE', message: 'Father of prophets, built the Kaaba', icon: '🕋' },
    { id: 'musa', name: 'Moses (Musa)', arabicName: 'موسى', era: '~1400 BCE', message: 'Received the Torah, freed Israelites', icon: '📜' },
    { id: 'isa', name: 'Jesus (Isa)', arabicName: 'عيسى', era: '~1 CE', message: 'Born miraculously, healed the sick', icon: '✨' },
    { id: 'muhammad', name: 'Muhammad ﷺ', arabicName: 'محمد', era: '570-632 CE', message: 'Final prophet, received the Quran', icon: '🌙' },
];

const ProphetTimeline: React.FC = memo(() => {
    const [selectedProphet, setSelectedProphet] = useState<string | null>(null);

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                🕊️ Timeline of Prophets
                <span className="text-xs font-normal text-slate-400">(Click to learn more)</span>
            </h4>

            {/* Timeline */}
            <div className="relative overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                    {PROPHETS.map((prophet, idx) => (
                        <button
                            key={prophet.id}
                            onClick={() => setSelectedProphet(selectedProphet === prophet.id ? null : prophet.id)}
                            className={`relative flex flex-col items-center p-4 rounded-xl transition-all ${selectedProphet === prophet.id
                                ? 'bg-cyan-400/20 border-2 border-cyan-400 scale-105'
                                : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-cyan-400/30'
                                }`}
                        >
                            <span className="text-3xl mb-2">{prophet.icon}</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{prophet.name}</span>
                            <span className="text-xs text-slate-400">{prophet.era}</span>

                            {/* Connector Line */}
                            {idx < PROPHETS.length - 1 && (
                                <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-cyan-400/30" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Prophet Details */}
            {selectedProphet && (
                <div className="mt-4 p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/20 animate-fadeIn">
                    {(() => {
                        const prophet = PROPHETS.find(p => p.id === selectedProphet);
                        return prophet ? (
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">{prophet.icon}</span>
                                <div>
                                    <h5 className="font-bold text-cyan-500">{prophet.name} <span className="font-arabic text-slate-400">{prophet.arabicName}</span></h5>
                                    <p className="text-xs text-slate-500 mb-2">{prophet.era}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{prophet.message}</p>
                                </div>
                            </div>
                        ) : null;
                    })()}
                </div>
            )}
        </div>
    );
});

ProphetTimeline.displayName = 'ProphetTimeline';

/**
 * Mini Quiz Component
 */
interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'How many Pillars of Islam are there?',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'There are 5 Pillars of Islam: Shahadah, Salah, Zakat, Sawm, and Hajj.',
    },
    {
        id: 'q2',
        question: 'What is the name of the charity that Muslims give annually?',
        options: ['Sadaqah', 'Zakat', 'Hajj', 'Sawm'],
        correct: 1,
        explanation: 'Zakat is the obligatory charity (2.5% of savings) given annually.',
    },
    {
        id: 'q3',
        question: 'During which month do Muslims fast?',
        options: ['Shawwal', 'Dhul Hijjah', 'Ramadan', 'Muharram'],
        correct: 2,
        explanation: 'Ramadan is the 9th month of the Islamic calendar when Muslims fast.',
    },
    {
        id: 'q4',
        question: 'How many Pillars of Iman (Belief) are there?',
        options: ['5', '6', '7', '4'],
        correct: 1,
        explanation: 'There are 6 Pillars of Iman: Belief in Allah, Angels, Books, Prophets, Day of Judgment, and Divine Decree.',
    },
    {
        id: 'q5',
        question: 'Who is the final prophet in Islam?',
        options: ['Jesus (Isa)', 'Moses (Musa)', 'Muhammad ï·º', 'Abraham (Ibrahim)'],
        correct: 2,
        explanation: 'Muhammad (peace be upon him) is the final prophet and messenger of Allah.',
    },
];

const QuizSection: React.FC = memo(() => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const question = QUIZ_QUESTIONS[currentQuestion];
    const score = Object.entries(answers).filter(
        ([qId, answer]) => QUIZ_QUESTIONS.find(q => q.id === qId)?.correct === answer
    ).length;

    const handleAnswer = (optionIdx: number) => {
        setAnswers({ ...answers, [question.id]: optionIdx });
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        setShowExplanation(false);
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setShowExplanation(false);
    };

    if (showResults) {
        const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        return (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8 text-center">
                <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}</div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h4>
                <p className="text-lg text-slate-500 mb-4">
                    You scored <span className="font-bold text-emerald-500">{score}/{QUIZ_QUESTIONS.length}</span> ({percentage}%)
                </p>
                {percentage === 100 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 text-amber-500 rounded-full text-sm font-bold mb-4">
                        🏆 Achievement Unlocked: Quiz Master!
                    </div>
                )}
                <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-emerald-400 text-slate-900 font-bold rounded-xl hover:bg-emerald-300 transition-all"
                >
                    Retake Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    📝 Test Your Knowledge
                </h4>
                <span className="text-sm text-slate-500">
                    Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
            </div>

            <p className="text-lg text-slate-900 dark:text-white font-medium mb-4">{question.question}</p>

            <div className="space-y-2">
                {question.options.map((option, idx) => {
                    const isSelected = answers[question.id] === idx;
                    const isCorrect = question.correct === idx;
                    const showCorrectness = showExplanation && isSelected;

                    return (
                        <button
                            key={idx}
                            onClick={() => !showExplanation && handleAnswer(idx)}
                            disabled={showExplanation}
                            className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${showCorrectness
                                ? isCorrect
                                    ? 'bg-emerald-400/20 border-2 border-emerald-400'
                                    : 'bg-red-400/20 border-2 border-red-400'
                                : showExplanation && isCorrect
                                    ? 'bg-emerald-400/20 border-2 border-emerald-400'
                                    : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-cyan-400/30'
                                }`}
                        >
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${showExplanation && isCorrect ? 'bg-emerald-400 text-slate-900' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                                }`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-slate-700 dark:text-slate-200">{option}</span>
                        </button>
                    );
                })}
            </div>

            {showExplanation && (
                <div className="mt-4 p-4 rounded-xl bg-blue-400/10 border border-blue-400/20">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="text-blue-500">Explanation:</strong> {question.explanation}
                    </p>
                    <button
                        onClick={nextQuestion}
                        className="mt-3 px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded-lg text-sm hover:bg-cyan-300 transition-all"
                    >
                        {currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results'}
                    </button>
                </div>
            )}
        </div>
    );
});

QuizSection.displayName = 'QuizSection';

/**
 * Comparison Table: 5 Pillars vs 6 Pillars
 */
const ComparisonTable: React.FC = memo(() => {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    📊 Practices vs Beliefs
                </h4>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('table')}
                        className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'table' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}
                    >
                        Table
                    </button>
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'cards' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}
                    >
                        Cards
                    </button>
                </div>
            </div>

            {viewMode === 'table' ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/10">
                                <th className="text-left py-3 px-2 text-emerald-500">5 Pillars (Actions)</th>
                                <th className="text-left py-3 px-2 text-blue-500">6 Pillars (Beliefs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-3 px-2">🤲 Shahadah (Declaration)</td>
                                <td className="py-3 px-2">✨ Belief in Allah</td>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-3 px-2">🕌 Salah (Prayer)</td>
                                <td className="py-3 px-2">👼 Belief in Angels</td>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-3 px-2">💰 Zakat (Charity)</td>
                                <td className="py-3 px-2">📖 Belief in Holy Books</td>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-3 px-2">🌙 Sawm (Fasting)</td>
                                <td className="py-3 px-2">🕊️ Belief in Prophets</td>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-3 px-2">🕋 Hajj (Pilgrimage)</td>
                                <td className="py-3 px-2">⚖️ Belief in Day of Judgment</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2 text-slate-400">—</td>
                                <td className="py-3 px-2">🌌 Belief in Divine Decree</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                        <h5 className="font-bold text-emerald-500 mb-3">5 Pillars (Actions)</h5>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {['🤲 Shahadah', '🕌 Salah', '💰 Zakat', '🌙 Sawm', '🕋 Hajj'].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/20">
                        <h5 className="font-bold text-blue-500 mb-3">6 Pillars (Beliefs)</h5>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {['✨ Allah', '👼 Angels', '📖 Books', '🕊️ Prophets', '⚖️ Judgment', '🌌 Decree'].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
});

ComparisonTable.displayName = 'ComparisonTable';

// ============================================================================
// PHASE 3 COMPONENTS
// ============================================================================

/**
 * Hajj Journey Map - Interactive walkthrough of Hajj locations
 */
const HAJJ_LOCATIONS = [
    {
        id: 'miqat',
        name: 'Miqat',
        icon: '📍',
        description: 'The boundary point where pilgrims enter the state of Ihram (sacred state).',
        details: 'Pilgrims put on simple white garments (Ihram) and make the intention for Hajj.',
    },
    {
        id: 'kaaba',
        name: 'Kaaba',
        icon: '🕋',
        description: 'The sacred cube-shaped structure in Masjid al-Haram.',
        details: 'Pilgrims perform Tawaf by circling the Kaaba 7 times counterclockwise.',
    },
    {
        id: 'safa-marwa',
        name: 'Safa & Marwa',
        icon: '🏔️',
        description: 'Two hills between which pilgrims walk 7 times.',
        details: 'This commemorates Hajar\'s search for water for her son Ismail.',
    },
    {
        id: 'mina',
        name: 'Mina',
        icon: '⛺',
        description: 'A tent city where pilgrims stay during Hajj.',
        details: 'Pilgrims spend the night here before proceeding to Arafat.',
    },
    {
        id: 'arafat',
        name: 'Arafat',
        icon: '🌄',
        description: 'The most important day of Hajj - the Day of Standing.',
        details: 'Pilgrims spend the afternoon in prayer and supplication. This is the essence of Hajj.',
    },
    {
        id: 'muzdalifah',
        name: 'Muzdalifah',
        icon: '🌙',
        description: 'Open area where pilgrims spend the night under the stars.',
        details: 'Pilgrims collect pebbles here for the stoning ritual.',
    },
    {
        id: 'jamarat',
        name: 'Jamarat',
        icon: '🪨',
        description: 'Three pillars representing Satan.',
        details: 'Pilgrims throw pebbles at these pillars, symbolizing the rejection of evil.',
    },
];

const HajjJourneyMap: React.FC = memo(() => {
    const [currentStep, setCurrentStep] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        if (autoPlay) {
            const timer = setInterval(() => {
                setCurrentStep((prev) => (prev + 1) % HAJJ_LOCATIONS.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [autoPlay]);

    const location = HAJJ_LOCATIONS[currentStep];

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    🕋 Hajj Journey
                </h4>
                <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${autoPlay
                        ? 'bg-emerald-400 text-slate-900'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                        }`}
                >
                    {autoPlay ? '⏸️ Pause' : '▶️ Auto Tour'}
                </button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
                {HAJJ_LOCATIONS.map((loc, idx) => (
                    <button
                        key={loc.id}
                        onClick={() => setCurrentStep(idx)}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${idx === currentStep
                            ? 'bg-amber-400 text-slate-900 scale-110 shadow-lg'
                            : idx < currentStep
                                ? 'bg-emerald-400/20 text-emerald-500'
                                : 'bg-slate-100 dark:bg-slate-700'
                            }`}
                    >
                        {loc.icon}
                    </button>
                ))}
            </div>

            {/* Current Location Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-400/10 border border-amber-400/20">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{location.icon}</span>
                    <div>
                        <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                            Step {currentStep + 1} of {HAJJ_LOCATIONS.length}
                        </span>
                        <h5 className="text-xl font-bold text-slate-900 dark:text-white">{location.name}</h5>
                    </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-3">{location.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">{location.details}</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-sm font-bold rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 disabled:opacity-50"
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setCurrentStep(Math.min(HAJJ_LOCATIONS.length - 1, currentStep + 1))}
                    disabled={currentStep === HAJJ_LOCATIONS.length - 1}
                    className="px-4 py-2 text-sm font-bold rounded-lg bg-amber-400 text-slate-900 disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
});

HajjJourneyMap.displayName = 'HajjJourneyMap';

/**
 * Ramadan Fasting Simulator
 */
const RamadanSimulator: React.FC = memo(() => {
    const [selectedHour, setSelectedHour] = useState(12);

    const fastingHours = [
        { hour: 4, label: '4 AM', period: 'Suhoor', icon: '🍽️', isFasting: false, tip: 'Eat a nutritious pre-dawn meal' },
        { hour: 5, label: '5 AM', period: 'Fajr', icon: '🌅', isFasting: true, tip: 'Fast begins at dawn' },
        { hour: 8, label: '8 AM', period: 'Morning', icon: '☀️', isFasting: true, tip: 'Stay hydrated before dawn' },
        { hour: 12, label: '12 PM', period: 'Midday', icon: '🌞', isFasting: true, tip: 'Focus on work and worship' },
        { hour: 15, label: '3 PM', period: 'Afternoon', icon: '🌤️', isFasting: true, tip: 'Take a short rest if needed' },
        { hour: 18, label: '6 PM', period: 'Maghrib', icon: '🌅', isFasting: false, tip: 'Break fast with dates and water' },
        { hour: 20, label: '8 PM', period: 'Isha', icon: '🌙', isFasting: false, tip: 'Pray Taraweeh prayers' },
        { hour: 22, label: '10 PM', period: 'Night', icon: '🌜', isFasting: false, tip: 'Rest and prepare for next day' },
    ];

    const currentPeriod = fastingHours.find(h => h.hour === selectedHour) || fastingHours[3];

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-xl mt-8">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                🌙 A Day of Fasting in Ramadan
            </h4>

            {/* Timeline Slider */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>4 AM</span>
                    <span>12 PM</span>
                    <span>10 PM</span>
                </div>
                <input
                    type="range"
                    min="4"
                    max="22"
                    step="1"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #9ca3af ${((selectedHour - 4) / 18) * 100}%, #e5e7eb ${((selectedHour - 4) / 18) * 100}%)`,
                    }}
                />
            </div>

            {/* Current Status */}
            <div className={`p-6 rounded-xl ${currentPeriod.isFasting ? 'bg-purple-400/10 border border-purple-400/20' : 'bg-emerald-400/10 border border-emerald-400/20'}`}>
                <div className="flex items-center gap-4">
                    <span className="text-5xl">{currentPeriod.icon}</span>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{currentPeriod.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${currentPeriod.isFasting ? 'bg-purple-400 text-white' : 'bg-emerald-400 text-slate-900'
                                }`}>
                                {currentPeriod.isFasting ? 'ðŸš« Fasting' : 'âœ… Eating Allowed'}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">{currentPeriod.period}</p>
                    </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 italic">
                    💡 Tip: {currentPeriod.tip}
                </p>
            </div>

            {/* What to Do / Avoid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                    <h5 className="font-bold text-emerald-500 mb-2 text-sm">✅ During Fasting</h5>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <li>• Pray and read Quran</li>
                        <li>• Do good deeds & charity</li>
                        <li>• Be patient and kind</li>
                        <li>• Make dua (supplication)</li>
                    </ul>
                </div>
                <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20">
                    <h5 className="font-bold text-red-500 mb-2 text-sm">❌ Avoid While Fasting</h5>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <li>• Eating or drinking</li>
                        <li>• Anger and arguments</li>
                        <li>• Backbiting / gossip</li>
                        <li>• Wasting time</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

RamadanSimulator.displayName = 'RamadanSimulator';

/**
 * Achievement Badges System
 */
interface Achievement {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockCondition: string;
}

const ACHIEVEMENTS: Achievement[] = [
    { id: 'first-read', name: 'First Steps', icon: '🚶', description: 'Read your first section', unlockCondition: 'sections >= 1' },
    { id: 'five-pillars', name: 'Pillar Explorer', icon: '🕌', description: 'Learned all 5 Pillars', unlockCondition: 'pillars5 === 5' },
    { id: 'six-pillars', name: 'Believer', icon: '✨', description: 'Learned all 6 Pillars of Iman', unlockCondition: 'pillars6 === 6' },
    { id: 'quiz-complete', name: 'Quiz Taker', icon: '📝', description: 'Completed the knowledge quiz', unlockCondition: 'quiz === true' },
    { id: 'quiz-master', name: 'Quiz Master', icon: '🏆', description: 'Scored 100% on the quiz', unlockCondition: 'quizPerfect === true' },
    { id: 'page-complete', name: 'Scholar', icon: '🎓', description: 'Completed the entire page', unlockCondition: 'complete === true' },
];

interface AchievementBadgesProps {
    readSections: Record<string, boolean>;
    totalSectionsRead: number;
}

const AchievementBadges: React.FC<AchievementBadgesProps> = memo(({ readSections, totalSectionsRead }) => {
    // Calculate unlocked achievements
    const fivePillarsCount = ['shahadah', 'salah', 'zakat', 'sawm', 'hajj'].filter(id => readSections[id]).length;
    const sixPillarsCount = ['belief-allah', 'belief-angels', 'belief-books', 'belief-prophets', 'belief-day-judgment', 'belief-qadr'].filter(id => readSections[id]).length;

    const unlockedAchievements = [
        totalSectionsRead >= 1 ? 'first-read' : null,
        fivePillarsCount === 5 ? 'five-pillars' : null,
        sixPillarsCount === 6 ? 'six-pillars' : null,
        fivePillarsCount === 5 && sixPillarsCount === 6 ? 'page-complete' : null,
    ].filter(Boolean) as string[];

    const totalPoints = unlockedAchievements.length * 10;

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-400/10 to-orange-400/10 border border-amber-400/20 mt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    🏆 Your Achievements
                </h4>
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-400 rounded-full">
                    <span className="text-sm font-bold text-slate-900">{totalPoints} pts</span>
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = unlockedAchievements.includes(achievement.id);
                    return (
                        <div
                            key={achievement.id}
                            className={`p-3 rounded-xl text-center transition-all ${isUnlocked
                                ? 'bg-amber-400/20 border border-amber-400/30'
                                : 'bg-slate-100 dark:bg-slate-700/50 opacity-50 grayscale'
                                }`}
                            title={achievement.description}
                        >
                            <span className="text-2xl">{achievement.icon}</span>
                            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1 truncate">
                                {achievement.name}
                            </p>
                        </div>
                    );
                })}
            </div>

            {unlockedAchievements.length > 0 && (
                <p className="text-center text-xs text-slate-500 mt-4">
                    🎉 {unlockedAchievements.length} of {ACHIEVEMENTS.length} achievements unlocked!
                </p>
            )}
        </div>
    );
});

AchievementBadges.displayName = 'AchievementBadges';

// ============================================================================
// NEW LAYOUT COMPONENTS
// ============================================================================

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-800 overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🕌</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">📖</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float">🤲</div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🎓</span> Comprehensive Guide
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Fundamentals of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Faith</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                An interactive journey through the core beliefs and practices of Islam.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                Explore the Five Pillars of Islam, the Six Articles of Faith, and the concept of Tawhid in a simple, engaging way.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-emerald-400">5</span>
                    <span className="text-white/80 ml-2">Pillars of Islam</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-cyan-400">6</span>
                    <span className="text-white/80 ml-2">Articles of Faith</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-amber-400">100%</span>
                    <span className="text-white/80 ml-2">Interactive</span>
                </div>
            </div>
        </div>
    </div>
));

type TabId = 'intro' | 'islam' | 'iman' | 'quiz';

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4">
        {[
            { id: 'intro' as TabId, label: 'Overview', icon: '📚' },
            { id: 'islam' as TabId, label: '5 Pillars of Islam', icon: '🕌' },
            { id: 'iman' as TabId, label: '6 Pillars of Iman', icon: '✨' },
            { id: 'quiz' as TabId, label: 'Quiz & Rewards', icon: '🏆' },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full md:w-auto px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2 ${activeTab === tab.id
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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export const FundamentalsPage: React.FC = memo(() => {
    // State
    const [activeTab, setActiveTab] = useState<TabId>('intro');
    const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set());
    const [readSections, setReadSections] = useState<Record<string, boolean>>(() =>
        getStorageItem(STORAGE_KEY, {})
    );

    // Load saved progress
    useEffect(() => {
        const saved = getStorageItem<Record<string, boolean>>(STORAGE_KEY, {});
        setReadSections(saved);
    }, []);

    // Save progress when sections are read
    useEffect(() => {
        setStorageItem(STORAGE_KEY, readSections);
    }, [readSections]);

    // Toggle pillar expansion
    const togglePillar = useCallback((id: string) => {
        setExpandedPillars((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
                // Mark as read when expanded
                setReadSections((rs) => ({ ...rs, [id]: true }));
            }
            return next;
        });
    }, []);

    // Expand/Collapse All
    const expandAll = useCallback((pillars: PillarData[]) => {
        setExpandedPillars(new Set(pillars.map((p) => p.id)));
        const newRead = pillars.reduce((acc, p) => ({ ...acc, [p.id]: true }), {});
        setReadSections((rs) => ({ ...rs, ...newRead }));
    }, []);

    const collapseAll = useCallback(() => {
        setExpandedPillars(new Set());
    }, []);

    // Calculate overall progress for achievements
    const totalItems = FIVE_PILLARS.length + SIX_PILLARS_IMAN.length;
    const completedItems = Object.values(readSections).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            {/* New Hero Section */}
            <HeroSection />

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 py-12">

                {/* INTRO TAB */}
                {activeTab === 'intro' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 shadow-xl">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                                Welcome to Islamic Fundamentals
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                <p className="mb-6">
                                    Islam is a complete way of life based on the belief in One God (Allah) and the guidance of His final prophet, Muhammad (peace be upon him).
                                    This interactive guide is designed to take you through the essential beliefs and practices that form the unshakeable foundation of the Islamic faith.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 my-8">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-500/20">
                                        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                                            <span>🕌</span> The 5 Pillars
                                        </h3>
                                        <p className="text-sm">
                                            The practical actions that every Muslim performs, from daily prayers to charity and pilgrimage. These are the framework of a Muslim's life.
                                        </p>
                                    </div>
                                    <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-6 border border-cyan-100 dark:border-cyan-500/20">
                                        <h3 className="text-lg font-bold text-cyan-800 dark:text-cyan-300 mb-3 flex items-center gap-2">
                                            <span>✨</span> The 6 Beliefs
                                        </h3>
                                        <p className="text-sm">
                                            The articles of faith (Iman) that reside in the heart, defining a Muslim's worldview and connection to the Divine.
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    Use the tabs above to navigate through each section. Complete the readings and interactive modules to unlock achievements and test your knowledge!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ISLAM TAB (5 Pillars) */}
                {activeTab === 'islam' && (
                    <div className="animate-fade-in space-y-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The 5 Pillars of Islam</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                The five core practices every Muslim follows to build a life of devotion and discipline.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-end gap-2">
                            <button onClick={() => expandAll(FIVE_PILLARS)} className="btn-secondary text-xs py-1.5">Expand All</button>
                            <button onClick={collapseAll} className="btn-secondary text-xs py-1.5">Collapse All</button>
                        </div>

                        <div className="space-y-4">
                            {FIVE_PILLARS.map((pillar) => (
                                <PillarCard
                                    key={pillar.id}
                                    pillar={pillar}
                                    isExpanded={expandedPillars.has(pillar.id)}
                                    isRead={readSections[pillar.id] || false}
                                    onToggle={() => togglePillar(pillar.id)}
                                    colorScheme="emerald"
                                />
                            ))}
                        </div>

                        <div className="border-t border-slate-200 dark:border-white/10 pt-12 space-y-12">
                            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Interactive Tools & Guides</h3>

                            {/* Zakat */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">💰 Zakat (Charity) Calculator</h4>
                                <ZakatCalculator />
                            </div>

                            {/* Prayer */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">🕌 Daily Prayer Times</h4>
                                <PrayerTimeline />
                            </div>

                            {/* Ramadan */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">🌙 Ramadan Fasting Guide</h4>
                                <RamadanSimulator />
                            </div>

                            {/* Hajj */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">🕋 Hajj Journey</h4>
                                <HajjJourneyMap />
                            </div>
                        </div>
                    </div>
                )}

                {/* IMAN TAB (6 Pillars + Beliefs) */}
                {activeTab === 'iman' && (
                    <div className="animate-fade-in space-y-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The 6 Pillars of Iman (Faith)</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                The essential beliefs that form the spiritual foundation of a Muslim.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-end gap-2">
                            <button onClick={() => expandAll(SIX_PILLARS_IMAN)} className="btn-secondary text-xs py-1.5">Expand All</button>
                            <button onClick={collapseAll} className="btn-secondary text-xs py-1.5">Collapse All</button>
                        </div>

                        <div className="space-y-4">
                            {SIX_PILLARS_IMAN.map((pillar) => (
                                <PillarCard
                                    key={pillar.id}
                                    pillar={pillar}
                                    isExpanded={expandedPillars.has(pillar.id)}
                                    isRead={readSections[pillar.id] || false}
                                    onToggle={() => togglePillar(pillar.id)}
                                    colorScheme="blue"
                                />
                            ))}
                        </div>

                        {/* Additional Concepts */}
                        <div className="grid md:grid-cols-2 gap-8 pt-8">
                            {/* Tawhid */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <span>☝️</span> The Concept of Tawhid
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                                    The absolute oneness of Allah. It is the core of the Islamic faith.
                                </p>
                                <div className="space-y-3">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                        <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm">Rububiyyah</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Oneness of Lordship (Creator)</p>
                                    </div>
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                        <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm">Uluhiyyah</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Oneness of Worship</p>
                                    </div>
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                        <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm">Asma wa Sifat</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Oneness of Names Attributes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison */}
                            <ComparisonTable />
                        </div>

                        {/* Prophethood */}
                        <div className="pt-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                <span>🕊️</span> The Chain of Prophets
                            </h3>
                            <ProphetTimeline />
                        </div>
                    </div>
                )}

                {/* QUIZ TAB */}
                {activeTab === 'quiz' && (
                    <div className="animate-fade-in space-y-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Test Your Knowledge</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Assess your understanding of the pillars and beliefs.
                            </p>
                        </div>
                        <QuizSection />
                        <AchievementBadges readSections={readSections} totalSectionsRead={completedItems} />
                    </div>
                )}

            </div>
        </div>
    );
});

FundamentalsPage.displayName = 'FundamentalsPage';

export default FundamentalsPage;

