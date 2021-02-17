const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.post('/deleteSection', (req, res) => {
    if (req.session.loggedin) {
        let idSezione = req.body.idSezione;

        connection.query(`DELETE FROM sezioni WHERE id = (?)`, [idSezione], function(error, results) {
            if (error) throw error;
            console.log(`La categoria ${idSezione} è stata eliminata`);

            res.send({ status: 'ok' });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
})

module.exports = router;