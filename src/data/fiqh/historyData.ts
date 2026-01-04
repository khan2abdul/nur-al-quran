export interface TimelineEvent {
    era: string;
    years: string;
    milestone: string;
    description: string;
    keyFigures: string[];
    impact: string;
}

export const FIQH_TIMELINE: TimelineEvent[] = [
    {
        era: "Era of Prophet",
        years: "610 - 632 CE",
        milestone: "Foundations of Revelation",
        description: "Direct revelation through the Quran and personal rulings of the Prophet (SAW) provided the primary legal framework.",
        keyFigures: ["Prophet Muhammad (SAW)"],
        impact: "Established the primary sources: Quran and Sunnah."
    },
    {
        era: "Khulafa Rashidun",
        years: "632 - 661 CE",
        milestone: "Emergence of Ijtihad",
        description: "The Companions faced new scenarios and used Ijtihad (independent reasoning). Umar ibn al-Khattab innovated many administrative and legal rulings.",
        keyFigures: ["Abu Bakr", "Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib"],
        impact: "Development of Sahaba consensus (Ijma) and expansion of legal reasoning."
    },
    {
        era: "Umayyad & Abbasid",
        years: "661 - 1258 CE",
        milestone: "Golden Age of Fiqh",
        description: "The four major schools (Madhabs) were formalized and systematic Usul al-Fiqh (methodology) was developed.",
        keyFigures: ["Abu Hanifa", "Malik ibn Anas", "Al-Shafi'i", "Ahmad ibn Hanbal"],
        impact: "Formalization of the four legal schools and thousands of volumes of jurisprudence."
    },
    {
        era: "Ottoman Codification",
        years: "1869 - 1876 CE",
        milestone: "The Majallah",
        description: "The Majallah al-Ahkam al-Adliyya was the first civil code based on Hanafi Fiqh for use in state courts.",
        keyFigures: ["Ahmed Cevdet Pasha"],
        impact: "Bridging classical Fiqh with modern state legal structures."
    },
    {
        era: "Modern Era",
        years: "20th Century - Present",
        milestone: "Contemporary Resurgence",
        description: "Establishment of national legal codes, international fatwa councils, and the growth of Islamic Finance.",
        keyFigures: ["Yusuf al-Qaradawi", "Wahbah al-Zuhayli", "Scholars of IIFA"],
        impact: "Adaptation of Fiqh to modern technology, finance, and bioethics."
    }
];
