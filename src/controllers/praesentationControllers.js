const { insertPraesentation } = require('../service/praesentationService');



function addPraesentation(req, res) {

  const data = req.body;
  console.log('Controller received:', data);

  insertPraesentation(data, (err, result) => {

    if (err) {
      console.error('Insert failed:', err.message);

      res.status(500).json({
        error: 'Database insert failed',
        details: err.message
      });

    } else {
      console.log('Insert succeeded:', result);

      res.status(201).json({
        message: 'Praesentation added successfully!',
        id: result.id
      });
    }
  });
}

module.exports = { addPraesentation };
