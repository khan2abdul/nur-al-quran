/**
 * View Context for Nur-Al-Quran
 * 
 * Manages view modes (Mobile/Desktop) and responsive states.
 * Wraps the application to provide global view settings.
 * 
 * @module context/ViewContext
 */

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';

/**
 * Supported View Modes
 * - mobile: Constraint width (max-w-md), simulated mobile experience
 * - desktop: Full width, responsive
 */
export type ViewMode = 'mobile' | 'desktop';

interface ViewContextValue {
    /** Current view mode */
    viewMode: ViewMode;
    /** Set view mode */
    setViewMode: (mode: ViewMode) => void;
    /** Whether currently in mobile view (either simulated or actual small screen) */
    isMobile: boolean;
}

const ViewContext = createContext<ViewContextValue | null>(null);

/**
 * View Provider Props
 */
interface ViewProviderProps {
    readonly children: ReactNode;
}

/**
 * View Provider Component
 */
export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
    // Initialize from storage or default to 'mobile' (or 'desktop' based on preference)
    // Default to 'mobile' if user is on mobile? No, let's default to 'desktop' usually, or 'mobile' if requested.
    // User requested "mobile view" feature, so let's default to stored value or desktop.
    const [viewMode, setViewModeState] = useState<ViewMode>(
        getStorageItem<ViewMode>('nur-al-quran:viewMode', 'desktop')
    );

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Handle view mode change
    const setViewMode = useCallback((mode: ViewMode) => {
        setViewModeState(mode);
        setStorageItem('nur-al-quran:viewMode', mode);

        // Apply CSS classes to body for simulated mobile view
        if (mode === 'mobile') {
            document.body.classList.add(
                'max-w-md',
                'mx-auto',
                'border-x',
                'border-slate-200',
                'dark:border-slate-800',
                'min-h-screen',
                'shadow-2xl'
            );
        } else {
            document.body.classList.remove(
                'max-w-md',
                'mx-auto',
                'border-x',
                'border-slate-200',
                'dark:border-slate-800',
                'min-h-screen',
                'shadow-2xl'
            );
        }
    }, []);

    // Initial effect to apply classes on mount
    useEffect(() => {
        setViewMode(viewMode);
    }, [viewMode, setViewMode]);

    // Screen resize listener
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768); // md breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const value = useMemo<ViewContextValue>(() => ({
        viewMode,
        setViewMode,
        isMobile: viewMode === 'mobile' || isSmallScreen,
    }), [viewMode, setViewMode, isSmallScreen]);

    return (
        <ViewContext.Provider value={value}>
            {children}
        </ViewContext.Provider>
    );
};

/**
 * Hook to use View Context
 */
export const useView = (): ViewContextValue => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};

export default ViewProvider;
