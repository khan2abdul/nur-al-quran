
export interface TimelineEvent {
    year: string;
    ceYear?: string;
    type: 'life' | 'revelation' | 'persecution' | 'migration' | 'milestone';
    title: string;
    description: string;
    details?: string[];
    quranRef?: string;
    location?: string;
    outcome?: string;
}

export const MECCAN_TIMELINE: TimelineEvent[] = [
    {
        year: '570 CE',
        ceYear: 'Year of Elephant',
        type: 'life',
        title: 'Birth of the Prophet ﷺ',
        description: 'Born in Mecca to Aminah bint Wahb. His father Abdullah had passed away months prior. This year is known as the Year of the Elephant due to Abraha\'s failed attack on the Kaaba.',
        details: [
            'Born on 12th Rabi al-Awwal (widely accepted).',
            'Nursed by Halimah al-Sa\'diyah in the desert.',
            'Divine protection saved Mecca from Abraha\'s army.'
        ],
        quranRef: 'Surah Al-Fil (105)',
        location: 'Mecca'
    },
    {
        year: '576 CE',
        ceYear: 'Age 6',
        type: 'life',
        title: 'Loss of Mother',
        description: 'While returning from a visit to Madinah, his mother Aminah falls ill and passes away at Abwa. The Prophet ﷺ returns to Mecca with his nurse Barakah (Umm Ayman).',
        details: [
            'Becomes an orphan of both parents.',
            'Grandfather Abd al-Muttalib takes custody.'
        ],
        location: 'Abwa'
    },
    {
        year: '578 CE',
        ceYear: 'Age 8',
        type: 'life',
        title: 'Under Abu Talib\'s Care',
        description: 'Grandfather Abd al-Muttalib passes away. Before his death, he entrusts the care of Muhammad ﷺ to his son, Abu Talib.',
        details: [
            'Abu Talib loves him more than his own children.',
            'Accompanies uncle on trade journeys.'
        ],
        location: 'Mecca'
    },
    {
        year: '595 CE',
        ceYear: 'Age 25',
        type: 'life',
        title: 'Marriage to Khadijah (RA)',
        description: 'Impressed by his honesty ("Al-Amin") in managing her trade caravan, the wealthy merchant Khadijah bint Khuwaylid proposes marriage.',
        details: [
            'A blessed union lasting 25 years.',
            'The Prophet ﷺ never married another while she was alive.',
            'Father of all his surviving children.'
        ],
        location: 'Mecca'
    },
    {
        year: '605 CE',
        ceYear: 'Age 35',
        type: 'milestone',
        title: 'The Black Stone Incident',
        description: 'Quraysh rebuild the Kaaba but dispute over who places the Black Stone. The Prophet ﷺ proposes a solution that prevents tribal war.',
        details: [
            'Placed the stone on a cloth.',
            'Representatives from all tribes lifted it together.',
            'He placed it in the corner with his own hands.'
        ],
        location: 'Kaaba'
    },
    {
        year: '610 CE',
        ceYear: 'Age 40',
        type: 'revelation',
        title: 'The First Revelation',
        description: 'In the seclusion of Cave Hira, Angel Jibril appears with the first command: "Read!". The era of Prophethood begins.',
        details: [
            'Occurred during Ramadan (Laylat al-Qadr).',
            'Khadijah (RA) comforts him and takes him to Waraqah ibn Nawfal.',
            'Waraqah confirms he is the Prophet of this nation.'
        ],
        quranRef: 'Surah Al-Alaq (96:1-5)',
        location: 'Cave Hira'
    },
    {
        year: '613 CE',
        ceYear: 'Age 43',
        type: 'revelation',
        title: 'Public Preaching Begins',
        description: 'After 3 years of secret invitation, Allah commands: "Warn your closest kinsmen." The Prophet ﷺ climbs Mount Safa to declare the message openly.',
        details: [
            'Abu Lahab curses the Prophet ﷺ.',
            'Revelation of Surah Al-Masad regarding Abu Lahab.',
            'Persecution of new Muslims begins.'
        ],
        quranRef: 'Surah Al-Hijr (15:94)',
        location: 'Mount Safa'
    },
    {
        year: '615 CE',
        ceYear: '5th Year of Prophethood',
        type: 'migration',
        title: 'Migration to Abyssinia',
        description: 'To escape severe torture, a group of Muslims migrates to Abyssinia (Ethiopia) seeking the protection of the just Christian King, Negus.',
        details: [
            'First Hijra in Islam.',
            'Ja\'far ibn Abi Talib defends Islam in the royal court.',
            'King Negus weeps upon hearing Surah Maryam and grants protection.'
        ],
        location: 'Abyssinia'
    },
    {
        year: '616 CE',
        ceYear: '6th Year of Prophethood',
        type: 'milestone',
        title: 'Strength through Umar (RA)',
        description: 'Hamza ibn Abdul Muttalib and Umar ibn al-Khattab accept Islam. Their conversion allows Muslims to pray openly at the Kaaba for the first time.',
        details: [
            'Umar was on his way to kill the Prophet ﷺ but was stopped by the Quran.',
            'Muslims march in two rows to the Kaaba.'
        ],
        outcome: 'Morale boost for Muslims'
    },
    {
        year: '617 CE',
        ceYear: '7th Year of Prophethood',
        type: 'persecution',
        title: 'The Social Boycott',
        description: 'Quraysh enforces a total ban on Banu Hashim. No food, marriage, or trade allowed. The clan is confined to the Valley of Abu Talib for 3 years.',
        details: [
            'Muslims and Banu Hashim suffer extreme starvation.',
            ' cries of children heard throughout Mecca.',
            'Boycott ends when termites eat the document.'
        ],
        location: 'Shi\'b Abi Talib'
    },
    {
        year: '619 CE',
        ceYear: 'Year of Sorrow',
        type: 'persecution',
        title: 'The Year of Sorrow (Aam al-Huzn)',
        description: 'In one year, the Prophet ﷺ loses his two greatest supporters: his beloved wife Khadijah (RA) and his protecting uncle Abu Talib.',
        details: [
            'Loss of emotional support (Khadijah).',
            'Loss of socio-political protection (Abu Talib).',
            'Persecution intensifies significantly.'
        ]
    },
    {
        year: '620 CE',
        ceYear: 'Age 50',
        type: 'persecution',
        title: 'The Trial of Ta\'if',
        description: 'Seeking a new base for Islam, the Prophet ﷺ travels to Ta\'if but is brutally rejected and stoned by the people.',
        details: [
            'Angel of Mountains offers to crush the city.',
            'Prophet ﷺ refuses and prays for their descendants.',
            'Refuge in the garden of Utbah and Shaybah.'
        ],
        location: 'Ta\'if'
    },
    {
        year: '620 CE',
        ceYear: 'Late 620',
        type: 'revelation',
        title: 'Isra and Mi\'raj',
        description: 'The Night Journey from Mecca to Jerusalem, and the Ascension to the Heavens. A divine gift to comfort the Prophet ﷺ after the Year of Sorrow.',
        details: [
            'Led all Prophets in prayer at Al-Aqsa.',
            'Ascended 7 heavens and spoke to Allah.',
            'Five daily prayers ordained.'
        ],
        quranRef: 'Surah Al-Isra (17:1)',
        location: 'Jerusalem / Heavens'
    },
    {
        year: '621-622 CE',
        ceYear: 'Pledges of Aqaba',
        type: 'milestone',
        title: 'The Pledges of Aqaba',
        description: 'Pilgrims from Yathrib (Madinah) meet the Prophet ﷺ secretly and convert to Islam, identifying him as the leader they were waiting for.',
        details: [
            'First Pledge (621): 12 men pledge allegiance.',
            'Second Pledge (622): 75 people invite Prophet to Madinah.',
            'Mus\'ab ibn Umayr sent as first ambassador.'
        ],
        location: 'Aqaba, Mina'
    },
    {
        year: '622 CE',
        ceYear: 'The Migration',
        type: 'migration',
        title: 'The Hijra to Madinah',
        description: 'Following a divine command and an assassination plot by Quraysh, the Prophet ﷺ migrates to Madinah with Abu Bakr (RA).',
        details: [
            'Ali (RA) sleeps in Prophet\'s bed as decoy.',
            'Three days hiding in Cave Thawr.',
            'Arrival in Quba and building first Masjid.',
            'Grand welcome in Madinah: "Tala al Badru Alayna".'
        ],
        outcome: 'End of Meccan Period, Start of Islamic Calendar (1 AH)',
        location: 'Mecca to Madinah'
    }
];
