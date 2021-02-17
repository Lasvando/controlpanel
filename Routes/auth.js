const express = require('express');
const router = express.Router();
const connection = require('../db/db');
const { route } = require('./home');
const session = require('express-session')

router.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/');
            } else {
                response.render('auth', { error: 'Username o Password non corretti' });
            }
            response.end();
        });
    } else {
        response.render('auth', { error: 'Inserire Username e Password' });
        response.end();
    }
});

router.get('/logout', (req, res) => {
    req.session.loggedin = false;
    res.redirect('/');
});

module.exports = router;