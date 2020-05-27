
function processRequest(){
    const url = '/api/auth/login';
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true){
            window.location.href = "/"
        }
        alert(request.response.status);
    }
    request.send(JSON.stringify({
        username : formData.get("username"),
        password : formData.get("password")
    }));
}

const form = (document.getElementsByClassName( "loginForm" ))[0];
form.addEventListener( "submit", function ( event ) {
    event.preventDefault();

    processRequest();
} );