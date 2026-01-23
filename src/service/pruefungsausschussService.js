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
 * Update Pruefungsausschuss (nur wenn Änderungen vorliegen)
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<boolean>} true = updated, false = no changes
 */
function updatePruefungsausschuss(id, data) {
  const sql = `
    UPDATE pruefungsausschuss
    SET bezeichnung = ?,
        ausbildungsberuf = ?,
        pruefungstage = ?
    WHERE ID = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        data.bezeichnung,
        data.ausbildungsberuf,
        data.pruefungstage,
        id
      ],
      function (err) {
        if (err) {
          console.error('Update Pruefungsausschuss error:', err.message);
          return reject(err);
        }
        resolve(this.changes > 0);
      }
    );
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

/**
 * Delete one Pruefungsausschuss by ID
 * Before deleting, set pruefungsausschuss_id = NULL for all students
 * @param {number} id
 * @returns {Promise<boolean>} Returns true if deleted, false if not found
 */
function removePruefungsausschussById(id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `UPDATE schueler SET pruefungsausschuss_id = NULL WHERE pruefungsausschuss_id = ?`,
        [id],
        function (err) {
          if (err) {
            console.error('Error clearing FK in schueler:', err.message);
            return reject(err);
          }
          console.log(`FKs cleared for ${this.changes} students`);

          db.run(
            `DELETE FROM pruefungsausschuss WHERE ID = ?`,
            [id],
            function (err) {
              if (err) {
                console.error('Delete Pruefungsausschuss by ID error:', err.message);
                return reject(err);
              }
              console.log(`Pruefungsausschuss deleted: ${this.changes > 0}`);
              resolve(this.changes > 0);
            }
          );
        }
      );
    });
  });
}

module.exports = { 
  insertPruefungsausschuss,
  selectAllPruefungsausschuss,
  selectPruefungsausschussById,
  selectPruefungsausschussByBezeichnung,
  updatePruefungsausschuss,
  removePruefungsausschussById
};