// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const { addAnsprechpartner } = require('../controllers/ansprechpartnerController');


/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
router.post('/', addAnsprechpartner);

// Router für die Verwendung in der App exportieren
module.exports = router;
