const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String
    },

    password: {
        type: String
    },

    greetName: {
        type: String
    },

    todo_list: [{}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;