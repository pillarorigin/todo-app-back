//  1. express와 module 선언
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//mongoose.Schema, mongoose.model 
const { Schema, model } = mongoose;

//  2. Schema 선언
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    admin: {
        type: Boolean,
        default: true
    }
});

//  3. Model 생성
const User = model('User', userSchema);

//  5. validate
function validateUser(user) {
    //  5.1 Joi Schema
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string()
    })
    //  5.2 return schema
    return schema.validate(user);
};

//  4. module.exports={}
module.exports = {
    User,
    validateUser
};
