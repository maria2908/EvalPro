// Importiert die bestehende Datenbankverbindung (z. B. SQLite)
const db = require('../db/connection');

/**
 * Fügt einen neuen Adresse in die Datenbank ein
 * 
 * @param {Object} data - Enthält die Adresse-Daten
 * @param {string} data.strasse - Strasse
 * @param {number} data.hausnummer - Hausnummer
 * @param {number} data.plz - PLZ
 * @param {string} data.stadt - Stadt
 * @param {Function} callback - Callback-Funktion für Erfolg oder Fehler
 */
function insertAdresse(data, callback) {

  // SQL-Statement zum Einfügen eines Datensatzes
  const sql = `
    INSERT INTO adresse (stasse, hausnummer, plz, stadt)
    VALUES (?, ?, ?, ?)
  `;

  // Führt das SQL-Statement mit Platzhaltern aus (Schutz vor SQL-Injection)
  db.run(sql, [data.strasse, data.hausnummer, data.plz, data.stadt], function (err) {

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
module.exports = { insertAdresse };
