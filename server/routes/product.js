const express = require("express");
const Router = express.Router();
const { verificarToken } = require('../middlewares/authentication');
const { controllers } = require('../controllers/productControllers');

/**
 * 
 * queryString: ?since=number 
 * path: '/product'
 * method: GET
 * 
*/
Router.get('/', verificarToken, controllers.getProduct);


/**
 * pamars: id
 * path: "/product/${id}"
 * method: GET
*/
Router.get('/:id', verificarToken, controllers.getProductId);

/**
 * pamars: { termino }
 * path: "/product/search/${termino}"
 * method: GET
*/ 
Router.get('/search/:termino', verificarToken, controllers.getAllproduct);


/**
 * 
 * body: name, priceUni, descripcion, disponible, name_category
 * path: "/product"
 * method: POST
*/

Router.post('/', verificarToken, controllers.postProduct);

/**
 * 
 * params: id
 * path: "/product/${id}"
 * method: PUT
 * 
*/

Router.put('/:id', verificarToken, controllers.putProduct);


/**
 * 
 * params: id
 * path: "/product/${id}"
 * method: DELETE
 * 
*/

Router.delete('/:id', verificarToken, controllers.deleteProduct);

module.exports = Router;




