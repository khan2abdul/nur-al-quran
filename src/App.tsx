/**
 * Main Application Entry Point for Nur-Al-Quran
 * 
 * Sets up routing, context providers, and error boundaries.
 * 
 * @module App
 */

import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import { ViewProvider } from '@/context/ViewContext';
import { AIProvider } from '@/context/AIContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/config/routes';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const SurahListPage = lazy(() => import('@/pages/SurahList/SurahListPage'));
const VerseViewPage = lazy(() => import('@/pages/VerseView/VerseViewPage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));
const BookmarksPage = lazy(() => import('@/pages/Bookmarks/BookmarksPage'));
const JuzListPage = lazy(() => import('@/pages/JuzList/JuzListPage'));

/**
 * Loading Spinner for Suspense fallback
 */
const LoadingSpinner: React.FC = memo(() => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Loading...</p>
        </div>
    </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

/**
 * Placeholder Page for coming soon routes
 */
interface PlaceholderPageProps {
    readonly title: string;
    readonly icon: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = memo(({ title, icon }) => (
    <div className="py-12 text-center">
        <span className="text-6xl mb-4 block">{icon}</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
            Coming soon...
        </p>
    </div>
));

PlaceholderPage.displayName = 'PlaceholderPage';

/**
 * Error Fallback
 */
const ErrorFallback: React.FC<{ error?: Error }> = memo(({ error }) => (
    <div className="py-12 text-center">
        <span className="text-6xl mb-4 block">⚠️</span>
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Something went wrong
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
            {error?.message ?? 'An unexpected error occurred'}
        </p>
        <button
            onClick={() => window.location.reload()}
            className="btn-primary"
        >
            Reload Page
        </button>
    </div>
));

ErrorFallback.displayName = 'ErrorFallback';

/**
 * Main App Component
 */
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <LanguageProvider>
                    <AIProvider>
                        <AudioPlayerProvider>
                            <ViewProvider>
                                <MainLayout>
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <Routes>
                                            {/* Main Routes */}
                                            <Route path={ROUTES.HOME} element={<HomePage />} />
                                            <Route path={ROUTES.SURAHS} element={<SurahListPage />} />
                                            <Route path={ROUTES.SURAH} element={<VerseViewPage />} />
                                            <Route path={ROUTES.JUZ} element={<JuzListPage />} />

                                            {/* Other Routes */}
                                            <Route
                                                path={ROUTES.BOOKMARKS}
                                                element={<BookmarksPage />}
                                            />
                                            <Route
                                                path={ROUTES.SETTINGS}
                                                element={<SettingsPage />}
                                            />

                                            {/* 404 Not Found */}
                                            <Route
                                                path="*"
                                                element={
                                                    <div className="py-12 text-center">
                                                        <span className="text-6xl mb-4 block">🔍</span>
                                                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                                            Page Not Found
                                                        </h1>
                                                        <p className="text-slate-500 dark:text-slate-400">
                                                            The page you're looking for doesn't exist.
                                                        </p>
                                                    </div>
                                                }
                                            />
                                        </Routes>
                                    </Suspense>
                                </MainLayout>
                            </ViewProvider>
                        </AudioPlayerProvider>
                    </AIProvider>
                </LanguageProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
