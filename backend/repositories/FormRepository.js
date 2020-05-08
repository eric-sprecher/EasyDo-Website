const Form = require('../models/Form');

class FormRepository{

    constructor(model){
        this.model = model;
    }
    //CREATING A NEW USER
    create(userId, email, name, feedback){
        const newFeedback = {
            userId: userId,
            email: email,
            name: name,
            feedback: feedback
        };

        const item = new this.model(newFeedback);

        return item.save();
    }
}

module.exports = new FormRepository(Form);