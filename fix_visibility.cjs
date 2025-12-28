
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'WomenInIslam', 'WomenInIslamPage.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix HeroSection Contrast
    content = content.replace(
        /text-white\/80 hover:text-white mb-8/g,
        'text-white hover:text-fuchsia-200 mb-8 underline decoration-fuchsia-500/30 underline-offset-4'
    );
    content = content.replace(
        /text-fuchsia-200 text-sm font-bold/g,
        'text-white text-sm font-bold'
    );
    content = content.replace(
        /bg-fuchsia-500\/20 border border-fuchsia-500\/30/g,
        'bg-fuchsia-600/40 border border-fuchsia-400/50'
    );
    content = content.replace(
        /text-white\/70 max-w-2xl mx-auto mb-10 italic/g,
        'text-fuchsia-100/90 max-w-2xl mx-auto mb-10 italic font-medium'
    );

    // 2. Fix TabNavigation Active State
    // Ensuring it has a solid fallback or just better classes
    content = content.replace(
        /bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md/g,
        'bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-500/20'
    );

    // 3. Fix StereotypeBuster Active State & Gradient
    content = content.replace(
        /bg-fuchsia-600 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-200 dark:shadow-none/g,
        'bg-fuchsia-700 border-fuchsia-700 text-white shadow-lg'
    );

    // Fix the reality card title contrast
    content = content.replace(
        /bg-white\/20 rounded-full text-xs font-bold uppercase tracking-widest text-white\/90/g,
        'bg-fuchsia-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-fuchsia-50'
    );

    // 4. Fix EmpowermentAffirmations Typos and Visibility
    // Fixing: animate-fade-in key={current}
    content = content.replace(
        /animate-fade-in key=\{current\}/g,
        'animate-fade-in'
    );
    // Adding the actual key to the element correctly
    content = content.replace(
        /<p className="(.*)animate-fade-in"/g,
        '<p key={current} className="$1animate-fade-in"'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully fixed visibility and typos via Node.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
