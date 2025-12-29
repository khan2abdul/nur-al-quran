import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface SmartSearchResult {
    surahId: number;
    reason: string;
    verseRef?: string;
}

/**
 * Smart search for Surahs based on themes, emotions, or topics.
 * Uses Gemini to map user queries to Quranic concepts.
 */
export async function smartSearchSurahs(query: string): Promise<SmartSearchResult[]> {
    if (!API_KEY) {
        console.error('Gemini API key is missing');
        return [];
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
            You are a Quranic Wisdom Assistant. Based on the user's emotional state or topic query, identify the most relevant Surahs and verses.
            
            User Query: "${query}"
            
            Return a JSON array of objects with:
            - "surahId": (number, 1-114) identifier of the surah
            - "reason": (string) a very short explanation of why this surah is relevant to the query
            - "verseRef": (string, optional) specific verse or range (e.g., "1-5" or "10")
            
            Provide the 5-7 most relevant results. Only return the JSON array, no extra text.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean the response in case of markdown formatting
        const cleanedJson = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson) as SmartSearchResult[];
    } catch (error) {
        console.error('Smart search failed:', error);
        return [];
    }
}
