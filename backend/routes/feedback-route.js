const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const repository = require('../repositories/FormRepository');

app.use(express.static(path.join(__dirname, '../../frontend')));

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../frontend', 'html', 'feedback.html'));
});

router.post('/', (request, response) => {
    const userId = request.body.userId;
    const email = request.body.email;
    const name = request.body.name;
    const feedback = request.body.feedback;

    repository.create(userId, email, name, feedback)
    .then(form => {
        response.json(form);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;