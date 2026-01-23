function initVerwaltung() {
    if (document.getElementById('schuelerForm')) {
        loadPruefungsausschuesse();
        saveSchueler();
    }

    if (document.getElementById('pruefungsausschussForm')) {
        savePruefungsausschuss();
    }
}

initVerwaltung();


/* PRÜFUNGSAUSSCHUSS SPEICHERN */

function savePruefungsausschuss() {
    const form = document.getElementById('pruefungsausschussForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
    
        try {
            const res = await fetch('/api/pruefungsausschuss/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            alert(JSON.stringify(result));

            loadPage("dashboard/dashboard");
        
        } catch (err) {
            alert('Fehler beim Senden: ' + err.message);
        }
    });
}

/* PRÜFUNGSAUSSCHUSS AUSGEBEN */

async function loadPruefungsausschuesse() {
    const select = document.getElementById('pruefungsausschuss_id');

    try {
        const res = await fetch('/api/pruefungsausschuss/list');
        const result = await res.json();
        const data = Array.isArray(result) ? result : result.data;

        data.forEach(pa => {
            const option = document.createElement('option');
            option.value = pa.ID;
            
            option.textContent = pa.bezeichnung;
            select.appendChild(option);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Prüfungsausschüsse', err);
    }
}

/* SCHÜLER + AUSBILDER SPEICHERN */
function saveSchueler() {
    const form = document.getElementById('schuelerForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = Object.fromEntries(new FormData(form));

        try {
            /* ANSPRECHPARTNER SPEICHERN */
            const ansprechpartnerRes = await fetch('/api/ansprechpartner/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.ausbilderNachname,
                    vorname: formData.ausbilderVorname,
                    tel: formData.telefon
                })
            });
            const ansprechpartnerResult = await ansprechpartnerRes.json();
            const ansprechpartnerId = ansprechpartnerResult.id;


            /* SCHÜLER SPEICHERN */
            const schuelerRes = await fetch('/api/schueler/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    vorname: formData.vorname,
                    thema: formData.thema,
                    ausbildungsbetrieb: formData.betrieb,
                    ansprechpartner_id: ansprechpartnerId,
                    pruefungsausschuss_id: Number(formData.pruefungsausschuss_id)
                })
            });

            console.log("schuelerRes: ", schuelerRes);
    
            loadPage("dashboard/dashboard");
    
        } catch (err) {
            console.error(err);
            alert('Fehler beim Speichern');
        }
    });
}
