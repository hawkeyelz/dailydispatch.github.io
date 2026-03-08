const fs = require('fs');
const path = require('path');

const archiveDir = path.join(__dirname, 'EditionArchive');
const outputFile = path.join(__dirname, 'archive-manifest.json');

fs.readdir(archiveDir, (err, files) => {
    if (err) return console.error("Error scanning Archive:", err);
    const editions = files
        .filter(file => file.endsWith('.html'))
        .map(file => file.replace('.html', ''))
        .sort().reverse();
    fs.writeFileSync(outputFile, JSON.stringify(editions, null, 2));
    console.log(`Manifest updated with ${editions.length} editions.`);
});