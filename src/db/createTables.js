/**
 * Erstellt alle benötigten Tabellen in der SQLite-Datenbank
 * Die Tabellen werden in einer Transaktion angelegt,
 * sodass bei einem Fehler alles zurückgerollt wird.
 *
 * @param {Object} db - SQLite-Datenbankverbindung
 * @returns {Promise<void>}
 */
function createTables(db) {
    return new Promise((resolve, reject) => {

        // SQL-Schema mit allen Tabellen
        const schema = `

            -- Startet eine Transaktion
            BEGIN TRANSACTION;
            
            -- Ansprechpartner-Tabelle
            CREATE TABLE ansprechpartner (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                tel TEXT
            );
            
            -- Adress-Tabelle
            CREATE TABLE adresse (
                ID INTEGER PRIMARY KEY,
                strasse TEXT NOT NULL,
                hausnummer TEXT,
                PLZ TEXT,
                stadt TEXT
            );
            
            -- Bewertungskriterien für Prüfungen
            CREATE TABLE bewertungskriterium (
                ID INTEGER PRIMARY KEY,
                bewertungsteil TEXT NOT NULL,
                bewertungskriterium TEXT NOT NULL,
                punkte INTEGER,
                kommentare TEXT
            );
            
            -- Dokumentation (Teilprüfung)
            CREATE TABLE dokumentation (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );
            
            -- Fachgespräch (Teilprüfung)
            CREATE TABLE fachgespraech (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );
            
            -- Präsentation (Teilprüfung)
            CREATE TABLE praesentation (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );
            
            -- Mündliche Zusatzprüfung
            CREATE TABLE muendliche_Zusatzpruefung (
                ID INTEGER PRIMARY KEY,
                pruefungsbereich TEXT,
                punktzahl INTEGER
            );
            
            -- Prüfungsausschuss
            CREATE TABLE pruefungsausschuss (
                ID INTEGER PRIMARY KEY,
                bezeichnung TEXT NOT NULL,
                ausbildungsberuf TEXT,
                pruefungstage TEXT
            );
            
            -- Schüler-Tabelle (Zentrale Tabelle)
            CREATE TABLE schueler (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                ausbildungsbetrieb TEXT,
            
                address INTEGER,
                ansprechpartner_id INTEGER,
                pruefungsausschuss_id INTEGER,
                AP1_punkte INTEGER,
                AP2GA1_punkte INTEGER,
                AP2GA2_punkte INTEGER,
                AP2GA3_punkte INTEGER,
                muendliche_id INTEGER,
                dok_id INTEGER,
                fach_id INTEGER,
                praesentation_id INTEGER,
            
                -- Fremdschlüssel-Beziehungen
                FOREIGN KEY (address) REFERENCES adresse(ID),
                FOREIGN KEY (ansprechpartner_id) REFERENCES ansprechpartner(ID),
                FOREIGN KEY (pruefungsausschuss_id) REFERENCES pruefungsausschuss(ID),
                FOREIGN KEY (dok_id) REFERENCES dokumentation(ID),
                FOREIGN KEY (fach_id) REFERENCES fachgespraech(ID),
                FOREIGN KEY (praesentation_id) REFERENCES praesentation(ID),
                FOREIGN KEY (muendliche_id)REFERENCES muendliche_Zusatzpruefung(ID)
            );
            
            -- Transaktion erfolgreich abschließen
            COMMIT;
        `;

        // Führt das gesamte SQL-Schema aus
        db.exec(schema, (err) => {
            if (err) {
                console.error('Error creating tables:', err.message);
                reject(err);
            } else {
                console.log('Tables created successfully!');
                resolve();
            }
        });
    });
}

// Exportiert die Funktion für die Datenbankinitialisierung
module.exports = createTables;
