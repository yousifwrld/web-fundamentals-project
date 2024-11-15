function registerUser(event) {
  // Prevent the default form submission action
  event.preventDefault();

  // Get the values from the form
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Validate the credentials
  if (!validateCredentials(firstName, lastName, phoneNumber)) {
    // Clear error message and error styling after 3 seconds
    setTimeout(() => {
      document.getElementById("errorMessage").textContent = "";

      document.querySelectorAll("input").forEach((field) => {
        field.classList.remove("error");
      });
    }, 3000);
    return;
  }

  // If credentials are valid store them in local storage
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("phoneNumber", phoneNumber);
  alert(
    `Welcome ${localStorage.getItem("firstName")} ${localStorage.getItem(
      "lastName"
    )}, your phone number is ${localStorage.getItem("phoneNumber")}`
  );

  updateElements();
}

// Function to validate credentials and display appropriate message
function validateCredentials(firstName, lastName, phoneNumber) {
  const inputFields = document.querySelectorAll("input");
  const errorMessages = document.getElementById("errorMessage");

  // Check if any of the input fields are empty
  for (let field of inputFields) {
    if (field.value.trim() === "") {
      field.classList.add("error");
      errorMessages.textContent = "Error: All fields are required";
      return false; // Stop further validation if an empty field is found
    } else {
      field.classList.remove("error");
    }
  }

  // Check if the phone number is valid
  if (phoneNumber.length !== 8) {
    document.getElementById("phoneNumber").classList.add("error");
    errorMessages.textContent = "Error: Phone number must be 8 digits";
    return false;
  } else {
    document.getElementById("phoneNumber").classList.remove("error");
  }

  // Check if the first name is valid
  if (firstName.length < 3) {
    document.getElementById("firstName").classList.add("error");
    errorMessages.textContent =
      "Error: First name must be at least 3 characters";
    return false;
  } else {
    document.getElementById("firstName").classList.remove("error");
  }

  // Check if the last name is valid
  if (lastName.length < 3) {
    document.getElementById("lastName").classList.add("error");
    errorMessages.textContent =
      "Error: Last name must be at least 3 characters";
    return false;
  } else {
    document.getElementById("lastName").classList.remove("error");
  }

  // If all the inputs are valid, return true
  return true;
}

function updateElements() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const form = document.getElementById("form");
  if (firstName && lastName && phoneNumber) {
    // Hide the form and register button
    if (form) {
      form.style.display = "none";
    }
    document.getElementById("header-register-btn").style.display = "none";

    // Remove the form header if it exists
    const registerHeader = document.querySelector("#register h2");
    if (registerHeader) {
      registerHeader.style.display = "none";
    }

    // Add the welcome message
    const headerRegisterDiv = document.getElementById("header-register");
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = `Welcome ${firstName} ${lastName}!`;
    welcomeMessage.classList.add("welcome-message");
    headerRegisterDiv.appendChild(welcomeMessage);
  }
}

updateElements();

// Not used for now, might use later
function logoutUser() {
  localStorage.clear();
  updateElements();
}

document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const contentItems = document.querySelectorAll('.content-item');
  
  function changeSlide(direction) {
      slides[(currentSlide + 1 + slides.length) % slides.length].classList.remove('nextImage');
      slides[(currentSlide - 1 + slides.length) % slides.length].classList.remove('prevImage');
      slides[currentSlide].classList.remove('active');
      contentItems[currentSlide].classList.remove('active');
  
      currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
      slides[currentSlide].classList.add('active');
      slides[(currentSlide + 1 + slides.length) % slides.length].classList.add('nextImage');
      slides[(currentSlide - 1 + slides.length) % slides.length].classList.add('prevImage');
      contentItems[currentSlide].classList.add('active');
  }
  // Attach click event listeners to the arrow buttons
  document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
  document.querySelector('.next').addEventListener('click', () => changeSlide(1));
});
console.log("app.js loaded");
