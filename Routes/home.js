//Import
const express = require('express');
const router = express.Router();
const connection = require('../db/db');

//Route
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        connection.query(`SELECT * FROM elementi`, function(error, resultElementi) {
            if (error) throw error;

            connection.query(`SELECT * FROM categorie`, function(error, resultCategorie) {
                if (error) throw error;

                connection.query(`SELECT * FROM sezioni`, function(error, resultSezioni) {
                    if (error) throw error;

                    res.render('home', { elementi: resultElementi, categorie: resultCategorie, sezioni: resultSezioni });
                });
            });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
})

module.exports = router;