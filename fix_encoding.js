const fs = require('fs');

// Read file
let content = fs.readFileSync('src/pages/Learn/FundamentalsPage.tsx', 'utf8');

// Define all corrupted patterns and their correct replacements
const replacements = [
    ['ðŸ'°', '💰'],
    ['ðŸ•', '🕐'],
        ['ðŸŒ…', '🌅'],
        ['â˜€ï¸', '☀️'],
        ['ðŸŒž', '🌞'],
        ['ðŸŒ¤ï¸', '🌤️'],
        ['ðŸŒ™', '🌙'],
        ['ðŸŒœ', '🌜'],
        ['ðŸ½ï¸', '🍽️'],
    ];

// Apply replacements
for (const [corrupted, correct] of replacements) {
    content = content.split(corrupted).join(correct);
}

// Write back
fs.writeFileSync('src/pages/Learn/FundamentalsPage.tsx', content, 'utf8');

console.log('Done fixing encoding issues!');
