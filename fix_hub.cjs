
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'Home', 'HomePage.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Define the correct Hub layout
    const correctHubLayout = \`
            {/* Premium Hub Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Action - Surahs - Expanded to full width */}
                <Link
                    to={ROUTES.SURAHS}
                    className="md:col-span-12 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 md:p-12 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-500">📖</span>
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Explore <span className="text-emerald-500">Surahs</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                            Browse all 114 chapters and immerse yourself in the divine message.
                        </p>
                    </div>
                </Link>

                {/* Featured Wisdom Card */}
                <Link
                    to={ROUTES.WISDOM}
                    className="md:col-span-12 group relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.01] shadow-2xl mt-4"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                                Premium Resource
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Divine <span className="text-cyan-400">Wisdom Hub</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                                Explore the core of Islamic faith, character, and guidance. Embark on a journey to deepen your understanding of Islam.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-cyan-400/10 flex items-center justify-center text-6xl md:text-8xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                                ✨
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-slate-900 animate-pulse">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
\`;

    // Find the Hub section
    const hubStartMarker = '{/* Premium Hub Layout */}';
    const hubEndMarker = '{/* Recent Surahs */}';
    
    const startPos = content.indexOf(hubStartMarker);
    const endPos = content.indexOf(hubEndMarker);
    
    if (startPos !== -1 && endPos !== -1) {
        let newContent = content.substring(0, startPos) + correctHubLayout + "\n" + content.substring(endPos);
        
        // Clean up any extra closing divs that might have been left behind
        // Re-calculate the return structure
        // The return starts with <div className="space-y-12">
        // It should end with </div> before );
        
        const returnEndIdx = newContent.lastIndexOf(');');
        if (returnEndIdx !== -1) {
            let returnBlock = newContent.substring(0, returnEndIdx);
            // Count opening and closing divs to ensure balance
            // This is a bit risky but we can try to find the last </div> before );
            const lastDivIdx = returnBlock.lastIndexOf('</div>');
            // We want to make sure there is only ONE main container div closure at the end.
        }

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log("Successfully fixed Hub layout and expanded card.");
    } else {
        console.error("Could not find Hub markers.");
        process.exit(1);
    }
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
