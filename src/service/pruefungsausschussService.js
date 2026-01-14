const db = require('../config/connection');

function insertPruefungsausschuss(data, callback) {
  const sql = `
    INSERT INTO pruefungsausschuss (bezeichnung, ausbildungsberuf, pruefungstage)
    VALUES (?, ?, ?)
  `;

  const params = [
      data.bezeichnung,
      data.ausbildungsberuf,
      data.pruefungstage
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

module.exports = { insertAnsprechpartner };
