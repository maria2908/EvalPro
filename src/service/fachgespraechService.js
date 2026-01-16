// service/fachgespraechService.js
const db = require('../db/connection');

/**
 * Insert a new Fachgespraech into database
 *
 * @param {Object} fachgespraech
 * @param {number|string} fachgespraech.bewertungskriterium
 * @param {number} fachgespraech.gesamtpunkte
 * @returns {Promise<{id: number}>}
 */
function insertFachgespraech(fachgespraech) {
  const sql = `
    INSERT INTO fachgespraech (bewertungskriterium, gesamtpunkte)
    VALUES (?, ?)
  `;

  const values = [
    fachgespraech.bewertungskriterium,
    fachgespraech.gesamtpunkte
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Fachgespraech error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertFachgespraech };
