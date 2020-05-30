function processRequest() {
    const url = '/api/auth/login';
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    const loginForm = (document.getElementsByClassName("loginForm"))[0];
    const error = document.createElement('p');
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
            //alert(request.response.status);
            error.textContent = request.response.status;
            error.id = "errorStatus";
            error.classList.add("errorText");
            loginForm.lastChild.remove();
            loginForm.append(error);
        }
    };
    request.send(JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
    }));
}

const form = (document.getElementsByClassName("loginForm"))[0];
form.addEventListener("submit", function (event) {
    event.preventDefault();

    processRequest();
});