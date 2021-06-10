const addBtn = document.querySelector('#submit');

addBtn.onclick = function (){
    const username = document.querySelector('#Username').value;
    const password = document.querySelector('#Password').value;
    fetch('http://localhost:5000/getpass', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username:username,password:password})
    })
    .then(response => response.json())
    .then(data => passwordcheck(data['data']));
}
function passwordcheck(data){
    const username = document.querySelector('#Username').value;
    if(data.success==true){
        fetch('http://localhost:5000/startsession'+username)
        location.replace("/facultydashboard");
    }
    else{
     alert("Wrong username or password");
    }
}