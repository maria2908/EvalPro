// controller/dokumentationController.js
const { insertDokumentation } = require('../service/dokumentationService');

/**
 * Add a new Dokumentation
 * POST /dokumentation
 */
async function addDokumentation(req, res) {
  try {
    const { bewertungskriterium, gesamtpunkte } = req.body;

    // Basis-Validierung
    if (!bewertungskriterium || gesamtpunkte === undefined) {
      return res.status(400).json({
        error: 'Missing required Dokumentation fields'
      });
    }

    const result = await insertDokumentation({
      bewertungskriterium,
      gesamtpunkte
    });

    res.status(201).json({
      message: 'Dokumentation successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Dokumentation:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addDokumentation };
