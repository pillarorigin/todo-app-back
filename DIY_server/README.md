### express-mongodb server

명세
API
    - url : /api/todos
    - method
        - GET
            - /api/todos: 모든 todo를 가져온다
            - /api/todos/:id :id에 해당하는 todo를 가져온다.
        - POST
            - /api/todos : 작성된 todo를 DB에 저장한다.
                -validate
                    1. content: required / min_length 2 / max_length 100
                    2. id: unique key
        - PATCH
            - /api/todos/:id :id에 해당하는 todo의 completed를 수정한다.
                - completed만 수정 가능하면 OK
        - DELETE
            - /api/todos/:id :id에 해당하는 todo를 삭제한다.


1. $ npm init -y

2. $ yarn add express mongoose nodemon body-parser

3. index.js 작성
    ```js
        1. express require
        2. express excute
        3. server listen
        4. mongodb access
        5. mongodb connect
        6. mongodb disconnet
        7. router call 
        8. middleware (body-parser, router url: http://localhost/api/todos)
        8-1. mongodb connect 이후 실행할 router
    ```

4. model / todos.js 작성
    ```bash
        1. mongoose require
        2. module.exports 
            (validate로직 등 공통 함수와 모델 들, module.exports = { Todos }: router에서 디스트럭처링해줘야 오브젝트 형태로 exports 가능)
        3. create Schema
        4. create model
        5. 
    ```

5. routes / todos.js 작성
    ```js
        1. express require, exports한 modules require //const { Todos } = require('../model/todos');
        2. router Declaration
        3. router url setting(GET)  //app.use('/api/todos', routes_todos);
        4. router url setting(POST)
            4-1. req.body 가져와서
            4-2. Declaration schema 형태로 create instance
            4-3. instance mongoDB에 save
        5. router url setting(PATCH)
        6. router url setting(DELETE)
    ```