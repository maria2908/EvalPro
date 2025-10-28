let sql;
const sqlite3 = require('sqlite3').verbose();

// connect to DB
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});
//Create table
// Tabelle: Ansprechpartner
ansprechpartner = "CREATE TABLE ansprechpartner (id INTEGER PRIMARY KEY, name TEXT NOT NULL, vorname TEXT NOT NULL, tel TEXT)";

// Tabelle: Adresse
adress = "CREATE TABLE adresse (id INTEGER PRIMARY KEY, strasse TEXT NOT NULL, hausnummer TEXT, PLZ TEXT, stadt TEXT)";

// Tabelle: Bewertungskriterium
bewertungskriterium = "CREATE TABLE bewertungskriterium (id INTEGER PRIMARY KEY, bewertungsteil TEXT NOT NULL, bewertungskriterium TEXT NOT NULL, punkte INTEGER, kommentare TEXT)";

// Tabelle: Dokumentation
dokumentation = "CREATE TABLE dokumentation (id INTEGER PRIMARY KEY, bewertungskriterium INTEGER, gesamtpunkte INTEGER, FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(id))";

// Tabelle: Fachgespraech
fachgespraech = "CREATE TABLE fachgespraech (id INTEGER PRIMARY KEY,bewertungskriterium INTEGER,gesamtpunkte INTEGER,FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(id))";

// Tabelle: Praesentation
praesentation = "CREATE TABLE praesentation (id INTEGER PRIMARY KEY,bewertungskriterium INTEGER,gesamtpunkte INTEGER,FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(ID))";

// Tabelle: Schriftliche
schriftliche = "CREATE TABLE schriftliche (id INTEGER PRIMARY KEY,bezeichnung TEXT NOT NULL,punkte INTEGER)";

// Tabelle: Mündliche Zusatzprüfung
muendliche_zusatzpruefung = "CREATE TABLE muendliche_zusatzpruefung (id INTEGER PRIMARY KEY,pruefungsbereich TEXT,punktzahl INTEGER)";

// Tabelle: Pruefungsausschuss
pruefungsausschuss = "CREATE TABLE pruefungsausschuss (id INTEGER PRIMARY KEY,bezeichnung TEXT NOT NULL,ausbildungsberuf TEXT,pruefungstage TEXT)";

// Tabelle: Schueler
schueler = "CREATE TABLE schueler (id INTEGER PRIMARY KEY,name TEXT NOT NULL,varorname TEXT NOT NULL,ausbildungsbetrieb TEXT,address INTEGER,ansprechpartner INTEGER,pruefungsausschuss INTEGER,dok_punkte INTEGER,fach_punkte INTEGER,praesentation_punkte INTEGER,schriftliche_punkte INTEGER,muendliche_punkte INTEGER,FOREIGN KEY (address) REFERENCES adresse(ID),FOREIGN KEY (ansprechpartner) REFERENCES ansprechpartner(ID),FOREIGN KEY (pruefungsausschuss) REFERENCES pruefungsausschuss(ID),FOREIGN KEY (dok_punkte) REFERENCES dokumentation(ID),FOREIGN KEY (fach_punkte) REFERENCES fachgespraech(ID),FOREIGN KEY (praesentation_punkte) REFERENCES praesentation(ID),FOREIGN KEY (schriftliche_punkte) REFERENCES schriftliche(ID),FOREIGN KEY (muendliche_punkte) REFERENCES muendliche_zusatzpruefung(ID))";


// List all tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Tables in the database:");
      rows.forEach(row => console.log(row.name));
    }
  });

