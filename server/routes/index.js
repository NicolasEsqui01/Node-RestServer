const express = require('express');
const router = express.Router();

router.use('/usuario', require('./user'));



module.exports = router;