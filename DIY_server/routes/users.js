//  1. express와 router 실행
const express = require('express');
const { User, validateUser } = require('../models/users');
const bcrypt = require('bcrypt');
const wrapper = require('../common/wrapper');

const router = express.Router();


//  2. Router가 무슨 일을 할 지( ()=>{} ) 정해준다
router.post('/join', wrapper(async (req, res, next) => {
    //  2.1 정보 확인 : req.body
    const { name, email, password } = req.body
    //  2.2 validate
    if (validateUser(req.body).error) {
        res.status(400).json({ result: false, error: 'email형식에 맞지 않습니다.' });
        next();
        return;
    };
    //  2.3 저장 : mongoose model
    //  2.3.1 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);
    //  2.3.2 저장할 Uset instance 생성
    const targetUser = new User({
        name: name,
        email: email,
        password: hashedPW
    });
    //  2.3.3 저장
    targetUser.save();
    res.json({ result: true })
    next();
}));

//  3. get

//  4. patch

//  5. delete?


//  7. 밖으로 내보내기
module.exports = router; 