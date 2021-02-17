const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ospite', //LOGIN PER IL DATABASE
    password: 'ospite', //LOGIN PER IL DATABASE
    database: 'controlPanel'
});

module.exports = connection;