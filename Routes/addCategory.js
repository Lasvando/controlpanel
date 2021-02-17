const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.get('/addCategory', (req, res) => {
    if (req.session.loggedin) {
        connection.query(`SELECT * FROM categorie`, function(error, results) {
            if (error) throw error;

            res.render('addCategory', { categorie: results });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }



})

router.post('/addCategory', (req, res) => {
    let nomeCategoria = req.body.nomeCategoria;

    connection.query(`INSERT INTO categorie(nome) VALUES (?)`, [nomeCategoria], function(error, results) {
        if (error) throw error;
        console.log(`La categoria ${nomeCategoria} è stata aggiunta`);

        res.send({ status: 'ok' });
    });
})

module.exports = router;