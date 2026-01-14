// controller/fachgespraechController.js
const { insertFachgespraech } = require('../service/fachgespraechService');

/**
 * Add a new Fachgespraech
 * POST /fachgespraech
 */
async function addFachgespraech(req, res) {
  try {
    const { bewertungskriterium, gesamtpunkte } = req.body;

    // Basis-Validierung
    if (!bewertungskriterium || gesamtpunkte === undefined) {
      return res.status(400).json({
        error: 'Missing required Fachgespraech fields'
      });
    }

    const result = await insertFachgespraech({
      bewertungskriterium,
      gesamtpunkte
    });

    res.status(201).json({
      message: 'Fachgespraech successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Fachgespraech:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addFachgespraech };
