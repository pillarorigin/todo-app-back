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
            6-1. mongoose model중 deleteOne 사용
            6-2. mongodb에 _id와 req.params.id 일치하면 삭제
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

8. 사용자 인증 부분 authentication -> 서버 쪽에서 다룰 예정 (hash.js 작성)
    [bcrypt] : https://www.npmjs.com/package/bcrypt
    bcrypt hash salt > jwt >
    ```js
        1. $ yarn add bcrypt //return값이 promise
        2. salt
        3. hash
        4. 실행 : node hash.js
    ```

9. mondel, routes에 각각 users.js 작성
    ```js
        //model / users.js
        1. express와 module 선언
        2. Schema 선언
        3. model 생성
        4. module.exports={}
        5. validate
            5.1 Joi Schema 선언
            5.2 return schema.validate(user를 인자로 받음)

        //routes / users.js
        1. express와 router 실행
        2. Router가 무슨 일을 할 지 정해준다 (http methods)
            2.1 정보 확인 : req.body
            2.2 validate
            2.3 저장 : mongoose model
                2.3.1 암호화 : bcrypt.hash()사용
                2.3.2 저장할 Uset instance 생성
                2.3.3 저장
        3. get
        4. patch
        5. delete
        
        7. module.exports = router; (밖으로 내보내기)

        // index.js
        1. user router 부르고 app.use로 사용한다 명시
            app.use('/auth', routes_users);

    ```