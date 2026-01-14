// service/pruefungsausschussService.js
const db = require('../config/connection');

/**
 * Insert a new Pruefungsausschuss into database
 *
 * @param {Object} pruefungsausschuss
 * @param {string} pruefungsausschuss.bezeichnung
 * @param {string} pruefungsausschuss.ausbildungsberuf
 * @param {string|number} pruefungsausschuss.pruefungstage
 * @returns {Promise<{id: number}>}
 */
function insertPruefungsausschuss(pruefungsausschuss) {
  const sql = `
    INSERT INTO pruefungsausschuss (
      bezeichnung,
      ausbildungsberuf,
      pruefungstage
    ) VALUES (?, ?, ?)
  `;

  const values = [
    pruefungsausschuss.bezeichnung,
    pruefungsausschuss.ausbildungsberuf,
    pruefungsausschuss.pruefungstage
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Pruefungsausschuss error:', err.message);
        return reject(err);
      }

      // SQLite liefert die ID des neu angelegten Datensatzes
      resolve({ id: this.lastID });
    });
  });
}

module.exports = { insertPruefungsausschuss };
