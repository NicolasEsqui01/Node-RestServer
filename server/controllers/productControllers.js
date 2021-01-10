const Product = require('../models/product');

const controllers = {};

controllers.getProduct = (req, res) => {

    let since = req.query.since || 0;

    since = Number(since);

    Product.find({ disponible: true })
        .skip(since)
        .limit(5)
        .populate('user', 'nombre email')
        .populate('category', 'descripcion')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                products
            });
        });
};

controllers.getProductId = (req, res) => {
    /**
     * parameters of the body of a request
    */
    const { id } = req.params;

    Product.findById({ _id: id })
        .populate('user', 'nombre email')
        .populate("category", 'descripcion')
        .exec((err, product) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!product) {
                return res.status(500).json({
                    ok: false,
                    message: " ID not existe"
                })
            };

            res.status(200).json({
                ok: true,
                product
            });
        });
};

controllers.getAllproduct = (req, res) => {

    const { termino } = req.params;

    let regex = new RegExp( termino ,'i');

    Product.find({ name: regex })
        .populate("category", "descripcion")
        .exec((err, product) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };



            res.json({
                ok: true,
                product
            })

        });

};

controllers.postProduct = (req, res) => {
    /**
     * parameters of the body of a request 
    */
    const { name, priceUni, descripcion, disponible, category } = req.body;

    /**
     * created a new instance of product
    */

    const product = new Product({
        name,
        priceUni,
        descripcion,
        category,
        disponible,
        user: req.usuario
    });


    product.save((err, product) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Status 201 para la creacion de un new product
        res.status(201).json({
            ok: true,
            product
        });

    });
};

controllers.putProduct = (req, res) => {

    const { id } = req.params;
    const { name, descripcion, priceUni, disponible, category } = req.body;

    Product.findById({ _id: id }, (err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!product) {
            return res.status(400).json({
                ok: false,
                message: "product is not finding"
            });
        };

        product.name = name;
        product.descripcion = descripcion;
        product.priceUni = priceUni;
        product.disponible = disponible;
        product.category = category;

        product.save((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.status(200).json({
                ok: true,
                product: productDB
            });

        });
    });
};

controllers.deleteProduct = (req, res) => {

    const { id } = req.params;

    Product.findOneAndUpdate(id, { disponible: false }, { new: true })
        .exec((err, product) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: "Not product found"
                });
            };


            product.save((err, productDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                res.status(200).json({
                    ok: true,
                    product: productDB,
                    message: "Product deleted"
                });
            });
        });
};

module.exports = { controllers }
