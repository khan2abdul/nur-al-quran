
export interface ProphetEvent {
    id: string;
    name: string;
    arabic: string;
    period: string;
    keyEvents: string[];
    scripture?: string;
    description: string;
    references?: string;
}

export interface MadinahEvent {
    year: string;
    ceYear: string;
    title: string;
    description: string;
    type: 'battle' | 'revelation' | 'political' | 'personal';
    details?: string[];
    casualties?: string;
    outcome?: string;
    quranRef?: string;
    hadithRef?: string;
}

export interface Scientist {
    id: string;
    name: string;
    arabicName?: string;
    period: string;
    field: string;
    contributions: string[];
    inventions?: string[];
    legacy: string;
    image?: string;
}

export interface Dynasty {
    id: string;
    name: string;
    period: string;
    rulers: {
        name: string;
        reign: string;
        achievements: string[];
        architecture?: string[];
    }[];
    highlights: string[];
    color: string;
}

export const PROPHETS_TIMELINE: ProphetEvent[] = [
    {
        id: 'adam',
        name: 'Adam (AS)',
        arabic: 'آدم',
        period: '~5,000-10,000 years ago',
        keyEvents: ['Created in Paradise', 'Descended to Earth', 'Taught names of all things'],
        scripture: 'Scrolls (lost)',
        description: 'The first human and prophet. Created by Allah from clay, taught the names of everything, and sent to Earth as a vicegerent.',
        references: 'Quran 2:30-37'
    },
    {
        id: 'idris',
        name: 'Idris (AS)',
        arabic: 'إدريس',
        period: '~4,000 BCE',
        keyEvents: ['First to write with pen', 'Taught astronomy & math', 'Raised to high station'],
        scripture: '30 Scrolls',
        description: 'Identified with Enoch. Known for his wisdom and being the first to introduce writing and basic sciences.',
        references: 'Quran 19:56-57'
    },
    {
        id: 'nuh',
        name: 'Nuh (AS)',
        arabic: 'نوح',
        period: '~3,000 BCE',
        keyEvents: ['Preached 950 years', 'Built the Ark', 'Survived Great Flood'],
        description: 'The first Messenger of determination (Ulu al-Azm). Preached monotheism for centuries before the Great Flood cleansed the earth.',
        references: 'Quran 71:1-28'
    },
    {
        id: 'hud',
        name: 'Hud (AS)',
        arabic: 'هود',
        period: '~2,500 BCE',
        keyEvents: ['Sent to Ad', 'Warned against arrogance'],
        description: 'Sent to the mighty people of Ad in Yemen, who were destroyed by a fierce wind for their arrogance and disbelief.',
        references: 'Quran 11:50-60'
    },
    {
        id: 'saleh',
        name: 'Saleh (AS)',
        arabic: 'صالح',
        period: '~2,300 BCE',
        keyEvents: ['Sent to Thamud', 'Miracle of She-Camel'],
        description: 'Sent to the people of Thamud. They demanded a miracle (the She-Camel) but then hamstrung it, leading to their destruction by an earthquake.',
        references: 'Quran 11:61-68'
    },
    {
        id: 'ibrahim',
        name: 'Ibrahim (AS)',
        arabic: 'إبراهيم',
        period: '~1,900-2,000 BCE',
        keyEvents: ['Built Kaaba', 'Smashed idols', 'Saved from fire', 'Great Sacrifice'],
        scripture: 'Suhuf (10 Scrolls)',
        description: 'The Friend of Allah (Khalilullah) and father of prophets. Restored monotheism, built the Kaaba, and established the rites of Hajj.',
        references: 'Quran 2:124-132'
    },
    {
        id: 'lut',
        name: 'Lut (AS)',
        arabic: 'لوط',
        period: '~1,900 BCE',
        keyEvents: ['Sent to Sodom', 'Warned against immorality'],
        description: 'Nephew of Ibrahim. Sent to Sodom and Gomorrah to warn against their immoral practices. The cities were overturned.',
        references: 'Quran 11:77-83'
    },
    {
        id: 'ismail',
        name: 'Ismail (AS)',
        arabic: 'إسماعيل',
        period: '~1,800-1,900 BCE',
        keyEvents: ['Helped build Kaaba', 'Ancestor of Arabs'],
        description: 'Son of Ibrahim. Known for his patience and submission during the command of sacrifice. Ancestor of Prophet Muhammad (SAW).',
        references: 'Quran 19:54-55'
    },
    {
        id: 'ishaq',
        name: 'Ishaq (AS)',
        arabic: 'إسحاق',
        period: '~1,700-1,800 BCE',
        keyEvents: ['Born to aged parents', 'Father of Yaqub'],
        description: 'Son of Ibrahim and Sarah. The glad tidings of his birth were given by angels. Ancestor of the Israelites.',
        references: 'Quran 37:112-113'
    },
    {
        id: 'yaqub',
        name: 'Yaqub (AS)',
        arabic: 'يعقوب',
        period: '~1,700 BCE',
        keyEvents: ['Father of 12 Tribes', 'Vision of Yusuf'],
        description: 'Also known as Israel. His twelve sons became the progenitors of the Twelve Tribes of Israel. Known for his beautiful patience.',
        references: 'Quran 12:83-87'
    },
    {
        id: 'yusuf',
        name: 'Yusuf (AS)',
        arabic: 'يوسف',
        period: '~1,610-1,500 BCE',
        keyEvents: ['Sold into slavery', 'Viceroy of Egypt', 'Forgave brothers'],
        description: 'The truthful one. Passed through trials of betrayal, slavery, and temptation to become a ruler in Egypt.',
        references: 'Quran 12 (Surah Yusuf)'
    },
    {
        id: 'shuaib',
        name: 'Shuaib (AS)',
        arabic: 'شعيب',
        period: '~1,600-1,500 BCE',
        keyEvents: ['Sent to Midian', 'Preached fair trade'],
        description: 'The Preacher of Prophets. Sent to Midian to warn against fraud in business and highway robbery.',
        references: 'Quran 11:84-95'
    },
    {
        id: 'ayyub',
        name: 'Ayyub (AS)',
        arabic: 'أيوب',
        period: '~1,500 BCE',
        keyEvents: ['Tested with illness', 'Example of patience'],
        description: 'Tested with loss of wealth, health, and family. Remained steadfast and was rewarded with double what he lost.',
        references: 'Quran 21:83-84'
    },
    {
        id: 'musa',
        name: 'Musa (AS)',
        arabic: 'موسى',
        period: '~1,436-1,316 BCE',
        keyEvents: ['Exodus from Egypt', 'Parted Red Sea', 'Torah at Sinai'],
        scripture: 'Tawrat (Torah)',
        description: 'Kalimullah (Referenced 136 times). Led the Israelites out of Egypt, defeated the sorcerers, and received the Ten Commandments.',
        references: 'Quran 20:9-98'
    },
    {
        id: 'harun',
        name: 'Harun (AS)',
        arabic: 'هارون',
        period: '~1,439-1,317 BCE',
        keyEvents: ['Spokesperson for Musa', 'First High Priest'],
        description: 'Brother of Musa. Gifted with eloquence and appointed as a support to Musa in his mission.',
        references: 'Quran 20:29-36'
    },
    {
        id: 'dawud',
        name: 'Dawud (AS)',
        arabic: 'داوود',
        period: '~1,040-970 BCE',
        keyEvents: ['Defeated Goliath', 'King of Israel', 'Received Psalms'],
        scripture: 'Zabur (Psalms)',
        description: 'Prophet-King. Known for his beautiful voice in praising Allah, justice, and fasting on alternate days.',
        references: 'Quran 38:17-26'
    },
    {
        id: 'sulaiman',
        name: 'Sulaiman (AS)',
        arabic: 'سليمان',
        period: '~970-931 BCE',
        keyEvents: ['Controlled wind/jinn', 'Temple of Solomon', 'Letter to Sheba'],
        description: 'King of Israel. Granted a kingdom unlike any other, with control over wind, jinn, and animals.',
        references: 'Quran 27:15-44'
    },
    {
        id: 'ilyas',
        name: 'Ilyas (AS)',
        arabic: 'إلياس',
        period: '~9th Century BCE',
        keyEvents: ['Challenged Baal worship'],
        description: 'Elijah. Sent to the Israelites who had turned to worshipping the idol Baal.',
        references: 'Quran 37:123-132'
    },
    {
        id: 'alyasa',
        name: 'Al-Yasa (AS)',
        arabic: 'اليسع',
        period: '~9th Century BCE',
        keyEvents: ['Successor to Ilyas'],
        description: 'Elisha. Succeeded Ilyas and continued calling the Israelites to the path of Allah.',
        references: 'Quran 38:48'
    },
    {
        id: 'yunus',
        name: 'Yunus (AS)',
        arabic: 'يونس',
        period: '~8th Century BCE',
        keyEvents: ['Swallowed by whale', 'People of Nineveh repented'],
        description: 'Dhul-Nun. Left his people in anger but was swallowed by a whale. Repented and returned to find 100,000 had believed.',
        references: 'Quran 21:87-88'
    },
    {
        id: 'dhulkifl',
        name: 'Dhul-Kifl (AS)',
        arabic: 'ذو الكفل',
        period: '~6th Century BCE',
        keyEvents: ['Example of patience'],
        description: 'Identify uncertain (possibly Ezekiel). Praised in the Quran for his patience and steadfastness.',
        references: 'Quran 21:85'
    },
    {
        id: 'zakariya',
        name: 'Zakariya (AS)',
        arabic: 'زكريا',
        period: '~1st Century BCE',
        keyEvents: ['Guardian of Maryam', 'Prayed for heir'],
        description: 'Priest and prophet. Took care of Maryam (AS) and was gifted a son, Yahya, despite his old age.',
        references: 'Quran 19:2-11'
    },
    {
        id: 'yahya',
        name: 'Yahya (AS)',
        arabic: 'يحيى',
        period: '~1st Century CE',
        keyEvents: ['Given wisdom as youth', 'Martyred'],
        description: 'John the Baptist. Known for his asceticism, gentleness, and purity. Announced the coming of Isa (AS).',
        references: 'Quran 19:12-15'
    },
    {
        id: 'isa',
        name: 'Isa (AS)',
        arabic: 'عيسى',
        period: '~1-33 CE',
        keyEvents: ['Virgin birth', 'Spoke in cradle', 'Healed blind/leper', 'Raised to Heaven'],
        scripture: 'Injeel (Gospel)',
        description: 'The Messiah. Born miraculously to Virgin Maryam. Performed great miracles by Allahs permission. Not crucified but raised to Heaven.',
        references: 'Quran 19:16-36'
    }
];

export const MADINAH_TIMELINE: MadinahEvent[] = [
    {
        year: '1 AH',
        ceYear: '622-623 CE',
        title: 'Foundation & Brotherhood',
        description: 'The Prophet ﷺ arrives in Madinah, establishes the first mosque, and creates a pact of brotherhood.',
        type: 'political',
        details: [
            'Migration (Hijrah) completed; arrival in Quba.',
            'Construction of Masjid Quba and Masjid Nabawi.',
            'Constitution of Madinah signed with Jewish tribes.',
            'Brotherhood (Muakhaat) between Muhajirun and Ansar.'
        ]
    },
    {
        year: '2 AH',
        ceYear: '623-624 CE',
        title: 'Badr & New Laws',
        description: 'The Qibla changes to Makkah, and the first decisive battle takes place.',
        type: 'battle',
        details: [
            'Change of Qibla from Jerusalem to Kaaba.',
            'Fasting of Ramadan and Zakat made obligatory.',
            'Battle of Badr (17 Ramadan): Decisive Muslim victory.',
            'First Eid al-Fitr celebrated.',
            'Marriage of Ali (RA) and Fatimah (RA).'
        ],
        casualties: 'Muslims: 14 Martyrs | Quraysh: 70 Killed, 70 Captives',
        outcome: 'Victory'
    },
    {
        year: '3 AH',
        ceYear: '624-625 CE',
        title: 'Trial of Uhud',
        description: 'A major setback at Uhud teaches the Muslims the importance of obedience to the command.',
        type: 'battle',
        details: [
            'Battle of Uhud (7 Shawwal).',
            'Martyrdom of Hamza (RA).',
            'Birth of Hasan ibn Ali (RA).'
        ],
        casualties: 'Muslims: 70 Martyrs | Quraysh: 22 Killed',
        outcome: 'Setback'
    },
    {
        year: '4 AH',
        ceYear: '625-626 CE',
        title: 'Tragedy & Defense',
        description: 'Treacherous attacks on missionaries and the expulsion of Banu Nadir.',
        type: 'political',
        details: [
            'Tragedy of Bi\'r Ma\'una (70 reciters killed).',
            'Expulsion of Banu Nadir for plotting persecution.',
            'Prohibition of Alcohol (final stage).',
            'Salatul Khauf (Prayer of Fear) revealed.'
        ]
    },
    {
        year: '5 AH',
        ceYear: '626-627 CE',
        title: 'Battle of the Trench',
        description: 'The Confederates besiege Madinah, saved by the trench strategy.',
        type: 'battle',
        details: [
            'Battle of Khandaq (The Trench).',
            'Siege of Banu Qurayza for betrayal.',
            'Revelation of Hijab verses.'
        ],
        outcome: 'Strategic Victory'
    },
    {
        year: '6 AH',
        ceYear: '627-628 CE',
        title: 'The Clear Victory',
        description: 'The Treaty of Hudaybiyyah opens the door for peaceful expansion.',
        type: 'political',
        details: [
            'Treaty of Hudaybiyyah.',
            'Pledge of Ridwan (Bay\'ah al-Ridwan).',
            'Letters sent to Kings (Heraclius, Kisra, Negus).'
        ],
        quranRef: 'Surah Al-Fath (48:1)'
    },
    {
        year: '7 AH',
        ceYear: '628-629 CE',
        title: 'Khaybar & Umrah',
        description: 'Victory at Khaybar and the performance of the missed Umrah.',
        type: 'battle',
        details: [
            'Battle of Khaybar against fortified strongholds.',
            'Return of Ja\'far from Abyssinia.',
            'Umrah al-Qada (Compensatory Umrah).'
        ]
    },
    {
        year: '8 AH',
        ceYear: '629-630 CE',
        title: 'Conquest of Makkah',
        description: 'The bloodless conquest of Makkah and purification of the Kaaba.',
        type: 'battle',
        details: [
            'Battle of Mu\'tah (First encounter with Romans).',
            'Conquest of Makkah (20 Ramadan).',
            'Battle of Hunayn and Siege of Ta\'if.'
        ],
        casualties: 'Minimal causalities in Makkah conquest.',
        outcome: 'Total Victory'
    },
    {
        year: '9 AH',
        ceYear: '630-631 CE',
        title: 'Year of Delegations',
        description: 'Tribes from all over Arabia come to accept Islam.',
        type: 'political',
        details: [
            'Expedition to Tabuk (Last led by Prophet).',
            'Revelation of Surah At-Tawbah.',
            'Abu Bakr (RA) leads the Hajj.',
            'Islam spreads to Yemen and Bahrain.'
        ]
    },
    {
        year: '10 AH',
        ceYear: '631-632 CE',
        title: 'Farewell Hajj',
        description: 'The religion is perfected and the Prophet ﷺ bids farewell.',
        type: 'revelation',
        details: [
            'Farewell Hajj with 100,000+ companions.',
            'Farewell Sermon at Arafat.',
            'Revelation of "This day I have perfected your religion".'
        ],
        quranRef: 'Quran 5:3'
    },
    {
        year: '11 AH',
        ceYear: '632 CE',
        title: 'The Sad Departure',
        description: 'The Prophet Muhammad ﷺ passes away, leaving the Quran and Sunnah.',
        type: 'personal',
        details: [
            'Dispatching of Usama\'s army.',
            'Illness of the Prophet ﷺ.',
            'Death of Prophet Muhammad ﷺ (12 Rabi Al-Awwal).',
            'Selection of Abu Bakr (RA) as first Caliph.'
        ]
    }
];

export const GOLDEN_AGE_SCIENTISTS: Scientist[] = [
    {
        id: 'jabir',
        name: 'Jabir ibn Hayyan (Geber)',
        period: '721-815 CE',
        field: 'Chemistry',
        contributions: ['Father of Chemistry', 'Introduced experimental method'],
        inventions: ['Alembic still', 'Retort', 'Crystallization process'],
        legacy: 'Transformed alchemy into chemistry; works used in Europe for centuries.'
    },
    {
        id: 'khwarizmi',
        name: 'Al-Khwarizmi',
        period: '780-850 CE',
        field: 'Mathematics',
        contributions: ['Father of Algebra', 'Popularized Hindu-Arabic numerals'],
        inventions: ['Algebra (Al-Jabr)', 'Algorithms'],
        legacy: 'Gave the world "Algebra" and "Algorithm". His work allows modern computing.'
    },
    {
        id: 'kindi',
        name: 'Al-Kindi (Alkindus)',
        period: '801-873 CE',
        field: 'Polymath/Cryptanalysis',
        contributions: ['Frequency analysis', 'Philosophy', 'Music theory'],
        legacy: 'Pioneer of cryptography and successful code-breaking.'
    },
    {
        id: 'battani',
        name: 'Al-Battani',
        period: '858-929 CE',
        field: 'Astronomy',
        contributions: ['Accurate solar year calculation', 'Trigonometry tables'],
        legacy: 'His measurements were used by Copernicus and Kepler.'
    },
    {
        id: 'razi',
        name: 'Al-Razi (Rhazes)',
        period: '854-925 CE',
        field: 'Medicine',
        contributions: ['Differentiated smallpox vs measles', 'Pioneered pediatrics'],
        inventions: ['Ethanol usage in medicine', 'Mercurial ointments'],
        legacy: 'Greatest clinician of the Middle Ages.'
    },
    {
        id: 'zahrawi',
        name: 'Al-Zahrawi (Abulcasis)',
        period: '936-1013 CE',
        field: 'Surgery',
        contributions: ['Father of Surgery', 'Wrote Al-Tasrif'],
        inventions: ['Catgut sutures', 'Forceps', 'Scalpel', 'Surgical needle'],
        legacy: 'Illustrated 200+ surgical instruments still in use today.'
    },
    {
        id: 'haytham',
        name: 'Ibn al-Haytham (Alhazen)',
        period: '965-1040 CE',
        field: 'Physics/Optics',
        contributions: ['Father of Optics', 'Scientific Method'],
        inventions: ['Camera Obscura (Pinhole Camera)'],
        legacy: 'Proved light travels in straight lines; lay foundation for cameras/photography.'
    },
    {
        id: 'biruni',
        name: 'Al-Biruni',
        period: '973-1048 CE',
        field: 'Astronomy/Geography',
        contributions: ['Measured Earth radius', 'Anthropology of India'],
        legacy: 'Calculated Earths circumference with 99.7% accuracy centuries before modern tools.'
    },
    {
        id: 'ibnsina',
        name: 'Ibn Sina (Avicenna)',
        period: '980-1037 CE',
        field: 'Medicine/Philosophy',
        contributions: ['Canon of Medicine', 'Book of Healing'],
        legacy: 'His medical encyclopedia was the standard text in Europe until the 17th century.'
    },
    {
        id: 'jazari',
        name: 'Al-Jazari',
        period: '1136-1206 CE',
        field: 'Engineering',
        contributions: ['Father of Robotics'],
        inventions: ['Crankshaft', 'Water clocks', 'Automata', 'Suction pump'],
        legacy: 'Mechanisms vital for the industrial revolution and modern engines.'
    }
];

export const INDIA_TIMELINE: Dynasty[] = [
    {
        id: 'early',
        name: 'Early Islamic Presence',
        period: '712-1206 CE',
        color: 'bg-emerald-600',
        rulers: [
            { name: 'Muhammad bin Qasim', reign: '712 CE', achievements: ['Conquered Sindh', 'Established rights for non-Muslims'] },
            { name: 'Mahmud of Ghazni', reign: '998-1030', achievements: ['Patron of arts/science (Al-Biruni)'] },
            { name: 'Muhammad Ghori', reign: '1173-1206', achievements: [' laid foundation for Delhi Sultanate', 'Victory at Tarain'] }
        ],
        highlights: ['First permanent Muslim foothold', 'Cultural exchange commences']
    },
    {
        id: 'mamluk',
        name: 'Mamluk (Slave) Dynasty',
        period: '1206-1290 CE',
        color: 'bg-blue-600',
        rulers: [
            { name: 'Qutbuddin Aibak', reign: '1206-1210', achievements: ['First Sultan'], architecture: ['Qutb Minar', 'Quwwat-ul-Islam Mosque'] },
            { name: 'Iltutmish', reign: '1211-1236', achievements: ['Consolidated empire', 'Saved India from Mongols'] },
            { name: 'Razia Sultana', reign: '1236-1240', achievements: ['Only female Sultan of Delhi', 'Administrative reforms'] }
        ],
        highlights: ['Architecture flourish', 'Defense against early Mongol raids']
    },
    {
        id: 'khalji',
        name: 'Khalji Dynasty',
        period: '1290-1320 CE',
        color: 'bg-red-600',
        rulers: [
            { name: 'Alauddin Khalji', reign: '1296-1316', achievements: ['Market reforms', 'Repelled 12 Mongol invasions', 'Expanded to Deccan'] }
        ],
        highlights: ['Peak military power', 'Economic price controls']
    },
    {
        id: 'tughlaq',
        name: 'Tughlaq Dynasty',
        period: '1320-1414 CE',
        color: 'bg-amber-600',
        rulers: [
            { name: 'Muhammad bin Tughlaq', reign: '1325-1351', achievements: ['Visionary but failed experiments', 'Scholarly patron'] },
            { name: 'Firoz Shah Tughlaq', reign: '1351-1388', achievements: ['Builder of canals/cities', 'Established hospitals'] }
        ],
        highlights: ['Greatest territorial extent (briefly)', 'Timur\'s invasion (1398) devastated Delhi']
    },
    {
        id: 'mughal',
        name: 'Mughal Empire',
        period: '1526-1857 CE',
        color: 'bg-purple-600',
        rulers: [
            { name: 'Babur', reign: '1526-1530', achievements: ['Victory at Panipat', 'Founded Empire'] },
            { name: 'Akbar', reign: '1556-1605', achievements: ['Administrative genius', 'Religious tolerance', 'Fatehpur Sikri'] },
            { name: 'Shah Jahan', reign: '1628-1658', achievements: ['Golden age of architecture'], architecture: ['Taj Mahal', 'Red Fort', 'Jama Masjid'] },
            { name: 'Aurangzeb', reign: '1658-1707', achievements: ['Largest expansion', 'Fatawa Alamgiri'] }
        ],
        highlights: ['Cultural synthesis', 'World heritage architecture', 'Gunpowder empire']
    }
];
