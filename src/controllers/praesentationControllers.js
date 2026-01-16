// controller/praesentationController.js
const { insertPraesentation } = require('../service/praesentationService');

/**
 * Add a new Praesentation
 * POST /praesentation
 */
async function addPraesentation(req, res) {
  try {
    const { bewertungskriterium, gesamtpunkte } = req.body;

    // Basis-Validierung
    if (!bewertungskriterium || gesamtpunkte === undefined) {
      return res.status(400).json({
        error: 'Missing required Praesentation fields'
      });
    }

    const result = await insertPraesentation({
      bewertungskriterium,
      gesamtpunkte
    });

    res.status(201).json({
      message: 'Praesentation successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Praesentation:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addPraesentation };
