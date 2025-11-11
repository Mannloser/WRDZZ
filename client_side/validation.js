document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    // Prevent form submission until validation passes
    e.preventDefault();

    // Trim to remove accidental spaces
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Clear previous error styles
    usernameInput.classList.remove("error");
    passwordInput.classList.remove("error");

    // Validation flags
    let valid = true;
    let message = "";

    // Validate username
    if (username === "") {
      valid = false;
      message = "Username cannot be empty.";
      usernameInput.classList.add("error");
    } 
    else if (username.length < 3) {
      valid = false;
      message = "Username must be at least 3 characters long.";
      usernameInput.classList.add("error");
    }

    // Validate password
    else if (password === "") {
      valid = false;
      message = "Password cannot be empty.";
      passwordInput.classList.add("error");
    } 
    else if (password.length < 6) {
      valid = false;
      message = "Password must be at least 6 characters long.";
      passwordInput.classList.add("error");
    }

    // Show error or submit
    if (!valid) {
      alert(message);
    } else {
      // ✅ If validation passes, you can proceed to submit or handle login logic here
      alert("Login successful! (You can replace this with real login logic)");
      form.submit();
    }
  });
});
