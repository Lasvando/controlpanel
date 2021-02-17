const express = require('express');
const router = express.Router();
const connection = require('../db/db');

router.get('/addSection', (req, res) => {
    if (req.session.loggedin) {
        connection.query(`SELECT * FROM sezioni`, function(error, results) {
            if (error) throw error;

            res.render('addSection', { sezioni: results });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }

})

router.post('/addSection', (req, res) => {
    let nomeSezione = req.body.nomeSezione;

    connection.query(`INSERT INTO sezioni(nome) VALUES (?)`, [nomeSezione], function(error, results) {
        if (error) throw error;
        console.log(`La categoria ${nomeSezione} è stata aggiunta`);

        res.send({ status: 'ok' });
    });
})

module.exports = router;