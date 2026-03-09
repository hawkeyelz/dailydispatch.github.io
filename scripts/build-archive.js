const fs = require('fs');
const path = require('path');

// 1. Point one level UP from the scripts folder
const archiveDir = path.join(__dirname, '..', 'EditionArchive');
const outputFile = path.join(__dirname, '..', 'archive-manifest.json');

fs.readdir(archiveDir, (err, files) => {
    if (err) return console.error("Error scanning Archive:", err);

    // 2. Filter for HTML files and map them to Objects instead of Strings
    const editions = files
        .filter(file => file.endsWith('.html'))
        .map(file => {
            return {
                // This 'path' property is what your frontend is looking for
                path: `./EditionArchive/${file}`, 
                // This is the clean date string for your UI display
                displayDate: file.replace('.html', '')
            };
        })
        // 3. Sort so the newest date (e.g., 2026-03-08-2200) is at the top
        .sort((a, b) => b.displayDate.localeCompare(a.displayDate));

    // 4. Write the new Object-based array to your manifest
    fs.writeFileSync(outputFile, JSON.stringify(editions, null, 2));
    
    console.log(`[HNN] Success! Manifest updated with ${editions.length} editions.`);
});