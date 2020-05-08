const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
//READS THE LOGIN INFORMATION FROM .ENV FILE FOR MONGOOSE
require('dotenv/config');

const signupRoute = require('./routes/signup-route');
const todoRoute = require('./routes/todo-route');
const aboutRoute = require('./routes/about-route');
const feedbackRoute = require('./routes/feedback-route');

const repository = require('./repositories/UserRepository');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/signup', signupRoute);
app.use('/todo', todoRoute);
app.use('/about', aboutRoute);
app.use('/feedback', feedbackRoute);

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend', 'html', 'index.html'));
});

//ATTEMPTS TO FIND THE USER SPECIFIED USERNAME AMONG DATABASE ENTRIES
app.post('/signin', (request, response) => {
    repository.findByUsername(request.body.username)
    .then(user => response.json(user))
    .catch(err => console.log(err));
})

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    () => console.log('Connected to DB'));

app.listen(3000, () => console.log("Listening on port 3000"));