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
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );

            CREATE TABLE fachgespraech (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );

            CREATE TABLE praesentation (
                ID INTEGER PRIMARY KEY,
                bewertungskriterium INTEGER,
                gesamtpunkte INTEGER,
                FOREIGN KEY (bewertungskriterium)
                    REFERENCES bewertungskriterium(ID)
            );

            CREATE TABLE muendliche_Zusatzpruefung (
                ID INTEGER PRIMARY KEY,
                pruefungsbereich TEXT,
                punktzahl INTEGER
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

                muendliche_id INTEGER,
                dok_id INTEGER,
                fach_id INTEGER,
                praesentation_id INTEGER,

                FOREIGN KEY (address_id) REFERENCES adresse(ID),
                FOREIGN KEY (ansprechpartner_id) REFERENCES ansprechpartner(ID),
                FOREIGN KEY (dok_id) REFERENCES dokumentation(ID),
                FOREIGN KEY (fach_id) REFERENCES fachgespraech(ID),
                FOREIGN KEY (praesentation_id) REFERENCES praesentation(ID),
                FOREIGN KEY (muendliche_id) REFERENCES muendliche_Zusatzpruefung(ID),

                -- ❗ bewusst KEIN CASCADE
                FOREIGN KEY (pruefungsausschuss_id)
                    REFERENCES pruefungsausschuss(ID)
            );

            -- =========================
            -- TRIGGER: LÖSCHT ALLES,
            -- WENN EIN SCHUELER GELÖSCHT WIRD
            -- =========================

            CREATE TRIGGER delete_schueler_dependencies
            AFTER DELETE ON schueler
            BEGIN
                DELETE FROM adresse WHERE ID = OLD.address_id;
                DELETE FROM ansprechpartner WHERE ID = OLD.ansprechpartner_id;
                DELETE FROM dokumentation WHERE ID = OLD.dok_id;
                DELETE FROM fachgespraech WHERE ID = OLD.fach_id;
                DELETE FROM praesentation WHERE ID = OLD.praesentation_id;
                DELETE FROM muendliche_Zusatzpruefung WHERE ID = OLD.muendliche_id;
            END;

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
