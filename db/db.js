const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ospite',
    password: 'ospite',
    database: 'controlPanel'
});

module.exports = connection;