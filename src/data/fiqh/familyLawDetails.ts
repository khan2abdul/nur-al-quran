export interface FamilyLawDetail {
    topic: string;
    subtopics: {
        title: string;
        description: string;
        conditions?: string[];
        differences?: string;
    }[];
}

export const FAMILY_LAW_DETAILS: FamilyLawDetail[] = [
    {
        topic: 'Marriage (Nikah)',
        subtopics: [
            {
                title: 'Contract Essentials',
                description: 'The Nikah is a legal contract requiring mutual consent and specific pillars.',
                conditions: ['Offer & Acceptance (Ijab & Qabul)', 'Presence of Witnesses', 'Payment of Mahr', 'Permission of Wali (School-specific)']
            },
            {
                title: 'Marriage Conditions',
                description: 'Couples can add custom conditions to their contract as long as they don\'t violate Sharia.',
                conditions: ['Right to work/education', 'Residence location', 'No second wife (stipulated)', 'Right to divorce (Tafwid)']
            }
        ]
    },
    {
        topic: 'Divorce (Talaq & Khula)',
        subtopics: [
            {
                title: 'Talaq (Husband-led)',
                description: 'The husband has the right to initiate divorce, subject to strict procedural rules.',
                differences: 'Hanafis allow triple talaq in one sitting (though sinful), while others/modern laws count it as one.'
            },
            {
                title: 'Khula (Wife-led)',
                description: 'Women can initiate divorce through the court or by returning the Mahr.',
                differences: 'Usually requires judicial intervention if the husband does not consent.'
            }
        ]
    }
];
