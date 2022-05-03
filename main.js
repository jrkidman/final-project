// this array of objects is for keeping user data.
// if a new user sets up, use push to add to array

var loginVar = [
    {
        fullName: "Jawad Bin Mobin Akib",
        userName: "jbmakib",
        passWord: "1234",
    },
    {
        fullName: "Nusrat Jahan Ananya",
        userName: "nusuananya",
        passWord: "1234",
    },
];

/* get variables, localstorage, everything to make this code easier */

// get data from local storage, these are users that are already set up
let loginVarObj = JSON.parse(localStorage.getItem("logged-in-users"));

// get those id(s) in a variable to use it later (login part)
var loginFormField = document.getElementById("loginForm");

// get those id(s) in a variable to use it later (sign up part)
var signUpFormField = document.getElementById("signUpForm");

// box field for output
var boxField = document.getElementById("box");

/* ready for work */

// show element
function show(element) {
    element.classList.remove("d-none");
}

// hide element
function hide(element) {
    element.classList.add("d-none");
}

// last login status and name
let loggedInStatus = false;
let lastLoginName;
let loggedInStatusObj = JSON.parse(localStorage.getItem("last-logged-in"));
let loggedInNameObj = localStorage.getItem("last-logged-in-user");

function welcome(fullName) {
    show(boxField);
    boxField.innerHTML = `<div class="form"><h1>Welcome</h1><h2>${fullName}</h2><input type="button" value="Logout" onclick="logout()" class="logout-btn"></div>`;
}

function lastLoggedInStatus() {
    if (loggedInStatusObj == true) {
        welcome(loggedInNameObj);
        hide(loginFormField);
        hide(signUpFormField);
    }
}
lastLoggedInStatus();

// if login button is clicked this function will run.
function login(e) {
    e.preventDefault();

    // take the input field's value in variable to validate
    var usernameField = document.querySelector("#user").value;
    var pwdField = document.querySelector("#pwd").value;

    // remove class from box-field to show the output && add class to new login button to hide it.

    // update loginVar array.
    if (loginVarObj != null) {
        loginVar = loginVarObj;
    }

    // for loop to validate data from array
    for (let i = 0; i < loginVar.length; i++) {
        if (
            usernameField == loginVar[i].userName &&
            pwdField == loginVar[i].passWord
        ) {
            // add class to login form and sign in button to hide it
            hide(loginFormField);
            show(boxField);

            // store the full name in a variable
            var fullName = loginVar[i].fullName;
            welcome(fullName);

            // login true
            loggedInStatus = true;
            loggedInStatusStr = JSON.stringify(loggedInStatusObj);
            localStorage.setItem("last-logged-in", loggedInStatus);
            localStorage.setItem("last-logged-in-user", fullName);
            window.location.href = "window.html";
        } else if (
            usernameField != "" &&
            usernameField == loginVar[i].userName &&
            pwdField != "" &&
            pwdField != loginVar[i].passWord
        ) {
            window.alert("Password not matched");
            return;
        }
    }

    // check if the user exists
    function userExists(username) {
        return loginVar.some(function (el) {
            return el.userName === username;
        });
    }

    if (usernameField != "" && userExists(usernameField) == false) {
        window.alert("Username doesn't exist\nTry to sign up");
        return;
    }

    if (usernameField == "" || pwdField == "") {
        window.alert(
            "Username or password can't be blank\nPlease enter valid information"
        );
        return;
    }
}

// if an account already exists for logging in and the login info is valid, this function will run.
function newLogIn() {
    // make the input field blank
    document.querySelector("#user").value = "";
    document.querySelector("#pwd").value = "";

    // class added to hide and removed to show.
    show(loginFormField);
    hide(signUpFormField);
    hide(boxField);
}

// if "not a member? sign up" button is clicked this function will run.
function newSignUp() {
    // make the sign in form's input field blank
    document.querySelector("#fullN").value = "";
    document.querySelector("#userSign").value = "";
    document.querySelector("#pwdSign").value = "";

    // added and removed class to hide and show element
    hide(loginFormField);
    show(signUpFormField);
    hide(boxField);
}

// if sign-in button is clicked this function will run.
function signUp(e) {
    e.preventDefault();

    // take the field values in variables
    let fullNameSign = document.querySelector("#fullN").value;
    let userName = document.querySelector("#userSign").value;
    let signpwd = document.querySelector("#pwdSign").value;

    // show alert if the input fields are blank
    if (fullNameSign == "" || userName == "" || signpwd == "") {
        window.alert(
            "Fullname, username and password can't be blank\nPlease enter valid informations"
        );
        return;
    }

    // update loginVar array
    if (loginVarObj != null) {
        loginVar = loginVarObj;
    }

    // for loop to validate data
    for (i = 0; i < loginVar.length; i++) {
        if (userName == loginVar[i].userName) {
            window.alert("this username is already taken");
            return;
        }
    }

    // push new user data to array.
    loginVar.push({
        fullName: fullNameSign,
        userName: userName,
        passWord: signpwd,
    });

    // add to localstorage
    let loginVarStr = JSON.stringify(loginVar);
    localStorage.setItem("logged-in-users", loginVarStr);

    // add or remove class to hide or show element
    hide(signUpFormField);
    show(boxField);

    // add this into a variable.
    let fullName = loginVar[loginVar.length - 1].fullName;

    // show the output, welcome for logged in/existing user
    welcome(fullName);

    // if login is true, will re-direct to bookmarks page
    loggedInStatus = true;
    loggedInStatusStr = JSON.stringify(loggedInStatusObj);
    localStorage.setItem("last-logged-in", loggedInStatus);
    localStorage.setItem("last-logged-in-user", fullName);
    window.location.href = "window.html";
}

// if logout button is clicked this function will run.
function logout() {
    // make the input field blank
    document.querySelector("#user").value = "";
    document.querySelector("#pwd").value = "";

    // add or remove class to hide or show the element.
    hide(boxField);
    show(loginFormField);

    // login true
    loggedInStatus = false;
    loggedInStatusStr = JSON.stringify(loggedInStatusObj);
    localStorage.setItem("last-logged-in", loggedInStatus);
}