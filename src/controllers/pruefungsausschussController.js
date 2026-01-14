const { insertPruefungsausschuss } = require('../service/pruefungsausschuss');

function addPruefungsausschuss(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertPruefungsausschuss(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Pruefungsausschuss added successfully!', id: result.id });
    }
  });
}

module.exports = { addPruefungsausschuss };
