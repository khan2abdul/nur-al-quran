import { DialogueFramework } from './types';

export const DIALOGUE_FRAMEWORKS: DialogueFramework[] = [
    {
        group: 'Christians',
        commonGround: ['One God', 'Prophets (Moses, Abraham, Jesus)', 'Moral values', 'Day of Judgment'],
        keyDifferences: ['Trinity vs Tawhid', 'Original Sin vs Fitrah', 'Status of Jesus as Prophet vs Son of God'],
        script: 'I respect your love for Jesus deeply. We Muslims love him too—as one of the greatest prophets. Have you considered whether Jesus claimed to be God literally, or is that a later interpretation?',
        biblicalProphecies: [
            { verse: 'Deuteronomy 18:18', context: 'Prophet like Moses from their brothers.', fulfillment: 'Muhammad (SAW) was from the Arabs (brothers of Israelites) and brought a complete Law like Moses.' }
        ]
    },
    {
        group: 'Atheists',
        commonGround: ['Reason', 'Evidence', 'Critical thinking', 'Universal morality'],
        keyDifferences: ['Existence of Creator', 'Purpose of Life', 'Source of Morality'],
        script: 'You trust your reason to verify truth. I respect that. But reason also tells us that complex design implies a designer. Have you considered the fine-tuning of the universe?',
        logicalArguments: [
            { premise: 'Everything that begins to exist has a cause.', evidence: 'The universe began to exist (Big Bang), therefore it has a cause.' }
        ]
    }
];

export const DAWAH_ARCHETYPES = [
    { id: 1, name: 'The Scholar', strength: 'Deep knowledge', weakness: 'Can be too academic', platform: 'Blogs, Lectures', description: 'Focuses on theological precision and evidence.', icon: 'Book' },
    { id: 2, name: 'The Storyteller', strength: 'Emotional connection', weakness: 'May lack depth', platform: 'Podcasts, Vlogs', description: 'Shares Islam through relatable narratives.', icon: 'Quote' }
    // ... More archetypes
];
