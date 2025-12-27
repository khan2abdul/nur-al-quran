const fs = require('fs');

// Read file as buffer to get raw bytes
let content = fs.readFileSync('src/pages/Learn/FundamentalsPage.tsx', 'utf8');

// Find line 318 content to see actual bytes
const lines = content.split(/\r?\n/);
console.log('Line 318:', lines[317]);
console.log('Bytes:');
for (let i = 0; i < Math.min(50, lines[317].length); i++) {
    const ch = lines[317][i];
    const code = ch.charCodeAt(0);
    if (code > 127) {
        console.log(i, code.toString(16), code, ch);
    }
}
