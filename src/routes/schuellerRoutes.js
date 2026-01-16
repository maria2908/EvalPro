// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Schuelers
const {
  addSchueler,
  getListSchuelers,
  getSchuelerByName,
  getSchuelerAdresse,
  getSchuelerById
} = require('../controllers/schuelerController');


/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
// POST /api/schueler
router.post('/add', addSchueler);


// GET alle
router.get('/list', getListSchuelers);

// GET per ID
router.get('/id/:id', getSchuelerById);


// GET per Name
router.get('/by-name/:name', getSchuelerByName);


// GET adresse per ID
router.get('/id/:id/adresse', getSchuelerAdresse);

module.exports = router;
