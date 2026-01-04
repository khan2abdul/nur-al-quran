import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface DawahPillar {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export interface Misconception {
    id: number;
    category: 'Women' | 'Violence' | 'Science' | 'Prophets' | 'Quran' | 'Sharia' | 'Interfaith';
    claim: string;
    whyItPersists: string;
    response: string;
    script: string;
    evidence: string[];
}

export interface SimulationScenario {
    id: string;
    name: string;
    personality: string;
    description: string;
    initialQuestion: string;
    responses: {
        trigger: string[];
        reply: string;
        feedback: string;
        score: number;
        nextNode?: string;
    }[];
}

export interface DialogueFramework {
    group: string;
    commonGround: string[];
    keyDifferences: string[];
    script: string;
    biblicalProphecies?: { verse: string; context: string; fulfillment: string }[];
    logicalArguments?: { premise: string; evidence: string }[];
}

export interface DawahArchetype {
    id: number;
    name: string;
    strength: string;
    weakness: string;
    platform: string;
    description: string;
    icon: string;
}
