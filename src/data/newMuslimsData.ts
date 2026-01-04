
export const SHAHADA_CONTENT = {
    intro: "The Shahada is the first pillar of Islam and your declaration of faith. It is a simple yet profound statement that wipes away all past sins and connects you directly to your Creator.",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ",
    transliteration: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah",
    translation: "I testify that there is no god worthy of worship except Allah, and I testify that Muhammad is the messenger of Allah.",
    meaning: [
        { part: "La ilaha illallah", detail: "There is no deity worthy of worship except Allah. We affirm His Oneness and reject all false gods." },
        { part: "Muhammadan rasulullah", detail: "Muhammad (peace be upon him) is the final Messenger. We choose to follow his guidance and example." }
    ],
    steps: [
        { title: "Preparation", text: "Ensure your heart is sincere. You can take a shower (Ghusl) as a symbolic fresh start, but it's not strictly required for the Shahada itself." },
        { title: "The Declaration", text: "Say the words aloud, with understanding and conviction. You can say them alone or with witnesses." },
        { title: "Afterwards", text: "You are now Muslim! All your past sins are forgiven. Begin your journey with a simple prayer of gratitude." }
    ]
};

export const COMMON_FEARS = [
    { title: "What if my family disowns me?", text: "This is a real fear. Islam honors family bonds. You don't have to cut ties. Be wise, gentle, and give it time. Many families come around when they see positive changes in you." },
    { title: "I don't know Arabic/Prayer yet", text: "You don't need to know everything instantly! Shahada is step one. Learning is a lifelong journey. Allah values your sincere effort." },
    { title: "What if I sin after converting?", text: "You will. Everyone does. Becoming Muslim doesn't make you an angel; it makes you accountable. Allah's mercy is greater than your mistakes. Repent and keep going." },
    { title: "I'm not ready to give up habits", text: "Don't delay the truth because you're not perfect. Accept the faith first, then work on your habits gradually with Allah's help." }
];

export const ISLAM_BASICS = [
    {
        title: "The 6 Beliefs (Iman)",
        items: [
            { label: "Belief in Allah", desc: "The One God, Creator of all." },
            { label: "Belief in Angels", desc: "Beings of light who obey Allah completely." },
            { label: "Belief in Books", desc: "Divine revelations (Torah, Gospel, Psalms, Quran)." },
            { label: "Belief in Prophets", desc: "Messengers sent to guide humanity, from Adam to Muhammad." },
            { label: "Belief in Judgment Day", desc: "Accountability for our actions in this life." },
            { label: "Belief in Destiny (Qadr)", desc: "Allah's knowledge and decree of all things." }
        ]
    },
    {
        title: "The 5 Pillars (Action)",
        items: [
            { label: "Shahada", desc: "Declaration of Faith." },
            { label: "Salah", desc: "5 Daily Prayers connecting you to Allah." },
            { label: "Zakat", desc: "Charity (2.5% of savings) to purify wealth." },
            { label: "Sawm", desc: "Fasting during the month of Ramadan." },
            { label: "Hajj", desc: "Pilgrimage to Mecca once in a lifetime if able." }
        ]
    }
];

export const MYTHS_REALITY = [
    { myth: "You have to change your name", reality: "False. Unless your name has a bad meaning (like 'Servant of an Idol'), you keep your identity." },
    { myth: "You must be perfect overnight", reality: "False. Islam was revealed over 23 years. Take it step by step." },
    { myth: "You must cut off non-Muslim family", reality: "False. You must treat them with even more kindness and respect, unless they harm you." },
    { myth: "You need to be fluent in Arabic", reality: "False. It helps, but thousands of scholars started without knowing a word. Learn the basics for prayer first." }
];

export const RAKAH_GUIDE = [
    { step: 1, name: "Takbir", action: "Raise hands & say 'Allahu Akbar'", desc: "Focus your heart. The prayer begins." },
    { step: 2, name: "Qiyam", action: "Stand & Recite Al-Fatiha", desc: "The opening chapter of the Quran. Essential for every prayer." },
    { step: 3, name: "Ruku", action: "Bow down", desc: "Hands on knees, back straight. Say 'Subhana Rabbiyal Adheem' (Glory to my Lord the Great)." },
    { step: 4, name: "Qiyam", action: "Stand up", desc: "Say 'Sami Allahu liman hamidah' (Allah hears those who praise Him)." },
    { step: 5, name: "Sujood", action: "Prostrate (Face on ground)", desc: "Highest point of humility. Say 'Subhana Rabbiyal A'la' (Glory to my Lord the Most High)." },
    { step: 6, name: "Jalsa", action: "Sit briefly", desc: "Ask for forgiveness: 'Rabbighfir li'." },
    { step: 7, name: "Sujood", action: "Prostrate again", desc: "Same as before. This completes one unit (Raka'h)." }
];

export const PRAYER_STEPS = [
    { name: "Fajr", units: 2, time: "Dawn", steps: ["2 Sunnah (Optional)", "2 Fard (Mandatory)"] },
    { name: "Dhuhr", units: 4, time: "Midday", steps: ["4 Sunnah", "4 Fard", "2 Sunnah"] },
    { name: "Asr", units: 4, time: "Afternoon", steps: ["4 Sunnah", "4 Fard"] },
    { name: "Maghrib", units: 3, time: "Sunset", steps: ["3 Fard", "2 Sunnah"] },
    { name: "Isha", units: 4, time: "Night", steps: ["4 Sunnah", "4 Fard", "2 Sunnah", "3 Witr"] }
];

export const FAMILY_SCRIPTS = {
    direct: {
        title: "The Direct Approach",
        script: "Mom, Dad, I have something important to share. I've been on a spiritual journey, and I've found peace in Islam. I want you to know that I'm still your child, and my faith teaches me to love and respect you even more.",
        tips: ["Choose a calm time.", "Be ready for questions.", "Reassure them of your love."]
    },
    gentle: {
        title: "The Gradual Approach",
        script: "I've been reading a lot about proper belief and connection with God lately. I found that Islamic teachings really resonate with how I feel about the Creator. I'm learning more about it and it's bringing me a lot of discipline and peace.",
        tips: ["Focus on values.", "Don't use 'scary' labels yet.", "Show positive changes in behavior."]
    },
    letter: {
        title: "The Letter/Email",
        script: "Dear Family, I'm writing this because I can express myself better in words. Over the last few months/years, I've been seeking truth... [Explain journey]. I've decided to embrace Islam. This doesn't change who I am to you, except that I strive to be a better person...",
        tips: ["Good for high-conflict families.", "Give them time to process.", "Follow up in person later."]
    }
};

export const COMMON_FAQS = [
    { q: "Do I have to change my name?", a: "No, unless your name has a specifically negative or polytheistic meaning. Your identity is respected." },
    { q: "Do I need to be fluent in Arabic?", a: "No. You learn the basics for prayer gradually. Allah understands all languages." },
    { q: "Can I celebrate holidays with my family?", a: "Yes, you can visit and share food/gifts to maintain ties, as long as you don't participate in religious rituals that contradict Islamic belief." },
    { q: "What if I make mistakes?", a: "You will! Everyone does. Islam is a journey of constant return to Allah. Ask forgiveness and keep going." }
];

export const WUDU_STEPS = [
    { step: 1, action: "Intention & Bismillah", desc: "Intend to purify yourself for prayer and say 'Bismillah'." },
    { step: 2, action: "Hands", desc: "Wash hands up to wrists 3 times, getting between fingers." },
    { step: 3, action: "Mouth & Nose", desc: "Rinse mouth 3 times. Sniff water gently into nose and blow out 3 times." },
    { step: 4, action: "Face", desc: "Wash entire face 3 times (forehead to chin, ear to ear)." },
    { step: 5, action: "Arms", desc: "Wash arms up to and including elbows 3 times (Right then Left)." },
    { step: 6, action: "Head & Ears", desc: "Wipe wet hands over hair (front to back) and wipe inside/behind ears once." },
    { step: 7, action: "Feet", desc: "Wash feet up to and including ankles 3 times (Right then Left)." }
];

export const COMMUNITY_TIPS = {
    greenFlags: ["Patient & Encouraging", "Focuses on Mercy", "Respects your pace", "Practices what they preach"],
    redFlags: ["Judgmental/Critical", "Pressures you to rush", "Obsessed with conspiracy theories", "Makes Islam feel like a burden"]
};

export const FIRST_VISIT_CHECKLIST = [
    "Dress modestly (Loose clothes)",
    "Remove shoes at the entrance",
    "Enter with right foot",
    "Say 'As-salamu alaykum'",
    "Turn off your phone",
    "Don't walk in front of someone praying"
];

export const EMERGENCY_RESOURCES = [
    { title: "Domestic Violence", contact: "Local Shelter / 911" },
    { title: "Muslim Legal Fund", contact: "MLFA.org" },
    { title: "Convert Support", contact: "EmbraceIslam.org" }
];
