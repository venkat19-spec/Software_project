const logBtn = document.querySelector('#btn');
logBtn.onclick = function() {
    const userInput = document.querySelector('#username');
    const username = userInput.value;
    fetch('http://localhost:5000/login_admin', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username:username})
    })
    .then(response => response.json())
    .then(data => check(data['data']));
}
 function check(data){
    const passwordInput = document.querySelector('#password');
    const password = passwordInput.value;
    passwordInput.value = "";
    if(data[password]=== password){
        location.replace("admindashboard.html");
    }
    else{
        alert('wrongpassword');
    }


 }