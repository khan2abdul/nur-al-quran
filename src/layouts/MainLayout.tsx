/**
 * Main Layout Component for Nur-Al-Quran
 * 
 * Provides the base layout structure with navigation,
 * content area, and proper spacing for mobile/desktop.
 * 
 * @module layouts/MainLayout
 */

import React, { memo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { ROUTES } from '@/config/routes';

interface MainLayoutProps {
    /** Page content */
    readonly children: ReactNode;

    /** Optional additional class names */
    readonly className?: string;

    /** Whether the content should span full width without container constraints */
    readonly isFullWidth?: boolean;
}

/**
 * Main Layout Component
 * 
 * Wraps page content with navigation and proper padding.
 * Accounts for fixed navbar heights on mobile and desktop.
 * 
 * @param props - Layout props
 */
export const MainLayout: React.FC<MainLayoutProps> = memo(({
    children,
    className = '',
    isFullWidth = false
}) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main
                className={`
                    pt-14 pb-14 md:pt-16 md:pb-8 flex-grow
                    ${isFullWidth ? '' : 'px-2 md:px-6 lg:px-8 max-w-7xl mx-auto w-full'}
                    ${className}
                `.trim()}
            >
                {children}
            </main>

            {/* Premium Footer - Matched with Header Color */}
            <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 mt-auto">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">✨</span>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Nur <span className="text-cyan-400">Al-Quran</span>
                                </h2>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
                                A premium Quranic experience designed to bring divine light to everyone through modern technology and beautiful design.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.879-1.561 4-1.66 4 1.352v3.555z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link to={ROUTES.SURAHS} className="text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm">Surah Index</Link></li>
                                <li><Link to={ROUTES.WISDOM} className="text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm">Divine Wisdom</Link></li>
                                <li><Link to={ROUTES.BOOKMARKS} className="text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors text-sm">My Bookmarks</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Aesthetic</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Crafted with the "Divine Wisdom" design system, prioritizing peace, clarity, and elegance.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            © {new Date().getFullYear()} Nur Al-Quran. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
