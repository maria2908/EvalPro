const express = require('express');
const path = require('path');
const cors = require('cors');

const ansprechpartnerRoutes = require('./src/routes/ansprechpartnerRoutes');
const schuellerRoutes = require('./src/routes/schuellerRoutes');
const pruefungsausschussRoutes = require('./src/routes/pruefungsausschussRoutes');


const initDatabase = require('./src/db/initDatabase');

async function startApp() {
  try {
    // Initialize database
    await initDatabase();
    console.log('✅ Database initialized');

    const app = express();

    // Middlewares
    app.use(express.json()); // replaces body-parser
    app.use(cors());

    // Static files
    app.use(express.static(path.join(__dirname, 'public')));

    // API Routes
    app.use('/api/ansprechpartner', ansprechpartnerRoutes);
    app.use('/api/pruefungsausschuss', pruefungsausschussRoutes);
    app.use('/api/schueler', schuellerRoutes);

    // Health check (VERY useful for testing)
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });

    // Root → Landing page
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // 404 handler (helps debugging)
    app.use((req, res) => {
      res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
      });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📌 API base path: /api');
    });

  } catch (err) {
    console.error('❌ Failed to start application:', err);
    process.exit(1);
  }
}

startApp();
