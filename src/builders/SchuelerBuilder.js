const Schueler = require('../models/Schueler');

class SchuelerBuilder {
  constructor() {
    this.data = {};
  }

  setName(name) {
    this.data.name = this.capitalize(name);
    return this;
  }

  setVorname(vorname) {
    this.data.vorname = this.capitalize(vorname);
    return this;
  }

  setAusbildungsbetrieb(betrieb) {
    this.data.ausbildungsbetrieb = this.capitalize(betrieb);
    return this;
  }

  setAdresseId(id) {
    this.data.address = id;
    return this;
  }

  setAnsprechpartnerId(id) {
    this.data.ansprechpartner = id;
    return this;
  }

  setPruefungsausschussId(id) {
    this.data.pruefungsausschuss = id;
    return this;
  }

  setDokPunkteId(id) {
    this.data.dok_punkte = id;
    return this;
  }

  setFachPunkteId(id) {
    this.data.fach_punkte = id;
    return this;
  }

  setPraesentationPunkteId(id) {
    this.data.praesentation_punkte = id;
    return this;
  }

  setSchriftlichTeil1Id(id) {
    this.data.pruefungteil1_punkte = id;
    return this;
  }

  setSchriftlichTeil2Id(id) {
    this.data.pruefungteil2_punkte = id;
    return this;
  }

  setMuendlichId(id) {
    this.data.muendliche_punkte = id;
    return this;
  }

  build() {
    if (!this.data.name || !this.data.vorname) {
      throw new Error('Name und Vorname sind Pflichtfelder');
    }

    return new Schueler(this.data);
  }

  capitalize(value) {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

module.exports = SchuelerBuilder;
