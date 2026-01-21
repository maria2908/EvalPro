function initDashboard() {
    loadPruefungsausschuesse();
    loadSchueler();
}

initDashboard();


/* PRÜFUNGSAUSSCHUSS AUSGEBEN */

function loadPruefungsausschuesse() {
    loadList({
        url: '/api/pruefungsausschuss/list',
        listId: 'pruefungsausschussList',
        emptyText: 'Es sind noch keine Prüfungsausschüsse vorhanden.',
        renderItem: pa => `
            <span>${pa.bezeichnung}</span>
            <div class="btnWrapper">
                <button class="btnDelete">
                    <img src="../../assets/trash.svg" alt="Prüfungsausschuss löschen">
                </button>
                <button class="btnChange">
                    <img src="../../assets/pen.svg" alt="Prüfungsausschuss bearbeiten">
                </button>
            </div>
        `
    });
}

/* SCHÜLER AUSGEBEN */

function loadSchueler() {
    loadList({
        url: '/api/schueler/list',
        listId: 'schuelerList',
        emptyText: 'Es sind noch keine Schüler vorhanden.',
        renderItem: s => `
            <span>${s.vorname} ${s.name}</span>
            <div class="btnWrapper">
                <button class="btnDelete">
                    <img src="../../assets/trash.svg" alt="Schüler löschen">
                </button>
                <button class="btnChange">
                    <img src="../../assets/pen.svg" alt="Schüler bearbeiten">
                </button>
            </div>
        `
    });
}

/* ALLGEMEINE LISTE LADEN */

async function loadList({
    url,
    listId,
    emptyText,
    renderItem
}) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    try {
        const res = await fetch(url);
        const result = await res.json();
        const data = Array.isArray(result) ? result : result.data;

        if (!data || data.length === 0) {
            list.innerHTML = `<li class="empty">${emptyText}</li>`;
            return;
        }

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'listItem';
            li.innerHTML = renderItem(item);
            list.appendChild(li);
        });

    } catch (err) {
        list.innerHTML = `<li class="empty error">Fehler beim Laden</li>`;
        console.error(err);
    }
}
