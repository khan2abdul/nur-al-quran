import { FiqhIssue } from '../fiqhData';

export const COMPREHENSIVE_MADHAB_ISSUES: FiqhIssue[] = [
    // --- WORSHIP ---
    {
        id: 'raising-hands',
        title: 'Raising hands in prayer (Raf al-Yadayn)',
        category: 'Worship',
        agreementIndex: 'significant',
        hanafi: { ruling: 'Only at Takbir al-Ihram.', reasoning: 'Tranquility in prayer; practice of many Sahaba.' },
        maliki: { ruling: 'Preferably only at first Takbir.', reasoning: 'Practice of the people of Madinah.' },
        shafii: { ruling: 'At beginning, before/after Ruku, and rising from 2nd rakah.', reasoning: 'Numerous authentic hadiths.' },
        hanbali: { ruling: 'At beginning, before/after Ruku.', reasoning: 'Adherence to literal hadith commands.' }
    },
    {
        id: 'ameen-aloud',
        title: 'Saying "Ameen" aloud in congregational prayer',
        category: 'Worship',
        agreementIndex: 'significant',
        hanafi: { ruling: 'Silent.', reasoning: 'It is a supplication (dua), and dua is better done silently.' },
        maliki: { ruling: 'Silent.', reasoning: 'Follows early Madinah practice.' },
        shafii: { ruling: 'Aloud.', reasoning: 'Explicit instructions in Sahih hadiths.' },
        hanbali: { ruling: 'Aloud.', reasoning: 'Adherence to prophetic example.' }
    },
    {
        id: 'wudu-touching',
        title: 'Does touching the opposite gender break Wudu?',
        category: 'Worship',
        agreementIndex: 'significant',
        hanafi: { ruling: 'No, unless lustful contact leads to discharge.', reasoning: 'Quranic term "touched" refers to intimacy.' },
        maliki: { ruling: 'Only if touched with desire (lust).', reasoning: 'Interpretation of "touching" as a precursor to intimacy.' },
        shafii: { ruling: 'Yes, any skin-to-skin contact with non-mahram.', reasoning: 'Literal interpretation of Quran 5:6.' },
        hanbali: { ruling: 'Only if with desire.', reasoning: 'Balanced approach to textual evidence.' }
    },
    // --- FOOD ---
    {
        id: 'shellfish',
        title: 'Consumption of shellfish (Shrimp, Crab, Lobster)',
        category: 'Food',
        agreementIndex: 'significant',
        hanafi: { ruling: 'Makruh (Disliked) or Haram.', reasoning: 'Only "Samak" (fish) is permitted; others are sea-vermin.' },
        maliki: { ruling: 'Halal.', reasoning: 'General Quranic permissibility of sea game.' },
        shafii: { ruling: 'Halal.', reasoning: 'Everything from the sea is lawful unless harmful.' },
        hanbali: { ruling: 'Halal.', reasoning: 'Quranic text is general and inclusive.' }
    },
    {
        id: 'stunning',
        title: 'Non-lethal stunning before slaughter',
        category: 'Food',
        agreementIndex: 'minor',
        hanafi: { ruling: 'Permissible if animal is alive at time of cut.', reasoning: 'Ensures animal is slaughtered while living.' },
        maliki: { ruling: 'Permissible if animal is revivable.', reasoning: 'Ensures the "living" condition of Halal slaughter.' },
        shafii: { ruling: 'Permissible if animal is revivable.', reasoning: 'Focus on life at time of Tasmiyah.' },
        hanbali: { ruling: 'Permissible if animal is revivable.', reasoning: 'Focus on legal requirement of life.' }
    },
    // --- FAMILY ---
    {
        id: 'nikah-wali',
        title: 'Marriage of adult woman without a Guardian (Wali)',
        category: 'Social',
        agreementIndex: 'significant',
        hanafi: { ruling: 'Valid if done for an equal (Kufu).', reasoning: 'Prophetic statement: "The widow has more right to herself than her guardian."' },
        maliki: { ruling: 'Invalid without Wali.', reasoning: 'Hadith: "No marriage except with a guardian."' },
        shafii: { ruling: 'Invalid without Wali.', reasoning: 'Hadith: "No marriage except with a guardian."' },
        hanbali: { ruling: 'Invalid without Wali.', reasoning: 'Hadith: "No marriage except with a guardian."' }
    },
    {
        id: 'custody-age',
        title: 'Age of primary custody for mothers',
        category: 'Social',
        agreementIndex: 'significant',
        hanafi: { ruling: 'Boy: 7, Girl: Puberty.', reasoning: 'Children need maternal care until independence/modesty requirements.' },
        maliki: { ruling: 'Boy: Puberty, Girl: Marriage.', reasoning: 'Mothers provide better nurturing for longer periods.' },
        shafii: { ruling: 'Age 7 (then child chooses).', reasoning: 'Focus on child\'s developing discernment.' },
        hanbali: { ruling: 'Age 7 (then child chooses).', reasoning: 'Focus on child\'s developing discernment.' }
    },
];
