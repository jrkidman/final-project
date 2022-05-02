const signUp = (e) => {
    let userName = document.getElementById("username").value,
        email = document.getElementById("email").value,
        passCode = document.getElementById("passCode").value;

    let formData = JSON.parse(localStorage.getItem("formData")) || [];

    let exist =
        formData.length &&
        JSON.parse(localStorage.getItem("formData")).some(
            (data) => data.userName.toLowerCase() == userName.toLowerCase()
        );

    if (!exist) {
        formData.push({ userName, email, passCode });
        localStorage.setItem("formData", JSON.stringify(formData));
        document.querySelector("form").reset();
        document.getElementById("userName").focus();
        alert("Account Created.\n\nPlease Sign In using the link below.");
    } else {
        alert("Ooopppssss...Duplicate found!!!\nYou have already signed up");
    }
    e.preventDefault();
};

function signIn(e) {
    let email = document.getElementById("mail").value,
        pwd = document.getElementById("pwd").value;
    let formData = JSON.parse(localStorage.getItem("formData")) || [];
    let exist =
        formData.length &&
        JSON.parse(localStorage.getItem("formData")).some(
            (data) =>
                data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd
        );
    if (!exist) {
        alert("Incorrect login credentials");
    } else {
        location.href = "window.html";
    }
    e.preventDefault();
}