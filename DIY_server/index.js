//  1. express require
const express = require('express');
const mongoose = require('mongoose');

//  7. router call
const routes_todos = require('./routes/todos');

//  2. express excute
const app = express();

//  8. middleware use
app.use(express.json()); //date를 body에 담아 POST request로 보내기 위한 body-parser.

//  4. mongodb Access
const mongoURL = 'mongodb://localhost/welcome'

//  5. mongodb connect
app.use((req, res, next) => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('mongodb connect success!!')
            next() //router로직 수행후 여기로 다시 옴.

        })
})
//  8.1 mongodb connect 이후 실행 되야 하므로 connect 로직 다음 줄에 작성
app.use('/api/todos', routes_todos); //'localhost/api/todos' 로 url 요청이 오면 routes 폴더의 todos.js로 경로 이등.

//  6. mongodb disconnect
app.use(() => {
    mongoose.disconnect()
        .then(() => { console.log('mongodb disconnect..bye see U'); })
})

//  3. server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { `${PORT}번 port listening..` })