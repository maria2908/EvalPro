const db = require('../config/connection');

function insertAnsprechpartner(data, callback) {
  const sql = `
    INSERT INTO Ansprechpartner (name, vorname, tel)
    VALUES (?, ?, ?)
  `;
  db.run(sql, [data.name, data.vorname, data.tel], function (err) {
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
