function createTables(db) {
    return new Promise((resolve, reject) => {
        const schema = `

            BEGIN TRANSACTION;
            
            CREATE TABLE ansprechpartner (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                tel TEXT
            );
            
            CREATE TABLE adresse (
                ID INTEGER PRIMARY KEY,
                strasse TEXT NOT NULL,
                hausnummer TEXT,
                PLZ TEXT,
                stadt TEXT
            );
            
            CREATE TABLE bewertungskriterium (
                ID INTEGER PRIMARY KEY,
                bewertungsteil TEXT NOT NULL,
                bewertungskriterium TEXT NOT NULL,
                punkte INTEGER,
                kommentare TEXT
            );
            
            CREATE TABLE dokumentation (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(ID)
            );
            
            CREATE TABLE fachgespraech (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(ID)
            );
            
            CREATE TABLE praesentation (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium) REFERENCES bewertungskriterium(ID)
            );
            
            CREATE TABLE muendliche_Zusatzpruefung (
                ID INTEGER PRIMARY KEY,
                pruefungsbereich TEXT,
                punktzahl INTEGER
            );
            
            CREATE TABLE pruefungsausschuss (
                ID INTEGER PRIMARY KEY,
                bezeichnung TEXT NOT NULL,
                ausbildungsberuf TEXT,
                pruefungstage TEXT
            );

            CREATE TABLE pruefungteil1 (
                ID INTEGER PRIMARY KEY,
                pruefungsbereich TEXT,
                punktzahl INTEGER
            );

            CREATE TABLE pruefungteil2 (
                ID INTEGER PRIMARY KEY,
                bezeichnung TEXT NOT NULL,
                punkte INTEGER
            );
            
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
            
                FOREIGN KEY (address) REFERENCES adresse(ID),
                FOREIGN KEY (ansprechpartner) REFERENCES ansprechpartner(ID),
                FOREIGN KEY (pruefungsausschuss) REFERENCES pruefungsausschuss(ID),
                FOREIGN KEY (dok_punkte) REFERENCES dokumentation(ID),
                FOREIGN KEY (fach_punkte) REFERENCES fachgespraech(ID),
                FOREIGN KEY (praesentation_punkte) REFERENCES praesentation(ID),
                FOREIGN KEY (pruefungteil1_punkte) REFERENCES pruefungteil1(ID),
                FOREIGN KEY (pruefungteil2_punkte) REFERENCES pruefungteil2(ID),
                FOREIGN KEY (muendliche_punkte) REFERENCES muendliche_Zusatzpruefung(ID)
            );
            
            COMMIT;
        `;

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

module.exports = createTables;
    