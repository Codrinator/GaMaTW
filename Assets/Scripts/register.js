async function InsertUser() {
    var username = document.getElementById("usernameRegister").value;
    var password = document.getElementById("passwordRegister").value;
    var passwordConfirm = document.getElementById("passwordConfirmRegister").value;

    if (username.length < 4) {

        alert("Username too short");
    } else if (password.length < 4) {
        alert("Password too short");
    } else if (passwordConfirm !== password)
        alert("Passwords do not match each other");
    else {

        var request = new XMLHttpRequest();
        request.open("POST", "");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({"username": username, "password": password}));

    }
//request.open("POST","*/api/auth/register");

//request.send();
}