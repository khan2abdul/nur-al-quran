/**
 * Language Context for Nur-Al-Quran
 * 
 * Provides language state management with RTL support for Arabic.
 * Integrates with i18next for translations.
 * 
 * @module context/LanguageContext
 * 
 * @example
 * const { language, setLanguage, isRTL } = useLanguage();
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
import type { Language } from '@/types';
import { STORAGE_KEYS } from '@/config/appConfig';

/**
 * Language metadata
 */
interface LanguageInfo {
    readonly code: Language;
    readonly name: string;
    readonly nativeName: string;
    readonly direction: 'ltr' | 'rtl';
}

/**
 * Available languages with metadata
 */
export const LANGUAGES: Record<Language, LanguageInfo> = {
    en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        direction: 'ltr',
    },
    hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        direction: 'ltr',
    },
    ar: {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        direction: 'rtl',
    },
} as const;

/**
 * Language context value interface
 */
interface LanguageContextValue {
    /** Current language code */
    readonly language: Language;

    /** Current language metadata */
    readonly languageInfo: LanguageInfo;

    /** Whether current language is RTL */
    readonly isRTL: boolean;

    /** Set language */
    readonly setLanguage: (lang: Language) => void;

    /** List of available languages */
    readonly availableLanguages: readonly LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Loads saved language from localStorage
 */
const loadSavedLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (saved === 'en' || saved === 'hi' || saved === 'ar') {
        return saved;
    }
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'hi') return 'hi';
    if (browserLang === 'ar') return 'ar';
    return 'en';
};

interface LanguageProviderProps {
    readonly children: ReactNode;
}

/**
 * Language Provider Component
 * 
 * Wraps the application to provide language state and controls.
 * Automatically sets document direction for RTL languages.
 * 
 * @param props - Provider props
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    // Initialize language on mount
    useEffect(() => {
        setLanguageState(loadSavedLanguage());
    }, []);

    const languageInfo = LANGUAGES[language];
    const isRTL = languageInfo.direction === 'rtl';

    // Apply direction to document
    useEffect(() => {
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', language);
    }, [language, isRTL]);

    /**
     * Set language and persist to localStorage
     */
    const setLanguage = useCallback((newLang: Language) => {
        setLanguageState(newLang);
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
    }, []);

    const availableLanguages = useMemo(() =>
        Object.values(LANGUAGES),
        []);

    const value = useMemo<LanguageContextValue>(() => ({
        language,
        languageInfo,
        isRTL,
        setLanguage,
        availableLanguages,
    }), [language, languageInfo, isRTL, setLanguage, availableLanguages]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

/**
 * Hook to access language context
 * 
 * @throws Error if used outside LanguageProvider
 * @returns Language context value
 */
export const useLanguage = (): LanguageContextValue => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
