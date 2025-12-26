/**
 * AI Context for Nur-Al-Quran
 * 
 * Manages Gemini model selection and persistence.
 */

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from 'react';
import { getStorageItem, setStorageItem } from '@/services/localStorageService';

interface AIModel {
    id: string;
    name: string;
    description: string;
}

export const AVAILABLE_MODELS: AIModel[] = [
    { id: 'models/gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast & Efficient' },
    { id: 'models/gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Powerful & Complex' },
    { id: 'models/gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Latest General Purpose' },
    { id: 'models/gemini-3-pro-preview', name: 'Gemini 3 Pro Preview', description: 'Next-Gen Preview' },
    { id: 'models/gemini-flash-latest', name: 'Gemini 1.5 Flash', description: 'Standard Speed' },
    { id: 'models/gemini-pro-latest', name: 'Gemini 1.5 Pro', description: 'Standard Power' },
];

interface AIContextValue {
    selectedModel: string;
    setSelectedModel: (modelId: string) => void;
    availableModels: AIModel[];
}

const AIContext = createContext<AIContextValue | null>(null);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedModel, setSelectedModelState] = useState<string>(
        getStorageItem<string>('nur-al-quran:aiModel', 'models/gemini-1.5-flash')
    );

    const setSelectedModel = useCallback((modelId: string) => {
        setSelectedModelState(modelId);
        setStorageItem('nur-al-quran:aiModel', modelId);
    }, []);

    const value = useMemo(() => ({
        selectedModel,
        setSelectedModel,
        availableModels: AVAILABLE_MODELS,
    }), [selectedModel, setSelectedModel]);

    return (
        <AIContext.Provider value={value}>
            {children}
        </AIContext.Provider>
    );
};

export const useAI = (): AIContextValue => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
};
