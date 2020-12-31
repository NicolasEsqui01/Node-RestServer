const express = require("express");
const Router = express.Router();

const { verificarToken, verificarAdmin_role } = require('../middlewares/authentication');
const { obj } = require('../controllers/categoryControllers');

// Buscar todas las categorias
Router.get('/', verificarToken, obj.getCategory);

// Buscar categoria por id
Router.get('/:id', verificarToken, obj.getCategoryId);

// Crear una nueva categoria
Router.post('/', verificarToken, obj.createCategory);

// Actualizar una categoria
Router.put('/:id', verificarToken, obj.toupdateCategory);

// Delete de una categoria
Router.delete('/:id', [verificarToken, verificarAdmin_role ], obj.deleteCategory);

//Solamente puede eliminar un admin una categoria


module.exports = Router;