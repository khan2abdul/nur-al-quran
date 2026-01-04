/**
 * Service to interact with the AlAdhan API for Hijri calendar data.
 * Documentation: https://aladhan.com/prayer-times-api
 */

interface HijriDateResponse {
    code: number;
    status: string;
    data: {
        hijri: {
            date: string;
            format: string;
            day: string;
            weekday: {
                en: string;
                ar: string;
            };
            month: {
                number: number;
                en: string;
                ar: string;
            };
            year: string;
            designation: {
                abbreviated: string;
                expanded: string;
            };
            holidays: string[];
        };
        gregorian: {
            date: string;
            format: string;
            day: string;
            weekday: {
                en: string;
            };
            month: {
                number: number;
                en: string;
            };
            year: string;
            designation: {
                abbreviated: string;
                expanded: string;
            };
        };
    };
}

export interface HijriDate {
    day: string;
    month: {
        number: number;
        en: string; // English name e.g., Ramadan
        ar: string; // Arabic name
    };
    year: string;
    weekday: string;
    holidays: string[];
}

export interface RamadanDay {
    day: number; // Ramadan day (1-30)
    gregorianDate: string; // "01-03-2025"
    weekday: string; // "Saturday"
    sehri: string; // "05:30"
    iftar: string; // "18:15"
    isToday: boolean;
    timings: { // raw timings for countdown
        Fajr: string;
        Maghrib: string;
    }
}

const STORAGE_KEY = 'hijri_date_cache';
const ADJUSTMENT_KEY = 'hijri_date_adjustment';

/**
 * Get the user's preferred date adjustment from local storage.
 */
export const getDateAdjustment = (): number => {
    const stored = localStorage.getItem(ADJUSTMENT_KEY);
    return stored ? parseInt(stored, 10) : 0;
};

/**
 * Set the user's preferred date adjustment.
 */
export const setDateAdjustment = (adjustment: number) => {
    localStorage.setItem(ADJUSTMENT_KEY, adjustment.toString());
};

/**
 * Fetches the Hijri date for a given Gregorian date.
 * Uses session storage caching to minimize API calls.
 */
export const getHijriDate = async (date: Date = new Date()): Promise<HijriDate | null> => {
    const adjustment = getDateAdjustment();

    // Format date as DD-MM-YYYY
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    const dateString = `${d}-${m}-${y}`;

    const cacheKey = `${STORAGE_KEY}_${dateString}_adj${adjustment}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(`http://api.aladhan.com/v1/gToH/${dateString}?adjustment=${adjustment}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Hijri date');
        }

        const json: HijriDateResponse = await response.json();

        const hijriData: HijriDate = {
            day: json.data.hijri.day,
            month: {
                number: json.data.hijri.month.number,
                en: json.data.hijri.month.en,
                ar: json.data.hijri.month.ar,
            },
            year: json.data.hijri.year,
            weekday: json.data.hijri.weekday.en,
            holidays: json.data.hijri.holidays,
        };

        sessionStorage.setItem(cacheKey, JSON.stringify(hijriData));
        return hijriData;
    } catch (error) {
        console.error('Error fetching Hijri date:', error);
        return null; // Handle error gracefully in UI
    }
};

/**
 * Fetches the Ramadan Calendar for a specific location and Hijri year.
 * Defaults to Ramadan (Month 9) of 1446 AH.
 */
export const getRamadanCalendar = async (city: string, country: string, hijriYear: number = 1446): Promise<RamadanDay[]> => {
    const cacheKey = `ramadan_calendar_${city}_${country}_${hijriYear}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
        // If cached is empty or invalid, clear it and fetch again
        sessionStorage.removeItem(cacheKey);
    }

    try {
        // Fetch Hijri Calendar for Ramadan (Month 9) - HTTPS
        const response = await fetch(`https://api.aladhan.com/v1/hijriCalendarByCity/${hijriYear}/9?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Ramadan calendar: ${response.statusText}`);
        }

        const json = await response.json();

        if (json.code !== 200 || !Array.isArray(json.data)) {
            console.error('AlAdhan API returned error or invalid data:', json);
            return [];
        }

        const today = new Date();
        const todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

        const calendarData: RamadanDay[] = json.data.map((item: any) => ({
            day: parseInt(item.date.hijri.day),
            gregorianDate: item.date.gregorian.date,
            weekday: item.date.gregorian.weekday.en,
            sehri: item.timings.Fajr.split(' ')[0], // Remove (CET) etc if present
            iftar: item.timings.Maghrib.split(' ')[0],
            isToday: item.date.gregorian.date === todayString,
            timings: {
                Fajr: item.timings.Fajr,
                Maghrib: item.timings.Maghrib
            }
        }));

        if (calendarData.length > 0) {
            sessionStorage.setItem(cacheKey, JSON.stringify(calendarData));
        }
        return calendarData;

    } catch (error) {
        console.error('Error fetching Ramadan calendar:', error);
        return [];
    }
};

/**
 * Helper to get upcoming sacred events based on current Hijri month approximation.
 * This is a simplified logic since we can't easily query "future" API dates without multiple calls.
 */
export const getUpcomingEvent = (hijriMonth: number): string => {
    switch (hijriMonth) {
        case 1: return 'Ashura (10th Muharram)';
        case 3: return 'Mawlid al-Nabi (12th Rabi Al-Awwal)';
        case 7: return 'Isra and Mi\'raj (27th Rajab)';
        case 8: return 'Laylat al-Bara\'at (15th Sha\'ban)';
        case 9: return 'Laylatul Qadr (Last 10 Nights)';
        case 10: return 'Eid al-Fitr (1st Shawwal)';
        case 12: return 'Hajj (8th-13th Dhul-Hijjah)';
        default: return 'White Days (13th, 14th, 15th)';
    }
};
