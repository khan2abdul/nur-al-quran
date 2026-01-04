import { DawahPillar } from './types';

export const DAWAH_PILLARS: DawahPillar[] = [
    { id: 1, title: 'Knowledge (Ilm)', description: 'Know what you are talking about. Root your invitations in authentic revelation and scholarly understanding.', icon: 'BookOpen' },
    { id: 2, title: 'Wisdom (Hikmah)', description: 'Say the right thing at the right time. Understand the context and state of the person you are speaking to.', icon: 'Brain' },
    { id: 3, title: 'Compassion (Rahma)', description: 'Genuinely care about their guidance. Da\'wah is an act of love for humanity\'s salvation.', icon: 'Heart' },
    { id: 4, title: 'Patience (Sabr)', description: 'Results are in Allah\'s hands. Your duty is only the clear delivery of the message.', icon: 'Clock' },
];

export const DAWAH_LEVELS = [
    {
        title: 'Silent Da\'wah',
        subtitle: 'The Power of Character',
        description: 'Being the best version of a Muslim. Honest, kind, and trustworthy. People see Islam through you before they read about it.',
        story: 'The Prophet (SAW) was known as Al-Amin (The Trustworthy) for years before his first revelation.'
    },
    {
        title: 'Responsive Da\'wah',
        subtitle: 'Becoming the "Go-To"',
        description: 'Answering genuine questions from friends and colleagues. Clarifying misconceptions when they arise in casual settings.',
        story: 'Handling curiosity with grace builds lasting bridges of trust.'
    },
    {
        title: 'Active Da\'wah',
        subtitle: 'Initiating Conversations',
        description: 'Street da\'wah, public talks, or creating digital content. Requires deeper training in logic, evidence, and empathy.',
        story: 'Strategic outreach to those who have never heard the true message of Islam.'
    }
];
