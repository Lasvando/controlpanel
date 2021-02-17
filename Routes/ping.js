const express = require('express');
const router = express.Router();
const connection = require('../db/db');
const ping = require('ping');

router.get('/ping/:id', (req, res) => {
    if (req.session.loggedin) {
        let id = req.params.id;

        connection.query(`SELECT * FROM elementi WHERE id = ?`, [id], function(error, result) {
            if (error) throw error;

            let ip;
            result.forEach(element => {
                ip = element.ip;
                ping.sys.probe(ip, function(isAlive) {
                    var msg = isAlive ? 'Host: ' + ip + ' is alive' : 'Host: ' + ip + ' is dead';
                    console.log(isAlive);
                    console.log(msg);
                    if (isAlive == true)
                        res.send('Online');
                    else {
                        res.send('Offline');
                    }
                });
            });

        });

    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
})

module.exports = router;