const imageControllers = {};
const fs = require('fs');
const path = require("path");

imageControllers.getImg = (req, res) => {

    let { type, img } = req.params;

    let pathImage = path.join(__dirname, `../../upload/${type}/${img}`);
    let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
    
    // Si existe la imagen en product o user la muestro sino una foto not-found

    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else {
        res.sendFile(noImagePath);   
    };
};

module.exports = { imageControllers };