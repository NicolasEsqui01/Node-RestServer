const Category = require('../models/category');
const obj = {};

obj.getCategory = (req, res) => {

    Category.find({})
        .sort('descripcion')
        .populate('user','nombre email') // Hago referencia al modelo user, solo las propiedades nombre email
        .exec((err, category) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };

        res.json({
            ok:true,
            category
        });

    });
};

obj.getCategoryId = (req, res) => {

    let { id } = req.params;

    Category.findById(id, (err, categoryId) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };


        if(!categoryId){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"El id no es correcto"
                }
            });
        };

        res.json({
            ok:true,
            categoryId
        });

    });

};

obj.createCategory = (req, res) => {
    
    let { descripcion } = req.body;
    let { _id } = req.usuario

    let category = new Category();

    category.descripcion = descripcion;
    category.user = _id;

    category.save((err, categoryDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        };

        if(!categoryDB) {
            return res.status(400).json({
                ok:false,
                err
            });
        };

        res.json({
            ok:true,
            categoryDB
        });

    });
};

obj.toupdateCategory = (req, res) => {

    let { id } = req.params;
    let { descripcion } = req.body;

    Category.findByIdAndUpdate(id, { descripcion } , { new:true, runValidators:true } , (err, categoryUpdate) => {

        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        };

        if(!categoryUpdate){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id es invalido'
                }
            });
        };

        res.json({
            ok:true,
            message: "Category update sucess",
            categoryUpdate
        });
    });

};

obj.deleteCategory = (req, res) => {

    let { id } = req.params;
    let { _id } = req.usuario;

    Category.findOneAndRemove({ _id:id, user: _id }, (err, categoryDelete) => {
        
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };
    
        if(!categoryDelete){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id es invalido'
                }
            });
        }

        res.json({
                ok:true,
                message:"Category Delete sucess",
                categoryDelete
            });
    
    });
};


module.exports = { obj }