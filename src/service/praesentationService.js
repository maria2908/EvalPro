// service/praesentationService.js
const db = require('../config/connection');

/**
 * Insert a new Praesentation into database
 *
 * @param {Object} praesentation
 * @param {number|string} praesentation.bewertungskriterium
 * @param {number} praesentation.gesamtpunkte
 * @returns {Promise<{id: number}>}
 */
function insertPraesentation(praesentation) {
  const sql = `
    INSERT INTO praesentation (bewertungskriterium, gesamtpunkte)
    VALUES (?, ?)
  `;

  const values = [
    praesentation.bewertungskriterium,
    praesentation.gesamtpunkte
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Praesentation error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertPraesentation };
