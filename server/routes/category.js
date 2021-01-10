const express = require("express");
const Router = express.Router();

const { verificarToken, verificarAdmin_role } = require('../middlewares/authentication');
const { obj } = require('../controllers/categoryControllers');

/**
 * Path:"/category"
 * method: GET 
*/
Router.get('/', verificarToken, obj.getCategory);

/**
 * Path:"/category/${id}"
 * Method: GET
*/
Router.get('/:id', verificarToken, obj.getCategoryId);


/**
 * Body: { descripcion }
 * Path:"/category"
 * Method: POST
*/
Router.post('/', verificarToken, obj.createCategory);

/**
 * Params: { id }
 * Body: { descripcion }
 * Path:"/category/${id}"
 * Method: PUT
*/
Router.put('/:id', verificarToken, obj.toupdateCategory);

/**
 * Params: { id }
 * Path:"/category/${id}"
 * Method: DELETE 
*/
Router.delete('/:id', [verificarToken, verificarAdmin_role ], obj.deleteCategory);


module.exports = Router;