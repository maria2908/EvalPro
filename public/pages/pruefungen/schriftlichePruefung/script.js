/* SCHÜLER + AUSBILDER SPEICHERN */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schriftlichePruefungForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));

        try {
            

            const ansprechpartnerResult = await ansprechpartnerRes.json();
            const ansprechpartnerId = ansprechpartnerResult.id;

                // AP1_punkte INTEGER,
                // AP2GA1_punkte INTEGER,
                // AP2GA2_punkte INTEGER,
                // AP2GA3_punkte INTEGER,

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