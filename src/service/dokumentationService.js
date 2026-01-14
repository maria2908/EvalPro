// service/dokumentationService.js
const db = require('../db/connection');

/**
 * Insert a new Dokumentation into database
 *
 * @param {Object} dokumentation
 * @param {number|string} dokumentation.bewertungskriterium
 * @param {number} dokumentation.gesamtpunkte
 * @returns {Promise<{id: number}>}
 */
function insertDokumentation(dokumentation) {
  const sql = `
    INSERT INTO dokumentation (bewertungskriterium, gesamtpunkte)
    VALUES (?, ?)
  `;

  const values = [
    dokumentation.bewertungskriterium,
    dokumentation.gesamtpunkte
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Dokumentation error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertDokumentation };
