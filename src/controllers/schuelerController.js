const SchuelerBuilder = require('../builders/SchuelerBuilder');
const { insertSchueler } = require('../service/schuelerService');

function addSchueler(req, res) {
  try {
    const b = new SchuelerBuilder();

    if (req.body.name) b.setName(req.body.name);
    if (req.body.vorname) b.setVorname(req.body.vorname);
    if (req.body.ausbildungsbetrieb) b.setAusbildungsbetrieb(req.body.ausbildungsbetrieb);

    if (req.body.address) b.setAdresseId(req.body.address);
    if (req.body.ansprechpartner) b.setAnsprechpartnerId(req.body.ansprechpartner);
    if (req.body.pruefungsausschuss) b.setPruefungsausschussId(req.body.pruefungsausschuss);
    if (req.body.dok_punkte) b.setDokPunkteId(req.body.dok_punkte);
    if (req.body.fach_punkte) b.setFachPunkteId(req.body.fach_punkte);
    if (req.body.praesentation_punkte) b.setPraesentationPunkteId(req.body.praesentation_punkte);
    if (req.body.pruefungteil1_punkte) b.setSchriftlichTeil1Id(req.body.pruefungteil1_punkte);
    if (req.body.pruefungteil2_punkte) b.setSchriftlichTeil2Id(req.body.pruefungteil2_punkte);
    if (req.body.muendliche_punkte) b.setMuendlichId(req.body.muendliche_punkte);


    const schueler = b.build();

    insertSchueler(schueler, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: 'Schüler angelegt',
        id: result.id
      });
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { addSchueler };
