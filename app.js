const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db');

const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./client/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.post('/update_local_patient', (req, res) => {
    const { local, name } = req.body;

    db.run("UPDATE tbl_cli_patient SET local = ? WHERE name = ?", [local, name], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.send('Localização atual do paciente atualizada com sucesso!');
    });
});

app.get('/get_patient_data', (req, res) => {
    db.all("SELECT * FROM tbl_cli_patient", [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados do paciente:', err.message);
            return res.status(500).send('Erro interno ao buscar dados do paciente');
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});