const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    if (req.session.loggedin) {
        res.render('about')
    } else {
        res.render('auth', { error: 'Per continuare è necessario effettuare il login' });
    }
})

module.exports = router;