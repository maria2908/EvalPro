// Importiert das sqlite3-Paket im "verbose"-Modus
// → liefert detailliertere Fehlermeldungen
const sqlite3 = require('sqlite3').verbose();

/**
 * Erstellt eine Verbindung zur SQLite-Datenbank
 * 
 * - './database.db' → Datenbankdatei
 * - OPEN_READWRITE → Datei muss existieren (lesen & schreiben)
 */
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');

        // 🔥 WICHTIG: Foreign Keys aktivieren
        db.run('PRAGMA foreign_keys = ON;', (err) => {
            if (err) {
                console.error('Failed to enable foreign keys:', err.message);
            } else {
                console.log('✅ Foreign keys enabled');
            }
        });
    }
});

// Exportiert die Datenbankverbindung für andere Module
module.exports = db;
