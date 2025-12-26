import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls the window to the top whenever the route changes.
 * This ensures that when navigating between pages, the user starts at the top
 * of the new page instead of being at the same scroll position as the previous page.
 */
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top of the window
        window.scrollTo(0, 0);
    }, [pathname]);

    // This component doesn't render anything
    return null;
};

export default ScrollToTop;
