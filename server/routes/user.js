const express = require('express');
const router = express.Router();
const { obj } = require('../controllers/userControllers');
const { verificarToken, verificarAdmin_role } = require('../middlewares/authentication');

router.get("/", verificarToken ,obj.getUser);

router.post('/', [verificarToken, verificarAdmin_role] , obj.postUser);

router.put('/:id', [verificarToken, verificarAdmin_role] , obj.putUser);

router.delete('/:id', [verificarToken, verificarAdmin_role] ,obj.deleteUser);


module.exports = router; 