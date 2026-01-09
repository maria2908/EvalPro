const express = require('express');
const router = express.Router();
const { addAnsprechpartner } = require('../controllers/ansprechpartnerController');

router.post('/', addAnsprechpartner);

module.exports = router;
