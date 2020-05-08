const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const repository = require('../repositories/UserRepository');

app.use(express.static(path.join(__dirname, '../../frontend')));

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../frontend', 'html', 'default_list.html'));
});

router.get('/:id', (request, response) => {
    repository.findById(request.params.id)
    .then(todo => {
        response.json(todo);
    })
    .catch(err => console.log(err));
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

router.put('/:id', (request, response) => {
    const id = request.params.id;
    const todo = {
        todo_list: request.body.todo_list
    };

    repository.updateById(id, todo)
    .then(response.status(200).json([]))
    .catch(err => console.log(err));
});

module.exports = router;