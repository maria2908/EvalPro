// Importiert das sqlite3-Paket im "verbose"-Modus
// → liefert detailliertere Fehlermeldungen
const sqlite3 = require('sqlite3').verbose();

/**
 * Erstellt eine Verbindung zur SQLite-Datenbank
 * 
 * - './database.db' → Datenbankdatei
 * - OPEN_READWRITE | OPEN_CREATE → Datei wird erstellt falls nicht vorhanden
 * - Foreign Keys werden automatisch aktiviert
 */
const db = new sqlite3.Database(
    './database.db', 
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,  // ✅ Erstellt DB falls nicht vorhanden
    (err) => {
        if (err) {
            console.error('❌ Error connecting to database:', err.message);
        } else {
            console.log('✅ Connected to SQLite database.');
            
            // 🔥 WICHTIG: Foreign Keys aktivieren
            // SQLite hat Foreign Keys standardmäßig DEAKTIVIERT!
            db.run('PRAGMA foreign_keys = ON;', (err) => {
                if (err) {
                    console.error('❌ Failed to enable foreign keys:', err.message);
                } else {
                    console.log('✅ Foreign keys enabled');
                }
            });
        }
    }
);

// Exportiert die Datenbankverbindung für andere Module
module.exports = db;