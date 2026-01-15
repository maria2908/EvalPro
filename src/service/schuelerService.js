const db = require('../db/connection');

function insertSchueler(schueler, callback) {
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

  db.run(sql, values, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
}

module.exports = { insertSchueler };
