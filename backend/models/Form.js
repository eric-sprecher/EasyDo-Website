const mongoose = require('mongoose');

const formSchema = mongoose.Schema({

    userId: {
        type: String
    },

    email: {
        type: String
    },

    name: {
        type: String
    },

    feedback: {
        type: String
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;