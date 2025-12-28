
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'WomenInIslam', 'WomenInIslamPage.tsx');

const correctHero = `const HeroSection: React.FC = memo(() => (
    <div className="relative bg-gradient-to-br from-fuchsia-900 via-purple-900 to-slate-900 text-white overflow-hidden pb-16">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/islamic-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>

        <div className="relative z-10 container mx-auto px-6 pt-12 text-center">
            <Link to={ROUTES.WISDOM} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Divine Wisdom
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-sm font-bold mb-6 backdrop-blur-sm">
                <span>👑</span> Celebrating Dignity, Rights, and Excellence
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                The Women in <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-rose-300">Islam</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed">
                Discover the honored status of women in Islam—from revolutionary historical rights to modern empowerment.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                A comprehensive guide to reclaiming your narrative and rising with confidence.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-fuchsia-400">1,400+</span>
                    <span className="text-white/80 ml-2">Years of Rights</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-rose-400">7+</span>
                    <span className="text-white/80 ml-2">Focus Areas</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-indigo-400">100%</span>
                    <span className="text-white/80 ml-2">Empowerment</span>
                </div>
            </div>
        </div>
    </div>
));`;

try {
    let content = fs.readFileSync(filePath, 'utf8');

    const startMarker = 'const HeroSection: React.FC = memo(() => (';
    const endMarker = 'const TabNavigation';

    const startPos = content.indexOf(startMarker);
    const endPos = content.indexOf(endMarker);

    if (startPos !== -1 && endPos !== -1) {
        const updatedContent = content.substring(0, startPos) + correctHero + "\n\n" + content.substring(endPos);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log("Successfully restored HeroSection.");
    } else {
        console.error("Markers not found.");
    }
} catch (err) {
    console.error("Error:", err);
}
