require('../config/config');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const obj = {};

obj.login = (req, res) => {

    const { email, password } = req.body;

    User.findOne({
        email,
    }, (err, userDB) => {

        //Si falla la base de datos
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        };

        //Si no existe el user
        if(!userDB){
            return res.status(400).json({
                ok:false,
                   err:{
                    message:"(User) o contraceña incorrectos"
                }
            });
        };

        // verificacion si machea el password con la base de datos return true/false
        if(!bcrypt.compareSync( password, userDB.password )){
            return res.status(400).json({
                ok:false,
                   err:{
                    message:"User o (contraceña) incorrectos"
                }
            });
        };

        let seed = process.env.SEED;
        let expiracion = process.env.CADUCIDAD_TOKEN;
        
        // Creacion del token primer arg:data, segundo arg:secret, tercer arg: expiracion del token 

        let token = jwt.sign({
            usuario: userDB
        }, seed , { expiresIn: expiracion } )


        // devuelvo la respues si el user machea con el email and password
        res.json({
            ok:true,
            user:userDB,
            token
        });
    });

};

module.exports = { obj }