const express = require('express');
const router = express.Router();
const { obj } = require('../controllers/userControllers');

router.get("/", obj.getUser);

router.post('/', obj.postUser);

router.put('/:id', obj.putUser);

router.delete('/:id', obj.deleteUser);


module.exports = router;