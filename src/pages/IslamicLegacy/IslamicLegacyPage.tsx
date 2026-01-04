import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

// --- Types ---
type TabId = 'intro' | 'prophets' | 'science' | 'history' | 'lessons' | 'culture';

// --- Data: Prophets (All 25 mentioned in Quran) ---
interface Prophet {
    id: string;
    name: string;
    arabic: string;
    era: string;
    mission: string;
    trait: string;
    location: string;
    story?: string;
    miracle?: string;
    lesson: string;
}

const PROPHETS: Prophet[] = [
    { id: 'adam', name: 'Adam', arabic: 'آدم', era: 'Beginning', mission: 'First human and first prophet', trait: 'Repentance', location: 'Paradise → Earth', miracle: 'Created from clay by Allah', lesson: 'Even after mistakes, sincere repentance is accepted by Allah.' },
    { id: 'idris', name: 'Idris (Enoch)', arabic: 'إدريس', era: 'Ancient', mission: 'Teacher of astronomy and writing', trait: 'Wisdom', location: 'Mesopotamia', miracle: 'Raised to high station by Allah', lesson: 'Seek knowledge and teach others.' },
    { id: 'nuh', name: 'Nuh (Noah)', arabic: 'نوح', era: '~3000 BCE', mission: 'Warned his people for 950 years', trait: 'Patience', location: 'Mesopotamia/Iraq', miracle: 'The Great Flood and the Ark', lesson: 'Never give up calling to truth, no matter how long it takes.' },
    { id: 'hud', name: 'Hud', arabic: 'هود', era: 'Ancient', mission: 'Sent to the people of \'Ad', trait: 'Steadfastness', location: 'Southern Arabia (Yemen)', miracle: 'Survived the great wind that destroyed \'Ad', lesson: 'Material power cannot save a nation that rejects God.' },
    { id: 'salih', name: 'Salih', arabic: 'صالح', era: 'Ancient', mission: 'Sent to the people of Thamud', trait: 'Warning', location: 'Northwestern Arabia', miracle: 'The She-Camel from the rock', lesson: 'Destroying Allah\'s signs leads to destruction.' },
    { id: 'ibrahim', name: 'Ibrahim (Abraham)', arabic: 'إبراهيم', era: '~2000 BCE', mission: 'Father of monotheism', trait: 'Absolute Trust', location: 'Iraq → Palestine → Makkah', miracle: 'Survived the fire, built the Kaaba', lesson: 'True faith means trusting Allah completely, even when logic seems to say otherwise.' },
    { id: 'lut', name: 'Lut (Lot)', arabic: 'لوط', era: '~2000 BCE', mission: 'Warned against immorality', trait: 'Moral Courage', location: 'Sodom (Dead Sea region)', miracle: 'Saved from the destruction of Sodom', lesson: 'Stand for morality even when alone.' },
    { id: 'ismail', name: 'Ismail (Ishmael)', arabic: 'إسماعيل', era: '~1900 BCE', mission: 'Helped build the Kaaba', trait: 'Submission', location: 'Makkah', miracle: 'Zamzam spring appeared for him as a baby', lesson: 'Submission to Allah brings unexpected blessings.' },
    { id: 'ishaq', name: 'Ishaq (Isaac)', arabic: 'إسحاق', era: '~1900 BCE', mission: 'Continued Ibrahim\'s legacy', trait: 'Blessing', location: 'Palestine', miracle: 'Born to aged parents as a miracle', lesson: 'Allah fulfills His promises in His time.' },
    { id: 'yaqub', name: 'Yaqub (Jacob)', arabic: 'يعقوب', era: '~1800 BCE', mission: 'Father of the 12 tribes of Israel', trait: 'Beautiful Patience', location: 'Palestine → Egypt', miracle: 'Eyesight restored by Yusuf\'s shirt', lesson: 'Never despair of Allah\'s mercy.' },
    { id: 'yusuf', name: 'Yusuf (Joseph)', arabic: 'يوسف', era: '~1700 BCE', mission: 'From slave to minister of Egypt', trait: 'Purity & Forgiveness', location: 'Palestine → Egypt', miracle: 'Dream interpretation, rescued from the well', lesson: 'Patience through hardship leads to elevation. Forgive those who wronged you.' },
    { id: 'ayyub', name: 'Ayyub (Job)', arabic: 'أيوب', era: 'Ancient', mission: 'Remained faithful through extreme trials', trait: 'Patience in Suffering', location: 'Levant', miracle: 'Restored after years of illness and loss', lesson: 'Patience in trials is rewarded with multiple blessings.' },
    { id: 'shuayb', name: 'Shuayb', arabic: 'شعيب', era: 'Ancient', mission: 'Preached against cheating in business', trait: 'Business Ethics', location: 'Midian (Northwestern Arabia)', miracle: 'Survived the earthquake that destroyed Midian', lesson: 'Honesty in business is a form of worship.' },
    { id: 'musa', name: 'Musa (Moses)', arabic: 'موسى', era: '~1400 BCE', mission: 'Liberated Israelites from Pharaoh', trait: 'Courage & Leadership', location: 'Egypt → Sinai', miracle: 'Staff into serpent, parted the sea, spoke directly to Allah', lesson: 'Stand up against oppression. Allah empowers the weak against the powerful.' },
    { id: 'harun', name: 'Harun (Aaron)', arabic: 'هارون', era: '~1400 BCE', mission: 'Assisted Musa as his minister', trait: 'Eloquence', location: 'Egypt → Sinai', miracle: 'Appointed as helper to Musa', lesson: 'Support leaders in righteousness. Teamwork strengthens the mission.' },
    { id: 'dhulkifl', name: 'Dhul-Kifl', arabic: 'ذو الكفل', era: 'Ancient', mission: 'Fulfilled his promises', trait: 'Trustworthiness', location: 'Unknown (possibly Iraq)', miracle: 'Known for keeping his word', lesson: 'Be a person of your word.' },
    { id: 'dawud', name: 'Dawud (David)', arabic: 'داود', era: '~1000 BCE', mission: 'King and prophet, given the Psalms (Zabur)', trait: 'Worship & Justice', location: 'Palestine (Jerusalem)', miracle: 'Iron became soft in his hands, birds and mountains glorified Allah with him', lesson: 'Balance power with worship. Leaders must be just.' },
    { id: 'sulayman', name: 'Sulayman (Solomon)', arabic: 'سليمان', era: '~970 BCE', mission: 'King with power over wind, jinn, and animals', trait: 'Wisdom & Gratitude', location: 'Palestine (Jerusalem)', miracle: 'Commanded the wind, jinn, and animals', lesson: 'With great power comes responsibility to be grateful and just.' },
    { id: 'ilyas', name: 'Ilyas (Elijah)', arabic: 'إلياس', era: '~900 BCE', mission: 'Called people to worship Allah alone', trait: 'Courage', location: 'Levant', miracle: 'Saved from persecution', lesson: 'Stand firm against false gods in society.' },
    { id: 'alyasa', name: 'Al-Yasa (Elisha)', arabic: 'اليسع', era: '~850 BCE', mission: 'Continued Ilyas\'s mission', trait: 'Continuity', location: 'Levant', miracle: 'Performed miracles by Allah\'s permission', lesson: 'Continue the work of righteous predecessors.' },
    { id: 'yunus', name: 'Yunus (Jonah)', arabic: 'يونس', era: '~800 BCE', mission: 'Sent to Nineveh (modern Iraq)', trait: 'Repentance', location: 'Nineveh (Mosul, Iraq)', miracle: 'Survived in the whale\'s belly', lesson: 'Never abandon your mission. Sincere repentance in darkness brings light.' },
    { id: 'zakariya', name: 'Zakariya (Zechariah)', arabic: 'زكريا', era: '~50 BCE', mission: 'Guardian of Maryam, father of Yahya', trait: 'Devotion', location: 'Palestine', miracle: 'Given a son (Yahya) at old age', lesson: 'Never stop asking Allah, even for the impossible.' },
    { id: 'yahya', name: 'Yahya (John the Baptist)', arabic: 'يحيى', era: '~1 BCE', mission: 'Prepared people for Isa', trait: 'Piety', location: 'Palestine', miracle: 'Given wisdom as a child', lesson: 'Live a life of purity and purpose.' },
    { id: 'isa', name: 'Isa (Jesus)', arabic: 'عيسى', era: '~1 CE', mission: 'Miraculous birth, called to monotheism', trait: 'Compassion & Miracles', location: 'Palestine', miracle: 'Born without father, spoke in cradle, healed sick, raised dead by Allah\'s permission', lesson: 'Jesus was a human prophet, not divine. Miracles come from Allah.' },
    { id: 'muhammad', name: 'Muhammad ﷺ', arabic: 'محمد', era: '570-632 CE', mission: 'Final prophet, Quran revealed, mercy to all worlds', trait: 'Mercy & Perfect Character', location: 'Makkah → Madinah', miracle: 'The Quran, Night Journey, splitting of the moon', lesson: 'Combine strength with mercy. His character is the model for humanity.' },
];

// --- Data: Scientists (12 major scholars) ---
interface Scientist {
    id: string;
    name: string;
    arabicName?: string;
    era: string;
    field: string;
    contribution: string;
    icon: string;
    legacy: string;
    books?: string[];
    quote?: string;
    funFact?: string;
}

const SCIENTISTS: Scientist[] = [
    { id: 'khwarizmi', name: 'Al-Khwarizmi', arabicName: 'الخوارزمي', era: '780-850 CE', field: 'Mathematics', contribution: 'Invented Algebra & Algorithms', icon: '🔢', legacy: 'Computer science, GPS, banking all use his methods', books: ['Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala'], quote: 'That fondness for science... that affability and condescension which God shows to the learned.', funFact: 'The word "algorithm" comes from his name (Algoritmi)!' },
    { id: 'ibn-sina', name: 'Ibn Sina (Avicenna)', arabicName: 'ابن سينا', era: '980-1037 CE', field: 'Medicine', contribution: 'Canon of Medicine used for 600 years in Europe', icon: '⚕️', legacy: 'Modern medical education foundations', books: ['The Canon of Medicine', 'The Book of Healing'], quote: 'The knowledge of anything is not acquired except through the knowledge of its causes.', funFact: 'Wrote 450 books on various subjects!' },
    { id: 'ibn-haytham', name: 'Ibn al-Haytham (Alhazen)', arabicName: 'ابن الهيثم', era: '965-1040 CE', field: 'Optics/Physics', contribution: 'Father of modern optics, scientific method', icon: '👁️', legacy: 'Photography, telescopes, corrective lenses', books: ['Book of Optics (Kitab al-Manazir)'], quote: 'Truth is sought for itself. It is not sought for something else.', funFact: 'Invented the pinhole camera while pretending to be insane to avoid a caliph!' },
    { id: 'al-jazari', name: 'Al-Jazari', arabicName: 'الجزري', era: '1136-1206 CE', field: 'Engineering', contribution: 'Mechanical automata, programmable machines', icon: '⚙️', legacy: 'Robotics, modern machinery', books: ['The Book of Knowledge of Ingenious Mechanical Devices'], funFact: 'Built a robot band that could play music and a handwashing automaton!' },
    { id: 'al-razi', name: 'Al-Razi (Rhazes)', arabicName: 'الرازي', era: '854-925 CE', field: 'Chemistry/Medicine', contribution: 'Distinguished measles from smallpox', icon: '🧪', legacy: 'Clinical trials methodology', books: ['Al-Hawi (The Comprehensive Book)', 'The Secret of Secrets'], quote: 'All that is written in books is worth less than the experience of a wise doctor.', funFact: 'First to use alcohol for medical purposes!' },
    { id: 'al-biruni', name: 'Al-Biruni', arabicName: 'البيروني', era: '973-1048 CE', field: 'Polymath', contribution: 'Calculated Earth\'s radius with 99.7% accuracy', icon: '🌍', legacy: 'Geodesy, comparative religion studies', books: ['Indica', 'The Remaining Signs of Past Centuries'], quote: 'I prefer to rely on observations rather than traditions.', funFact: 'Spoke at least 5 languages and studied Hinduism from original Sanskrit texts!' },
    { id: 'al-zahrawi', name: 'Al-Zahrawi (Abulcasis)', arabicName: 'الزهراوي', era: '936-1013 CE', field: 'Surgery', contribution: 'Father of modern surgery, 200+ surgical instruments', icon: '🔪', legacy: 'Surgical procedures and tools still used today', books: ['Al-Tasrif (The Method of Medicine)'], funFact: 'Invented catgut for internal stitching, still used in surgery!' },
    { id: 'jabir', name: 'Jabir ibn Hayyan', arabicName: 'جابر بن حيان', era: '721-815 CE', field: 'Chemistry', contribution: 'Father of chemistry, introduced scientific method to alchemy', icon: '⚗️', legacy: 'Distillation, crystallization, chemical nomenclature', books: ['The Sum of Perfection'], funFact: 'His writings were so influential that Latin Europe called chemistry "Geber" (from Jabir)!' },
    { id: 'al-kindi', name: 'Al-Kindi', arabicName: 'الكندي', era: '801-873 CE', field: 'Philosophy', contribution: 'Father of Islamic philosophy, introduced Greek philosophy to Arabs', icon: '🧠', legacy: 'Philosophical methodology, music therapy', books: ['On First Philosophy'], quote: 'We ought not to be ashamed of appreciating truth and acquiring it wherever it comes from.', funFact: 'Pionered the use of music as therapy for psychological conditions!' },
    { id: 'al-farabi', name: 'Al-Farabi', arabicName: 'الفارابي', era: '872-950 CE', field: 'Philosophy/Music', contribution: 'The Second Teacher (after Aristotle)', icon: '🎵', legacy: 'Political philosophy, music theory', books: ['The Virtuous City', 'The Great Book of Music'], funFact: 'He could allegedly make people laugh or cry just by playing music!' },
    { id: 'ibn-rushd', name: 'Ibn Rushd (Averroes)', arabicName: 'ابن رشد', era: '1126-1198 CE', field: 'Philosophy/Medicine', contribution: 'Commentator on Aristotle, influenced European thought', icon: '📜', legacy: 'Renaissance philosophy, Averroism', books: ['The Incoherence of the Incoherence', 'Commentaries on Aristotle'], quote: 'Ignorance leads to fear, fear leads to hate, and hate leads to violence.', funFact: 'His commentaries on Aristotle shaped European universities for 400 years!' },
    { id: 'al-idrisi', name: 'Al-Idrisi', arabicName: 'الإدريسي', era: '1100-1165 CE', field: 'Geography', contribution: 'Created the most accurate world map of medieval times', icon: '🗺️', legacy: 'Cartography, geographic methodology', books: ['Tabula Rogeriana', 'Nuzhat al-Mushtaq'], funFact: 'His world map was used for navigation for 300 years!' },
];

// --- Data: Empires ---
interface Empire {
    id: string;
    name: string;
    era: string;
    capital: string;
    achievement: string;
    expansion: string;
    keyFigures?: string[];
    architecture?: string[];
    decline?: string;
    color: string;
}

const EMPIRES: Empire[] = [
    { id: 'rashidun', name: 'Rashidun Caliphate', era: '632-661 CE', capital: 'Madinah → Kufa', achievement: 'Established foundations of Islamic governance', expansion: '3.5 million km²', keyFigures: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'], architecture: ['Al-Aqsa Mosque expansion'], decline: 'Internal conflict after assassination of Uthman and Ali', color: 'from-amber-500 to-orange-500' },
    { id: 'umayyad', name: 'Umayyad Caliphate', era: '661-750 CE', capital: 'Damascus', achievement: 'Largest empire in history at the time', expansion: '11 million km²', keyFigures: ['Muawiyah I', 'Abdul-Malik ibn Marwan', 'Umar II'], architecture: ['Dome of the Rock', 'Great Mosque of Damascus', 'Alhambra foundations'], decline: 'Abbasid revolution and internal rebellions', color: 'from-emerald-500 to-teal-500' },
    { id: 'abbasid', name: 'Abbasid Caliphate', era: '750-1258 CE', capital: 'Baghdad', achievement: 'Islamic Golden Age, House of Wisdom, patronage of science', expansion: 'Knowledge empire', keyFigures: ['Harun al-Rashid', 'Al-Mamun', 'Al-Mutasim'], architecture: ['House of Wisdom', 'Round City of Baghdad'], decline: 'Mongol invasion by Hulagu Khan in 1258', color: 'from-indigo-500 to-purple-500' },
    { id: 'andalus', name: 'Al-Andalus', era: '711-1492 CE', capital: 'Córdoba', achievement: 'Coexistence (Convivencia), translation movement', expansion: 'Cultural flowering', keyFigures: ['Abd al-Rahman I', 'Abd al-Rahman III', 'Ibn Rushd', 'Ibn Arabi'], architecture: ['Great Mosque of Córdoba', 'Alhambra Palace', 'Giralda Tower'], decline: 'Christian Reconquista culminating in 1492', color: 'from-rose-500 to-pink-500' },
    { id: 'ottoman', name: 'Ottoman Empire', era: '1299-1922 CE', capital: 'Constantinople (Istanbul)', achievement: '600+ years of rule, architectural marvels, legal reforms', expansion: '5.2 million km²', keyFigures: ['Mehmed II (the Conqueror)', 'Suleiman the Magnificent', 'Sinan (architect)'], architecture: ['Blue Mosque', 'Suleymaniye Mosque', 'Topkapi Palace'], decline: 'WWI defeat and rise of nationalism', color: 'from-blue-500 to-cyan-500' },
];

// --- Data: Timeline ---
const TIMELINE_EVENTS = [
    { year: '610 CE', title: 'First Revelation', desc: 'Prophet Muhammad ﷺ receives first verses in Cave Hira' },
    { year: '622 CE', title: 'Hijrah', desc: 'Migration to Madinah, start of Islamic calendar' },
    { year: '632 CE', title: 'Farewell Sermon', desc: 'Final message of equality and justice' },
    { year: '762 CE', title: 'Baghdad Founded', desc: 'Abbasid capital becomes world\'s learning center' },
    { year: '830 CE', title: 'House of Wisdom', desc: 'Translation movement preserves Greek, Persian, Indian knowledge' },
    { year: '1258 CE', title: 'Mongol Invasion', desc: 'Baghdad destroyed, but knowledge survives in other centers' },
    { year: '1492 CE', title: 'Fall of Granada', desc: 'End of Islamic Spain, knowledge transfers to Europe' },
    { year: 'Today', title: '1.8 Billion Muslims', desc: 'Islam is the world\'s second-largest and fastest-growing religion' },
];

// --- Data: Lessons ---
interface HistoryLesson {
    id: string;
    title: string;
    icon: string;
    lesson: string;
    application: string;
    quranicRef?: string;
    historicalExample?: string;
    category: 'rise' | 'fall' | 'wisdom';
}

const HISTORY_LESSONS: HistoryLesson[] = [
    { id: 'knowledge', title: 'Knowledge Leads to Flourishing', icon: '📚', lesson: 'When Muslims prioritized learning, they led the world. When they abandoned it, they declined.', application: 'Invest in education and continuous learning.', quranicRef: '"Read! In the name of your Lord who created." (96:1)', historicalExample: 'The House of Wisdom in Baghdad attracted scholars from across the world.', category: 'rise' },
    { id: 'justice', title: 'Justice Builds Strong Societies', icon: '⚖️', lesson: 'The early caliphs were known for treating all people—rich or poor—equally under the law.', application: 'Uphold fairness in all dealings.', quranicRef: '"O you who believe, be persistent in justice." (4:135)', historicalExample: 'Umar ibn al-Khattab held governors accountable and could be questioned by any citizen.', category: 'rise' },
    { id: 'unity', title: 'Unity Creates Strength', icon: '🤝', lesson: 'The rapid expansion of Islam came through unity. Division led to weakness and colonization.', application: 'Work together despite differences.', quranicRef: '"And hold firmly to the rope of Allah all together and do not become divided." (3:103)', historicalExample: 'The Crusaders and Mongols exploited Muslim disunity.', category: 'rise' },
    { id: 'tolerance', title: 'Tolerance Enables Innovation', icon: '🌍', lesson: 'Baghdad\'s House of Wisdom included Muslim, Christian, and Jewish scholars working together.', application: 'Diverse teams create better solutions.', historicalExample: 'Al-Andalus (Islamic Spain) was a model of coexistence for 700 years.', category: 'wisdom' },
    { id: 'humility', title: 'Pride Precedes Downfall', icon: '🪞', lesson: 'Nations in the Quran were destroyed when they became arrogant despite receiving guidance.', application: 'Stay humble in success.', quranicRef: '"And do not walk upon the earth exultantly." (17:37)', historicalExample: 'The Umayyads fell partly due to arrogance toward non-Arab Muslims.', category: 'fall' },
    { id: 'truthful', title: 'Honesty in All Affairs', icon: '💎', lesson: 'The Prophet ﷺ was known as Al-Amin (The Trustworthy) even before prophethood.', application: 'Build your reputation on integrity.', quranicRef: '"O you who believe, fear Allah and be with those who are true." (9:119)', historicalExample: 'Muslim traders spread Islam across Southeast Asia through honest business.', category: 'wisdom' },
    { id: 'planning', title: 'Strategy Matters', icon: '🎯', lesson: 'The Prophet\'s Hijrah was meticulously planned—decoy, cave, alternative route.', application: 'Hope in Allah, but tie your camel.', historicalExample: 'Saladin\'s patient strategy recaptured Jerusalem after 88 years of Crusader rule.', category: 'rise' },
    { id: 'luxury', title: 'Luxury Weakens Nations', icon: '💰', lesson: 'As empires became wealthy, leaders became complacent and disconnected from the people.', application: 'Live simply and stay connected to your roots.', quranicRef: '"Does man not remember that We created him before, while he was nothing?" (19:67)', historicalExample: 'Late Abbasid caliphs rarely left their palaces.', category: 'fall' },
];

// --- Data: Islamic Art Forms ---
const ISLAMIC_ART = [
    { id: 'calligraphy', name: 'Calligraphy', arabicName: 'الخط', icon: '✍️', description: 'The art of beautiful writing, considered the highest art form in Islam', examples: ['Kufic script', 'Naskh', 'Thuluth', 'Diwani'], significance: 'Used to transcribe the Quran and decorate mosques' },
    { id: 'geometric', name: 'Geometric Patterns', arabicName: 'الأشكال الهندسية', icon: '🔷', description: 'Intricate mathematical patterns symbolizing the infinite nature of Allah', examples: ['Girih tiles', 'Arabesque', 'Star patterns', 'Tessellations'], significance: 'Represents the infinite and the order in creation' },
    { id: 'arabesque', name: 'Arabesque', arabicName: 'الأرابيسك', icon: '🌿', description: 'Flowing vegetal and floral patterns intertwined with Islamic calligraphy', examples: ['Vine scrolls', 'Palmettes', 'Rumi motifs'], significance: 'Symbolizes the paradise gardens described in the Quran' },
    { id: 'illumination', name: 'Manuscript Illumination', arabicName: 'التذهيب', icon: '📜', description: 'Gold leaf decoration of Qurans and scholarly manuscripts', examples: ['Blue Quran of Kairouan', 'Topkapi Quran'], significance: 'Honors the sacred text through visual beauty' },
    { id: 'ceramics', name: 'Ceramics & Tiles', arabicName: 'السيراميك', icon: '🏺', description: 'Colorful tilework covering mosques and palaces', examples: ['Iznik tiles', 'Zellige', 'Lustre-ware'], significance: 'Creates heavenly interiors reflecting paradise' },
    { id: 'textiles', name: 'Textiles & Carpets', arabicName: 'السجاد', icon: '🧵', description: 'Prayer rugs and palace carpets with intricate designs', examples: ['Persian carpets', 'Ottoman silk', 'Moroccan textiles'], significance: 'Portable art and sacred space for prayer' },
];

// --- Data: Famous Islamic Architecture ---
const ISLAMIC_ARCHITECTURE = [
    { id: 'alhambra', name: 'Alhambra', location: 'Granada, Spain', era: '13th-14th century', style: 'Nasrid/Moorish', features: ['Courtyard of Lions', 'Arabesque stucco', 'Water gardens'], description: 'A palace fortress showcasing the pinnacle of Andalusian art', color: 'from-rose-400 to-red-500' },
    { id: 'dome-rock', name: 'Dome of the Rock', location: 'Jerusalem', era: '691 CE', style: 'Umayyad', features: ['Golden dome', 'Octagonal plan', 'Byzantine influences'], description: 'One of the oldest Islamic buildings, built on the Temple Mount', color: 'from-amber-400 to-orange-500' },
    { id: 'blue-mosque', name: 'Blue Mosque', location: 'Istanbul, Turkey', era: '1609-1616 CE', style: 'Ottoman Classical', features: ['6 minarets', '20,000 blue tiles', 'Cascading domes'], description: 'Symbol of Ottoman imperial power and artistry', color: 'from-blue-400 to-indigo-500' },
    { id: 'cordoba', name: 'Great Mosque of Córdoba', location: 'Spain', era: '784-987 CE', style: 'Umayyad/Moorish', features: ['856 columns', 'Double arches', 'Horseshoe arches'], description: 'Forest of columns representing the garden of paradise', color: 'from-emerald-400 to-teal-500' },
    { id: 'taj-mahal', name: 'Taj Mahal', location: 'Agra, India', era: '1632-1653 CE', style: 'Mughal', features: ['White marble', 'Pietra dura', 'Perfect symmetry'], description: 'A monument of eternal love and Mughal architectural mastery', color: 'from-slate-300 to-slate-500' },
    { id: 'al-aqsa', name: 'Al-Aqsa Mosque', location: 'Jerusalem', era: '705 CE', style: 'Umayyad', features: ['Silver dome', 'Qibla of first Muslims', 'Underground hall'], description: 'The third holiest site in Islam', color: 'from-zinc-400 to-zinc-600' },
];

// --- Data: Women Scholars ---
interface WomanScholar {
    id: string;
    name: string;
    era: string;
    field: string;
    contribution: string;
    students?: string[];
    fact: string;
}

const WOMEN_SCHOLARS: WomanScholar[] = [
    { id: 'khadijah', name: 'Khadijah bint Khuwaylid', era: '555-619 CE', field: 'First Muslim, Businesswoman', contribution: 'First to accept Islam, supported the Prophet financially and emotionally', students: ['All early Muslims benefited from her support'], fact: 'One of the most successful merchants in Makkah before Islam' },
    { id: 'aisha', name: 'Aisha bint Abi Bakr', era: '613-678 CE', field: 'Hadith, Fiqh, Medicine', contribution: 'Narrated 2,210 hadiths, taught major companions and scholars', students: ['Urwa ibn al-Zubayr', 'Abu Hurayrah'], fact: 'Known for her exceptional memory and was consulted on complex juristic matters' },
    { id: 'fatimah', name: 'Fatimah al-Fihri', era: '800-880 CE', field: 'Education', contribution: 'Founded University of Al-Qarawiyyin in Fez (859 CE)', students: ['Thousands over 1,100+ years'], fact: 'Founded the world\'s oldest continuously operating university' },
    { id: 'lubna', name: 'Lubna of Córdoba', era: '10th century', field: 'Mathematics, Poetry, Library Science', contribution: 'Managed the royal library of 500,000 books in Córdoba', fact: 'One of the most important intellectual figures in Al-Andalus' },
    { id: 'sutayta', name: 'Sutayta al-Mahamali', era: '10th century', field: 'Mathematics, Law', contribution: 'Expert in algebra, arithmetic, and inheritance law calculations', fact: 'Her mathematical skills were used to solve complex legal inheritance cases' },
    { id: 'shuhda', name: 'Shuhda the Writer', era: '1089-1178 CE', field: 'Hadith, Calligraphy', contribution: 'Taught hadith to large classes in Baghdad, including eminent scholars', students: ['Ibn al-Jawzi', 'Ibn Qudamah'], fact: 'Called "Fakhr al-Nisa" (Pride of Women) for her scholarship' },
];

// --- Components ---

const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🕌</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">📜</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float">⚗️</div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <div className="flex justify-center mb-6">
                <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Divine Wisdom
                </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>🌍</span> 1,400 Years of History
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Islamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Legacy</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Discover How Islamic Civilization Shaped the World
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                Journey through the lives of prophets, the Golden Age of science, the spread of knowledge, and lessons from 1,400 years of history.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-amber-400">25</span>
                    <span className="text-white/80 ml-2">Prophets</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-emerald-400">500+</span>
                    <span className="text-white/80 ml-2">Years</span>
                    <span className="text-white/60 text-xs block">of Golden Age</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-blue-400">3</span>
                    <span className="text-white/80 ml-2">Continents</span>
                    <span className="text-white/60 text-xs block">in 100 years</span>
                </div>
            </div>
        </div>
    </div>
));

const TabNavigation: React.FC<{ activeTab: TabId; onTabChange: (id: TabId) => void }> = memo(({ activeTab, onTabChange }) => (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 -mt-6 relative z-20 px-4 max-w-4xl mx-auto">
        {[
            { id: 'intro' as TabId, label: 'Introduction', icon: '📖' },
            { id: 'prophets' as TabId, label: 'Prophets', icon: '🌙' },
            { id: 'science' as TabId, label: 'Golden Age', icon: '⚗️' },
            { id: 'history' as TabId, label: 'Empires', icon: '🏛️' },
            { id: 'culture' as TabId, label: 'Culture', icon: '🎨' },
            { id: 'lessons' as TabId, label: 'Lessons', icon: '💡' },
        ].map((tab, idx, arr) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                    px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2
                    ${idx === arr.length - 1 ? 'col-span-2 md:col-span-1' : ''}
                    ${activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                `}
            >
                <span>{tab.icon}</span>
                {tab.label}
            </button>
        ))}
    </div>
));

// --- Introduction Section ---
const IntroductionSection: React.FC = memo(() => (
    <div className="animate-fade-in space-y-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                The Rich Tapestry of Islamic History
            </h2>

            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="text-lg mb-6">
                    Islamic civilization is one of the most influential in human history. Beginning with the revelation of the Quran to Prophet Muhammad ﷺ in 610 CE, Islam transformed the Arabian Peninsula and, within just <strong>100 years</strong>, spread across three continents—from Spain to China.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-500/20">
                        <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-3 flex items-center gap-2">
                            <span>🌍</span> Global Impact
                        </h3>
                        <p className="text-sm">
                            At its peak, the Islamic world was home to the most advanced hospitals, universities, and libraries on Earth. Muslim scholars preserved and enhanced Greek, Persian, and Indian knowledge that would have otherwise been lost.
                        </p>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20">
                        <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                            <span>📚</span> Knowledge Legacy
                        </h3>
                        <p className="text-sm">
                            Words like algebra, algorithm, chemistry, and admiral come from Arabic. The numbers you use daily (1, 2, 3...) are called "Arabic numerals" because Muslims introduced them to Europe.
                        </p>
                    </div>
                </div>

                <p>
                    This page will take you on a journey through time—from the first humans to the modern era—exploring prophetic wisdom, scientific breakthroughs, and the rise and fall of great empires.
                </p>
            </div>
        </div>

        {/* Timeline Preview - Always Dark Theme */}
        <div className="rounded-3xl p-8 shadow-xl" style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)' }}>
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#ffffff' }}>Key Moments in History</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {TIMELINE_EVENTS.map((event, idx) => (
                    <div key={idx} className="flex-shrink-0 w-48 rounded-xl p-4 border hover:opacity-90 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                        <span className="text-xs font-bold" style={{ color: '#fbbf24' }}>{event.year}</span>
                        <h4 className="font-bold mt-1 mb-2 text-sm" style={{ color: '#ffffff' }}>{event.title}</h4>
                        <p className="text-xs" style={{ color: '#cbd5e1' }}>{event.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
));

// --- Prophets Section ---
const ProphetsSection: React.FC = memo(() => {
    const [selectedProphet, setSelectedProphet] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
    const [eraFilter, setEraFilter] = useState<string>('All');

    const eras = ['All', 'Ancient', '~3000 BCE', '~2000 BCE', '~1400 BCE', '~1000 BCE', '~1 CE', '570-632 CE'];

    const filteredProphets = eraFilter === 'All'
        ? PROPHETS
        : PROPHETS.filter(p => p.era.includes(eraFilter.replace('~', '')));

    const selectedProphetData = PROPHETS.find(p => p.id === selectedProphet);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Lives of the Prophets</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    All 25 prophets mentioned in the Quran—from Adam (the first human) to Muhammad ﷺ (the final messenger). Click any prophet to explore their story.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-white/5">
                {/* View Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}
                    >
                        🔲 Grid
                    </button>
                    <button
                        onClick={() => setViewMode('timeline')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'timeline' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}
                    >
                        📅 Timeline
                    </button>
                </div>

                {/* Era Filter */}
                <div className="flex flex-wrap gap-2">
                    {['All', 'Ancient', '2000 BCE', '1000 BCE'].map(era => (
                        <button
                            key={era}
                            onClick={() => setEraFilter(era)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${eraFilter === era ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}
                        >
                            {era}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredProphets.map(prophet => (
                        <div
                            key={prophet.id}
                            onClick={() => setSelectedProphet(prophet.id)}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all text-center group"
                        >
                            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                                {prophet.name === 'Muhammad ﷺ' ? '☪️' : '🌙'}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{prophet.name}</h3>
                            <p className="text-lg text-amber-600 font-arabic">{prophet.arabic}</p>
                            <p className="text-xs text-slate-400 mt-2">{prophet.trait}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-indigo-500 rounded-full hidden md:block"></div>

                    <div className="space-y-4">
                        {filteredProphets.map((prophet, idx) => (
                            <div
                                key={prophet.id}
                                onClick={() => setSelectedProphet(prophet.id)}
                                className={`relative flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 cursor-pointer group`}
                            >
                                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900 hidden md:block z-10 group-hover:scale-150 transition-transform"></div>

                                <div className={`flex-1 ${idx % 2 === 0 ? 'md:pr-6 md:text-right' : 'md:pl-6'}`}>
                                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-white/5 shadow hover:shadow-lg transition-all">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{prophet.name === 'Muhammad ﷺ' ? '☪️' : '🌙'}</span>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 dark:text-white">{prophet.name}</h3>
                                                <span className="text-xs text-slate-400">{prophet.era}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Prophet Detail Modal */}
            {selectedProphetData && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProphet(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl">
                                    {selectedProphetData.name === 'Muhammad ﷺ' ? '☪️' : '🌙'}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProphetData.name}</h2>
                                    <p className="text-3xl text-amber-600 font-arabic">{selectedProphetData.arabic}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProphet(null)}
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Info Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Era</span>
                                <p className="text-slate-900 dark:text-white font-bold">{selectedProphetData.era}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
                                <p className="text-slate-900 dark:text-white font-bold">{selectedProphetData.location}</p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>📜</span> Mission
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">{selectedProphetData.mission}</p>
                        </div>

                        {/* Miracle */}
                        {selectedProphetData.miracle && (
                            <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/20">
                                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                                    <span>✨</span> Miracle
                                </h3>
                                <p className="text-purple-700 dark:text-purple-300">{selectedProphetData.miracle}</p>
                            </div>
                        )}

                        {/* Key Trait */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>💎</span> Key Character Trait
                            </h3>
                            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-bold">
                                {selectedProphetData.trait}
                            </span>
                        </div>

                        {/* Lesson */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-500/20">
                            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                                <span>💡</span> Lesson for Today
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-300">{selectedProphetData.lesson}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Banner */}
            <div className="text-center bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                <p className="font-bold text-lg">
                    <span className="text-3xl mr-2">📖</span>
                    Showing {filteredProphets.length} of 25 Prophets • Click any prophet to explore their full story
                </p>
            </div>
        </div>
    );
});

// --- Science Section ---
const ScienceSection: React.FC = memo(() => {
    const [selectedScientist, setSelectedScientist] = useState<string | null>(null);
    const [fieldFilter, setFieldFilter] = useState<string>('All');
    const [houseTab, setHouseTab] = useState<'translation' | 'library' | 'observatory'>('translation');

    const fields = ['All', 'Mathematics', 'Medicine', 'Chemistry', 'Physics', 'Engineering', 'Philosophy'];

    const filteredScientists = fieldFilter === 'All'
        ? SCIENTISTS
        : SCIENTISTS.filter(s => s.field.includes(fieldFilter));

    const selectedScientistData = SCIENTISTS.find(s => s.id === selectedScientist);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Golden Age of Science</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    From the 8th to 14th century, Muslim scholars led the world. Click any scientist to explore their full story.
                </p>
            </div>

            {/* Field Filter */}
            <div className="flex flex-wrap justify-center gap-2">
                {fields.map(field => (
                    <button
                        key={field}
                        onClick={() => setFieldFilter(field)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${fieldFilter === field ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                    >
                        {field}
                    </button>
                ))}
            </div>

            {/* Scientist Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredScientists.map(scientist => (
                    <div
                        key={scientist.id}
                        onClick={() => setSelectedScientist(scientist.id)}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-white/5 shadow-lg cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-3xl group-hover:scale-110 transition-transform">{scientist.icon}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                                {scientist.field.split('/')[0]}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{scientist.name}</h3>
                        {scientist.arabicName && <p className="text-sm text-amber-600 font-arabic mb-2">{scientist.arabicName}</p>}
                        <p className="text-xs text-slate-500">{scientist.era}</p>
                    </div>
                ))}
            </div>

            {/* Scientist Detail Modal */}
            {selectedScientistData && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedScientist(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl">
                                    {selectedScientistData.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedScientistData.name}</h2>
                                    {selectedScientistData.arabicName && <p className="text-xl text-amber-600 font-arabic">{selectedScientistData.arabicName}</p>}
                                    <p className="text-sm text-slate-500">{selectedScientistData.era}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedScientist(null)}
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Contribution */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>🏆</span> Major Contribution
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">{selectedScientistData.contribution}</p>
                        </div>

                        {/* Quote */}
                        {selectedScientistData.quote && (
                            <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
                                <p className="italic text-amber-800 dark:text-amber-300">"{selectedScientistData.quote}"</p>
                            </div>
                        )}

                        {/* Books */}
                        {selectedScientistData.books && selectedScientistData.books.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span>📚</span> Famous Works
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedScientistData.books.map((book, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300">
                                            {book}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Modern Legacy */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>🌍</span> Modern Legacy
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">{selectedScientistData.legacy}</p>
                        </div>

                        {/* Fun Fact */}
                        {selectedScientistData.funFact && (
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/20">
                                <h3 className="text-sm font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-2">
                                    <span>💡</span> Fun Fact
                                </h3>
                                <p className="text-purple-700 dark:text-purple-300 text-sm">{selectedScientistData.funFact}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* House of Wisdom Virtual Tour */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/geometric.svg')] opacity-10"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <span className="text-5xl mb-4 block">🏛️</span>
                        <h3 className="text-3xl font-bold mb-2">The House of Wisdom</h3>
                        <p className="text-white/70">Baghdad, 830 CE — The Greatest Library in the World</p>
                    </div>

                    {/* Tour Tabs */}
                    <div className="flex justify-center gap-3 mb-6">
                        {[
                            { id: 'translation' as const, label: 'Translation Chamber', icon: '📜' },
                            { id: 'library' as const, label: 'Grand Library', icon: '📚' },
                            { id: 'observatory' as const, label: 'Observatory', icon: '🔭' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setHouseTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${houseTab === tab.id ? 'bg-white text-indigo-600' : 'bg-white/20 hover:bg-white/30'}`}
                            >
                                <span className="mr-2">{tab.icon}</span>{tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tour Content */}
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                        {houseTab === 'translation' && (
                            <div className="text-center animate-fade-in">
                                <p className="text-lg mb-4">Scholars of all faiths—Muslim, Christian, Jewish—worked side by side translating Greek, Persian, and Sanskrit texts into Arabic.</p>
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-white/10 rounded-xl p-3">
                                        <p className="text-2xl mb-1">🇬🇷</p>
                                        <p className="text-xs">Greek → Arabic</p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-3">
                                        <p className="text-2xl mb-1">🇮🇳</p>
                                        <p className="text-xs">Sanskrit → Arabic</p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-3">
                                        <p className="text-2xl mb-1">🇮🇷</p>
                                        <p className="text-xs">Persian → Arabic</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {houseTab === 'library' && (
                            <div className="text-center animate-fade-in">
                                <p className="text-lg mb-4">Housed over 400,000 manuscripts—more books than all of Europe combined at that time.</p>
                                <div className="flex justify-center gap-6 mt-6">
                                    <div>
                                        <p className="text-4xl font-bold">400K+</p>
                                        <p className="text-xs text-white/70">Manuscripts</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-bold">500+</p>
                                        <p className="text-xs text-white/70">Scholars</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-bold">100+</p>
                                        <p className="text-xs text-white/70">Years Active</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {houseTab === 'observatory' && (
                            <div className="text-center animate-fade-in">
                                <p className="text-lg mb-4">Astronomers mapped the stars, calculated the Earth's circumference, and refined planetary models.</p>
                                <div className="flex justify-center gap-4 mt-6">
                                    <span className="px-4 py-2 rounded-full bg-white/20 text-sm">Star Charts</span>
                                    <span className="px-4 py-2 rounded-full bg-white/20 text-sm">Astrolabes</span>
                                    <span className="px-4 py-2 rounded-full bg-white/20 text-sm">Planetary Tables</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-500/20">
                <p className="text-emerald-800 dark:text-emerald-300 font-bold">
                    <span className="text-3xl mr-2">⚗️</span>
                    Showing {filteredScientists.length} of {SCIENTISTS.length} scholars • Click to explore their discoveries
                </p>
            </div>
        </div>
    );
});

// --- Empires Section ---
const EmpiresSection: React.FC = memo(() => {
    const [selectedEmpire, setSelectedEmpire] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

    const selectedEmpireData = EMPIRES.find(e => e.id === selectedEmpire);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Great Islamic Empires</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    From the Rashidun Caliphate to the Ottoman Empire, Islamic states shaped world history for over 1,300 years. Click any empire to explore.
                </p>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center">
                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'cards' ? 'bg-indigo-500 text-white' : 'text-slate-500'}`}
                    >
                        🏛️ Cards
                    </button>
                    <button
                        onClick={() => setViewMode('timeline')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'timeline' ? 'bg-indigo-500 text-white' : 'text-slate-500'}`}
                    >
                        📅 Timeline
                    </button>
                </div>
            </div>

            {/* Cards View */}
            {viewMode === 'cards' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EMPIRES.map((empire, idx) => (
                        <div
                            key={empire.id}
                            onClick={() => setSelectedEmpire(empire.id)}
                            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                        >
                            <div className={`h-2 bg-gradient-to-r ${empire.color}`}></div>
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${empire.color} flex items-center justify-center text-xl font-bold text-white group-hover:scale-110 transition-transform`}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{empire.name}</h3>
                                        <span className="text-xs text-slate-500">{empire.era}</span>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{empire.achievement}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>📍 {empire.capital}</span>
                                    <span>📐 {empire.expansion}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
                <div className="relative">
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-indigo-500 to-blue-500 rounded-full"></div>

                    <div className="space-y-8">
                        {EMPIRES.map((empire, idx) => (
                            <div
                                key={empire.id}
                                onClick={() => setSelectedEmpire(empire.id)}
                                className={`relative flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 cursor-pointer group`}
                            >
                                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${empire.color} border-4 border-white dark:border-slate-900 shadow-lg z-10 group-hover:scale-150 transition-transform`}></div>

                                <div className={`flex-1 ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all">
                                        <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${empire.color} text-white text-xs font-bold mb-2`}>
                                            {empire.era}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{empire.name}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{empire.achievement}</p>
                                    </div>
                                </div>
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empire Detail Modal */}
            {selectedEmpireData && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedEmpire(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={`-mx-8 -mt-8 p-6 bg-gradient-to-r ${selectedEmpireData.color} text-white mb-6 rounded-t-3xl`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedEmpireData.name}</h2>
                                    <p className="text-white/80">{selectedEmpireData.era}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedEmpire(null)}
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capital</span>
                                <p className="text-slate-900 dark:text-white font-bold">{selectedEmpireData.capital}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Territory</span>
                                <p className="text-slate-900 dark:text-white font-bold">{selectedEmpireData.expansion}</p>
                            </div>
                        </div>

                        {/* Achievement */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>🏆</span> Key Achievement
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">{selectedEmpireData.achievement}</p>
                        </div>

                        {/* Key Figures */}
                        {selectedEmpireData.keyFigures && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span>👑</span> Key Figures
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmpireData.keyFigures.map((figure, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold">
                                            {figure}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Architecture */}
                        {selectedEmpireData.architecture && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span>🕌</span> Architectural Legacy
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmpireData.architecture.map((building, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm">
                                            {building}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Decline */}
                        {selectedEmpireData.decline && (
                            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 border border-rose-200 dark:border-rose-500/20">
                                <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-2">
                                    <span>📉</span> Decline & Lessons
                                </h3>
                                <p className="text-rose-700 dark:text-rose-300 text-sm">{selectedEmpireData.decline}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="text-center bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-500/20">
                <p className="text-indigo-800 dark:text-indigo-300 font-bold">
                    <span className="text-3xl mr-2">🏛️</span>
                    1,300+ years of Islamic governance • Click any empire to explore its legacy
                </p>
            </div>
        </div>
    );
});

// --- Culture Section ---
const CultureSection: React.FC = memo(() => {
    const [activeSubTab, setActiveSubTab] = useState<'art' | 'architecture' | 'women'>('art');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Islamic Culture & Heritage</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    From stunning calligraphy to awe-inspiring mosques to women scholars—explore the rich cultural tapestry of Islamic civilization.
                </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex justify-center gap-3">
                {[
                    { id: 'art' as const, label: 'Islamic Art', icon: '🎨' },
                    { id: 'architecture' as const, label: 'Architecture', icon: '🕌' },
                    { id: 'women' as const, label: 'Women Scholars', icon: '👩‍🎓' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveSubTab(tab.id); setSelectedItem(null); }}
                        className={`px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeSubTab === tab.id ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </div>

            {/* Islamic Art */}
            {activeSubTab === 'art' && (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ISLAMIC_ART.map(art => (
                            <div
                                key={art.id}
                                onClick={() => setSelectedItem(selectedItem === art.id ? null : art.id)}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {art.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white">{art.name}</h3>
                                        <p className="text-sm text-pink-600 font-arabic">{art.arabicName}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{art.description}</p>

                                {selectedItem === art.id && (
                                    <div className="animate-fade-in space-y-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Examples</p>
                                            <div className="flex flex-wrap gap-2">
                                                {art.examples.map((ex, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs">{ex}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                                            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-1">Significance</p>
                                            <p className="text-sm text-amber-800 dark:text-amber-300">{art.significance}</p>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-3 text-xs text-slate-400 text-center">
                                    {selectedItem === art.id ? '▲ Tap to collapse' : '▼ Tap to learn more'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Architecture */}
            {activeSubTab === 'architecture' && (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ISLAMIC_ARCHITECTURE.map(building => (
                            <div
                                key={building.id}
                                onClick={() => setSelectedItem(selectedItem === building.id ? null : building.id)}
                                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className={`h-2 bg-gradient-to-r ${building.color}`}></div>
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${building.color} flex items-center justify-center text-xl font-bold text-white group-hover:scale-110 transition-transform`}>
                                            🕌
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white">{building.name}</h3>
                                            <p className="text-xs text-slate-500">{building.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{building.description}</p>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span>📅 {building.era}</span>
                                        <span>🏛️ {building.style}</span>
                                    </div>

                                    {selectedItem === building.id && (
                                        <div className="animate-fade-in mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Features</p>
                                            <div className="flex flex-wrap gap-2">
                                                {building.features.map((feat, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs">{feat}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <p className="mt-3 text-xs text-slate-400 text-center">
                                        {selectedItem === building.id ? '▲ Collapse' : '▼ See features'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Women Scholars */}
            {activeSubTab === 'women' && (
                <div className="space-y-6">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/20 mb-6">
                        <p className="text-purple-800 dark:text-purple-300 text-center">
                            <span className="text-2xl mr-2">📖</span>
                            Women have been scholars, teachers, and pioneers throughout Islamic history. Here are just a few of the countless women who shaped our tradition.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {WOMEN_SCHOLARS.map(scholar => (
                            <div
                                key={scholar.id}
                                onClick={() => setSelectedItem(selectedItem === scholar.id ? null : scholar.id)}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        👩‍🎓
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white">{scholar.name}</h3>
                                        <p className="text-xs text-slate-500">{scholar.era}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold">
                                            {scholar.field}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{scholar.contribution}</p>

                                {selectedItem === scholar.id && (
                                    <div className="animate-fade-in space-y-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        {scholar.students && (
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Notable Students</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {scholar.students.map((s, idx) => (
                                                        <span key={idx} className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
                                            <p className="text-xs font-bold text-pink-700 dark:text-pink-400 uppercase mb-1">💡 Did You Know?</p>
                                            <p className="text-sm text-pink-800 dark:text-pink-300">{scholar.fact}</p>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-3 text-xs text-slate-400 text-center">
                                    {selectedItem === scholar.id ? '▲ Tap to collapse' : '▼ Tap to learn more'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="text-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
                <p className="font-bold text-lg">
                    <span className="text-3xl mr-2">🎨</span>
                    {activeSubTab === 'art' ? `${ISLAMIC_ART.length} Art Forms` : activeSubTab === 'architecture' ? `${ISLAMIC_ARCHITECTURE.length} Landmarks` : `${WOMEN_SCHOLARS.length} Pioneers`} • Islamic civilization's cultural heritage lives on
                </p>
            </div>
        </div>
    );
});

// --- Lessons Section ---
const LessonsSection: React.FC = memo(() => {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'rise' | 'fall' | 'wisdom'>('all');
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

    const filteredLessons = selectedCategory === 'all'
        ? HISTORY_LESSONS
        : HISTORY_LESSONS.filter(l => l.category === selectedCategory);

    const categoryColors = {
        rise: 'from-emerald-400 to-teal-500',
        fall: 'from-rose-400 to-red-500',
        wisdom: 'from-amber-400 to-orange-500',
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Lessons from History</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    History is not just about the past—it's a teacher for the present and guide for the future. Click any lesson to explore more deeply.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-3">
                {[
                    { id: 'all' as const, label: 'All Lessons', icon: '📚' },
                    { id: 'rise' as const, label: 'Rise to Greatness', icon: '📈' },
                    { id: 'fall' as const, label: 'Causes of Decline', icon: '📉' },
                    { id: 'wisdom' as const, label: 'Timeless Wisdom', icon: '💎' },
                ].map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                    >
                        <span className="mr-1">{cat.icon}</span> {cat.label}
                    </button>
                ))}
            </div>

            {/* Lesson Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredLessons.map(item => (
                    <div
                        key={item.id}
                        onClick={() => setExpandedLesson(expandedLesson === item.id ? null : item.id)}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[item.category]} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0`}>
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.category === 'rise' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : item.category === 'fall' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                        {item.category === 'rise' ? '📈 Rise' : item.category === 'fall' ? '📉 Fall' : '💎 Wisdom'}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{item.lesson}</p>

                                {expandedLesson === item.id && (
                                    <div className="animate-fade-in space-y-4">
                                        {/* Quranic Reference */}
                                        {item.quranicRef && (
                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border-l-4 border-indigo-500">
                                                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-1">📖 Quranic Guidance</p>
                                                <p className="text-indigo-800 dark:text-indigo-300 italic text-sm">{item.quranicRef}</p>
                                            </div>
                                        )}

                                        {/* Historical Example */}
                                        {item.historicalExample && (
                                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">📜 Historical Example</p>
                                                <p className="text-slate-700 dark:text-slate-300 text-sm">{item.historicalExample}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Apply Today */}
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-500/20 mt-4">
                                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">✅ Apply Today</p>
                                    <p className="text-sm text-emerald-800 dark:text-emerald-300">{item.application}</p>
                                </div>

                                <div className="mt-3 text-xs text-slate-400 text-center">
                                    {expandedLesson === item.id ? '▲ Tap to collapse' : '▼ Tap to expand'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rise & Fall Pattern */}
            <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)' }}>
                <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#ffffff' }}>The Pattern of Rise and Fall</h3>
                <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                    {[
                        { icon: '📚', label: 'Knowledge' },
                        { icon: '→', label: '' },
                        { icon: '⚖️', label: 'Justice' },
                        { icon: '→', label: '' },
                        { icon: '🤝', label: 'Unity' },
                        { icon: '→', label: '' },
                        { icon: '🏛️', label: 'Prosperity' },
                        { icon: '→', label: '' },
                        { icon: '💰', label: 'Luxury' },
                        { icon: '→', label: '' },
                        { icon: '🪞', label: 'Pride' },
                        { icon: '→', label: '' },
                        { icon: '📉', label: 'Decline' },
                    ].map((step, idx) => (
                        <div key={idx} className={step.label ? 'text-center' : ''}>
                            <span className={step.label ? 'text-2xl' : ''} style={{ color: step.label ? '#ffffff' : '#64748b' }}>{step.icon}</span>
                            {step.label && <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{step.label}</p>}
                        </div>
                    ))}
                </div>
                <p className="text-center mt-6 text-sm" style={{ color: '#94a3b8' }}>
                    This pattern repeated across the Umayyads, Abbasids, Al-Andalus, and the Ottomans.
                </p>
            </div>

            {/* Stats */}
            <div className="text-center bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-500/20">
                <p className="text-amber-800 dark:text-amber-300 font-bold">
                    <span className="text-3xl mr-2">💡</span>
                    {filteredLessons.length} lessons • Click any lesson to see Quranic guidance and historical examples
                </p>
            </div>
        </div>
    );
});

/**
 * Islamic Legacy Page
 */
const IslamicLegacyPage: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<TabId>('intro');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Tab order for keyboard navigation
    const tabOrder: TabId[] = ['intro', 'prophets', 'science', 'history', 'culture', 'lessons'];

    // Handle tab change with scroll to top
    const handleTabChange = useCallback((tab: TabId) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const currentIndex = tabOrder.indexOf(activeTab);
                if (e.key === 'ArrowRight' && currentIndex < tabOrder.length - 1) {
                    handleTabChange(tabOrder[currentIndex + 1]);
                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    handleTabChange(tabOrder[currentIndex - 1]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, handleTabChange]);

    // Scroll-to-top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 overflow-x-hidden">
            <HeroSection />
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="container mx-auto px-6 mt-10">
                {activeTab === 'intro' && <IntroductionSection />}
                {activeTab === 'prophets' && <ProphetsSection />}
                {activeTab === 'science' && <ScienceSection />}
                {activeTab === 'history' && <EmpiresSection />}
                {activeTab === 'culture' && <CultureSection />}
                {activeTab === 'lessons' && <LessonsSection />}
            </div>

            {/* Floating Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:scale-110 transition-transform z-40 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}

            {/* Keyboard Navigation Hint */}
            <div className="fixed bottom-6 left-6 hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 text-slate-400 text-xs backdrop-blur-sm border border-slate-700 z-40">
                <span>Use</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-700 text-slate-300">←</kbd>
                <kbd className="px-2 py-0.5 rounded bg-slate-700 text-slate-300">→</kbd>
                <span>to navigate tabs</span>
            </div>
        </div>
    );
});

IslamicLegacyPage.displayName = 'IslamicLegacyPage';

export default IslamicLegacyPage;
