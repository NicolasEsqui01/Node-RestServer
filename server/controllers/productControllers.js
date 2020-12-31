const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');

const controllers = {};

controllers.getProduct = (req, res) => {

    let limite = req.query.limit || 5;

    limite = Number(limite);

    Product.find()
        .populate('category')
        .limit(limite)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // products.map(product => {

            //     const userId = product.category.user;

            //     User.findOne({ _id: userId }, '_id nombre email role').exec((err, user) => {

            //         if (err) {
            //             return res.status(400).json({
            //                 ok: false,
            //                 err
            //             });
            //         };

                    // product.category.user = user;

                    res.status(200).json({
                        ok: true,
                        products
                    });

                // });

            // });

        });
};

controllers.getProductId = (req, res) => {
    /**
     * parameters of the body of a request
    */
    const { id } = req.params;

    Product.findById({ _id: id })
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };

            const userId = product.category.user;

            /**
             * find a user by id
            */
            User.findOne({ _id: userId }, '_id nombre email role').exec((err, user) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                };

                product.category.user = user;

                res.status(200).json({
                    ok: true,
                    product
                });

            });
        });
};

controllers.postProduct = (req, res) => {
    /**
     * parameters of the body of a request 
    */
    const { name, priceUni, descripcion, disponible, name_category } = req.body;

    Category.findOne({ descripcion: name_category })
        .populate('user', '_id nombre email role')
        .exec((err, category) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            /**
             * Yes the category not exist
            */
            if (!category) {
                return res.status(400).json({
                    ok: false,
                    message: "No existe esa category"
                });
            };

            /**
             * created a new instance of product
             */

            const product = new Product({
                name,
                priceUni,
                descripcion,
                category,
                disponible
            });


            product.save((err, product) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    product
                });

            });


        });
};

controllers.putProduct = (req, res) => {

    const { id } = req.params;
    const { name, descripcion } = req.body;

    Product.findOneAndUpdate(id, { name, descripcion }, { new:true })
    .populate('category')
    .exec((err, product) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };

        if(!product){
            return res.status(404).json({
                ok:false,
                message:"product is not finding"
            });
        };

        const userId = product.category.user;


        User.findById({_id:userId}, '_id nombre email role').exec((err, user) => {

            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            };

            product.category.user = user;

            res.status(200).json({
                ok:true,
                product
            });

        });

    
    });
};

controllers.deleteProduct = (req, res) => {

    const { id } = req.params;

    Product.findOneAndUpdate(id, { disponible: false }, { new: true })
    .populate('category')
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };

        if(!product){
            return res.status(404).json({
                ok:false,
                message:"Not product found"
            });
        };

        const userId = product.category.user;
        
        User.findById({_id:userId}, "_id nombre email role").exec((err, user)=>{

            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            };  

            product.category.user = user;

            res.status(200).json({
                ok:true,
                product,
            });


        });


    });



};

module.exports = { controllers }
