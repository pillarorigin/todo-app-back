//  1. express require
const express = require('express');
const { Todos } = require('../model/todos');

//  2. router Declaration
const router = express.Router();

//  3. router url setting (GET)
router.get('/', async (req, res, next)=>{
    const todos = await Todos.find()
    res.send(todos);
    next();
});

//  4. router url setting (POST)
router.post('/', async (req, res, next) => {
    //  4.1 req.body 
    const { content } = req.body;
    //  4.2 create instance
    const todos = new Todos({
        content
    })
    //  4.3 mongodb에 save
    const result = await todos.save();
    res.send(result);
    next();
})


//  5. patch
router.patch('/', async (req, res, next) => {
    const { content } = req.body.content;
    res.send(content);
})

//  6. delete
router.delete('/', async (req, res, next) => {
    const { content } = req.body.content;
    res.send(content)

})

module.exports = router;