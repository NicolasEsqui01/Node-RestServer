//Verificar toker 

let verificarToken = (req, res, next) => {

    let token = req.get('Authorization');

    res.json({
        token
    });

};

module.exports = { verificarToken }