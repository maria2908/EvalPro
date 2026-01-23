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

/**
 * Get Ansprechpartner by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
function selectAnsprechpartnerById(id) {
  const sql = `SELECT * FROM Ansprechpartner WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Fetch Ansprechpartner by ID error:', err.message);
        return reject(err);
      }
      resolve(row || null);
    });
  });
}

function updateAnsprechpartner(id, data) {
  const sql = `
    UPDATE ansprechpartner
    SET name = ?,
        vorname = ?,
        tel = ?
    WHERE ID = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        data.name,
        data.vorname,
        data.tel,
        id
      ],
      function (err) {
        if (err) {
          console.error('Update Ansprechpartner error:', err.message);
          return reject(err);
        }
        resolve(this.changes > 0);
      }
    );
  });
}


/**
 * Delete one Ansprechpartner by ID
 * @param {number} id
 * @returns {Promise<boolean>} Returns true if deleted, false if not found
 */
function removeAnsprechpartnerById(id) {
  const sql = `DELETE FROM Ansprechpartner WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        console.error('Delete Ansprechpartner by ID error:', err.message);
        return reject(err);
      }

      // this.changes = Anzahl der gelöschten Zeilen
      resolve(this.changes > 0);
    });
  });
}


module.exports = {
  insertAnsprechpartner,
  selectAnsprechpartnerById,
  updateAnsprechpartner,
  removeAnsprechpartnerById
 };
