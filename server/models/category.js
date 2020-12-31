const { Schema, model } = require("mongoose");


const Category = new Schema({
    descripcion:{
        type:String,
        unique:true,
        required:[true, 'I need a description']
    },
    user:{
        type: Schema.Types.ObjectId, ref: "user"
    }
});


module.exports = model('category', Category);