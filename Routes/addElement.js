const express = require('express');
const router = express.Router();
const connection = require('../db/db');

router.get('/addElement', (req, res) => {
    if (req.session.loggedin) {
        connection.query(`SELECT * FROM sezioni`, function(error, resultsSez) {
            if (error) throw error;

            connection.query(`SELECT * FROM categorie`, function(error, resultsCat) {
                if (error) throw error;

                connection.query(`SELECT * FROM sede`, function(error, resultsSede) {
                    if (error) throw error;

                    res.render('addElement', { categorie: resultsCat, sezioni: resultsSez, sedi: resultsSede });
                });

            });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
});

router.post('/addElement', (req, res) => {
    if (req.session.loggedin) {
        let nomeElemento = req.body.nomeElemento;
        let sede = req.body.sede;
        let indirizzoIp = req.body.indirizzoIp;
        let nomeCategoria = req.body.nomeCategoria;
        let nomeSezione = req.body.nomeSezione;

        connection.query(`INSERT INTO elementi(nome, ip, sede, categoria, sezione) VALUES (?,?,?,?,?)`, [nomeElemento, indirizzoIp, sede, nomeCategoria, nomeSezione], function(error, results) {
            if (error) throw error;

            res.send('ok');
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
});

module.exports = router;