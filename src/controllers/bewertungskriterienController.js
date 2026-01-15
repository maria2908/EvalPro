const { insertBewertungskriterium } = require('../service/bewertungskriteriumService');

function addBewertungskriterium(req, res) {
  const data = req.body;
  console.log('Controller received:', data);

  insertBewertungskriterium(data, (err, result) => {
    if (err) {
      console.error('Insert failed:', err.message);
      res.status(500).json({ error: 'Database insert failed', details: err.message });
    } else {
      console.log('Insert succeeded:', result);
      res.status(201).json({ message: 'Bewertungskriterium added successfully!', id: result.id });
    }
  });
}

module.exports = { addBewertungskriterium };
