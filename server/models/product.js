const { Schema, model } = require("mongoose");

const Product = new Schema({
    name: { type: String, required: [true, 'The name is need'] },
    priceUni: { type: Number, required: [true, 'The price Uni is need'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});


module.exports = model('product', Product);