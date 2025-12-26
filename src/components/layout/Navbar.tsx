/**
 * Navbar Component for Nur-Al-Quran
 * 
 * Mobile-first navigation with theme toggle and language switcher.
 * Supports both bottom navigation (mobile) and top navigation (desktop).
 * 
 * @module components/layout/Navbar
 */

import React, { memo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import { NAV_ITEMS, ROUTES } from '@/config/routes';
import type { Language } from '@/types';

/**
 * Icon components for navigation
 */
const Icons = {
    home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    'book-open': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    layers: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    ),
    sparkles: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
    ),
    bookmark: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
    ),
    settings: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    sun: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    moon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    ),
    menu: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    ),
    x: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
} as const;

/**
 * Get icon component by name
 */
const getIcon = (iconName?: string): React.ReactNode => {
    if (!iconName) return null;
    return Icons[iconName as keyof typeof Icons] ?? null;
};


/**
 * Language Switcher Dropdown
 */
const LanguageSwitcher: React.FC = memo(() => {
    const { language, setLanguage, availableLanguages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback((lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    }, [setLanguage]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white/40 hover:text-cyan-400 transition-all font-bold text-[10px] uppercase tracking-widest"
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                {language}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 z-20 overflow-hidden backdrop-blur-xl">
                        {availableLanguages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0 ${language === lang.code ? 'bg-cyan-400/10' : ''
                                    }`}
                            >
                                <span className={`font-bold text-sm block ${language === lang.code ? 'text-cyan-400' : 'text-slate-900 dark:text-white'}`}>{lang.nativeName}</span>
                                <span className="text-[10px] text-slate-500 dark:text-white/40 uppercase tracking-widest block mt-0.5">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';

/**
 * Desktop Navigation Bar
 */
const DesktopNav: React.FC = memo(() => {
    const location = useLocation();

    return (
        <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🌙</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                        Nur <span className="text-cyan-400">Al-Quran</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-2">
                    {NAV_ITEMS.filter(item => item.showInNav).map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${isActive
                                    ? 'bg-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                    : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions removed (theme toggle now in settings) */}
                <div className="flex items-center gap-2">
                </div>
            </div>
        </header>
    );
});

DesktopNav.displayName = 'DesktopNav';

/**
 * Mobile Bottom Navigation
 */
const MobileNav: React.FC = memo(() => {
    const location = useLocation();

    // Only show main nav items on mobile
    const mobileItems = NAV_ITEMS.filter(item =>
        item.showInNav && item.path !== ROUTES.SETTINGS
    ).slice(0, 4);

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 safe-area-bottom">
            <div className="flex items-center justify-around h-16 px-4">
                {mobileItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all ${isActive
                                ? 'text-cyan-400'
                                : 'text-slate-500 dark:text-white/30'
                                }`}
                        >
                            <div className={`${isActive ? 'scale-110' : ''}`}>
                                {getIcon(item.icon)}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest mt-1">{item.name}</span>
                        </Link>
                    );
                })}

                {/* Settings with theme indicator */}
                <Link
                    to={ROUTES.SETTINGS}
                    className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${location.pathname === ROUTES.SETTINGS
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-500 dark:text-slate-400'
                        }`}
                >
                    {getIcon('settings')}
                    <span className="text-[10px] font-medium">Settings</span>
                </Link>
            </div>
        </nav>
    );
});

MobileNav.displayName = 'MobileNav';

/**
 * Mobile Header (Top bar)
 */
const MobileHeader: React.FC = memo(() => {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-2">
            <div className="flex items-center justify-between h-14 px-4">
                <Link to={ROUTES.HOME} className="flex items-center gap-2">
                    <span className="text-xl">🌙</span>
                    <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                        Nur <span className="text-cyan-400">Al-Quran</span>
                    </span>
                </Link>

                {/* Actions removed (theme toggle now in settings) */}
                <div className="flex items-center gap-1">
                </div>
            </div>
        </header>
    );
});

MobileHeader.displayName = 'MobileHeader';

/**
 * Main Navbar Component
 * 
 * Renders appropriate navigation based on screen size.
 */
export const Navbar: React.FC = memo(() => {
    return (
        <>
            <DesktopNav />
            <MobileHeader />
            <MobileNav />
        </>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
