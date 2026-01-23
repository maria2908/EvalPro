function createTables(db) {
    return new Promise((resolve, reject) => {

        const schema = `
            BEGIN TRANSACTION;

            -- =========================
            -- BASIS-TABELLEN
            -- =========================

            CREATE TABLE adresse (
                ID INTEGER PRIMARY KEY,
                strasse TEXT NOT NULL,
                hausnummer TEXT,
                PLZ TEXT,
                stadt TEXT
            );

            CREATE TABLE ansprechpartner (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                tel TEXT
            );

            CREATE TABLE pruefungsausschuss (
                ID INTEGER PRIMARY KEY,
                bezeichnung TEXT NOT NULL,
                ausbildungsberuf TEXT,
                pruefungstage TEXT
            );

            -- =========================
            -- SCHUELER (AGGREGATE ROOT)
            -- =========================

            CREATE TABLE schueler (
                ID INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                vorname TEXT NOT NULL,
                ausbildungsbetrieb TEXT,

                address_id INTEGER,
                ansprechpartner_id INTEGER,
                pruefungsausschuss_id INTEGER,

                AP1_punkte INTEGER,
                AP2GA1_punkte INTEGER,
                AP2GA2_punkte INTEGER,
                AP2GA3_punkte INTEGER,

                FOREIGN KEY (address_id) REFERENCES adresse(ID),
                FOREIGN KEY (ansprechpartner_id) REFERENCES ansprechpartner(ID),
                FOREIGN KEY (pruefungsausschuss_id) REFERENCES pruefungsausschuss(ID)
            );

            -- =========================
            -- BEWERTUNGS-TABELLEN
            -- =========================

            CREATE TABLE bewertungskriterium (
                ID INTEGER PRIMARY KEY,
                schueler_id INTEGER NOT NULL,
                bewertungsteil TEXT NOT NULL,
                bewertungskriterium TEXT NOT NULL,
                punkte INTEGER,
                kommentare TEXT,

                FOREIGN KEY (schueler_id)
                    REFERENCES schueler(ID)
                    ON DELETE CASCADE
            );

            CREATE TABLE dokumentation (
                ID INTEGER PRIMARY KEY,
                schueler_id INTEGER NOT NULL,
                gesamtpunkte INTEGER,

                FOREIGN KEY (schueler_id)
                    REFERENCES schueler(ID)
                    ON DELETE CASCADE
            );

            CREATE TABLE fachgespraech (
                ID INTEGER PRIMARY KEY,
                schueler_id INTEGER NOT NULL,
                gesamtpunkte INTEGER,

                FOREIGN KEY (schueler_id)
                    REFERENCES schueler(ID)
                    ON DELETE CASCADE
            );

            CREATE TABLE praesentation (
                ID INTEGER PRIMARY KEY,
                schueler_id INTEGER NOT NULL,
                gesamtpunkte INTEGER,

                FOREIGN KEY (schueler_id)
                    REFERENCES schueler(ID)
                    ON DELETE CASCADE
            );

            CREATE TABLE muendliche_Zusatzpruefung (
                ID INTEGER PRIMARY KEY,
                schueler_id INTEGER NOT NULL,
                pruefungsbereich TEXT,
                punktzahl INTEGER,

                FOREIGN KEY (schueler_id)
                    REFERENCES schueler(ID)
                    ON DELETE CASCADE
            );

            -- =========================
            -- TRIGGER: Löscht Adresse & Ansprechpartner
            -- wenn Schüler gelöscht wird
            -- =========================

            CREATE TRIGGER delete_schueler_dependencies
            AFTER DELETE ON schueler
            BEGIN
                DELETE FROM adresse WHERE ID = OLD.address_id;
                DELETE FROM ansprechpartner WHERE ID = OLD.ansprechpartner_id;
            END;

            COMMIT;
        `;

        db.exec(schema, (err) => {
            if (err) {
                console.error('❌ Error creating tables:', err.message);
                reject(err);
            } else {
                console.log('✅ Tables created successfully!');
                resolve();
            }
        });
    });
}

module.exports = createTables;