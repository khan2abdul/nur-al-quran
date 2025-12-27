import re

# Read the file
with open('src/pages/Learn/FundamentalsPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements (corrupted -> correct)
replacements = {
    'ðŸ'°': '💰',  # Money bag
    'ðŸ•': '🕐',   # Clock
    'ðŸŒ…': '🌅',  # Sunrise
    'â˜€': '☀',   # Sun
    'ðŸŒž': '🌞',  # Sun face
    'ðŸŒ¤': '🌤',   # Sun behind cloud
    'ðŸŒ™': '🌙',  # Crescent moon
    'ðŸŒœ': '🌜',  # Last quarter moon
    'ðŸ½': '🍽',   # Plate with cutlery
    'ï¸': '️',    # Variation selector
}

# Apply replacements
for corrupted, correct in replacements.items():
    content = content.replace(corrupted, correct)

# Write back
with open('src/pages/Learn/FundamentalsPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done fixing encoding issues!")
