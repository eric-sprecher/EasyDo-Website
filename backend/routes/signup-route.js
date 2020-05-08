const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const repository = require('../repositories/UserRepository');

app.use(express.static(path.join(__dirname, '../../frontend')));

router.get('/', (require, response) => {
    response.sendFile(path.join(__dirname, '../../frontend', 'html', 'signup.html'));
});

router.post('/', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const greetName = request.body.greetName;
    const todo_list = request.body.todo_list;

    repository.create(username, password, greetName, todo_list)
    .then(user => {
        response.json(user);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;