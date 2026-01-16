/* PRÜFUNGSAUSSCHUSS SPEICHERN */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pruefungsausschussForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch('/api/pruefungsausschuss', {
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

/* SCHÜLER + AUSBILDER SPEICHERN */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schuelerForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));

        // SCHÜLER-DATEN
        const schueler = {
            vorname: formData.vorname,
            nachname: formData.nachname,
            strasse: formData.strasse,
            hausnummer: formData.hausnummer,
            plz: formData.plz,
            ort: formData.ort
        };

        //  ANSPRECHPARTNER-DATEN
        const ansprechpartner = {
            vorname: formData.ausbilderVorname,
            nachname: formData.ausbilderNachname,
            betrieb: formData.betrieb,
            telefon: formData.telefon
        };

        try {
            const schuelerRes = await fetch('/api/schueler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(schueler),
            });

            const schuelerResult = await schuelerRes.json();

            // falls du die schueler_id brauchst
            const schuelerId = schuelerResult.id;

            await fetch('/api/ansprechpartner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...ansprechpartner,
                    schuelerId // FK, falls nötig
                }),
            });

            alert('Schüler und Ansprechpartner gespeichert');
        } catch (err) {
            alert('Fehler: ' + err.message);
        }
    });
});
