const { insertAnsprechpartner } = require('../service/ansprechpartnerService');

function addAnsprechpartner(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertAnsprechpartner(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Ansprechpartner added successfully!', id: result.id });
    }
  });
}

module.exports = { addAnsprechpartner };
