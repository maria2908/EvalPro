// service/schuelerService.js
const db = require('../db/connection');

/**
 * Insert new Schueler
 */
function insertSchueler(schueler) {
  const sql = `
    INSERT INTO schueler (
      name, vorname, ausbildungsbetrieb,
      address, ansprechpartner, pruefungsausschuss,
      dok_punkte, fach_punkte, praesentation_punkte,
      pruefungteil1_punkte, pruefungteil2_punkte, muendliche_punkte
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    schueler.name,
    schueler.vorname,
    schueler.ausbildungsbetrieb,
    schueler.address,
    schueler.ansprechpartner,
    schueler.pruefungsausschuss,
    schueler.dok_punkte,
    schueler.fach_punkte,
    schueler.praesentation_punkte,
    schueler.pruefungteil1_punkte,
    schueler.pruefungteil2_punkte,
    schueler.muendliche_punkte
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Insert error:', err.message);
        return reject(err);
      }
      resolve({ id: this.lastID });
    });
  });
}

/**
 * Select all Schueler
 */
function selectSchuelers() {
  const sql = `SELECT * FROM schueler`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Select all error:', err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

/**
 * Select Schueler by name
 */
function selectSchueler(name) {
  const sql = `SELECT * FROM schueler WHERE name = ?`;

  return new Promise((resolve, reject) => {
    db.all(sql, [name], (err, rows) => {
      if (err) {
        console.error('Select by name error:', err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  insertSchueler,
  selectSchuelers,
  selectSchueler
};
