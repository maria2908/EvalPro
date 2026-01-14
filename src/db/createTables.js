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

            -- Prüfung Teil 1
            CREATE TABLE pruefungteil1 (
                ID INTEGER PRIMARY KEY,
                pruefungsbereich TEXT,
                punktzahl INTEGER
            );

            -- Prüfung Teil 2
            CREATE TABLE pruefungteil2 (
                ID INTEGER PRIMARY KEY,
                bezeichnung TEXT NOT NULL,
                punkte INTEGER
            );
            
            -- Schüler-Tabelle (Zentrale Tabelle)
            CREATE TABLE schueler (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                ausbildungsbetrieb TEXT,
            
                address INTEGER,
                ansprechpartner INTEGER,
                pruefungsausschuss INTEGER,
                dok_punkte INTEGER,
                fach_punkte INTEGER,
                praesentation_punkte INTEGER,
                pruefungteil1_punkte INTEGER,
                pruefungteil2_punkte INTEGER,
                muendliche_punkte INTEGER,
            
                -- Fremdschlüssel-Beziehungen
                FOREIGN KEY (address) REFERENCES adresse(ID),
                FOREIGN KEY (ansprechpartner) REFERENCES ansprechpartner(ID),
                FOREIGN KEY (pruefungsausschuss) REFERENCES pruefungsausschuss(ID),
                FOREIGN KEY (dok_punkte) REFERENCES dokumentation(ID),
                FOREIGN KEY (fach_punkte) REFERENCES fachgespraech(ID),
                FOREIGN KEY (praesentation_punkte) REFERENCES praesentation(ID),
                FOREIGN KEY (pruefungteil1_punkte) REFERENCES pruefungteil1(ID),
                FOREIGN KEY (pruefungteil2_punkte) REFERENCES pruefungteil2(ID),
                FOREIGN KEY (muendliche_punkte)
                    REFERENCES muendliche_Zusatzpruefung(ID)
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
