const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: "{VALUE} don't is a rol valid"
};

// new instance from user
let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'The name is need']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is need'],
    },
    password: {
        type: String,
        required: [true, 'The password is need']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password
    return userObject
};


userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});


module.exports = mongoose.model('user', userSchema)