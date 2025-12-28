
const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Repo', 'nur-al-quran', 'src', 'pages', 'WomenInIslam', 'WomenInIslamPage.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix TabNavigation Active State - Use Slate-900 for maximum contrast in light mode
    content = content.replace(
        /bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500\/30/g,
        'bg-slate-900 dark:bg-fuchsia-600 text-white shadow-xl translate-y-[-2px]'
    );

    // 2. Fix StereotypeBuster Active State
    content = content.replace(
        /bg-fuchsia-700 border-fuchsia-700 text-white shadow-lg/g,
        'bg-purple-700 border-purple-700 text-white shadow-md'
    );

    // 3. Ensure text-white is always applied strongly
    // (Already in the code, but let's double check the logic in StereotypeBuster)

    // 4. Fix contrast in Action Hub Cards
    content = content.replace(
        /text-fuchsia-600 dark:text-fuchsia-400 font-bold text-sm flex items-center gap-1/g,
        'text-purple-700 dark:text-purple-400 font-bold text-sm flex items-center gap-1'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully fixed selected button visibility via Node.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
