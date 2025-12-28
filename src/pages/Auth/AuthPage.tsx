/**
 * Authentication Page for Nur-Al-Quran
 * 
 * Provides email/password login, registration,
 * and Google Sign-In options with a premium aesthetic.
 */

import React, { useState, memo, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/config/routes';

type AuthMode = 'login' | 'register';

export const AuthPage: React.FC = memo(() => {
    const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If user is already logged in, redirect to home
    if (user) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                await signInWithEmail(email, password);
            } else {
                if (!name.trim()) throw new Error('Please enter your name');
                await signUpWithEmail(email, password, name);
            }
            navigate(ROUTES.HOME);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            navigate(ROUTES.HOME);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google Sign-In failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = useCallback(() => {
        setMode(prev => prev === 'login' ? 'register' : 'login');
        setError(null);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-cyan-400/10" />

                    <div className="relative z-10 text-center mb-8">
                        <span className="text-4xl mb-4 block">🌙</span>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {mode === 'login' ? 'Continue your Quranic journey' : 'Join our global community'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        {mode === 'register' && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-[1.5rem] bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                <span className="px-2 bg-white dark:bg-slate-950 text-slate-500 dark:text-white/40 leading-none">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full py-4 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 text-slate-900 dark:text-white font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-cyan-400 font-bold hover:underline"
                            >
                                {mode === 'login' ? 'Create Account' : 'Sign In'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
});

AuthPage.displayName = 'AuthPage';

export default AuthPage;
