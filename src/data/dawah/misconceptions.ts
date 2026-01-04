import { Misconception } from './types';

export const MISCONCEPTIONS: Misconception[] = [
    {
        id: 1,
        category: 'Women',
        claim: 'Islam oppresses women',
        whyItPersists: 'Media bias and cultural practices misattributed to Islam.',
        response: 'Islam gave women rights 1400 years ago: property ownership, marriage refusal, divorce initiation, and inheritance—rights the West didn\'t recognize until the 20th century.',
        script: 'Can you name a specific Islamic teaching you believe oppresses women? Often we find that forced marriage or honor killings are cultural crimes that Islam explicitly forbids.',
        evidence: ['Quran 4:32 (Financial rights)', 'Prophet\'s wife Khadijah (Professional independence)', 'Prophet\'s wife Aisha (Intellectual leadership)']
    },
    {
        id: 2,
        category: 'Violence',
        claim: 'Islam was spread by the sword',
        whyItPersists: 'Conflating imperial expansion with religious conversion.',
        response: 'Indonesia, the largest Muslim nation, was never conquered by a Muslim army. Islam spread there through trade and character.',
        script: 'If Islam was spread by force, how did Jews and Christians thrive in Spain for 700 years under Muslim rule? Forced conversion is explicitly prohibited by the Quran.',
        evidence: ['Quran 2:256 (No compulsion)', 'Historical status of minorities in Al-Andalus', 'Spread of Islam in Southeast Asia']
    },
    {
        id: 3,
        category: 'Science',
        claim: 'Islam is anti-science',
        whyItPersists: 'Ignorance of the Islamic Golden Age.',
        response: 'Muslims pioneered algebra, chemistry, and the scientific method. The first university was founded by a Muslim woman.',
        script: 'Did you know the scientific method itself was developed by Ibn al-Haytham? Islam encourages observation of the natural world as a means to know God.',
        evidence: ['Quran 3:190 (Reflection on nature)', 'Ibn al-Haytham\'s Book of Optics', 'Foundation of Al-Qarawiyyin University']
    },
    {
        id: 4,
        category: 'Quran',
        claim: 'The Quran was written by Muhammad (SAW)',
        whyItPersists: 'Secular historical models that deny revelation.',
        response: 'The Quran contains linguistic miracles and historical/scientific facts unknown to 7th-century Arabs. The Prophet (SAW) was unlettered (Ummi).',
        script: 'If an unlettered man wrote it, why didn\'t the greatest poets of Arabia—who were his enemies—produce something even close to its eloquence when challenged?',
        evidence: ['Quran 2:23 (The Challenge)', 'Prophet\'s illiteracy', 'Preservation of the text']
    },
    {
        id: 5,
        category: 'Sharia',
        claim: 'Sharia law is barbaric and outdated',
        whyItPersists: 'Focusing on penal codes without understanding the objective of justice.',
        response: 'Sharia is a comprehensive ethical framework designed to protect five core interests: Life, Property, Intellect, Religion, and Family/Lineage.',
        script: 'Sharia actually pioneered concepts like social safety nets and animal rights. The penal aspects are a tiny fraction and require extremely high standards of evidence.',
        evidence: ['Maqasid al-Sharia (Five Objectives)', 'Due process in Islamic law', 'Historical protection of non-Muslims']
    }
];
