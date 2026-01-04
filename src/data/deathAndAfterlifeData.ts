
export interface SectionData {
    id: string;
    title: string;
    description: string;
}

export const SECTIONS: SectionData[] = [
    { id: 'mortality', title: 'Understanding Mortality', description: 'Death as a transition, not an end.' },
    { id: 'janazah', title: 'Janazah Guide', description: 'Step-by-step funeral rites.' },
    { id: 'barzakh', title: 'Life in the Grave', description: 'The intermediate realm (Barzakh).' },
    { id: 'judgment', title: 'Day of Judgment', description: 'The resurrection and accounting.' },
    { id: 'destinations', title: 'Jannah & Jahannam', description: 'The eternal homes.' },
    { id: 'grief', title: 'Grief & Loss', description: 'Islamic guidance for mourning.' },
];

export const MORTALITY_CONTENT = {
    intro: {
        title: "What is Death?",
        points: [
            "A doorway to the next life, not the end.",
            "Allah's promise to every soul.",
            "A transition from the temporary home to the eternal one.",
            "Submitting your 'answer sheet' after the test of life."
        ]
    },
    hadith: "Remember death often, for it purifies you and makes you content.",
    reflectionPrompts: [
        "If I died tomorrow, what would I want my legacy to be?",
        "Who needs my forgiveness today?",
        "What good deed can I do that will outlive me?"
    ],
    deathDuas: [
        { title: "When dying (Talqeen)", arabic: "لا إله إلا الله", translation: "La ilaha illallah", meaning: "There is no god but Allah" },
        { title: "Inna Lillahi", arabic: "إِنَّا ِلِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", translation: "Inna lillahi wa inna ilayhi raji'oon", meaning: "To Allah we belong and to Him we return" }
    ]
};

export const JANAZAH_STEPS = [
    {
        step: 1,
        title: "Immediate Steps",
        description: "Turn face to Qibla, close eyes, cover body, and inform family. Recite 'Inna lillahi...'."
    },
    {
        step: 2,
        title: "Ghusl (Washing)",
        description: "Wash the body 3 times with water/soap (odd numbers). Done by same gender family/community with utmost dignity."
    },
    {
        step: 3,
        title: "Kafan (Shrouding)",
        description: "Wrap in simple white cloth (3 sheets for men, 5 for women). Perfume is applied. No extravagance."
    },
    {
        step: 4,
        title: "Janazah Prayer",
        description: "Communal standing prayer (no sujood). 4 Takbirs: Praise Allah, Blessings on Prophet, Dua for deceased, Dua for all."
    },
    {
        step: 5,
        title: "Burial",
        description: "Place body on right side facing Qibla. Recite 'From earth We created you...'. Simple marker only."
    }
];

export const BARZAKH_QUESTIONS = [
    { question: "Who is your Lord?", answer: "My Lord is Allah.", context: "Determined by your worship in this life." },
    { question: "What is your religion?", answer: "My religion is Islam.", context: "Determined by your submission." },
    { question: "Who is your Prophet?", answer: "Muhammad (SAW).", context: "Determined by following his Sunnah." }
];

export const JUDGMENT_SIGNS = {
    minor: [
        "Tall buildings in the desert.",
        "Time passing quickly.",
        "Widespread ignorance and loss of knowledge.",
        "Disobedience to parents."
    ],
    major: [
        "The Smoke (Dukhan)",
        "Dajjal (False Messiah)",
        "The Beast of the Earth",
        "Sun rising from the West",
        "Return of Prophet Isa (AS)",
        "Yajuj and Majuj",
        "Three Landslides",
        "Fire from Yemen"
    ]
};

export const JANNAH_LEVELS = [
    "Jannat al-Firdaus (Highest)",
    "Jannat al-'Adn",
    "Jannat an-Na'im",
    "Dar al-Khuld",
    "Jannat al-Ma'wa",
    "Dar as-Salam",
    "Illiyyun"
];

export const JAHANNAM_LEVELS = [
    "Jahannam (General/Temporary)",
    "Laza",
    "Al-Hutamah",
    "Sa'ir",
    "Saqar",
    "Al-Jaheem",
    "Al-Hawiyah (Bottom)"
];

export const GRIEF_RESOURCES = {
    etiquette: [
        "It is allowed to cry and feel pain.",
        "Say 'Inna lillahi wa inna ilayhi raji'oon'.",
        "Do not wail loudly or question Allah's decree.",
        "Mourning is 3 days (4 months 10 days for widows)."
    ],
    comfortingDuas: [
        {
            arabic: "اللَّهُمَّ أَجِرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
            transliteration: "Allahumma ajirni fi musibati wa akhlif li khayran minha",
            translation: "O Allah, reward me for my affliction and replace it for me with something better."
        }
    ],
    actions: [
        "Sadaqah Jariyah (Ongoing Charity)",
        "Dua for forgiveness",
        "Hajj/Umrah on their behalf",
        "Paying their debts"
    ]
};

export const DEATH_QUIZ = [
    {
        id: 1,
        question: "What is the first stage of the afterlife immediately after death?",
        options: ["The Day of Judgment", "Barzakh (The Grave)", "Jannah", "As-Sirat"],
        correctAnswer: 1,
        explanation: "Barzakh is the intermediate realm where the soul remains from the time of death until the Day of Resurrection."
    },
    {
        id: 2,
        question: "Which angels question the deceased in the grave?",
        options: ["Jibreel & Mikail", "Raqeeb & Atid", "Munkar & Nakir", "Malik & Ridwan"],
        correctAnswer: 2,
        explanation: "Munkar and Nakir are the two angels who ask the three questions: Who is your Lord? What is your religion? Who is your Prophet?"
    },
    {
        id: 3,
        question: "What is the prayer performed for the deceased called?",
        options: ["Salat al-Jumu'ah", "Salat al-Janazah", "Salat at-Tahajjud", "Salat al-Eid"],
        correctAnswer: 1,
        explanation: "Salat al-Janazah is the funeral prayer performed by the community for the deceased Muslim."
    },
    {
        id: 4,
        question: "Which of these is a form of ongoing charity (Sadaqah Jariyah) that benefits a person after death?",
        options: ["Eating a good meal", "Sleeping early", "Building a water well", "Buying new clothes"],
        correctAnswer: 2,
        explanation: "Sadaqah Jariyah includes beneficial acts that continue to serve others, like building a well, planting a tree, or sharing beneficial knowledge."
    },
    {
        id: 5,
        question: "What is the most important preparation for the Day of Judgment?",
        options: ["Wealth", "Taqwa (God-consciousness) and Good Deeds", "Status", "Family Lineage"],
        correctAnswer: 1,
        explanation: "In the Quran, Allah says 'And take provisions, but indeed, the best provision is Taqwa.' (2:197)"
    }
];
