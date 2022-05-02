const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signIn = document.getElementById("sign-in");


// when clicked, this div moves to the left side (priority)
signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    console.log("signup logged");
});


signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
    console.log("signin logged");
    console.log(window.location.href);
});


signIn.addEventListener("click", () => {
    console.log("sign in clicked");
    console.log(location.href);
    location.href("httpL//google.com", true);
    console.log(location.href);
} )