const express = require('express');
const router = express.Router();

// const objRouter = {
//     'usuario' : { path:'/usuario', user: require('./user') },
//     'login' : { path: '/login', login: require('./login') },
//     'category' : { path: '/category', category: require('./category') },
//     'product' : { path: '/product', product: require('./product') }     
// };

router.use('/usuario', require('./user'));
router.use('/login', require('./login'));
router.use('/category', require('./category'));
router.use('/product', require('./product'));


module.exports = router;