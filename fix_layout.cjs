
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'WomenInIslam', 'WomenInIslamPage.tsx');

const newStereotypeBusterContent = `const StereotypeBuster = memo(() => {
    const [activeMyth, setActiveMyth] = useState(0);

    const myths = [
        {
            myth: "Islam oppresses women",
            reality: "Islam established women's rights 1,400 years ago.",
            evidence: "Before Islam, women were property. Islam gave them the right to own property, inherit, work, vote (bay'ah), and choose a spouse. (Quran 4:7, 4:19)",
            emoji: "⚖️"
        },
        {
            myth: "Women can't work",
            reality: "The Prophet's wife Khadijah (RA) was a successful CEO.",
            evidence: "She employed the Prophet ﷺ. Throughout history, Muslim women were scholars, market inspectors, and business owners. Work is permitted if it's halal and dignified.",
            emoji: "💼"
        },
        {
            myth: "Hijab is forced",
            reality: "Hijab is a personal act of worship and spiritual empowerment.",
            evidence: "The Quran commands modesty for both men and women. For women, it is a choice to submit to Allah, not men, and to be valued for character over body.",
            emoji: "🧕"
        },
        {
            myth: "Second-class believers",
            reality: "Men and women are spiritual equals.",
            evidence: "'Whoever does righteousness, whether male or female, while he is a believer - We will surely cause him to live a good life.' (Quran 16:97)",
            emoji: "✨"
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="text-2xl">💥</span> Stereotype Buster
            </h3>

            {/* Changed from flex-row to grid to ensure consistent column sizing on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-12 gap-6 flex-1">
                {/* Changed width from w-1/3 to col-span-4 to give more breathing room */}
                <div className="flex flex-col gap-3 md:col-span-5 lg:col-span-4">
                    {myths.map((m, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveMyth(idx)}
                            // Removed w-full fixed sizing issues and added min-w-0 for ellipsis
                            className={\`text-left p-3 lg:p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 group relative overflow-hidden \${activeMyth === idx
                                ? 'bg-fuchsia-600 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-200 dark:shadow-none'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                                }\`}
                        >
                            <span className="text-xl lg:text-2xl relative z-10 flex-shrink-0">{m.emoji}</span>
                            <span className={\`font-bold text-sm lg:text-base leading-tight relative z-10 \${activeMyth === idx ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'}\`}>
                                {m.myth}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Reality card takes remaining space */}
                <div className="md:col-span-7 lg:col-span-8 flex-1 animate-fade-in bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-6 lg:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center min-h-[300px] shadow-inner">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm border border-white/10">The Reality</span>
                        </div>
                        <h4 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 leading-tight text-white">{myths[activeMyth].reality}</h4>
                        <div className="bg-white/10 p-4 lg:p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                            <p className="text-fuchsia-50 text-base lg:text-lg leading-relaxed font-medium">
                                {myths[activeMyth].evidence}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});`;

const newAffirmationsContent = `const EmpowermentAffirmations = memo(() => {
    const affirmations = [
        "I am honored by Allah perfectly as I am.",
        "My hijab is a crown of dignity, not a chain.",
        "I walk in the footsteps of Khadijah and Aisha.",
        "My voice and mind matter to my Creator.",
        "I can balance my faith and my ambitions.",
        "Paradise lies at the feet of mothers."
    ];

    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent(p => (p + 1) % affirmations.length), [affirmations.length]);

    return (
        <div className="bg-gradient-to-b from-rose-50 to-fuchsia-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 lg:p-8 border border-rose-100 dark:border-slate-700 h-full flex flex-col shadow-xl relative overflow-hidden text-center group min-h-[400px]">
             {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-fuchsia-500"></div>
            <div className="absolute -right-10 top-10 w-32 h-32 bg-rose-200/50 dark:bg-rose-900/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            
            <h3 className="text-xs lg:text-sm font-bold mb-6 lg:mb-8 text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <span>✨</span> Daily Affirmation
            </h3>
            
            <div className="flex-1 flex items-center justify-center mb-6 lg:mb-8">
                <p className="text-xl lg:text-3xl font-serif font-bold text-slate-800 dark:text-white leading-tight animate-fade-in key={current}">
                    "{affirmations[current]}"
                </p>
            </div>

            <button 
                onClick={next}
                className="w-full py-3 lg:py-4 rounded-xl bg-white dark:bg-slate-700/50 text-fuchsia-600 dark:text-fuchsia-300 font-bold border-2 border-fuchsia-100 dark:border-slate-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 hover:text-fuchsia-700 dark:hover:text-white transition-all shadow-sm hover:shadow-md text-sm lg:text-base"
            >
                Next Affirmation →
            </button>
        </div>
    );
});`;

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace StereotypeBuster
    const sbStart = content.indexOf('const StereotypeBuster = memo(() => {');
    const sbEnd = content.indexOf('const EmpowermentAffirmations = memo(() => {');

    if (sbStart !== -1 && sbEnd !== -1) {
        // Find the actual end of StereotypeBuster block to be safe, but since they are sequential we can just replace up to next component
        // Actually, let's be more precise.
        // The structure is roughly: 
        // const StereotypeBuster ... });
        // const EmpowermentAffirmations ...

        // We will construct the new content similarly

        const beforeSB = content.substring(0, sbStart);
        const afterAffirmations = content.indexOf('const OverviewSection = () => (');

        if (afterAffirmations !== -1) {
            const newTotalContent = beforeSB + newStereotypeBusterContent + "\n\n" + newAffirmationsContent + "\n\n" + content.substring(afterAffirmations);
            fs.writeFileSync(filePath, newTotalContent, 'utf8');
            console.log("Successfully updated layout via Node.");
        } else {
            console.error("Could not find OverviewSection start");
        }
    } else {
        console.error("Could not find component boundaries");
    }

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
