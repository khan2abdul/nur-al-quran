
/**
 * Data for the Islamic Law (Fiqh) Page
 * 
 * Contains structured content for interactive tools:
 * - Madhab Navigator (Differences of opinion)
 * - Halal/Haram Decision Tree
 * - Inheritance Calculator Logic
 * - Modern Issues FAQ
 * - Glossary and Women's Rights
 */

import { FIQH_TIMELINE, TimelineEvent } from './fiqh/historyData';
import { USUL_SOURCES, FIVE_OBJECTIVES, UsulSource } from './fiqh/methodologyData';
import { COMPREHENSIVE_MADHAB_ISSUES } from './fiqh/comprehensiveMadhabs';
import { MODERN_ISSUES_DETAILS, ModernIssueDetail } from './fiqh/modernIssuesDetails';
import { FAMILY_LAW_DETAILS, FamilyLawDetail } from './fiqh/familyLawDetails';

export {
    FIQH_TIMELINE,
    USUL_SOURCES,
    FIVE_OBJECTIVES,
    COMPREHENSIVE_MADHAB_ISSUES as MADHAB_ISSUES,
    MODERN_ISSUES_DETAILS,
    FAMILY_LAW_DETAILS
};

export type {
    TimelineEvent,
    UsulSource,
    ModernIssueDetail,
    FamilyLawDetail
};

export interface MadhabPosition {
    ruling: string;
    reasoning: string;
}

export interface FiqhIssue {
    id: string;
    title: string;
    category: 'Worship' | 'Food' | 'Social' | 'Finance';
    agreementIndex: 'unanimous' | 'minor' | 'significant'; // Green, Yellow, Red
    hanafi: MadhabPosition;
    maliki: MadhabPosition;
    shafii: MadhabPosition;
    hanbali: MadhabPosition;
}

export interface DecisionNode {
    id: string;
    question: string;
    options: {
        label: string;
        nextNodeId?: string;
        verdict?: 'HALAL' | 'HARAM' | 'MAKRUH' | 'DOUBTFUL';
        evidence?: string;
    }[];
}

export const HALAL_HARAM_TREE: Record<string, DecisionNode> = {
    root: {
        id: 'root',
        question: 'Is the item/action explicitly mentioned in the Quran or Hadith as forbidden?',
        options: [
            { label: 'Yes', verdict: 'HARAM', evidence: 'Clear prohibition in sacred texts (e.g., Al-Baqarah 173 for food).' },
            { label: 'No', nextNodeId: 'ingredients' }
        ]
    },
    ingredients: {
        id: 'ingredients',
        question: 'Does it contain any haram substances (Alcohol, Pork, etc.)?',
        options: [
            { label: 'Yes', verdict: 'HARAM', evidence: 'Prohibition of intoxicants and impure substances.' },
            { label: 'No/Unsure', nextNodeId: 'outcomes' }
        ]
    },
    outcomes: {
        id: 'outcomes',
        question: 'Does it lead to harm, injustice, or neglect of religious duties?',
        options: [
            { label: 'Yes', verdict: 'MAKRUH', evidence: 'Maqasid Shariah: Protecting life and religion.' },
            { label: 'No', verdict: 'HALAL', evidence: 'Original rule of all things is permissibility (Al-Asl fi al-Ashya al-Ibahah).' }
        ]
    }
};

export const MODERN_ISSUES = [
    {
        title: 'Cryptocurrency & Bitcoin',
        category: 'Finance',
        summary: 'Rulings differ based on whether it\'s viewed as a currency, commodity, or speculative asset.',
        opinions: [
            { scholar: 'International Fiqh Academy', stance: 'Permissible with conditions (avoiding rampant speculation/gharar).' },
            { scholar: 'Individual Scholars (e.g., Al-Azhar)', stance: 'Some forbid it due to lack of central authority and volatility.' }
        ]
    },
    {
        title: 'Organ Donation',
        category: 'Medical',
        summary: 'Generally permitted as a form of "Sadaqah Jariyah" (ongoing charity) to save lives.',
        opinions: [
            { scholar: 'Majority Consensus', stance: 'Permissible provided it doesn\'t harm the donor and is done for altruism.' }
        ]
    }
];

export const INHERITANCE_RULES = {
    spouse: {
        husband: { withChildren: '1/4', withoutChildren: '1/2' },
        wife: { withChildren: '1/8', withoutChildren: '1/4' }
    },
    parents: {
        father: { withChildren: '1/6 + Residue', withoutChildren: 'Residue' },
        mother: { withChildren: '1/6', withoutChildren: '1/3' }
    }
};

export const FIQH_GLOSSARY = [
    { term: 'Fiqh', translation: 'Understanding', definition: 'The human interpretation of Sharia (divine law).' },
    { term: 'Ijma', translation: 'Consensus', definition: 'The unanimous agreement of Muslim scholars on a specific ruling.' },
    { term: 'Qiyas', translation: 'Analogy', definition: 'Applying a ruling from a known case to a new case with similar attributes.' },
    { term: 'Maqasid', translation: 'Objectives', definition: 'The higher goals of Sharia, like protecting life and intellect.' }
];
