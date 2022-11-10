

let loginButton = document.querySelector('.loginButton');

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Cancel the default action
});

loginButton.addEventListener('click',checkLoginCredentials)

async function checkLoginCredentials(){
    try{
        let user = document.getElementById('username');
let password = document.getElementById('password');
        let userData = {};
        userData = {username: `${user.value}`, password: `${password.value}`};
        console.log(userData);
        let loginCredential = await fetch('http://localhost:5000/loginCredentialData',{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(userData)
        });
        // console.log(loginCredential);
        user.value = '';
        password.value = '';
        user.focus();
        if(loginCredential.ok)
        {
            // console.log("hi");
            alert("login success");
            window.location.href='../html/dashboard.html';
        }
        else{
            alert("Invalid Username or password");
            // console.log('bye');
        }
    }
    catch(e){
        alert(console.error(e));
    }
}


let signup = document.getElementById('signup');
signup.style.color = 'blue';