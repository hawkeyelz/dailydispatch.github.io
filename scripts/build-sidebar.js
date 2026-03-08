const fs = require('fs');
const path = require('path');

// Folders
const archiveDir = path.join(__dirname, '../EditionArchive');
const navFile = path.join(__dirname, '../partials/sidebar-nav.html');

// Create folders if they don't exist
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);
if (!fs.existsSync(path.dirname(navFile))) fs.mkdirSync(path.dirname(navFile), { recursive: true });

// Read archive files
const files = fs.readdirSync(archiveDir)
    .filter(file => file.endsWith('.html'))
    .sort().reverse();

// Build navigation links
const navLinks = files.map(file => {
    const date = file.replace('.html', '');
    return `<a href="EditionArchive/${file}" class="nav-item nav-world">${date} Dispatch</a>`;
}).join('\n');

fs.writeFileSync(navFile, navLinks);
console.log(`Success! Updated sidebar with ${files.length} editions.`);