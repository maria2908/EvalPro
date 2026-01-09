const db = require('../config/connection.js');
const createTables = require('./createTables.js');

function initDatabase() {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='schueler';",
            async (err, row) => {
                if (err) return reject(err);

                if (!row) {
                    console.log(' No tables found — creating them...');
                    try {
                        await createTables(db);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    console.log('Tables already exist.');
                    resolve();
                }
            }
        );
    });
}

module.exports = initDatabase;