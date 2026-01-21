// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const {
  addPruefungsausschuss,
  getListPruefungsausschusse,
  getPruefungsausschussById,
  getPruefungsausschussByName,
  updatePruefungsausschussById,
  deletePruefungsausschussById
} = require('../controllers/pruefungsausschussController');

/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
// POST /api/pruefungsausschuss
router.post('/add', addPruefungsausschuss);

// GET alle
router.get('/list', getListPruefungsausschusse);

// GET per ID
router.get('/id/:id', getPruefungsausschussById);

// GET per Bezeichnung
router.get('/by-name/:bezeichnung', getPruefungsausschussByName);

// Update per ID
router.post('/update/id/:id', updatePruefungsausschussById);

// Delete per ID
router.get('/delete/id/:id', deletePruefungsausschussById);

// Router für die Verwendung in der App exportieren
module.exports = router;
