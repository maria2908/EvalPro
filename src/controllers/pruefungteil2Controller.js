const { insertPruefungteil2 } = require('../service/pruefungteil2Service');

/**
 * Add Pruefungsteil 2
 * POST /pruefungteil2
 */
async function addPruefungteil2(req, res) {
  try {
    const { pruefungsbereich, punktzahl } = req.body;

    // einfache Validierung
    if (!pruefungsbereich || punktzahl === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: pruefungsbereich, punktzahl'
      });
    }

    const result = await insertPruefungteil2({
      pruefungsbereich,
      punktzahl
    });

    res.status(201).json({
      message: 'Pruefungsteil2 successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Pruefungsteil2:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addPruefungteil2 };
