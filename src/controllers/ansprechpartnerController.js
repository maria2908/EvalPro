// controller/ansprechpartnerController.js
const { insertAnsprechpartner } = require('../service/ansprechpartnerService');

/**
 * Add a new Ansprechpartner
 * POST /ansprechpartner/add
 */
async function addAnsprechpartner(req, res) {
  try {
    const { name, vorname, tel } = req.body;

    // Einfache Validierung
    if (!name || !vorname || !tel) {
      return res.status(400).json({
        error: 'Missing required Ansprechpartner fields'
      });
    }

    const result = await insertAnsprechpartner({
      name,
      vorname,
      tel
    });

    res.status(201).json({
      message: 'Ansprechpartner successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Ansprechpartner:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addAnsprechpartner };
