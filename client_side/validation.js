document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop actual form submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "mann" && password === "mann123") {
      alert("Login successful!");
      // You can redirect to another page here, e.g.:
      window.location.href = "../index.html";
    } else {
      alert("Invalid username or password!");
    }
  });
});
