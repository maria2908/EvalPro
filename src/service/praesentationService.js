const db = require('../config/connection');

function insertPraesentation(data, callback) {
  const sql = `
    INSERT INTO praesentation (bewertungskriterium, gesamtpunkte, )
    VALUES (?, ?)
  `;

  const params = [
      data.bewertungskriterium,
      data.gesamtpunkte
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

module.exports = { insertPraesentation };
