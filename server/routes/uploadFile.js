const express = require('express');

const Router = express.Router();
const { uploadControllers } = require("../controllers/uploadFileControllers");

Router.put('/:type/:id', uploadControllers.actualizar);

module.exports = Router;