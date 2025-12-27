const fs = require('fs');

// Read file
let content = fs.readFileSync('src/pages/Learn/FundamentalsPage.tsx', 'utf8');

// The corrupted pattern for 💰 (money bag) is: ðŸ'°
// In the file it appears as Unicode codepoints resulting from mojibake
// Let's find all lines with potential emoji issues and print them

const lines = content.split(/\r?\n/);
const problematicLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for common mojibake starting chars
    if (line.includes('ð') || line.includes('Ã') || line.includes('â')) {
        // Check if line has high unicode that could be mojibake
        let hasMojibake = false;
        for (let j = 0; j < line.length; j++) {
            const code = line.charCodeAt(j);
            if (code === 0xF0 || code === 0xC3 || code === 0xE2) { // ð, Ã, â
                hasMojibake = true;
                break;
            }
        }
        if (hasMojibake && (line.includes('Zakat') || line.includes('Prayer') || line.includes('Fajr') ||
            line.includes('Dhuhr') || line.includes('Asr') || line.includes('Maghrib') || line.includes('Isha'))) {
            console.log(`Line ${i + 1}: ${line.substring(0, 100)}`);
        }
    }
}

// Common UTF-8 mojibake patterns (when UTF-8 is read as ISO-8859-1/Windows-1252)
// 💰 = U+1F4B0 = F0 9F 92 B0 in UTF-8 -> becomes Ã°ÂŸÂ'Â° when decoded as Win-1252 then re-encoded as UTF-8
// Let's try direct string replacement

const replacementMap = {
    // These are the actual strings as they appear when mojibake-d
    'ðŸ'°': '💰',  // money bag
    'ðŸ•Œ': '🕌',  // mosque  
    'ðŸ•‹': '🕋',  // kaaba
    'ðŸŒ…': '🌅',  // sunrise
    'ðŸŒž': '🌞',  // sun face
    'ðŸŒ™': '🌙',  // crescent moon
    'ðŸŒœ': '🌜',  // last quarter moon
    'ðŸ½': '🍽',   // plate
    'â˜€': '☀',   // sun
    'ðŸŒ¤': '🌤',  // sun behind cloud
    'ðŸ•': '🕐',   // clock
    'ï¸': '️',   // variation selector
};

let totalReplacements = 0;

for (const [bad, good] of Object.entries(replacementMap)) {
    const regex = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    if (matches) {
        console.log(`Replacing ${matches.length} occurrences: ${bad} -> ${good}`);
        totalReplacements += matches.length;
        content = content.replace(regex, good);
    }
}

fs.writeFileSync('src/pages/Learn/FundamentalsPage.tsx', content, 'utf8');
console.log(`Total replacements: ${totalReplacements}`);
