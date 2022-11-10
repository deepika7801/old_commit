
let registerButton = document.querySelector('.register-button');

document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Cancel the default action
});

registerButton.addEventListener('click',checkRegisterCredentials)

async function checkRegisterCredentials(){
    try{
        let user = document.getElementById('username');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
        let userData = {};
        userData = {username: `${user.value}`, password: `${password.value}`, confirmPassword: `${confirmPassword.value}`};
        console.log(userData);
        let registerCredential = await fetch('http://localhost:5000/registerCredentialData',{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(userData)
        });

        user.value = '';
        password.value = '';
        confirmPassword.value = '';
        user.focus();

        if(registerCredential.status==400)
        {
            alert("User already Exist");
        }
        else if(registerCredential.status==404)
        {
            alert("Password doesnt match");
        }
        else if(registerCredential.status==410)
        {
            alert("No empty inputs allowed");
        }
        else{
            alert("user created");
        }
    }
    catch(e){
        alert(console.error(e));
    }
}


let signup = document.getElementById('login');
signup.style.color = 'blue';