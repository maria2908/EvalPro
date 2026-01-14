const db = require('../config/connection');

function insertBewertungskriterium(data, callback) {
  const sql = `
    INSERT INTO bewertungskriterium (bewertungsteil, bewertungskriterium, punkte, kommentare)
    VALUES (?, ?, ?, ?)
  `;

  const params = [
      data.bewertungsteil,
      data.bewertungskriterium,
      data.punkte,
      data.kommentare
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

module.exports = { insertBewertungskriterium };
