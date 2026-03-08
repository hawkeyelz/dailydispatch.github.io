const fs = require('fs');
const path = require('path');

// Target the correct folder and manifest locations
const editionsDir = path.join(__dirname, '../EditionArchive');
const manifestPath = path.join(__dirname, '../archive-manifest.json');

try {
    // Read files, filter for HTML, and remove extensions
    const files = fs.readdirSync(editionsDir)
        .filter(file => file.endsWith('.html'))
        .map(file => file.replace('.html', ''))
        // Sorts descending so 2026-03-08-2100 comes before 2026-03-08-0800
        .sort((a, b) => b.localeCompare(a));

    fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
    console.log(`Success! Updated sidebar with ${files.length} editions.`);
} catch (err) {
    console.error("Error building manifest:", err);
}