// Importiert die bestehende Datenbankverbindung (z. B. SQLite)
const db = require('../db/connection');

/**
 * Fügt einen neuen Fachgespraech in die Datenbank ein
 * 
 * @param {Object} data - Enthält die Fachgespraech-Daten
 * @param {id} data.bewertungskriterium - Bewertungskriterium
 * @param {number} data.gesamtpunkte - Gesamtpunkte
 * @param {Function} callback - Callback-Funktion für Erfolg oder Fehler
 */
function insertFachgespraech(data, callback) {

  // SQL-Statement zum Einfügen eines Datensatzes
  const sql = `
    INSERT INTO fachgespraech (bewertungskriterium, gesamtpunkte)
    VALUES (?, ?)
  `;

  // Führt das SQL-Statement mit Platzhaltern aus (Schutz vor SQL-Injection)
  db.run(sql, [data.bewertungskriterium, data.gesamtpunkte], function (err) {

    // Fehlerbehandlung
    if (err) {
      console.error('Insert error:', err.message);
      callback(err);
    } else {
      // Erfolgreiches Insert → letzte eingefügte ID zurückgeben
      console.log('Insert successful, ID:', this.lastID);
      callback(null, { id: this.lastID });
    }
  });
}

// Exportiert die Funktion für andere Module (z. B. Routes)
module.exports = { insertDokumentation };
