async function init() {
    const resp = await fetch('./archive-manifest.json');
    const editions = await resp.json();
    const list = document.getElementById('archive-list');

    editions.forEach(edition => { // 'edition' is now an object {path, displayDate}
        const li = document.createElement('li');
        li.className = 'archive-list-item';
        
        const id = edition.displayDate; // Use displayDate for the formatter logic
        
        // Formatter: Turns "2026-03-08-1800" into "Mar 08 - 06:00 PM"
        const parts = id.split('-');
        if (parts.length === 4) {
            const hour = parseInt(parts[3].substring(0,2));
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            const minutes = parts[3].substring(2,4);
            
            li.textContent = `${parts[1]}/${parts[2]} - ${displayHour}:${minutes} ${ampm}`;
        } else {
            li.textContent = id; 
        }

        // Use the actual path from the object to load the content
        li.onclick = () => loadEdition(edition.path);
        list.appendChild(li);
    });

    if (editions.length > 0) loadEdition(editions[0].path);
}

async function loadEdition(path) {
    const target = document.getElementById('dispatch-content');
    const resp = await fetch(path); // Fetch the pre-built path from the manifest
    target.innerHTML = await resp.text();
}
// This tells the browser to start the engine as soon as the file loads
init();