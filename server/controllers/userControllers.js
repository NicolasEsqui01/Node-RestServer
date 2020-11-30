const obj = {};
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

obj.getUser = (req, res) => {

    let since = req.query.since || 0;
    since = Number(since)

    let limite = req.query.limit || 5;
    limite = Number(limite);


    // Segundo parametro del find es para expecificar los campos que necesitan devolver cuando haces la peticion
    User.find({
            estado: true
        }, 'nombre email role estado google img')
        .skip(since)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            User.count({ estado: true }, (err, conteo) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                res.json({
                    ok: true,
                    usuarios,
                    cuanto: conteo
                });
            });
        });

};

obj.postUser = (req, res) => {
    let { nombre, email, password, img, role } = req.body;
    //new instance from model user
    let user = new User({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });

    user.save((err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario
        })
    });
};

obj.putUser = (req, res) => {
    let { id } = req.params;
    let { nombre, role, img, email, estado } = req.body;
    let body = _.pick({ nombre, role, img, email, estado }, ["nombre", "role", "img", "email", "estado"]);

    // Search a user and the update
    User.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuario) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario
        });

    });
};

obj.deleteUser = (req, res) => {
    let { id } = req.params;

    User.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuario) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        };

        res.json({
            ok: true,
            usuario
        });


    });

};




module.exports = { obj }