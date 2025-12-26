export interface DifficultWord {
    word: string;
    transliteration: string;
    meaning: string;
}

export type VerseMeaning = {
    surah: number;
    verse: number;
    meaningEn: string;
    meaningHi: string;
    hinglish?: string;
    easyWords?: string[];
    difficultWords?: DifficultWord[];
};
