# express-mongodb server

### 명세
1. API
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
2. Resource
     resource라는 단어는 웝페이지(html), binary data(그림파일, 소리파일 등), db data(json/xml/혹은 html로 render된 data)등 서버가 제공할 수 있는 데이터.

### 프로젝트 생성
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
        9. middleware
            $ yarn add cors helmet
    ```

4. model / todos.js(mongoose Schema) 작성
    ```bash
        1. mongoose require
        2. module.exports = {}
            (validate로직 등 공통 함수와 모델 들, module.exports = { Todos }: router에서 디스트럭처링해줘야 오브젝트 형태로 exports 가능)
        3. create Schema 
            (object 형태로 사용하면 type, valitate 등 사용 가능)
        4. create model
            (const Todos = mongoose.model('todos', todosSchema);)
        5. Joi Validate
    ```

5. routes / todos.js 작성
    ```js
        1. express require, exports한 modules require
            //const { Todos } = require('../model/todos');
        2. router Declaration, module.exports
        3. router url setting(GET)  
            //app.use('/api/todos', routes_todos);
            //주소 url 뒤에 :/값은 req.params에 저장
        4. router url setting(POST)
            //주소 url과 함께 보낸 데이터는 req.body에 저장. (body parser 사용)
            4-1. req.body 가져와서
            4-2. Declaration schema 형태로 create instance
            4-3. instance mongoDB에 save
        5. router url setting(PATCH)
            5-1. mongoose model중 updataOne 사용
            5-2. mongodb에 _id와 req.params.id 일치하면 수정
        6. router url setting(DELETE)
    ```


6. @hapi/joi 모듈 사용해서 validate
    ```bash
        $ yarn add @hapi/joi
    ```
    validate 로직 추가 

7. common / wrapper.js 작성 
    (비동기 상에서 try, catch 쉽게하기 위해 wrapper로 감싸기.)
    ```js

    ```