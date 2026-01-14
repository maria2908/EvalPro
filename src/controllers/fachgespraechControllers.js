// Importiert die Service-Funktion zum Einfügen eines Fachgespraech 
const { insertFachgespraech } = require('../service/fachgespraechService');


/**
 * Controller-Funktion zum Anlegen eines neue Fachgespraech
 *
 * Erwartet JSON im Request-Body:
 * {
 *   "bewertungskriterium": "34",
 *   "gesamtpunkte": "21"
 * }
 */
function addFachgespraech(req, res) {

  // Daten aus dem Request-Body auslesen
  const data = req.body;
  console.log('Controller received:', data);

  // Übergibt die Daten an die Service-Schicht
  insertFachgespraech(data, (err, result) => {

    // Fehler beim Datenbank-Insert
    if (err) {
      console.error('Insert failed:', err.message);

      // HTTP 500 → interner Serverfehler
      res.status(500).json({
        error: 'Database insert failed',
        details: err.message
      });

    } else {
      // Erfolgreiches Insert
      console.log('Insert succeeded:', result);

      // HTTP 201 → Ressource erfolgreich erstellt
      res.status(201).json({
        message: 'Fachgespraech added successfully!',
        id: result.id
      });
    }
  });
}

// Exportiert den Controller für die Routen
module.exports = { addFachgespraech };
