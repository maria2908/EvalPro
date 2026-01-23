// Express importieren
const express = require('express');

// Neuen Router erstellen (für modulare Routen)
const router = express.Router();

// Controller-Funktion zum Hinzufügen eines Ansprechpartners
const { 
    addAnsprechpartner,
    getAnsprechpartnerById,
    updateAnsprechpartnerById,
    deleteAnsprechpartnerById
 } = require('../controllers/ansprechpartnerController');


/**
 * POST /
 * 
 * Route zum Anlegen eines neuen Ansprechpartners
 * Erwartet JSON-Daten im Request-Body
 * 
 * Beispiel:
 * POST http://localhost:3000/index
 */
// POST /api/ansprechpartner
router.post('/add', addAnsprechpartner);

// GET per ID
router.get('/id/:id', getAnsprechpartnerById);

// Update per ID
router.post('/update/id/:id', updateAnsprechpartnerById)

// Delete per ID
router.get('/delete/id/:id', deleteAnsprechpartnerById);

// Router für die Verwendung in der App exportieren
module.exports = router;


