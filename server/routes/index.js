const express = require('express');
const router = express.Router();


router.use('/usuario', require('./user'));
router.use('/login', require('./login'));
router.use('/category', require('./category'));
router.use('/product', require('./product'));
router.use('/upload', require('./uploadFile'));
router.use('/image', require('./image'));


module.exports = router;