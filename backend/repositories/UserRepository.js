const User = require('../models/User');

class UserRepository{

    constructor(model){
        this.model = model;
    }
    //CREATING A NEW USER
    create(username, password, greetName, todo_list){
        const newUser = {
            username: username,
            password: password,
            greetName: greetName,
            todo_list: todo_list
        };
        const user = new this.model(newUser);

        return user.save();
    }

    findAll(){
        return this.model.find();
    }

    findById(id){
        return this.model.findById(id);
    }

    findByUsername(username){
        return this.model.findOne({username: username}, (err, response) => {
            console.log(response);
        });
    }

    deleteById(id){
        return this.model.findByIdAndDelete(id);
    }

    updateById(id, object){
        const query = {_id: id};
        return this.model.findOneAndUpdate(query, { $set: {todo_list: object.todo_list}});
    }
}

module.exports = new UserRepository(User)