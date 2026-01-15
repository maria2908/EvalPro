// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const {
  addPruefungsausschuss,
  listPruefungsausschuss,
  getPruefungsausschussById,
  getPruefungsausschussByBezeichnung
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
router.get('/list', listPruefungsausschuss);

// GET per ID
router.get('/id/:id', getPruefungsausschussById);

// GET per Bezeichnung
router.get('/by-name/:bezeichnung', getPruefungsausschussByBezeichnung);

// Router für die Verwendung in der App exportieren
module.exports = router;
