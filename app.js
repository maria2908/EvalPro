const db = require('./src/service/connection.js');
const initDatabase = require('./src/service/initDatabase');

async function startApp() {
    try {
        await initDatabase();
        console.log('Database initialized. Running app logic...');
    
        // Example query to test
        db.all('SELECT * FROM Schueler;', (err, rows) => {
          if (err) {
            console.error('Query error:', err.message);
          } else {
            console.log('Schueler data:', rows);
          }
    
          db.close((err) => {
            if (err) console.error('Error closing DB:', err.message);
            else console.log('Database connection closed.');
          });
        });
      } catch (err) {
        console.error('Database initialization failed:', err.message);
      }
}

startApp();
