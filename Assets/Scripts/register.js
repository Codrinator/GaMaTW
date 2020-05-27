function processRequest() {
    const url = '/api/auth/register';
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    const username = formData.get("usernameRegister").toString();
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true) {
            alert(request.response.status);
            window.location.href = "/login";

          /*  const form = (document.getElementsByClassName("loginForm"))[0];
            const formDataLogin = new FormData(form);
            formDataLogin.set("username",username); */
        } else alert(request.response.status);
    };

    request.send(JSON.stringify({
        usernameRegister: formData.get("usernameRegister"),
        passwordRegister: formData.get("passwordRegister"),
        passwordConfirmRegister: formData.get("passwordConfirmRegister")
    }));
}

const form = (document.getElementsByClassName("registerForm"))[0];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    processRequest();
});
