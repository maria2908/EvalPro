const db = require('../config/connection');

function insertMuendliche_Zusatzpruefung(data, callback) {
  const sql = `
    INSERT INTO muendliche_Zusatzpruefung (pruefungsbereich, punktzahl)
    VALUES (?, ?)
  `;

  const params = [
      data.pruefungsbereich,
      data.punktzahl
    ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Insert error:', err.message);
      callback(err);
    } else {
      console.log('Insert successful, ID:', this.lastID);
      callback(null, { id: this.lastID });
    }
  });
}

module.exports = { insertMuendliche_Zusatzpruefung };
