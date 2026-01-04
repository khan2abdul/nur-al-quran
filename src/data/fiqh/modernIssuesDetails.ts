export interface ModernIssueDetail {
    id: string;
    title: string;
    category: 'Medical' | 'Finance' | 'Social' | 'Technology';
    consensus: 'Consensus' | 'Majority' | 'Debated';
    summary: string;
    classicalBasis: string;
    modernOpinions: { scholar: string; stance: string; reasoning: string }[];
}

export const MODERN_ISSUES_DETAILS: ModernIssueDetail[] = [
    {
        id: 'organ-donation',
        title: 'Organ Donation & Transplantation',
        category: 'Medical',
        consensus: 'Majority',
        summary: 'Most contemporary scholars permit donating organs to save lives, viewing it as a form of ongoing charity (Sadaqah Jariyah).',
        classicalBasis: 'The principle that "Necessity renders the prohibited permissible" and the objective of "Protection of Life".',
        modernOpinions: [
            { scholar: 'IIFA (Jeddah)', stance: 'Permissible', reasoning: 'The benefit of saving life outweighs the sanctity of the deceased body.' },
            { scholar: 'Al-Azhar', stance: 'Permissible', reasoning: 'It is an act of altruism and mercy encouraged by Islam.' }
        ]
    },
    {
        id: 'crypto',
        title: 'Cryptocurrency & Bitcoin',
        category: 'Finance',
        consensus: 'Debated',
        summary: 'Viewed varyingly as a legitimate digital currency, a speculative asset (gharar), or a medium for illegal transactions.',
        classicalBasis: 'Rulings on Ribawi items and the definition of "Mal" (wealth/asset).',
        modernOpinions: [
            { scholar: 'Mufti Taqi Usmani', stance: 'Caution/Haram', reasoning: 'Currently lacks the stability and government backing required for a currency; excessive gharar.' },
            { scholar: 'Individual Councils', stance: 'Permissible', reasoning: 'If used as a medium of exchange and not purely for gambling-like speculation.' }
        ]
    },
    {
        id: 'ivf',
        title: 'IVF & Surrogacy',
        category: 'Medical',
        consensus: 'Majority',
        summary: 'IVF is permissible between husband and wife; surrogacy involving third parties is generally prohibited.',
        classicalBasis: 'Protection of Lineage (Nasl) and prohibition of zina (adultery).',
        modernOpinions: [
            { scholar: 'Majority Consensus', stance: 'Permissible (IVF)', reasoning: 'Permitted as long as it involves the legal husband and wife\'s genetic material.' },
            { scholar: 'Majority Consensus', stance: 'Haram (Surrogacy)', reasoning: 'Leads to confusion of lineage and violates the sanctity of the womb.' }
        ]
    }
];
