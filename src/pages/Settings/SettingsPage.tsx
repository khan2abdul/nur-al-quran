/**
 * Settings Page for Nur-Al-Quran
 * 
 * Premium redesigned settings with glassmorphism effects,
 * gradient accents, and polished UI components.
 * 
 * @module pages/Settings/SettingsPage
 */

import React, { memo, useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useView } from '@/context/ViewContext';
import { useAI } from '@/context/AIContext';


/**
 * Toggle Button Component
 */
interface ToggleButtonProps {
    readonly label: string;
    readonly isSelected: boolean;
    readonly onClick: () => void;
    readonly icon?: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonProps> = memo(({ label, isSelected, onClick, icon }) => (
    <button
        onClick={() => {
            onClick();
            if ('vibrate' in navigator) navigator.vibrate(10);
        }}
        className={`
      flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium text-sm
      transition-all duration-300
      ${isSelected
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700/50'
            }
    `}
        aria-pressed={isSelected}
    >
        {icon}
        {label}
    </button>
));

ToggleButton.displayName = 'ToggleButton';

/**
 * Settings Section Card
 */
interface SectionCardProps {
    readonly children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = memo(({ children }) => (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 dark:border-slate-800/50 shadow-sm">
        {children}
    </div>
));

SectionCard.displayName = 'SectionCard';

/**
 * Section Header Component
 */
interface SectionHeaderProps {
    readonly title: string;
    readonly subtitle?: string;
    readonly icon: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = memo(({ title, subtitle, icon }) => (
    <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500">
            {icon}
        </div>
        <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
    </div>
));

SectionHeader.displayName = 'SectionHeader';

/**
 * Settings Page Component
 */
export const SettingsPage: React.FC = memo(() => {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage } = useLanguage();

    const { viewMode, setViewMode } = useView();
    const { selectedModel, setSelectedModel, availableModels } = useAI();


    const currentTheme = theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;

    return (
        <div className="min-h-screen bg-surface-light dark:bg-slate-900 py-6 px-4 pb-24 md:pb-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-lg text-white">
                        ⚙️
                    </span>
                    Settings
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 ml-13">
                    Customize your Quran reading experience
                </p>
            </div>

            <div className="space-y-6">

                {/* Language Section */}
                <SectionCard>
                    <SectionHeader
                        title="Language"
                        subtitle="Translation language preference"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                        }
                    />
                    <div className="flex gap-3">
                        <ToggleButton
                            label="English"
                            isSelected={language === 'en'}
                            onClick={() => setLanguage('en')}
                        />
                        <ToggleButton
                            label="Hinglish / Hindi"
                            isSelected={language === 'hi'}
                            onClick={() => setLanguage('hi')}
                        />
                    </div>
                </SectionCard>

                {/* AI Model Section */}
                <SectionCard>
                    <SectionHeader
                        title="AI Model"
                        subtitle="Generative model for meanings"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableModels.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => setSelectedModel(model.id)}
                                className={`
                                    p-4 rounded-2xl border text-left transition-all duration-300
                                    ${selectedModel === model.id
                                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10'
                                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-slate-300'
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className={`font-semibold truncate ${selectedModel === model.id ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                                        {model.name}
                                    </h3>
                                    {selectedModel === model.id && (
                                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{model.description}</p>
                            </button>
                        ))}
                    </div>
                </SectionCard>

                {/* Theme Section */}
                <SectionCard>
                    <SectionHeader
                        title="Theme"
                        subtitle="Light or dark mode"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        }
                    />
                    <div className="flex gap-3">
                        <ToggleButton
                            label="Light"
                            isSelected={currentTheme === 'light'}
                            onClick={() => setTheme('light')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            }
                        />
                        <ToggleButton
                            label="Dark"
                            isSelected={currentTheme === 'dark'}
                            onClick={() => setTheme('dark')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            }
                        />
                    </div>
                </SectionCard>

                {/* View Mode Section */}
                <SectionCard>
                    <SectionHeader
                        title="View Mode"
                        subtitle="Optimize for your device"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        }
                    />
                    <div className="flex gap-3">
                        <ToggleButton
                            label="Mobile View"
                            isSelected={viewMode === 'mobile'}
                            onClick={() => setViewMode('mobile')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            }
                        />
                        <ToggleButton
                            label="Desktop View"
                            isSelected={viewMode === 'desktop'}
                            onClick={() => setViewMode('desktop')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            }
                        />
                    </div>
                </SectionCard>

                {/* About Section */}
                <div className="mt-8 text-center pb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <span className="text-xl">🌙</span>
                        <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Nur Al-Quran</span>
                        <span className="text-slate-500 dark:text-slate-500 text-xs">v1.0.0</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-3">
                        Bringing Divine Light to Everyone
                    </p>
                </div>
            </div>
        </div>
    );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
