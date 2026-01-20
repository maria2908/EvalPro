// controller/schuelerController.js
const SchuelerBuilder = require('../builders/SchuelerBuilder');
const { insertSchueler,
        selectSchuelers, 
        selectSchuelerByName, 
        selectSchuelerAdresse ,
        selectSchuelerById
      } = require('../service/schuelerService');

/**
 * Add a new Schueler
 * POST /schueler
 */
async function addSchueler(req, res) {
  try {
    const b = new SchuelerBuilder();

    // Dynamisches Mapping der Felder auf Builder-Methoden
    const fieldMap = {
      name: 'setName',
      vorname: 'setVorname',
      ausbildungsbetrieb: 'setAusbildungsbetrieb',
      address: 'setAdresseId',
      ansprechpartner: 'setAnsprechpartnerId',
      pruefungsausschuss: 'setPruefungsausschussId',
      dok_punkte: 'setDokPunkteId',
      fach_punkte: 'setFachPunkteId',
      praesentation_punkte: 'setPraesentationPunkteId',
      pruefungteil1_punkte: 'setSchriftlichTeil1Id',
      pruefungteil2_punkte: 'setSchriftlichTeil2Id',
      muendliche_punkte: 'setMuendlichId'
    };

    Object.entries(fieldMap).forEach(([field, setter]) => {
      if (req.body[field] !== undefined && typeof b[setter] === 'function') {
        b[setter](req.body[field]);
      }
    });

    const schueler = b.build();
    const result = await insertSchueler(schueler);

    res.status(201).json({ message: 'Schüler angelegt', id: result.id });

  } catch (err) {
    console.error('Error adding Schueler:', err);
    res.status(400).json({ error: err.message });
  }
}

/**
 * Get all Schueler
 * GET /schueler/list
 */
async function getListSchuelers(req, res) {
  try {
    console.log('Fetching all Schueler');
    const result = await selectSchuelers();
    console.log('ListSchuelers result:', result); // 🔹 loggen
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Schuelers:', err);
    res.status(500).json({ error: 'Database select failed', details: err.message });
  }
}

/**
 * Get Schueler by name
 * GET /schueler/by-name/:name
 */
async function getSchuelerByName(req, res) {
  try {
    const name = req.params.name;
    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    console.log('Fetching Schueler with name:', name);
    const result = await selectSchuelerByName(name);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Schueler not found' });
    }

    res.status(200).json(result);

  } catch (err) {
    console.error('Error fetching Schueler:', err);
    res.status(500).json({ error: 'Database select failed', details: err.message });
  }
}

/**
 * Get schueler by id
 * GET /schueler/id/:id
 */
async function getSchuelerById(req, res) {
  try {
    const { id } = req.params;

    const result = await selectSchuelerById(id);

    if (!result) {
      return res.status(404).json({
        error: 'Schueler not found'
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Schueler by ID:', err);
    res.status(500).json({
      error: 'Database fetch failed',
      details: err.message
    });
  }
}

/**
 * Get adress for Schueler
 * GET /schueler/id/:id/adresse
 */
async function getSchuelerAdresse(req, res) {
  try {
    const schuelerId = req.params.id;

    if (!schuelerId) {
      return res.status(400).json({ error: 'Schueler ID is required' });
    }

    const result = await selectSchuelerAdresse(schuelerId);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Adresse not found for this Schueler' });
    }

    res.status(200).json(result[0]); // one address
  } catch (err) {
    console.error('Error fetching Adresse:', err);
    res.status(500).json({
      error: 'Database select failed',
      details: err.message
    });
  }
}


module.exports = { addSchueler, getListSchuelers, getSchuelerByName, getSchuelerAdresse, getSchuelerById };
