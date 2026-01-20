const db = require('../config/connection');

/**
 * Insert Pruefungsteil 2 into database
 *
 * @param {Object} data
 * @param {string} data.pruefungsbereich
 * @param {number} data.punktzahl
 * @returns {Promise<{id: number}>}
 */
function insertPruefungteil2(data) {
  const sql = `
    INSERT INTO pruefungteil2 (pruefungsbereich, punktzahl)
    VALUES (?, ?)
  `;

  const values = [
    data.pruefungsbereich,
    data.punktzahl
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Pruefungsteil2 error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertPruefungteil2 };
