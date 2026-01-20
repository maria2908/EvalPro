// controller/muendlicheZusatzpruefungController.js
const {
  insertMuendliche_Zusatzpruefung,
  selectAllMuendliche_Zusatzpruefung,
  selectMuendliche_ZusatzpruefungById,
  removeMuendliche_ZusatzpruefungById
} = require('../service/muendliche_ZusatzpruefungService');

/**
 * Add a new mündliche Zusatzprüfung
 * POST /muendliche-zusatzpruefung
 */
async function addMuendliche_Zusatzpruefung(req, res) {
  try {
    const { pruefungsbereich, punktzahl } = req.body;

    // Basis-Validierung
    if (!pruefungsbereich || punktzahl === undefined) {
      return res.status(400).json({
        error: 'Missing required Zusatzprüfung fields'
      });
    }

    const result = await insertMuendliche_Zusatzpruefung({
      pruefungsbereich,
      punktzahl
    });

    res.status(201).json({
      message: 'Mündliche Zusatzprüfung successfully added',
      id: result.id
    });

  } catch (err) {
    console.error('Error adding mündliche Zusatzprüfung:', err);
    res.status(500).json({
      error: 'Database insert failed',
      details: err.message
    });
  }
}

/**
 * Get all mündliche Zusatzprüfungen
 * GET /muendliche-zusatzpruefung
 */
async function getListMuendliche_Zusatzpruefung(req, res) {
  try {
    const result = await selectAllMuendliche_Zusatzpruefung();
    console.log('listMuendliche_Zusatzpruefung result:', result);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching mündliche Zusatzprüfungen:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

/**
 * Get mündliche Zusatzprüfung by ID
 * GET /muendliche-zusatzpruefung/:id
 */
async function getMuendliche_ZusatzpruefungById(req, res) {
  try {
    const { id } = req.params;

    const result = await selectMuendliche_ZusatzpruefungById(id);

    if (!result) {
      return res.status(404).json({
        error: 'Mündliche Zusatzprüfung not found'
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching mündliche Zusatzprüfung by ID:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

/**
 * Delete mündliche Zusatzprüfung by ID
 * DELETE /muendliche-zusatzpruefung/:id
 */
async function deleteMuendliche_ZusatzpruefungById(req, res) {
  try {
    const { id } = req.params;

    const existing = await selectMuendliche_ZusatzpruefungById(id);
    if (!existing) {
      return res.status(404).json({
        error: 'Mündliche Zusatzprüfung not found'
      });
    }

    const deleted = await removeMuendliche_ZusatzpruefungById(id);

    if (deleted) {
      res.status(200).json({
        message: 'Mündliche Zusatzprüfung erfolgreich gelöscht',
        id: id
      });
    } else {
      res.status(500).json({
        error: 'Löschen fehlgeschlagen'
      });
    }
  } catch (err) {
    console.error('Error deleting mündliche Zusatzprüfung by ID:', err);
    res.status(500).json({
      error: 'Database delete failed',
      details: err.message
    });
  }
}


module.exports = { 
  addMuendliche_Zusatzpruefung,
  getListMuendliche_Zusatzpruefung,
  getMuendliche_ZusatzpruefungById,
  deleteMuendliche_ZusatzpruefungById
 };
