// controller/pruefungsausschussController.js
const { 
  insertPruefungsausschuss,
  selectAllPruefungsausschuss,
  selectPruefungsausschussById,
  selectPruefungsausschussByBezeichnung,
  removePruefungsausschussById
} = require('../service/pruefungsausschussService');

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

async function getListPruefungsausschusse(req, res) {
  try {
    const result = await selectAllPruefungsausschuss();
    console.log('listPruefungsausschuss result:', result); // 🔹 loggen
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Pruefungsausschuss:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

async function getPruefungsausschussById(req, res) {
  try {
    const { id } = req.params;

    const result = await selectPruefungsausschussById(id);

    if (!result) {
      return res.status(404).json({
        error: 'Pruefungsausschuss not found'
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Pruefungsausschuss by ID:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

async function getPruefungsausschussByName(req, res) {
  try {
    const { bezeichnung } = req.params;

    const result = await selectPruefungsausschussByBezeichnung(bezeichnung);

    if (!result) {
      return res.status(404).json({
        error: 'Pruefungsausschuss not found'
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Pruefungsausschuss by bezeichnung:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

async function deletePruefungsausschussById(req, res) {
  try {
    const { id } = req.params;

    // check if data exists
    const existing = await selectPruefungsausschussById(id);
    if (!existing) {
      return res.status(404).json({
        error: 'Pruefungsausschuss not found'
      });
    }

    // Delete
    const deleted = await removePruefungsausschussById(id);

    if (deleted) {
      res.status(200).json({
        message: 'Pruefungsausschuss erfolgreich gelöscht',
        id: id
      });
    } else {
      res.status(500).json({
        error: 'Löschen fehlgeschlagen'
      });
    }
  } catch (err) {
    console.error('Error deleting Pruefungsausschuss by ID:', err);
    res.status(500).json({
      error: 'Database delete failed',
      details: err.message
    });
  }
}


module.exports = { 
  addPruefungsausschuss,
  getListPruefungsausschusse,
  getPruefungsausschussById,
  getPruefungsausschussByName,
  deletePruefungsausschussById
 };