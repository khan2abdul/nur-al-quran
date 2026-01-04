import { SimulationScenario } from './types';

export const DAWAH_SCENARIOS: SimulationScenario[] = [
    {
        id: 'skeptic',
        name: 'The Skeptical Scientist',
        personality: 'Logical, evidence-driven, slightly dismissive of "faith".',
        description: 'Practice responding to demands for empirical proof and addressing the "religion vs science" conflict.',
        initialQuestion: 'I only believe in what I can see and measure. Religion just seems like ancient mythology to me. How can you prove any of this is real?',
        responses: [
            {
                trigger: ['evidence', 'reason', 'logic', 'observation'],
                reply: 'That\'s a fair starting point. Islam actually encourages the same—it asks us to observe the natural world. If we see complex design in the universe, isn\'t it logical to infer a designer?',
                feedback: 'Good use of common ground. You acknowledged his value for reason.',
                score: 10
            },
            {
                trigger: ['faith', 'blind', 'believe', 'just because'],
                reply: 'You just have to have faith. Not everything can be proven by science.',
                feedback: 'A bit weak for this personality. A skeptic usually rejects "blind faith" immediately. Try using a logical argument instead.',
                score: 5
            }
        ]
    },
    {
        id: 'seeker',
        name: 'The Emotional Seeker',
        personality: 'Searching for meaning, going through a hard time, soft-hearted.',
        description: 'Practice sharing the spiritual peace of Islam and the concept of God\'s mercy.',
        initialQuestion: 'I\'ve been going through so much lately. I feel like there\'s no purpose to any of this. Does your religion have anything for someone who just feels lost?',
        responses: [
            {
                trigger: ['comfort', 'peace', 'purpose', 'mercy'],
                reply: 'I\'m so sorry you\'re feeling that way. In Islam, we believe the heart only truly finds rest in the remembrance of God. Trials aren\'t punishments, but ways for us to turn back to our Creator.',
                feedback: 'Excellent empathy. You addressed the emotional need before the theological point.',
                score: 10
            },
            {
                trigger: ['rules', 'pray', 'fast', 'sharia'],
                reply: 'You need to start praying five times a day. It will bring discipline to your life.',
                feedback: 'Too rigid for an initial response. They are looking for comfort, not a checklist. Try focusing on the mercy of Allah first.',
                score: 4
            }
        ]
    }
];
