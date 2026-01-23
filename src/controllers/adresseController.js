// controller/adresseController.js
const { 
  insertAdresse,
  selectAdresseById,
  updateAdresse,
  removeAdresseById
} = require('../service/adresseService');

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

async function getAdresseById(req, res) {
  try {
    const { id } = req.params;

    const result = await selectAdresseById(id);

    if (!result) {
      return res.status(404).json({
        error: 'Adress not found'
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Adress by ID:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

async function updateAdresseById(req, res) {
  try {
    const { id } = req.params;
    const { strasse, hausnummer, plz, stadt } = req.body;

    if (!strasse || !hausnummer || !plz || !stadt) {
      return res.status(400).json({
        error: 'Missing required Adresse fields'
      });
    }

    const existing = await selectAdresseById(id);

    if (!existing) {
      return res.status(404).json({
        error: 'Adresse not found'
      });
    }

    const hasChanges =
      existing.strasse !== strasse ||
      existing.hausnummer !== hausnummer ||
      existing.plz !== plz ||
      existing.stadt !== stadt;

    if (!hasChanges) {
      return res.status(200).json({
        message: 'No changes detected'
      });
    }

    await updateAdresse,
(id, {
      strasse,
      hausnummer,
      plz,
      stadt
    });

    res.status(200).json({
      message: 'Adresse successfully updated'
    });

  } catch (err) {
    console.error('Error updating Adresse:', err);
    res.status(500).json({
      error: 'Database update failed',
      details: err.message
    });
  }
}

async function deleteAdresseById(req, res) {
  try {
    const { id } = req.params;

    const existing = await selectAdresseById(id);
    if (!existing) {
      return res.status(404).json({
        error: 'Adresse not found'
      });
    }

    const deleted = await removeAdresseById(id);

    if (deleted) {
      res.status(200).json({
        message: 'Adresse erfolgreich gelöscht',
        id: id
      });
    } else {
      res.status(500).json({
        error: 'Löschen fehlgeschlagen'
      });
    }
  } catch (err) {
    console.error('Error deleting Adresse by ID:', err);
    res.status(500).json({
      error: 'Database delete failed',
      details: err.message
    });
  }
}


module.exports = { 
  addAdresse,
  getAdresseById,
  updateAdresseById,
  deleteAdresseById
};
