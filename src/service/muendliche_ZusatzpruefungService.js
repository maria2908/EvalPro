// service/muendliche_ZusatzpruefungService.js
const db = require('../config/connection');

/**
 * Insert a new mündliche Zusatzprüfung into database
 *
 * @param {Object} zusatzpruefung
 * @param {string} zusatzpruefung.pruefungsbereich
 * @param {number} zusatzpruefung.punktzahl
 * @returns {Promise<{id: number}>}
 */
function insertMuendliche_Zusatzpruefung(zusatzpruefung) {
  const sql = `
    INSERT INTO muendliche_Zusatzpruefung (pruefungsbereich, punktzahl)
    VALUES (?, ?)
  `;

  const values = [
    zusatzpruefung.pruefungsbereich,
    zusatzpruefung.punktzahl
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert mündliche Zusatzprüfung error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertMuendliche_Zusatzpruefung };
