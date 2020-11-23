require('./config/config');
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT

//Middlewere 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // pase application/json



app.get("/usuario", (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {

    let { nombre, edad, correo } = req.body


    if (nombre === undefined) {
        res.status(400).json({
            ok: 'false',
            message: 'El nombre es necesario'
        });
    } else {
        res.json({
            nombre,
            edad,
            correo
        })
    }
});

app.put('/usuario/:id', (req, res) => {

    let { id } = req.params

    res.json({
        id,
    })
});

app.delete('/usuario', (req, res) => {
    res.json("delete Usuario")
});

app.listen(port, () => {
    console.log(`listenning in port ${port}`);
});