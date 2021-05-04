const changeBtn = document.querySelector('#change');
changeBtn.onclick = function () {
    const password = document.querySelector('#prepass').value;
    fetch('http://localhost:5000/getchangepass'+password)
    .then(response => response.json())
    .then(data => passwordcheck(data['data']));

}
function passwordcheck(data){
    const pass1 = document.querySelector('#newpass').value
    const pass2 = document.querySelector('#copass').value
    if(data.success==true){
        if(pass1==pass2){

        fetch('http://localhost:5000/update_password', {
                     method: 'PATCH',
                         headers: {
                                'Content-type' : 'application/json'
                                    },
                        body: JSON.stringify({pass:pass1})
                    });}
        else{
            alert("password doesn't match")
        }

    }
    else{
        alert("wrong password")
    }
}
/*
function passwordcheck(data){
    alert('password')
    const pass  = document.querySelector('#prepass').value
    const pass1 = document.querySelector('#newpass').value
    const pass2 = document.querySelector('#copass').value
    var orpass='';

   
    data.forEach(function ({password}){
        orpass=password
        alert(orpass)
    });
    alert('nm')
    if(orpass==pass){
        if(pass1==pass2){
            alert('hi')
            fetch('http://localhost:5000/update_password', {
                     method: 'PATCH',
                         headers: {
                                'Content-type' : 'application/json'
                                    },
                        body: JSON.stringify({pass:pass1})
                    });
    }
    
        else{
            alert("password does't match")
        }
    }
    else{
        alert("wrong password")
    }
}*/