const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "data/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
        db.run(`CREATE TABLE IF NOT EXISTS tbl_cli_patient (
                id INTEGER PRIMARY KEY,
                name STRING,
                local STRING,
                status STRING)`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_cli_patient:', err.message);
            } else {
                console.log('tbl_cli_patient criada com sucesso!');
            } 
        });
    };
});

module.exports = db;