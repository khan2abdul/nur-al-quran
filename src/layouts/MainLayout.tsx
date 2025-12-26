/**
 * Main Layout Component for Nur-Al-Quran
 * 
 * Provides the base layout structure with navigation,
 * content area, and proper spacing for mobile/desktop.
 * 
 * @module layouts/MainLayout
 */

import React, { memo, type ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface MainLayoutProps {
    /** Page content */
    readonly children: ReactNode;

    /** Optional additional class names */
    readonly className?: string;
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
    className = ''
}) => {
    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main
                className={`
          pt-14 pb-20 md:pt-16 md:pb-8
          px-2 md:px-6 lg:px-8 max-w-7xl mx-auto
          ${className}
        `.trim()}
            >
                {children}
            </main>
            {/* Bottom Navigation (Mobile Only) */}
            <BottomNavigation />
        </div>
    );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
