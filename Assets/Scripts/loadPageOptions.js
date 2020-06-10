const loc = window.location.href.substring(22);

const isLogged = (sessionStorage.getItem("isLogged") !== null) ? sessionStorage.getItem("isLogged") :
                 ((localStorage.getItem("isLogged") !== null) ? localStorage.getItem("isLogged") : false);
const navMenu = (document.getElementsByClassName("navMenu"))[0];
if (isLogged) {
    const signOut = document.createElement('li');
    signOut.classList.add("navbarButton");
    signOut.textContent = "Logout";
    signOut.id = "signOut";
    signOut.classList.add("navbarHoverBlock");
    navMenu.appendChild(signOut);

    const username = document.createElement('li');
    const displayedName = (sessionStorage.getItem("user") !== null) ?
        sessionStorage.getItem("user") : localStorage.getItem("user");
    username.textContent = "Logged in as " + displayedName;
    username.id = "userDisplay";
    username.classList.add("navbarNoHover");
    username.classList.add("navbarButton");
    navMenu.appendChild(username);

    signOut.addEventListener("click", function () {
        if (sessionStorage.getItem("isLogged") !== null){
            sessionStorage.removeItem("isLogged");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
        } else {
            localStorage.removeItem("isLogged");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        location.reload();
    })
} else {
    appendLoginAndRegister();
}

function appendLoginAndRegister(){
    const login = document.createElement('li');
    const loginAnchor = document.createElement('a');
    loginAnchor.href = "/login";
    loginAnchor.textContent = "Login";
    loginAnchor.classList.add("navbarHoverBlock");
    login.appendChild(loginAnchor);
    login.classList.add("navbarButton");
    navMenu.appendChild(login);

    const register = document.createElement('li');
    const registerAnchor = document.createElement('a');
    registerAnchor.href = "/register";
    registerAnchor.textContent = "Register";
    registerAnchor.classList.add("navbarHoverBlock");
    register.appendChild(registerAnchor);
    register.classList.add("navbarButton");
    navMenu.appendChild(register);
}

addActiveClass();
function addActiveClass(){
    const navBar = document.getElementsByClassName("navMenu");
    const navList = navBar[0].children;
    for (let i = 1 ; i <navList.length ; i++){
        const tempString = navList[i].firstChild.toString().substring(22);
        if (tempString === loc){
            navList[i].firstChild.classList.add("active");
        }
    }
}