// controller/pruefungsausschussController.js
const { insertPruefungsausschuss } = require('../service/pruefungsausschussService');

/**
 * Add a new Pruefungsausschuss
 * POST /pruefungsausschuss
 */
async function addPruefungsausschuss(req, res) {
  try {
    const { bezeichnung, ausbildungsberuf, pruefungstage } = req.body;

    // Basis-Validierung
    if (!bezeichnung || !ausbildungsberuf || !pruefungstage) {
      return res.status(400).json({
        error: 'Missing required Pruefungsausschuss fields'
      });
    }

    const result = await insertPruefungsausschuss({
      bezeichnung,
      ausbildungsberuf,
      pruefungstage
    });

    res.status(201).json({
      message: 'Pruefungsausschuss successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Pruefungsausschuss:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addPruefungsausschuss };
