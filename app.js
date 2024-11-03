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
