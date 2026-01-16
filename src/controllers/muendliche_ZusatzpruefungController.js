// controller/muendlicheZusatzpruefungController.js
const {
  insertMuendliche_Zusatzpruefung
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

module.exports = { addMuendliche_Zusatzpruefung };
