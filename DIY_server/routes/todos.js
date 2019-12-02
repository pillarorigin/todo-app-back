//  1. express require
const express = require('express');
const { Todos, validateTodo } = require('../model/todos');
const wrapper = require('../common/wrapper');

//  2. router Declaration
const router = express.Router();

//  3. router url setting (GET) : base uri + /api/todos
// router.get('/',()=>{}) : 화살표 함수 부분을 try~catch 할 부분이니 이 부분에 wrapper 함수 사용
router.get('/', wrapper(async (req, res, next)=>{
    const todos = await Todos.find();
    res.json({todos});
    next();
}));

//  4. router url setting (POST)
router.post('/', wrapper(async (req, res, next) => {
    //  4.1 req.body => validate 확인
    if(validateTodo(req.body).error) {
        res.status(400).json({result: false, error:'양식에 맞지 않습니다'});
        next();
        return;
    }
    //  DB 등록: model -> 새로운 인스턴스 + save()
    const { content } = req.body;
    //  4.2 create instance
    const todos = new Todos({ content })
    //  4.3 mongodb에 save
    await todos.save();
    res.json({ result : true });
    next();
}))


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

//  2. module.exports
module.exports = router;