document.addEventListener('DOMContentLoaded', () => {
    loadPruefungsausschuesse();
    loadSchueler();
});

/* PRÜFUNGSAUSSCHUSS SPEICHERN */

document.addEventListener('DOMContentLoaded', () => {
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
            console.log(result);
            alert(JSON.stringify(result));
            
        } catch (err) {
            alert('Fehler beim Senden: ' + err.message);
        }
    });
});

/* PRÜFUNGSAUSSCHUSS AUSGEBEN */

async function loadPruefungsausschuesse() {
    const select = document.getElementById('ausschuss');

    try {
        const res = await fetch('/api/pruefungsausschuss/list');
        const result = await res.json();
        const data = Array.isArray(result) ? result : result.data;

        data.forEach(pa => {
            const option = document.createElement('option');
            option.value = pa.ID;          // 👈 WICHTIG: ID!
            option.textContent = pa.bezeichnung;
            select.appendChild(option);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Prüfungsausschüsse', err);
    }
}


/* SCHÜLER + AUSBILDER SPEICHERN */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schuelerForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));
        console.log(formData);

        try {
            /* ADRESSE SPEICHERN */
            const adresseRes = await fetch('/api/adresse/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    strasse: formData.strasse,
                    hausnummer: formData.hausnummer,
                    plz: formData.plz,
                    ort: formData.ort
                })
            });

            const adresseResult = await adresseRes.json();
            const adresseId = adresseResult.id;

            /* ANSPRECHPARTNER SPEICHERN */
            const ansprechpartnerRes = await fetch('/api/ansprechpartner/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vorname: formData.ausbilderVorname,
                    nachname: formData.ausbilderNachname,
                    betrieb: formData.betrieb,
                    telefon: formData.telefon
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
                    address: adresseId,
                    ansprechpartner_id: ansprechpartnerId,
                    pruefungsausschuss_id: formData.pruefungsausschuss_id || null
                })
            });

            alert('Schüler erfolgreich gespeichert');

        } catch (err) {
            console.error(err);
            alert('Fehler beim Speichern');
        }
    });
});