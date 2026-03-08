async function init() {
    const resp = await fetch('./archive-manifest.json');
    const editions = await resp.json();
    const list = document.getElementById('archive-list');

    editions.forEach(id => {
        const li = document.createElement('li');
        li.className = 'archive-list-item';
        
        // Formatter: Turns "2026-03-08-1800" into "Mar 08 - 06:00 PM"
        const parts = id.split('-');
        if (parts.length === 4) {
            const time = parts[3];
            const hour = parseInt(time.substring(0,2));
            const displayTime = hour >= 12 ? 
                `${hour === 12 ? 12 : hour - 12}:${time.substring(2,4)} PM` : 
                `${hour === 0 ? 12 : hour}:${time.substring(2,4)} AM`;
            
            li.textContent = `${parts[1]}/${parts[2]} - ${displayTime}`;
        } else {
            li.textContent = id; // Fallback for old naming
        }

        li.onclick = () => loadEdition(id);
        list.appendChild(li);
    });

    if (editions.length > 0) loadEdition(editions[0]);
}

async function loadEdition(id) {
    const target = document.getElementById('dispatch-content');
    // Fetches from the folder we designated in our naming protocol
    const resp = await fetch(`./EditionArchive/${id}.html`);
    target.innerHTML = await resp.text();
}