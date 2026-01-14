// service/bewertungskriteriumService.js
const db = require('../config/connection');

/**
 * Insert a new Bewertungskriterium into database
 *
 * @param {Object} kriterium
 * @param {string} kriterium.bewertungsteil
 * @param {string} kriterium.bewertungskriterium
 * @param {number} kriterium.punkte
 * @param {string} [kriterium.kommentare]
 * @returns {Promise<{id: number}>}
 */
function insertBewertungskriterium(kriterium) {
  const sql = `
    INSERT INTO bewertungskriterium (
      bewertungsteil,
      bewertungskriterium,
      punkte,
      kommentare
    ) VALUES (?, ?, ?, ?)
  `;

  const values = [
    kriterium.bewertungsteil,
    kriterium.bewertungskriterium,
    kriterium.punkte,
    kriterium.kommentare ?? null
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Bewertungskriterium error:', err.message);
        return reject(err);
      }

      // SQLite: ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertBewertungskriterium };
