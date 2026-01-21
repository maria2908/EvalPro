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
  getSchuelerById,
  deleteSchuelerById
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
// POST /api/schueler/add
router.post('/add', addSchueler);

// GET alle  /api/schueler/list
router.get('/list', getListSchuelers);

// GET per ID  /api/schueler/id/1
router.get('/id/:id', getSchuelerById);

// GET per Name  /api/schueler/by-name/hauck
router.get('/by-name/:name', getSchuelerByName);

// GET adresse per ID /api/schueler/id/1/adresse
router.get('/id/:id/adresse', getSchuelerAdresse);

// DELETE Schueler per ID /api/schueler/delete/id/:id
router.get('/delete/id/:id', deleteSchuelerById);


module.exports = router;
