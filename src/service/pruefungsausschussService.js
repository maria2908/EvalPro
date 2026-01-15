// service/pruefungsausschussService.js
const db = require('../db/connection');

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


/**
 * Get all Pruefungsausschuss records from database
 * @returns {Promise<Array>}
 */

function selectAllPruefungsausschuss() {
  const sql = `SELECT * FROM pruefungsausschuss`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Fetch Pruefungsausschuss error:', err.message);
        return reject(err);
      }
      resolve(rows); // rows ist ein Array mit allen Datensätzen
    });
  });
}

/**
 * Get one Pruefungsausschuss by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
function selectPruefungsausschussById(id) {
  const sql = `SELECT * FROM pruefungsausschuss WHERE ID = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Fetch Pruefungsausschuss by ID error:', err.message);
        return reject(err);
      }
      resolve(row || null); // null if not found
    });
  });
}

/**
 * Get one Pruefungsausschuss by bezeichnung
 * @param {string} bezeichnung
 * @returns {Promise<Object|null>}
 */
function selectPruefungsausschussByBezeichnung(bezeichnung) {
  const sql = `SELECT * FROM pruefungsausschuss WHERE bezeichnung = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [bezeichnung], (err, row) => {
      if (err) {
        console.error('Fetch Pruefungsausschuss by bezeichnung error:', err.message);
        return reject(err);
      }
      resolve(row || null);
    });
  });
}


module.exports = { 
  insertPruefungsausschuss,
  selectAllPruefungsausschuss,
  selectPruefungsausschussById,
  selectPruefungsausschussByBezeichnung
};