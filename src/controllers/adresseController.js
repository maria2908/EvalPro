// controller/adresseController.js
const { insertAdresse } = require('../service/adresseService');

/**
 * Add a new Adresse
 * POST /adresse
 */
async function addAdresse(req, res) {
  try {
    const { strasse, hausnummer, plz, stadt } = req.body;

    // Einfache Validierung
    if (!strasse || !hausnummer || !plz || !stadt) {
      return res.status(400).json({
        error: 'Missing required address fields'
      });
    }

    const result = await insertAdresse({
      strasse,
      hausnummer,
      plz,
      stadt
    });

    res.status(201).json({
      message: 'Adresse successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding Adresse:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

module.exports = { addAdresse };
