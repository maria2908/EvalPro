// service/muendliche_ZusatzpruefungService.js
const db = require('../db/connection');

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

/**
 * Get all mündliche Zusatzprüfungen
 * @returns {Promise<Array>}
 */
function selectAllMuendliche_Zusatzpruefung() {
  const sql = `SELECT * FROM muendliche_Zusatzpruefung`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Fetch mündliche Zusatzprüfung error:', err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

/**
 * Get one mündliche Zusatzprüfung by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
function selectMuendliche_ZusatzpruefungById(id) {
  const sql = `SELECT * FROM muendliche_Zusatzpruefung WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Fetch mündliche Zusatzprüfung by ID error:', err.message);
        return reject(err);
      }
      resolve(row || null);
    });
  });
}

/**
 * Delete one mündliche Zusatzprüfung by ID
 * @param {number} id
 * @returns {Promise<boolean>} Returns true if deleted, false if not found
 */
function removeMuendliche_ZusatzpruefungById(id) {
  const sql = `DELETE FROM muendliche_Zusatzpruefung WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function(err) {
      if (err) {
        console.error('Delete mündliche Zusatzprüfung by ID error:', err.message);
        return reject(err);
      }
      resolve(this.changes > 0);
    });
  });
}



module.exports = {
  insertMuendliche_Zusatzpruefung,
  selectAllMuendliche_Zusatzpruefung,
  selectMuendliche_ZusatzpruefungById,
  removeMuendliche_ZusatzpruefungById
};