// service/adresseService.js
const db = require('../db/connection');

/**
 * Insert a new Adresse into database
 *
 * @param {Object} adresse
 * @param {string} adresse.strasse
 * @param {string} adresse.hausnummer
 * @param {string} adresse.plz
 * @param {string} adresse.stadt
 * @returns {Promise<{id: number}>}
 */
function insertAdresse(adresse) {
  const sql = `
    INSERT INTO adresse (strasse, hausnummer, plz, stadt)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    adresse.strasse,
    adresse.hausnummer,
    adresse.plz,
    adresse.stadt
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert Adresse error:', err.message);
        return reject(err);
      }

      // SQLite liefert die neue ID über this.lastID
      resolve({ id: this.lastID });
    });
  });
}

/**
 * Get Adress by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
function selectAdresseById(id) {
  const sql = `SELECT * FROM adresse WHERE ID = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Fetch Adresse by ID error:', err.message);
        return reject(err);
      }
      resolve(row || null); // null if not found
    });
  });
}

/**
 * Delete one Adresse by ID
 * @param {number} id
 * @returns {Promise<boolean>} Returns true if deleted, false if not found
 */
function removeAdresseById(id) {
  const sql = `DELETE FROM adresse WHERE ID = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function(err) {
      if (err) {
        console.error('Delete Adresse by ID error:', err.message);
        return reject(err);
      }
      resolve(this.changes > 0);
    });
  });
}

// function updateAdresse(id) {
//   const sql;
// }

module.exports = { 
  insertAdresse,
  selectAdresseById,
  removeAdresseById
};
