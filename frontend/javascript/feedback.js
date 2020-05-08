
var email = document.getElementById('email');
var feedback = document.getElementById('feedback');
var userId;

window.onload = init;

function init(){

    var submitButton = document.getElementById('submit');
    var backbutton = document.getElementById('backButton');

    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');
    //SIGNALS THE CREATION OF NEW FEEDBACK
    submitButton.addEventListener('click', () => {

        sendFeedback();
        document.getElementById('success_message').innerHTML = "Feedback successfully submitted! Thank you!";
    });

    backbutton.addEventListener('click', () => {

        window.location.href = 'http://localhost:3000/about?id=' + userId;
    })
}
//CREATES A NEW FEEDBACK ITEM IN THE DATABASE
function sendFeedback(){
    axios({
        method: 'post',
        url: '/feedback',
        data: {
            userId: userId,
            email: email.value,
            feedback: feedback.value
        },
        headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
        console.log(data);
        email.value = '';
        name.value = '';
        feedback.value = '';
    })
    .catch(err => console.log(err));
}