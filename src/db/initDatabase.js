// Importiert die bestehende SQLite-Datenbankverbindung
const db = require('./connection.js');

// Importiert die Funktion zum Erstellen der benötigten Tabellen
const createTables = require('./createTables.js');


/**
 * Initialisiert die Datenbank:
 * - Prüft, ob die Tabellen bereits existieren
 * - Erstellt sie bei Bedarf automatisch
 *
 * @returns {Promise<void>} Wird erfüllt, wenn die DB bereit ist
 */
function initDatabase() {
    return new Promise((resolve, reject) => {

        // Prüft, ob eine bestimmte Tabelle existiert
        // (hier: "schueler" als Referenz-Tabelle)
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='schueler';",
            async (err, row) => {

                // Fehler beim Datenbankzugriff
                if (err) return reject(err);

                // Falls keine Tabelle gefunden wurde → DB ist leer
                if (!row) {
                    console.log('No tables found — creating them...');

                    try {
                        // Erstellt alle benötigten Tabellen
                        await createTables(db);
                        resolve();
                    } catch (error) {
                        // Fehler beim Erstellen der Tabellen
                        reject(error);
                    }

                } else {
                    // Tabellen existieren bereits
                    console.log('Tables already exist.');
                    resolve();
                }
            }
        );
    });
}

// Exportiert die Initialisierungsfunktion
module.exports = initDatabase;
