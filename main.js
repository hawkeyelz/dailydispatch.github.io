async function init() {
    const resp = await fetch('./archive-manifest.json');
    const editions = await resp.json();
    const list = document.getElementById('archive-list');

    editions.forEach(date => {
        const li = document.createElement('li');
        li.className = 'archive-list-item';
        li.textContent = date;
        li.onclick = () => loadEdition(date);
        list.appendChild(li);
    });

    // Auto-load the newest edition
    if (editions.length > 0) loadEdition(editions[0]);
}

async function loadEdition(date) {
    const target = document.getElementById('dispatch-content');
    const resp = await fetch(`./EditionArchive/${date}.html`);
    target.innerHTML = await resp.text();
}

init();