//  1. mongoose require
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const {Schema, model} = mongoose;

//  3. create Schema
const todosSchema = new mongoose.Schema({
    // id: {
    //     type : Number,
    //     required : true,
    //     unique : true
    // },
    content : {
        type : String,
        minlength : 2,
        maxlength : 100
    },
    completed : {
        type : Boolean,
        default : false
    } ,
    created_at : {
        type : Date,
        default : Date.now
    }
})

//  4. create  model
const Todos = mongoose.model('todos', todosSchema);

//  5. Joi validate
function validateTodo(todos) { //ㄱ. 전달 받은 todos를 
    //Joi schema  //ㄴ. 스키마 형태에 맞는지 확인하고
    const schema = Joi.object({
        // id: Joi.number().required(),
        content: Joi.string().min(2).max(100).required(),
        // completed: Joi.boolean(),
        // created_at: Joi.date()
    })
    return schema.validate(todos) //ㄷ. 확인한 totos를 리턴
}


//  2. module.exports
module.exports = {
    Todos, validateTodo
}
