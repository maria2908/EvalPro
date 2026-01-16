// service/ansprechpartnerService.js
const db = require('../db/connection');

/**
 * Insert a new Ansprechpartner into database
 *
 * @param {Object} ansprechpartner
 * @param {string} ansprechpartner.name
 * @param {string} ansprechpartner.vorname
 * @param {string} ansprechpartner.tel
 * @returns {Promise<{id: number}>}
 */
function insertAnsprechpartner(ansprechpartner) {
  const sql = `
    INSERT INTO Ansprechpartner (name, vorname, tel)
    VALUES (?, ?, ?)
  `;

  const values = [
    ansprechpartner.name,
    ansprechpartner.vorname,
    ansprechpartner.tel
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Ansprechpartner error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertAnsprechpartner };
