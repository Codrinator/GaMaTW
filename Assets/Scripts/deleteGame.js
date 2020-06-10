function processRequest() {
    const url = '/api/admin/deleteGame';
    const request = new XMLHttpRequest();
    const error = document.getElementById('errorHTML');
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true) {
            alert(request.response.status);
        } else
            error.innerHTML = request.response.status;
    };
    const formData = new FormData(form);

    request.send(JSON.stringify({
        name: formData.get("nameRegister")
    }));
}

const form = (document.getElementsByClassName("registerForm"))[0];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    processRequest();
});