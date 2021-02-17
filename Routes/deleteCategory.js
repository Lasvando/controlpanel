const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.post('/deleteCategory', (req, res) => {
    if (req.session.loggedin) {
        let idCategoria = req.body.idCategoria;

        connection.query(`DELETE FROM categorie WHERE id = (?)`, [idCategoria], function(error, results) {
            if (error) throw error;
            console.log(`La categoria ${idCategoria} è stata eliminata`);

            res.send({ status: 'ok' });
        });
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }


})

module.exports = router;