//  1. mongoose require
const mongoose = require('mongoose');

//  3. create Schema
const todosSchema = new mongoose.Schema({
    id: Number,
    content : String,
    date : {
        type : String,
        default : Date.now
    }
})

//  4. create model
const Todos = mongoose.model('todos', todosSchema);

//  2. module.exports
module.exports = {
    Todos
}
