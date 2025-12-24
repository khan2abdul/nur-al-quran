/**
 * Theme Context for Nur-Al-Quran
 * 
 * Provides theme state management with dark mode support.
 * Persists theme preference to localStorage and detects system preference.
 * 
 * @module context/ThemeContext
 * 
 * @example
 * // In component
 * const { theme, toggleTheme, setTheme } = useTheme();
 */

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ReactNode
} from 'react';
import type { Theme } from '@/types';
import { STORAGE_KEYS } from '@/config/appConfig';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
    /** Current theme setting */
    readonly theme: Theme;

    /** Resolved theme (light or dark, accounting for system preference) */
    readonly resolvedTheme: 'light' | 'dark';

    /** Set theme explicitly */
    readonly setTheme: (theme: Theme) => void;

    /** Toggle between light and dark */
    readonly toggleTheme: () => void;

    /** Whether dark mode is active */
    readonly isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Detects system color scheme preference
 */
const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Loads saved theme from localStorage
 */
const loadSavedTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system';
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
    }
    return 'system';
};

interface ThemeProviderProps {
    readonly children: ReactNode;
}

/**
 * Theme Provider Component
 * 
 * Wraps the application to provide theme state and controls.
 * Automatically applies theme class to document root.
 * 
 * @param props - Provider props
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('system');
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme on mount
    useEffect(() => {
        setThemeState(loadSavedTheme());
        setSystemTheme(getSystemTheme());
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Resolved theme (accounts for 'system' setting)
    const resolvedTheme = useMemo<'light' | 'dark'>(() => {
        return theme === 'system' ? systemTheme : theme;
    }, [theme, systemTheme]);

    const isDark = resolvedTheme === 'dark';

    // Apply theme class to document
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
    }, [resolvedTheme]);

    /**
     * Set theme and persist to localStorage
     */
    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    }, []);

    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = useCallback(() => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }, [resolvedTheme, setTheme]);

    const value = useMemo<ThemeContextValue>(() => ({
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isDark,
    }), [theme, resolvedTheme, setTheme, toggleTheme, isDark]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Hook to access theme context
 * 
 * @throws Error if used outside ThemeProvider
 * @returns Theme context value
 */
export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
