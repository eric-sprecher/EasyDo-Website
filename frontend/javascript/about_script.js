
window.onload = init;

function init(){

    var arrowButton = document.getElementById('arrowButton');
    var submitButton = document.getElementById('feedbackButton');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    arrowButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/todo?id=' + userId;
    });

    submitButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/feedback?id=' + userId;
    })
}