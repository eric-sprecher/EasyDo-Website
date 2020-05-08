
var username = document.getElementById('username');
var password = document.getElementById('password');
var error_message = document.getElementById('warningTag');
var loginButton = document.getElementById('login');

window.onload = init;

function init(){
    loginButton.addEventListener('click', () => {
        if(username.value.length < 1){
            return error_message.innerHTML = "Please enter a valid username"
        }
        
        if(password.value == ""){
            return error_message.innerHTML = "Please enter a password";
        }

        checkEntries()
        .then(data => {
            console.log(data.password);
            error_message.innerHTML = "";

            if(data == null){
                return error_message.innerHTML = "Username not found. Please try again!";
            }

            if(password.value != data.password){
                return error_message.innerHTML = "Invalid Password. Please Try Again";
            }

            window.location.href = 'http://localhost:3000/todo?id=' + data._id;
        })
        .catch(err => console.log(err));
    });
}

function checkEntries(){

    return axios({
        method: 'post',
        url: '/signin',
        data: {
            username: username.value
        },
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
}
