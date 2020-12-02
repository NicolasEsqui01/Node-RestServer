const express = require("express");
const Router = express.Router();
const { obj } = require("../controllers/loginControllers");


Router.post("/", obj.login);




module.exports = Router;