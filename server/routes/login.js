const express = require("express");
const Router = express.Router();
const { obj } = require("../controllers/loginControllers");

/**
 * path:"/login"
 * method: POST
*/
Router.post("/", obj.login);


/**
 * path:"/login/google"
 * method: POST
*/
Router.post("/google", obj.loginGoogle);




module.exports = Router;