
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const greetName = document.getElementById('greetName');
const error_message = document.getElementById('error_message');

window.onload = init;

function init(){
    var button = document.getElementById('submitButton');

    button.addEventListener('click', () => {
        
        if(password.value != confirmPassword.value){
            return error_message.innerHTML = "Passwords do not match!";
        }
        error_message.innerHTML = "";

        createNewUser()
        .then(data => {
            username.value = '';
            password.value = '';
            confirmPassword.value = '';
            greetName.value = '';

            window.location.href = 'http://localhost:3000/todo?id=' + data;
        })
        .catch(err => console.log(err));
    });
}

function createNewUser(){
    var today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth() + 1;

    return axios({
        method: 'post',
        url: '/signup',
        data: {
            username: username.value,
            password: password.value,
            greetName: greetName.value,
            todo_list: [
                {
                    task: "Welcome to EasyDo!",
                    date: currentDay + " " + currentMonth
                },
                {
                    task: "Add a new item to the list using the text bar above!",
                    date: currentDay + " " + currentMonth
                },
                {
                    task: "Complete items by clicking the X to the left!",
                    date: currentDay + " " + currentMonth
                }
            ]
        },
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        //RETURN THE ID OF THE NEWLY CREATED USER SO THE TODO PAGE CAN FIND AND LOAD GREET NAME AND TODO-LIST
        return response.data._id;
    })
    .catch(err => console.log(err));
}