require('../config/config');
const jwt = require("jsonwebtoken");

//Verificar toker 
const verificarToken = (req, res, next) => {

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
const verificarAdmin_role = (req, res, next) => {

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


const verificaTokenImag = async (req, res, next) => {
    let { token } = req.query;    
    try {
        let decoded = await jwt.verify(token , process.env.SEED);
        req.usuario = decoded.usuario;
        next();
    } catch (err) {
        return res.status(401).json({
            ok:false,
            err:{
                message: "Token no válido"
            }
        });
    }
};


module.exports = { verificarToken, verificarAdmin_role, verificaTokenImag }