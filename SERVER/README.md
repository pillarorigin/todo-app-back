## SERVER 관련 README

### 1. JSON-SERVER
    Getting started
    Install
    ```
    $ npm install -g json-server
    ```
### 2. Run server
    ```
    $ json-server --watch db.json --port 5000
 
    ```
### 3. Modify Scripts
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "json-server --watch db.json --port 5000",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

### 4. shell
```
$ npm start
```