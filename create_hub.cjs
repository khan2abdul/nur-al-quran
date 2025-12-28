
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'WomenInIslam', 'WomenInIslamPage.tsx');

const newOverviewSection = `
const OverviewSection: React.FC<{ onNavigate: (tab: TabId) => void }> = memo(({ onNavigate }) => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Your Empowerment Hub</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
                Explore the revolutionary rights, honored status, and inspiring legacy of women in Islam. 
                Select a category above or choose a quick action below.
            </p>
        </div>

        {/* Action Hub Grid - Matching Living Islam Daily pattern */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
                { title: "Know Your Rights", icon: "📜", tab: "rights", desc: "Inheritance, education, and financial independence.", color: "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600" },
                { title: "The Modesty Journey", icon: "🧕", tab: "hijab", desc: "Understanding the wisdom and dignity of Hijab.", color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600" },
                { title: "Scholar Hall of Fame", icon: "🎓", tab: "scholars", desc: "Meet the women who shaped Islamic history.", color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" },
                { title: "Honored Motherhood", icon: "❤️", tab: "motherhood", desc: "Why Paradise lies at the feet of mothers.", color: "bg-rose-100 dark:bg-rose-900/40 text-rose-700" },
                { title: "Holistic Wellness", icon: "🌿", tab: "health", desc: "Faith-based health and mental well-being.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" },
                { title: "Faith & Career", icon: "💼", tab: "career", desc: "Balancing professional life with Islamic values.", color: "bg-slate-100 dark:bg-slate-800 text-slate-600" }
            ].map((card, idx) => (
                <button 
                    key={idx} 
                    onClick={() => onNavigate(card.tab as TabId)}
                    className="group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col h-full"
                >
                    <div className={\`w-14 h-14 \${card.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform\`}>
                        {card.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{card.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-2">{card.desc}</p>
                    <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold text-sm flex items-center gap-1">
                        Explore Now <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </span>
                </button>
            ))}
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                <div className="lg:col-span-2">
                    <StereotypeBuster />
                </div>
                <div className="lg:col-span-1">
                    <EmpowermentAffirmations />
                </div>
            </div>
        </div>
    </div>
));
`;

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix Title (Remove "The" if added, or ensure "Women in Islam" is correct)
    content = content.replace(
        /The Women in <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-rose-300">Islam<\/span>/g,
        'Women in <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-rose-300">Islam</span>'
    );

    // 2. Replace OverviewSection component
    const osStart = content.indexOf('const OverviewSection = () => (');
    const osEnd = content.indexOf('// --- Rights Section Components ---');

    if (osStart !== -1 && osEnd !== -1) {
        content = content.substring(0, osStart) + newOverviewSection + "\n\n" + content.substring(osEnd);
    }

    // 3. Update usage of OverviewSection to pass onNavigate
    content = content.replace(
        /\{activeTab === 'overview' && <OverviewSection \/>\}/g,
        "{activeTab === 'overview' && <OverviewSection onNavigate={handleTabChange} />}"
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully updated Overview Hub and Navigation via Node.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
