const initDatabase = require('./src/db/initDatabase.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ansprechpartnerRoutes = require('./src/routes/ansprechpartnerRoutes.js');
const path = require('path');


async function startApp() {
    try {
        await initDatabase();
        console.log('Database initialized. Running app logic...');

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        // Routes
        app.use('/index', ansprechpartnerRoutes);

        app.get('/', (req, res) => {
          res.sendFile(path.join(__dirname, 'index.html'));
        });

        app.listen(3000, () => {
          console.log('Server is running on http://localhost:3000');
        });
    
      } catch (err) {
        console.error('Database initialization failed:', err.message);
      }
}

startApp();