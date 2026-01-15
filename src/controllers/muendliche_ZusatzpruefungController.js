const { insertPruefungteil2 } = require('../service/muendliche_ZusatzpruefungService');

function addMuendliche_Zusatzpruefung(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertMuendliche_Zusatzpruefung(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Muendliche Zusatzpruefung added successfully!', id: result.id });
    }
  });
}

module.exports = { addMuendliche_Zusatzpruefung };
