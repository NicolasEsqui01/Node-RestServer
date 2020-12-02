const express = require('express');
const router = express.Router();
const { obj } = require('../controllers/userControllers');
const { verificarToken } = require('../middlewares/authentication');

router.get("/", verificarToken ,obj.getUser);

router.post('/', obj.postUser);

router.put('/:id', obj.putUser);

router.delete('/:id', obj.deleteUser);


module.exports = router;