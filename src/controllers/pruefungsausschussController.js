// controller/pruefungsausschussController.js
const { insertPruefungsausschuss, getAllPruefungsausschuss } = require('../service/pruefungsausschussService');

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

async function listPruefungsausschuss(req, res) {
  try {
    const result = await selectAllPruefungsausschuss();
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

async function getPruefungsausschussByBezeichnung(req, res) {
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


const req = {
  params: {},
  query: {},
  body: {},
  headers: {},
  method: 'GET',
  url: '/pruefungsausschuss'
};

const res = {
  statusCode: null,

  status(code) {
    this.statusCode = code;
    return this; // wichtig für chaining
  },

  json(data) {
    console.log('STATUS:', this.statusCode);
    console.log('RESPONSE:', data);
  }
};


console.log(listPruefungsausschuss(req, res));

module.exports = { addPruefungsausschuss, listPruefungsausschuss, getPruefungsausschussById, getPruefungsausschussByBezeichnung };