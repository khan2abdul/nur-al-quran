/**
 * Redesigned Settings Page for Nur-Al-Quran
 * 
 * Focuses on user authentication, profile management,
 * and a clean, account-centric interface.
 */

import React, { memo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

/**
 * Section Card Component
 */
const SectionCard: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group h-full transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-cyan-400/10" />
        <div className="relative z-10">
            {children}
        </div>
    </div>
));

SectionCard.displayName = 'SectionCard';

/**
 * Settings Page Component
 */
export const SettingsPage: React.FC = memo(() => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen py-8 pb-32 md:pb-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Account <span className="text-cyan-400">Settings</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Manage your profile and application preferences.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Profile / Auth Section */}
                    <SectionCard>
                        {user ? (
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-cyan-400 p-1">
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                                            alt={user.displayName || 'User'}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 border-4 border-slate-800">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.displayName}</h2>
                                    <p className="text-slate-400 mb-6">{user.email}</p>
                                    <button
                                        onClick={signOut}
                                        className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 text-slate-600 dark:text-white/60 hover:text-red-400 border border-slate-200 dark:border-white/10 hover:border-red-500/30 transition-all font-bold text-sm uppercase tracking-widest"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Join the Community</h2>
                                <p className="text-slate-400 mb-10 max-w-sm mx-auto">
                                    Create an account to save your favorite verses and sync your progress across devices.
                                </p>
                                <button
                                    onClick={signInWithGoogle}
                                    className="px-10 py-4 rounded-[1.5rem] bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center gap-3 mx-auto"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>
                        )}
                    </SectionCard>

                    {/* App Preferences */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Theme Section */}
                        <SectionCard>
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 truncate">Appearance</h3>
                                    <p className="text-slate-500 text-sm">Light or dark mode.</p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-cyan-400/10 text-cyan-400 flex flex-shrink-0 items-center justify-center transition-all border border-slate-200 dark:border-white/5"
                                >
                                    {isDark ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </SectionCard>

                        {/* App Info */}
                        <SectionCard>
                            <div className="flex items-center gap-4 h-full">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cyan-400/10 flex flex-shrink-0 items-center justify-center text-2xl shadow-inner">
                                    🌙
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5 truncate leading-none">Nur Al-Quran</h3>
                                    <p className="text-slate-500 text-sm truncate leading-none">v1.2.0 • Light of Quran</p>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-12 text-center">
                        <p className="text-slate-600 text-sm">
                            Built with ❤️ for the Global Ummah
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
