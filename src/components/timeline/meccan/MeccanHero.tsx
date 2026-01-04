
import React, { memo } from 'react';

const MeccanHero: React.FC = memo(() => {
    return (
        <div className="relative bg-teal-950 text-white overflow-hidden py-24 md:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-5 animate-spin-slow"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/50 to-teal-950"></div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-bold mb-6 backdrop-blur-sm uppercase tracking-widest animate-fade-in-up">
                    The Seerah - Part 1
                </div>

                <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
                    The Meccan Period
                </h1>

                <p className="text-xl md:text-2xl text-teal-100/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
                    52 Years of Patience, Revelation, and the Birth of a New Era.
                    <br />
                    <span className="text-amber-400 font-serif italic block mt-2">(570 CE - 622 CE)</span>
                </p>

                <div className="flex justify-center gap-2 animate-fade-in-up delay-300">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                </div>
            </div>
        </div>
    );
});

export default MeccanHero;
