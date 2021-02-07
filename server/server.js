require('./config/config');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require("path");


const app = express();
const port = process.env.PORT;
const urlDB = process.env.URLDB;

//Middlewere 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// pase application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.join(__dirname,'../public')))

// 
app.use(fileUpload());

// conexion with routes 
app.use('/', require('./routes'));

// conexion with mongodb
mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    console.log('Database is connect');
});


app.listen(port, () => {
    console.log(`listenning in port ${port}`);
});