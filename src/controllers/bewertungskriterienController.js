// controller/bewertungskriteriumController.js
const { insertBewertungskriterium } = require('../service/bewertungskriteriumService');

/**
 * Add a new Bewertungskriterium
 * POST /bewertungskriterium
 */
async function addBewertungskriterium(req, res) {
  try {
    const {
      bewertungsteil,
      bewertungskriterium,
      punkte,
      kommentare
    } = req.body;

    // Basis-Validierung
    if (!bewertungsteil || !bewertungskriterium || punkte === undefined) {
      return res.status(400).json({
        error: 'Missing required Bewertungskriterium fields'
      });
    }

    const result = await insertBewertungskriterium({
      bewertungsteil,
      bewertungskriterium,
      punkte,
      kommentare
    });

    res.status(201).json({
      message: 'Bewertungskriterium successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Bewertungskriterium:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addBewertungskriterium };
