/**
 * Route Definitions for Nur-Al-Quran
 * 
 * Centralized route configuration for React Router.
 * All routes are typed and used for navigation and breadcrumbs.
 * 
 * @module config/routes
 */

import type { RouteDefinition } from '@/types';

/**
 * Application route paths
 */
export const ROUTES = {
    HOME: '/',
    SURAHS: '/surahs',
    WISDOM: '/wisdom',
    SURAH: '/surah/:surahId',
    BOOKMARKS: '/bookmarks',
    SEARCH: '/search',
    AUTH: '/auth',
    LEARN: '/learn/fundamentals-of-faith',
    SPIRITUAL: '/spiritual-growth',
    PROPHETIC: '/prophetic-excellence',
    THE_QURAN: '/knowledge/the-quran',
    ISLAMIC_LEGACY: '/knowledge/islamic-legacy',
    LIVING_ISLAM: '/living-islam-daily-modern-life',
    WOMEN_IN_ISLAM: '/women-in-islam-rights-empowerment',
    YOUTH_GUIDE: '/muslim-youth-students-guide',
    MARRIAGE_GUIDE: '/islamic-marriage-guide',
    HEALTH: '/islamic-health-wellness',
    CALENDAR: '/islamic-calendar-events-interactive',
    DEATH_AND_AFTERLIFE: '/wisdom/death-and-afterlife',
    NEW_MUSLIMS: '/wisdom/new-muslims',
} as const;

/**
 * Helper function to generate Surah route
 * @param surahId - The Surah number (1-114)
 */
export const getSurahRoute = (surahId: number): string =>
    `/surah/${surahId}`;

/**
 * Helper function to generate Juz route
 * @param juzId - The Juz number (1-30)
 */
export const getJuzRoute = (juzId: number): string =>
    `/juz/${juzId}`;

/**
 * Navigation items for the main menu
 */
export const NAV_ITEMS: readonly RouteDefinition[] = [
    {
        path: ROUTES.HOME,
        name: 'Home',
        icon: 'home',
        showInNav: true,
    },
    {
        path: ROUTES.SURAHS,
        name: 'Surahs',
        icon: 'book-open',
        showInNav: true,
    },
    {
        path: ROUTES.WISDOM,
        name: 'Divine Wisdom',
        icon: 'sparkles',
        showInNav: true,
    },
    {
        path: ROUTES.BOOKMARKS,
        name: 'Bookmarks',
        icon: 'bookmark',
        showInNav: true,
    },
] as const;
