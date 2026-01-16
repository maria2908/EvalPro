// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const {
  addMuendliche_Zusatzpruefung,
  getListMuendliche_Zusatzpruefung,
  getMuendliche_ZusatzpruefungById
} = require('../controllers/muendliche_ZusatzpruefungController');

/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
// POST /api/muendliche_Zusatzpruefung
router.post('/add', addMuendliche_Zusatzpruefung);

// GET alle
router.get('/list', getListMuendliche_Zusatzpruefung);

// GET per ID
router.get('/id/:id', getMuendliche_ZusatzpruefungById);

// Router für die Verwendung in der App exportieren
module.exports = router;
