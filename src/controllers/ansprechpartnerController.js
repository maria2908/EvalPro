// controller/ansprechpartnerController.js
const {
  insertAnsprechpartner,
  selectAnsprechpartnerById,
  removeAnsprechpartnerById
 } = require('../service/ansprechpartnerService');

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

/**
 * GET /ansprechpartner/:id
 */
async function getAnsprechpartnerById(req, res) {
  try {
    const { id } = req.params;

    const result = await selectAnsprechpartnerById(id);

    if (!result) {
      return res.status(404).json({
        error: 'Ansprechpartner not found'
      });
    }

    res.status(200).json(result);

  } catch (err) {
    console.error('Error fetching Ansprechpartner by ID:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}


/**
 * DELETE /ansprechpartner/:id
 */
async function deleteAnsprechpartnerById(req, res) {
  try {
    const { id } = req.params;

    const existing = await selectAnsprechpartnerById(id);
    if (!existing) {
      return res.status(404).json({
        error: 'Ansprechpartner not found'
      });
    }

    const deleted = await removeAnsprechpartnerById(id);

    if (deleted) {
      res.status(200).json({
        message: 'Ansprechpartner erfolgreich gelöscht',
        id: id
      });
    } else {
      res.status(500).json({
        error: 'Löschen fehlgeschlagen'
      });
    }

  } catch (err) {
    console.error('Error deleting Ansprechpartner by ID:', err);
    res.status(500).json({
      error: 'Database delete failed',
      details: err.message
    });
  }
}


module.exports = {
  addAnsprechpartner,
  getAnsprechpartnerById,
  deleteAnsprechpartnerById
 };
