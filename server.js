//Import
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session')

//Utility Variable
const app = express();
const port = process.env.port || 3000;

//Session per gestire il login
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Body Parser per gestire i dati codificati
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set engine
app.set('view engine', 'ejs');

//Serving Static Files
app.use(express.static('public'))

//Middleware Logging
app.use(morgan('common'));

//Route Variable
const homeRoute = require('./Routes/home');
const authRoute = require('./Routes/auth');
const addCategoryRoute = require('./Routes/addCategory');
const addSectionRoute = require('./Routes/addSection');
const addElementRoute = require('./Routes/addElement');
const aboutRoute = require('./Routes/about');
const deleteCategoryRoute = require('./Routes/deleteCategory');
const deleteSectionRoute = require('./Routes/deleteSection');
const pingRoute = require('./Routes/ping');

//Route Middleware
app.use('/', homeRoute);
app.use('/', addCategoryRoute);
app.use('/', addSectionRoute);
app.use('/', addElementRoute);
app.use('/', aboutRoute);
app.use('/', deleteCategoryRoute);
app.use('/', deleteSectionRoute);
app.use('/', authRoute);
app.use('/', pingRoute);

//Start Server
app.listen(port, console.log(`Server is listening on port ${port}`));