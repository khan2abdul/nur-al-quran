/// <reference types="vite/client" />

/**
 * Vite Environment Type Declarations
 * 
 * Extends ImportMeta to include Vite-specific env variables.
 */

interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_FIREBASE_API_KEY?: string;
    readonly VITE_FIREBASE_PROJECT_ID?: string;
    readonly VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
