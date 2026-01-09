const { insertPruefungteil1 } = require('../service/pruefungteil1');

function addPruefungteil1(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertPruefungteil1(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Pruefungteil1 added successfully!', id: result.id });
    }
  });
}

module.exports = { addPruefungteil1 };
