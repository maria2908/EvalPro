const { insertPruefungteil2 } = require('../service/pruefungteil2');

function addPruefungteil2(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertPruefungteil2(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Pruefungteil2 added successfully!', id: result.id });
    }
  });
}

module.exports = { addPruefungteil2 };
