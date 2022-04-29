//create a variable to store name of id sections
let setId;
let selectedSection;
let selectedIndex;
let sectionsList = document.querySelectorAll(".box-header");


// run an event for all functions
document.addEventListener("DOMContentLoaded", () => {
    clearSearchInput();
    getSite();
    getSelection();
    setDate();
    rippleEffect();
    animateFloatLabel();

})

Array.from(document.querySelectorAll(".add-button")).forEach(function (element) {
    element.addEventListener("click", function () {
        setId = this.getAttribute("data-section");
        openSideBar();  // Call function to open side bar

    })
})

// Assign click event listener to X-plus  button on the side bar

document
    .querySelector("#close-sidebar")
    .addEventListener("click", closeSideBar);

// Function to get data from input fields when user press the pencil button on side bar
document
    .getElementById("bookmark-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        // get content from the input field
        let urlName = document.querySelector("#get-url").value;
        let domainName = document.querySelector("#get-name").value;

        // Call functions if both inputs are filled, otherwise will show an error
        if (urlName && domainName) {
            saveSite(urlName, domainName, setId) // saving the data to local storage
            appendSite(urlName, domainName, setId) // call the function to append info to the html
            closeSideBar();
        }
        else {
            errorMessage;
        }
        clearValues();
    });


// Apply event listener to FAB for open modal
document.querySelector("#modal-trigger").addEventListener("click", () => {
    document.querySelector(".modal-overlay").style.display = "block"; // show modal (block check this later)
    // if dropdown button is clicked will show list
    document.querySelector(("#dropdown-trigger")).addEventListener("click", () => {
        document
            .querySelector("#page-sections")
            .classList.add("dropdown-content-opened");
    })
})



// if cancel button is clicked will hide modal
document.querySelector("#close-modal").addEventListener("click", () => {
    document.querySelector(".modal-overlay").style.display = "block"; // show modal
    document.querySelector("#dropdown-trigger").innerHTML = "Select Category";
    checkIfDropdownIsOpen();
})

// hide modal if clicked outside of the box
document.querySelector(".modal-overlay").addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal-overlay")) {
        document.querySelector(".modal-overlay").style.display = "none";
        document.querySelector("#dropdown-trigger").innerHTML = "Select Category";
        checkIfDropdownIsOpen();
    }
});


// Event Listener for apply button in modal
document.querySelector("#section-change").addEventListener("click", () => {
    let nameToChange = document.querySelector("#modal-input").value;

    // Apply changes if dropdown selection and input is not empty
    if (nameToChange && selectedSection) {
        let savedSections = JSON.parse(localStorage.getItem("savedSections"));
        savedSections[selectedIndex].sectionName = nameToChange;
        localStorage.setItem("savedSections", JSON.stringify(savedSections));
    }

    getSections();
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector("#modal-input").value = "";
    document.querySelector("#dropdown-trigger").innerHTML = "Select section";
});

// Function is called when I want to get data from LocalStorage objects and put in variables
function getSite() {
    let savedSites = JSON.parse(localStorage.getItem("savedSites")); // Take object with sites and parse it to a string

    if (savedSites != null) {
        for (const i in savedSites) {
            // Get values of the string in each iteration and saves in variables
            let url = savedSites[i].url;
            let domain = savedSites[i].domain;
            let id = savedSites[i].id;

            appendSite(url, domain, id); // Call function to append data into the HTML
        }
    }
}

// Function allow me save data from input fields into an object in LocalStorage
function saveSite(urlName, domainName, setId) {
    // Save input values in an object
    let sitesObject = {
        url: urlName,
        domain: domainName,
        id: setId,
    };

    // Check if local storage exist
    if (localStorage.getItem("savedSites") === null) {
        let savedSites = []; // If not exist will init a new array
        savedSites.push(sitesObject); // Add new object to the existing object array
        localStorage.setItem("savedSites", JSON.stringify(savedSites)); // Save modified object in Local Storage
    } else {
        let savedSites = JSON.parse(localStorage.getItem("savedSites")); // Get string from Local Storage saved object
        savedSites.push(sitesObject); // Add new object to the existing object array
        localStorage.setItem("savedSites", JSON.stringify(savedSites)); // Save modified object in Local Storage
    }
}

// Function to add fetched data from LocalStorage into HTML
function appendSite(urlName, domainName, set_id) {
    let li = document.createElement("li"); // Create a li element
    li.className = "ripple ripple-dark content-link"; // Assign the appropiate class name to li

    let anchor = document.createElement("a"); // Create a anchor element
    anchor.setAttribute("href", urlName); // Use data from input field to set an href url
    anchor.innerHTML = domainName; // Use data from input field to set text to this anchor

    let icon = document.createElement("i"); // Create i element
    icon.className = " far fa-trash-alt"; // Add FontAwesome classes for an trash can
    icon.addEventListener("click", deleteSite); // Add eventListener to each icon to after delete entire element

    li.appendChild(anchor); // Append the anchor to the li created
    li.appendChild(icon); // Append the icon to the li created

    let element = document.querySelector(set_id); // Search for appropiate section with the id provided
    element.appendChild(li); // Append created li to the appropiate section
    rippleEffect();
}

// Function to search for anchor content and delete entire object from LocalStorage
function deleteSite() {
    let parent = this.parentElement; // Search for the parent element of the icon
    let anchor = parent.firstChild.innerHTML; // After search for the parent will search for the anchor as firstChild and get domain name

    let savedSites = JSON.parse(localStorage.getItem("savedSites"));

    for (const i in savedSites) {
        if (savedSites[i].domain == anchor) {
            savedSites.splice(i, 1);
        }

        localStorage.setItem("savedSites", JSON.stringify(savedSites)); // Save changes in Local Storage
        parent.remove(); // Remove complete desired li element
    }
}

function getSections() {
    reprintSections();
    let list = [].slice.call(sectionsList); // take nodelist and push to an array
    let innerSections = list.map((e) => e.innerHTML); //from each object in array will take the innerhtml
    saveSections(innerSections);



    document.querySelectorAll("#page-sections > li").forEach((e) => e.remove()); //remove every li on the ul #page-sections
    // looping for each header section here
    for (const i in innerSections) {
        let liItem = document.createElement("li");
        liItem.className = "hover-dark";

        //if the li element is clicked will close the whole dropdown
        liItem.addEventListener("click", () => {
            document
                .querySelector("#page-selections")
                .classList.remove("dropdown-content-opened");
            selectedSection = liItem.innerHTML; // take the innerhtml from the li and save it in a variable
            selectedSection = i; // save the iteration value of the selected li
            document.querySelector("#dropdown-trigger").innerHTML = "selectedSection";
        })

        liItem.innerHTML = innerSections[i]; // save in innerhtml from li the element from the array
        document.querySelector("#page-sections").appendChild(liItem); // append li to the ul

    }
    rippleEffect();
}

// function to save each section header to local storage
function saveSections(sectionsArray) {
    let sectionTwoSave;
    let savedSections = [];
    // array will never be empty
    for (const i in sectionsArray) {
        sectionTwoSave = {
            sectionName: sectionsArray[i], //save section header in an object
        };
        savedSections.push(sectionTwoSave); // put array of objects
        localStorage.setItem("savedSections", JSON.stringify(savedSections));
    }
}

// function to get object in lcoal storage and fill each section header
function reprintSections() {
    let savedSections = JSON.parse(localStorage.getItem("savedSections")); //getting the object to parse
    //apply text to innerhtml of each section header
    for (const i in savedSections) {
        sectionsList[i].innerHTML = savedSections[i].sectionName;
    }
}

// DOM functions effects and animations

// DOM interactions
function setDate() {
    let dateObject = new Date();

    // const array variable to properly do the date in a text
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    // date element check later
    let dateParagraph = document.querySelector(".show-date");
    let timeOfDay = document.querySelector(".show-salute");

    // fill paragraph elements with date format
    dateParagraph.innerHTML =
        DAYS[dateObject.getDay()] +
        " " +
        dateObject.getDate() +
        " " +
        MONTHS[dateObject.getMonth()] +
        " " +
        dateObject.getFullYear();

    // Get hours to make conditionals
    let hour = dateObject.getHours();

    if (hour >= 6 && hour < 12) {
        timeOfDay.innerHTML = "Good Morning!";
    } else if (hour >= 12 && hour < 19) {
        timeOfDay.innerHTML = "Good Afternoon!";
    } else {
        timeOfDay.innerHTML = "Good Night!";
    }
}

// float animation label
function animateFloatLabel() {
    //search for all inputs in page
    let inputs = document.querySelectorAll(".form-input");

    //loop that goes inside of each input
    inputs.forEach((input) => {
        let inputWrapper = input.parentNode; // search for parent check later
        let label = inputWrapper.querySelector(".floating-label"); // search for the label from the input tag check later

        // apply the focus listener
        input.addEventListener("focus", () => {
            label.classList.add("label-focused");
            label.classList.add("label-color-focused");
        })

        // add unfocus event listener
        input.addEventListener("blur", () => {
            let inputValue = inputWrapper.querySelectorAll(".form-input").value;
            label.classList.remove("label-color-focused");
            // once it's empty reset it

            if (inputValue === "") {
                label.classList.remove("label-focused")
            }
        })
    })
}

function rippleEffect() {
    let rippleElements = document.querySelectorAll(".ripple"); // search for all ripple classes
    rippleElements.forEach((e) => (e.onmousedown = null)); // removes every listener event if it's already applied

    // add event listener to everything else check later for update comments
    rippleElements.forEach((ripple) => {
        ripple.addEventListener("mousedown", (e) => {
            let offset = ripple.getBoundingClientRect(); //get position relative to the viewport for positioning

            // calculations for when it's clicked
            let X = e.clientX - offset.left;
            let Y = e.clientY - offset.top;

            let rippleSpan = document.createElement("span");
            rippleSpan.classList.add("ripple-effect");
            rippleSpan.setAttribute("style", "top:" + Y + "px; left" + X + "px;");

            // ripple dark stuff
            if (ripple.classList.contains("ripple-dark")) {
                rippleSpan.style.background = "rgba(0,0,0,0.3)";
            }
            else {
                rippleSpan.style.background = "rgba(255,255,255,0.3)";
            }
            ripple.appendChild(rippleSpan);

            setTimeout(() => {
                rippleSpan.parentNode.removeChild(rippleSpan);
            }, 900);
        })
    })
}

// some missed functions

// function to clear values
function clearValues() {
    document.querySelector("#get-url").value = "";
    document.querySelector("#get-name").value = "";

}

function clearSearchInput() {
    if (document.querySelector(".search-input")) {
        this.value = " ";
    }
}

// make sidebar visible
function openSideBar() {
    document.querySelector(".sidenav").classList.add("sidenav-isvisible");
    document.querySelector(".sidebar-overlay").classList.add("overlay-isvisible");
    document
        .querySelector(".sidebar-overlay")
        .addEventListener("click", closeSideBar);
    document.getElementById("get-url").focus();
}

// empty fields
function errorMessage() {
    document.querySelector(".form-error").classList.add("form-error-isvisible");
    setTimeout(() => {
        document
            .querySelector(".form-error")
            .classList.remove("form-error-isvisible");
    }, 1500);
}

// make the sidebar invisible
function closeSideBar() {
    document.querySelector(".sidenav").classList.remove("sidenav-isvisible");
    document
        .querySelector(".sidebar-overlay")
        .classList.remove("overlay-isvisible");
    clearValues();
}

// need to close the dropdown
function checkIfDropdownIsOpen() {
    if (document.querySelector(".dropdown-content-opened")) {
        document
            .querySelector("#page-sections")
            .classList.remove("dropdown-content-opened");
    }
}

