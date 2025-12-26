/**
 * Quran Foundation Auth Service
 * 
 * Fetches OAuth2 access tokens via Firebase Cloud Function (server-side proxy).
 * This avoids CORS issues with the OAuth2 endpoint.
 * 
 * @module services/quranFoundationAuth
 */

import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorageItem, setStorageItem } from './localStorageService';

interface TokenResponse {
    success: boolean;
    access_token?: string;
    expires_in?: number;
    error?: string;
}

interface CachedToken {
    access_token: string;
    created_at: number;
    expires_in: number;
}

const STORAGE_KEY = 'nur-al-quran:qf-token';

/**
 * Gets a valid access token via Cloud Function.
 * Tokens are cached client-side and server-side for performance.
 */
export async function getAccessToken(): Promise<string | null> {
    // Check client-side cache first
    const cached = getStorageItem<CachedToken>(STORAGE_KEY, null as any);
    if (cached && cached.access_token) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = cached.created_at + cached.expires_in;

        // Return cached token if still valid (with 60s buffer)
        if (now < expiresAt - 60) {
            return cached.access_token;
        }
    }

    // Call Cloud Function to get token
    try {
        const functions = getFunctions();
        const getToken = httpsCallable<void, TokenResponse>(functions, 'getQuranFoundationToken');

        const result = await getToken();
        const data = result.data;

        if (!data.success || !data.access_token) {
            console.error('Failed to get Quran Foundation token:', data.error);
            return null;
        }

        // Cache the token client-side
        const cacheData: CachedToken = {
            access_token: data.access_token,
            created_at: Math.floor(Date.now() / 1000),
            expires_in: data.expires_in || 3600,
        };

        setStorageItem(STORAGE_KEY, cacheData);
        console.log('✅ Quran Foundation access token obtained via Cloud Function');

        return data.access_token;
    } catch (error) {
        console.error('Error calling getQuranFoundationToken function:', error);
        return null;
    }
}

/**
 * Gets the client ID from environment variables.
 */
export function getClientId(): string | undefined {
    return import.meta.env.VITE_QURAN_FOUNDATION_CLIENT_ID;
}
