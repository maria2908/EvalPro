const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const ansprechpartnerRoutes = require('./src/routes/ansprechpartnerRoutes.js');
const pruefungsausschussRoutes = require('./src/routes/pruefungsausschussRoutes');
const initDatabase = require('./src/db/initDatabase.js');

async function startApp() {
    await initDatabase();

    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    // Statische Dateien bereitstellen
    app.use(express.static(path.join(__dirname, 'public')));

    // API-Routen für das Formular
    app.use('/api/ansprechpartner', ansprechpartnerRoutes);
    app.use('/api/pruefungsausschuss', pruefungsausschussRoutes);


    // Root → Landing-Seite
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}

startApp();
