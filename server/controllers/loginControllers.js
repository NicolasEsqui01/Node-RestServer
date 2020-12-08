require('../config/config');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const User = require('../models/user');
const obj = {};

obj.login = (req, res) => {

    const { email, password } = req.body;

    User.findOne({
        email,
    }, (err, userDB) => {

        //Si falla la base de datos
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        //Si no existe el user
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(User) o contraceña incorrectos"
                }
            });
        };

        // verificacion si machea el password con la base de datos return true/false
        if (!bcrypt.compareSync(password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User o (contraceña) incorrectos"
                }
            });
        };

        let seed = process.env.SEED;
        let expiracion = process.env.CADUCIDAD_TOKEN;

        // Creacion del token primer arg:data, segundo arg:secret, tercer arg: expiracion del token 

        let token = jwt.sign({
            usuario: userDB
        }, seed, { expiresIn: expiracion })


        // devuelvo la respues si el user machea con el email and password
        res.json({
            ok: true,
            user: userDB,
            token
        });
    });

};

// Configuraciones de google 

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
};

obj.loginGoogle = async (req, res) => {
    // Token de google cuando haces el sing in
    let { idtoken } = req.body;
    // Verifico el token y me devuelve datos del usuario
    let googleUser = await verify(idtoken)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            });
        });


    User.findOne({
        email: googleUser.email 
    }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        };

        if( userDB ){
            // Sino se registro por google 
            if( userDB.google === false){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: "Debe de usar autenticacion normal"
                    }
                });
            }else {
                // renuevo el token personalidado
                let token = jwt.sign({
                    usuario:userDB
                }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

                return res.json({
                    ok:true,
                    user:userDB,
                    token
                });

            };

        }else {
            // Si el usuario no existe en nuestra base de datos
            // Creo una nueva instancia del usuario con las credenciales que me devuelve google
            let usuario = new User();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            // Para pasar la validacion de la base de datos
            usuario.password = ":)";

            usuario.save((err, userDB ) => {

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };

                let token = jwt.sign({
                    usuario:userDB
                }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

                return res.json({
                    ok:true,
                    user:userDB,
                    token
                });

            });
        };

    });
};



module.exports = { obj }