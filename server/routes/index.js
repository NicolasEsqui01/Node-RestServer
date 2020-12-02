const express = require('express');
const router = express.Router();

router.use('/usuario', require('./user'));
router.use('/login', require('./login'));



module.exports = router;