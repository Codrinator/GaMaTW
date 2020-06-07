function processRequest() {
    const url = '/api/auth/login';
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    const error = document.getElementById('errorHTML');
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true) {
            const rememberCheck = document.getElementById("checkboxLogin");
            if (rememberCheck.checked) {
                localStorage.setItem("isLogged", true);
                localStorage.setItem("user", request.response.username);
                localStorage.setItem("token", request.response.token);
            } else {
                sessionStorage.setItem("isLogged", true);
                sessionStorage.setItem("user", request.response.username);
                sessionStorage.setItem("token", request.response.token);
            }
            window.location.href = "/"
        } else {
            error.innerHTML = request.response.status;

        }
    };
    request.send(JSON.stringify({
        usernameRegister: formData.get("username"),
        passwordRegister: formData.get("password")
    }));
}

const form = (document.getElementsByClassName("loginForm"))[0];
form.addEventListener("submit", function (event) {
    event.preventDefault();

    processRequest();
});