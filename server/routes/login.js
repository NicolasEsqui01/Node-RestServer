const express = require("express");
const Router = express.Router();
const { obj } = require("../controllers/loginControllers");


Router.post("/", obj.login);
Router.post("/google", obj.loginGoogle);




module.exports = Router;