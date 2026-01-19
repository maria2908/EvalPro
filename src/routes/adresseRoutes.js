// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const {
  addAdresse,
  getAdresseById,
  deleteAdresseById
} = require('../controllers/adresseController');

/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
// POST /api/adresse
router.post('/add', addAdresse);

// GET per ID
router.get('/id/:id', getAdresseById);

// Delete per ID
router.get('/delete/id/:id', deleteAdresseById);

// Router für die Verwendung in der App exportieren
module.exports = router;
