// Importiert das sqlite3-Paket im "verbose"-Modus
// → liefert detailliertere Fehlermeldungen
const sqlite3 = require('sqlite3').verbose();

/**
 * Erstellt eine Verbindung zur SQLite-Datenbank
 * 
 * - './database.db' → Datenbankdatei
 * - OPEN_READWRITE → Datei muss existieren (lesen & schreiben)
 */
const db = new sqlite3.Database(
    './database.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            // Fehler beim Verbinden mit der Datenbank
            console.error('Error connecting to database:', err.message);
        } else {
            // Erfolgreiche Verbindung
            console.log('Connected to SQLite database.');
            
            // ⚠️ WICHTIG: Foreign Keys HIER aktivieren! ⚠️
            db.run('PRAGMA foreign_keys = ON;', (err) => {
                if (err) {
                    console.error('❌ Error enabling foreign keys:', err);
                } else {
                    console.log('✅ Foreign keys enabled globally');
                }
            });
        }
    }
);

// Exportiert die Datenbankverbindung für andere Module
module.exports = db;