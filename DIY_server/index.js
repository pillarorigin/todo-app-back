//  1. express require
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');


//  7. router call
const routes_todos = require('./routes/todos');
const routes_users = require('./routes/users');

//  2. express excute
const app = express();

//  8. middleware use
app.use(express.json()); //date를 body에 담아 POST request로 보내기 위한 body-parser.

//  4. mongodb Access
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/welcome'

//  9. middelware
app.use(helmet());
app.use(cors());

//  5. mongodb connect
app.use((req, res, next) => {
    console.log('mongoose try connecting')
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('mongodb connect success!!')
            next() //router로직 수행후 여기로 다시 옴.

        })
        .catch(e => next(e));
})

//  8.1 mongodb connect 이후 실행 되야 하므로 connect 로직 다음 줄에 작성
app.use('/api/todos', routes_todos); //'localhost/api/todos' 로 url 요청이 오면 routes 폴더의 todos.js로 경로 이등.
//  9. ToDo:  users 라우터
app.use('/auth', routes_users);

//  6. mongodb disconnect
app.use(() => {
    mongoose.disconnect()
        .then(() => { console.log('mongodb disconnect..bye see U'); })
})

//  3. server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { `${PORT}번 port listening..` })