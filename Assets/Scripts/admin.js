function processRequest() {
    const url = '/api/admin/registerGame';
    const request = new XMLHttpRequest();


    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';
    request.onload = function () {
        if (request.response.success === true) {
            alert(request.response.status);
        }
    };
    const formData = new FormData(form);

    request.send(JSON.stringify({
        name: formData.get("nameRegister"),
        company: formData.get("company"),
        release_date: formData.get("releaseDate"),
        genres: formData.get("genres"),
        price: formData.get("price"),
        category: formData.get("category"),
        age_restriction: formData.get("age_restriction"),
        platform: formData.get("platform"),
        description: formData.get("description")
    }));
}


const form = (document.getElementsByClassName("registerForm"))[0];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    processRequest();
});