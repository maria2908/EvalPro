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

module.exports = { insertAdresse };
