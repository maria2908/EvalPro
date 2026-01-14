const db = require('../config/connection');

function insertPruefungteil2(data, callback) {
  const sql = `
    INSERT INTO pruefungteil2 (pruefungsbereich, punktzahl)
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

module.exports = { insertPruefungteil2 };
