import type { Verse, DifficultWord } from '@/types';

export const surah1Info = {
    title: "The Opening",
    contextBullets: [
        { icon: "📍", label: "Place", text: "Makkah (Early Revelation)" },
        { icon: "📅", label: "Order", text: "5th Surah Revealed" },
        { icon: "💡", label: "Significance", text: "The Opening of Quran & Every Prayer" }
    ],
    history: "Surah Al-Fatiha Makkah mein nazil hui thi. Yeh 'Ummul Quran' (Mother of Quran) hai.",
    historyEn: "Revealed in Makkah, known as the Mother of the Book."
};

interface LocalVerse extends Partial<Verse> {
    difficultWords?: DifficultWord[];
}

export const surah1Data: LocalVerse[] = [
    {
        verseNumber: 1,
        text_uthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        hinglish: "Shuru Allah ke naam se, jo bada Meherbaan aur bahut Reham wala hai.",
        meaning: "Hum har achay kaam ki shuruat 'Bismillah' se karte hain. Allah sabko banane wala hai aur uska pyaar sabke liye hai.",
        meaningEn: "We start every good deed with the name of Allah. He is the Creator of all, and His mercy is for everyone.",
        difficultWords: [
            { word: "Meherbaan", transliteration: "Rahman", meaning: "Bahut Dayaalu (Very Kind)" },
            { word: "Reham", transliteration: "Rahim", meaning: "Kripa/Daya (Mercy)" }
        ]
    },
    {
        verseNumber: 2,
        text_uthmani: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
        hinglish: "Sab taareefain Allah ke liye hain, jo poori duniya ko paalne wala hai.",
        meaning: "Hum Allah ka shukr karte hain kyunki Woh hi is puri duniya (universe) ka Boss aur sambhalne wala hai.",
        meaningEn: "We praise and thank Allah because He is the Master and Sustainer of the entire universe.",
        difficultWords: [
            { word: "Taareefain", transliteration: "Hamd", meaning: "Praise/Shukr" },
            { word: "Duniya", transliteration: "Aalamin", meaning: "Worlds/Universe" }
        ]
    },
    {
        verseNumber: 3,
        text_uthmani: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        hinglish: "Jo bada Meherbaan aur bahut Reham karne wala hai.",
        meaning: "Allah apne bandon par bahut pyaar karta hai. Woh hamesha maaf karne ke liye taiyaar rehta hai.",
        meaningEn: "Allah is extremely kind to His creation. He is always ready to forgive and show mercy.",
    },
    {
        verseNumber: 4,
        text_uthmani: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
        hinglish: "Jo Faisle ke Din (Result Day) ka Maalik hai.",
        meaning: "Ek din sabko Allah ke paas wapas jaana hai. Us din sirf Allah ka hukm chalega.",
        meaningEn: "One day we will all return to Allah for judgment. On that day, only His command will prevail.",
        difficultWords: [
            { word: "Faisle ke Din", transliteration: "Yawm ad-Din", meaning: "Day of Judgment" },
            { word: "Maalik", transliteration: "Malik", meaning: "Master/Owner" }
        ]
    },
    {
        verseNumber: 5,
        text_uthmani: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        hinglish: "Hum sirf Teri hi ibadat karte hain, aur sirf Tujh hi se madad maangte hain.",
        meaning: "Hum sirf Allah ke aage jhukte hain aur mushkil waqt mein sirf Usi ko pukarte hain.",
        meaningEn: "We worship only Allah and ask only Him for help in times of need.",
        difficultWords: [
            { word: "Ibadat", transliteration: "Na'budu", meaning: "Worship/Pooja" },
            { word: "Madad", transliteration: "Nasta'in", meaning: "Help" }
        ]
    },
    {
        verseNumber: 6,
        text_uthmani: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        hinglish: "Humein seedha raasta dikha.",
        meaning: "Humein wo raasta dikha jo kamyabi aur Jannat ki taraf le jata hai.",
        meaningEn: "Guide us to the straight path that leads to success and Paradise.",
        difficultWords: [
            { word: "Seedha Raasta", transliteration: "Sirat al-Mustaqim", meaning: "Straight Path" }
        ]
    },
    {
        verseNumber: 7,
        text_uthmani: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        hinglish: "Un logon ka raasta jin par Tune inaam kiya; na ki unka jin par Tu naraz hua, aur na hi unka jo raasta bhatak gaye.",
        meaning: "Humein achay logon (prophets) ke raaste par chala. Un logon jaisa mat bana jo sach jaanker bhi nahi maante.",
        meaningEn: "Guide us to the path of those You have blessed (prophets), not those who earned Your anger or went astray.",
        difficultWords: [
            { word: "Inaam", transliteration: "An'amta", meaning: "Reward/Blessing" },
            { word: "Naraz", transliteration: "Maghdub", meaning: "Angry" },
            { word: "Bhatak", transliteration: "Dallin", meaning: "Lost/Misguided" }
        ]
    }
] as any[];
