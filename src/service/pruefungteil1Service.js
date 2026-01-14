const db = require('../config/connection');

/**
 * Insert Pruefungsteil 1 into database
 *
 * @param {Object} data
 * @param {string} data.pruefungsbereich
 * @param {number} data.punktzahl
 * @returns {Promise<{id: number}>}
 */
function insertPruefungteil1(data) {
  const sql = `
    INSERT INTO pruefungteil1 (
      pruefungsbereich,
      punktzahl
    ) VALUES (?, ?)
  `;

  const values = [
    data.pruefungsbereich,
    data.punktzahl
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Pruefungteil1 error:', err.message);
        return reject(err);
      }

      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertPruefungteil1 };
