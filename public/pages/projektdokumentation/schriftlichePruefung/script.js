/* SCHÜLER + AUSBILDER SPEICHERN */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schriftlichePruefungForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));

        try {
            const ansprechpartnerResult = await ansprechpartnerRes.json();
            const ansprechpartnerId = ansprechpartnerResult.id;

            /* SCHÜLER SPEICHERN */
            const schuelerRes = await fetch('/api/schueler/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    AP1_punkte: formData.name,
                    AP2GA1_punkte: formData.vorname,
                    AP2GA2_punkte: adresseId,
                    AP2GA3_punkte: ansprechpartnerId,
                })
            });

            alert('Schüler erfolgreich gespeichert');

        } catch (err) {
            console.error(err);
            alert('Fehler beim Speichern');
        }
    });
});

 