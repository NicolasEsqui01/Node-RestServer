const fs = require("fs");
const path = require("path");

const User = require("../models/user");
const Product = require("../models/product");

const uploadControllers = {};

uploadControllers.actualizar = (req, res) => {

    let { type, id } = req.params;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        })
    };

    // validar tipo
    let typeValid = ['product','user'];

    if(typeValid.indexOf(type) < 0){
        return res.status(400).json({
            ok:false,
            err:{
                message:"The types permitidos son " + typeValid.join(', '),
                type
            }
        });
    };


    let sampleFile = req.files.archivos;
    let extFile = sampleFile.name.split('.');
    // Extension permitidas;
    let extensionValidate = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    if (extensionValidate.indexOf(extFile[extFile.length - 1]) < 0) {
        return res.status(400).json({
            ok:false,
            err:{
                message:"The extension valid " + extensionValidate.join(", "),
                extFile:`.${extFile[extFile.length - 1]}`
            }
        });
    };

    // Cambiar name of file
    let nameFile = `${id}-${new Date().getMilliseconds()}.${extFile[extFile.length - 1]}`;

    sampleFile.mv(`upload/${type}/${nameFile}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        // Aqui, imagen cargada

        let obj = {
            "user": imageUser,
            "product": imageProduct
        };

        return obj[type](id, res, nameFile);

    }); 
};

const imageUser = (id, res, nameFile) => {

    User.findById(id, (err, userDB) => {

        if(err){
            deleteFile(nameFile, 'user');
            return res.status(500).json({
                ok:false,
                err
            });
        };

        if(!userDB){
            deleteFile(nameFile, 'user');
            return res.status(400).json({
                ok:false,
                err:{
                    message:"User no exist"
                }
            });
        };

        deleteFile(userDB.img, 'user');

        userDB.img = nameFile;

        userDB.save((err, user) => {

            res.json({
                ok:true,
                user,
                img: nameFile
            });

        });

    });
};

const imageProduct = (id, res, nameFile) => {
    
    Product.findById(id, (err, productDB) => {

        if(err){
            deleteFile(nameFile, 'product');
            return res.status(500).json({
                ok:false,
                err
            });
        };

        if(!productDB){
            deleteFile(nameFile, 'product');
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Product not exist"
                }
            });
        };

        deleteFile(productDB.img, 'product');

        productDB.img = nameFile;

        productDB.save((err, product) => {

            res.json({
                ok:false,
                product,
                img: nameFile
            });

        });

    });
};
 
const deleteFile = (nameImag, type) => {
    let pathImage = path.join(__dirname, `../../upload/${type}/${nameImag}`);
    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
    };
};

module.exports = { uploadControllers }
