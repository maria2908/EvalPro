const express = require('express');
const router = express.Router();

const {
  addSchueler,
  getSchuelers,
  getSchueler,
  getSchuelerAdresse
} = require('../controllers/schuelerController');

// IMPORTANT: specific routes FIRST
router.get('/:id/adresse', getSchuelerAdresse);

// other routes
router.get('/', getSchuelers);
router.get('/:name', getSchueler);
router.post('/', addSchueler);

module.exports = router;
