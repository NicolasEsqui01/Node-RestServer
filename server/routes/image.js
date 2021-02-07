const express = require("express");

const Router = express.Router();
const { imageControllers } = require('../controllers/imageControllers');
const { verificaTokenImag } = require("../middlewares/authentication");

Router.get('/:type/:img', verificaTokenImag, imageControllers.getImg);

module.exports = Router;