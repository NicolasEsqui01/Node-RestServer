require('../config/config');
const jwt = require("jsonwebtoken");

//Verificar toker 
let verificarToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify( token, process.env.SEED , (err, decoded) => {

        if(err){
            // 401 - notAutheritation
            return res.status(401).json({
                ok:false,
                err:{
                    message:"Token no valido"
                }
            })
        };
        
        // decoded.usuario viene el payload del usuario
        req.usuario = decoded.usuario;
        next();
    });
};

//Verifica role 


let verificarAdmin_role = (req, res, next) => {

    let usuario = req.usuario;
    let rol = ['ADMIN_ROLE'];

    if(rol.indexOf(usuario.role) !== -1){
        next()
    }else {
        return res.json({
            ok:false,
            err:{
                message: "El usuario no es administrador"
            }
        });
    };
};



module.exports = { verificarToken, verificarAdmin_role }