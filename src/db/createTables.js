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

                -- Unabhängige Tabellen (keine Fremdschlüssel)
                CREATE TABLE ansprechpartner (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    vorname TEXT NOT NULL,
                    tel TEXT
                );

                CREATE TABLE pruefungsausschuss (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    bezeichnung TEXT NOT NULL,
                    ausbildungsberuf TEXT NOT NULL,
                    pruefungstag TEXT NOT NULL
                );

                -- =========================
                -- PRÜFUNGS-TABELLEN
                -- =========================
                CREATE TABLE muendliche_zasatzpruefung (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    pruefungsbereich TEXT NOT NULL,
                    punkte INTEGER NOT NULL
                );

                CREATE TABLE schriftliche_teil_2 (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    GA1_punkte INTEGER,
                    GA2_punkte INTEGER,
                    GA3_punkte INTEGER
                );

                -- =========================
                -- SCHUELER (Zentrale Tabelle)
                -- =========================
                CREATE TABLE schueler (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    vorname TEXT NOT NULL,
                    ausbildungsbetrieb TEXT NOT NULL,
                    thema TEXT NOT NULL,
                    ansprechpartner_id INTEGER NOT NULL,
                    pruefungsausschuss_id INTEGER NOT NULL,
                    muendliche_zusatz_id INTEGER,
                    schriftliche_teil_1 INTEGER,
                    schriftliche_teil_2_id INTEGER,
                    FOREIGN KEY (ansprechpartner_id) REFERENCES ansprechpartner(ID),
                    FOREIGN KEY (pruefungsausschuss_id) REFERENCES pruefungsausschuss(ID),
                    FOREIGN KEY (muendliche_zusatz_id) REFERENCES muendliche_zasatzpruefung(ID),
                    FOREIGN KEY (schriftliche_teil_2_id) REFERENCES schriftliche_teil_2(ID)
                );

                -- =========================
                -- BEWERTUNGS-SYSTEM
                -- =========================
                CREATE TABLE bewertungsteil (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    bezeichnung TEXT NOT NULL
                );

                CREATE TABLE bewertungskriterium (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    bewertungsteil_id INTEGER NOT NULL,
                    bewertungskriterium TEXT NOT NULL,
                    gewichtung INTEGER NOT NULL,
                    FOREIGN KEY (bewertungsteil_id) REFERENCES bewertungsteil(ID) ON DELETE CASCADE
                );

                -- =========================
                -- BEWERTUNGS-TABELLEN (mit CASCADE)
                -- =========================
                CREATE TABLE doku_bewertung (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    kriterium_id INTEGER NOT NULL,
                    doku_id INTEGER NOT NULL,
                    punkte INTEGER NOT NULL,
                    komentar TEXT,
                    FOREIGN KEY (kriterium_id) REFERENCES bewertungskriterium(ID) ON DELETE CASCADE,
                    FOREIGN KEY (doku_id) REFERENCES dokumentation(ID) ON DELETE CASCADE
                );

                CREATE TABLE praes_bewertung (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    kriterium_id INTEGER NOT NULL,
                    praes_id INTEGER NOT NULL,
                    punkte INTEGER NOT NULL,
                    komentar TEXT,
                    FOREIGN KEY (kriterium_id) REFERENCES bewertungskriterium(ID) ON DELETE CASCADE,
                    FOREIGN KEY (praes_id) REFERENCES praesentation(ID) ON DELETE CASCADE
                );

                CREATE TABLE fach_bewertung (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    kriterium_id INTEGER NOT NULL,
                    fach_id INTEGER NOT NULL,
                    punkte INTEGER NOT NULL,
                    komentar TEXT,
                    FOREIGN KEY (kriterium_id) REFERENCES bewertungskriterium(ID) ON DELETE CASCADE,
                    FOREIGN KEY (fach_id) REFERENCES fachgeschpraech(ID) ON DELETE CASCADE
                );

                -- =========================
                -- SCHÜLER-ABHÄNGIGE TABELLEN (mit CASCADE)
                -- =========================
                CREATE TABLE dokumentation (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    schueler_id INTEGER NOT NULL,
                    FOREIGN KEY (schueler_id) REFERENCES schueler(ID) ON DELETE CASCADE
                );

                CREATE TABLE praesentation (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    schueler_id INTEGER NOT NULL,
                    FOREIGN KEY (schueler_id) REFERENCES schueler(ID) ON DELETE CASCADE
                );

                CREATE TABLE fachgeschpraech (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    schueler_id INTEGER NOT NULL,
                    FOREIGN KEY (schueler_id) REFERENCES schueler(ID) ON DELETE CASCADE
                );

                -- =========================
                -- FRAGEN-SYSTEM (mit CASCADE)
                -- =========================
                CREATE TABLE fragen (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    text TEXT NOT NULL
                );

                CREATE TABLE fach_fragen (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    fragen_id INTEGER NOT NULL,
                    fach_id INTEGER NOT NULL,
                    kommmentar TEXT,
                    FOREIGN KEY (fragen_id) REFERENCES fragen(ID) ON DELETE CASCADE,
                    FOREIGN KEY (fach_id) REFERENCES fachgeschpraech(ID) ON DELETE CASCADE
                );

                -- =========================
                -- INDIZES für Performance
                -- =========================
                CREATE INDEX idx_schueler_ansprechpartner ON schueler(ansprechpartner_id);
                CREATE INDEX idx_schueler_pruefungsausschuss ON schueler(pruefungsausschuss_id);
                CREATE INDEX idx_schueler_schriftliche_teil_2 ON schueler(schriftliche_teil_2_id);
                CREATE INDEX idx_dokumentation_schueler ON dokumentation(schueler_id);
                CREATE INDEX idx_praesentation_schueler ON praesentation(schueler_id);
                CREATE INDEX idx_fachgeschpraech_schueler ON fachgeschpraech(schueler_id);
                CREATE INDEX idx_doku_bewertung_doku ON doku_bewertung(doku_id);
                CREATE INDEX idx_praes_bewertung_praes ON praes_bewertung(praes_id);
                CREATE INDEX idx_fach_bewertung_fach ON fach_bewertung(fach_id);

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
