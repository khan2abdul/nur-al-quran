export interface UsulSource {
    type: 'Primary' | 'Secondary' | 'Supplementary';
    name: string;
    description: string;
    example: string;
    schools?: string[];
}

export const USUL_SOURCES: UsulSource[] = [
    {
        type: 'Primary',
        name: 'Quran',
        description: 'The direct Word of Allah, containing ~500 verses with legal rulings.',
        example: 'Prohibition of riba (interest) in 2:275.',
        schools: ['All']
    },
    {
        type: 'Primary',
        name: 'Sunnah',
        description: 'The actions, approvals, and statements of the Prophet (SAW).',
        example: 'Details of how to perform Salah.',
        schools: ['All']
    },
    {
        type: 'Secondary',
        name: 'Ijma (Consensus)',
        description: 'Unanimous agreement of qualified scholars in a particular era.',
        example: 'Consensus on the prohibition of grandmother inheriting in specific cases.',
        schools: ['All']
    },
    {
        type: 'Secondary',
        name: 'Qiyas (Analogy)',
        description: 'Applying an existing ruling to a new situation with a similar effective cause (Illah).',
        example: 'Prohibiting narcotics by analogy to the prohibition of alcohol.',
        schools: ['All']
    },
    {
        type: 'Supplementary',
        name: 'Istihsan (Juristic Preference)',
        description: 'Departing from a strict analogy for a better, more equitable ruling.',
        example: 'Allowing the contract of istisna (manufacturing) even though item doesnt exist yet.',
        schools: ['Hanafi']
    },
    {
        type: 'Supplementary',
        name: 'Maslaha Mursalah (Public Interest)',
        description: 'Rulings based on benefits for which there is no specific text but follow Maqasid.',
        example: 'The compilation of the Quran into a single volume.',
        schools: ['Maliki']
    }
];

export const FIVE_OBJECTIVES = [
    {
        id: 'deen',
        name: 'Religion (Deen)',
        protection: 'Worship, protection of faith, freedom of belief.',
        threat: 'Apostasy, blasphemy, preventing worship.'
    },
    {
        id: 'nafs',
        name: 'Life (Nafs)',
        protection: 'Safety, health, nutrition, medicinal use.',
        threat: 'Murder, assault, dangerous substances.'
    },
    {
        id: 'aql',
        name: 'Intellect (Aql)',
        protection: 'Education, mental health, cognitive clarity.',
        threat: 'Intoxicants, misinformation, mental harm.'
    },
    {
        id: 'nasl',
        name: 'Lineage (Nasl)',
        protection: 'Marriage, family values, child rights.',
        threat: 'Adultery, broken families, neglect.'
    },
    {
        id: 'mal',
        name: 'Wealth (Mal)',
        protection: 'Property rights, fair trade, charity.',
        threat: 'Theft, interest (riba), fraud, gambling.'
    }
];
