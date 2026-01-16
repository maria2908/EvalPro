const { insertPruefungteil1 } = require('../service/pruefungteil1Service');

/**
 * Add Pruefungsteil 1
 * POST /pruefungteil1
 */
async function addPruefungteil1(req, res) {
  try {
    const { pruefungsbereich, punktzahl } = req.body;

    // einfache Validierung
    if (!pruefungsbereich || punktzahl === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: pruefungsbereich, punktzahl'
      });
    }

    const result = await insertPruefungteil1({
      pruefungsbereich,
      punktzahl
    });

    res.status(201).json({
      message: 'Pruefungteil1 successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Pruefungteil1:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addPruefungteil1 };
