document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const errorMessage = document.getElementById('signup-error-message');

    if (!username || !email || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.visibility = "visible";
        return;
    }

    // You can add more validations here (e.g., email format, password strength)

    // Simulate successful sign-up
    errorMessage.style.color = "#2ecc71";
    errorMessage.textContent = "Account created successfully!";
    errorMessage.style.visibility = "visible";

    // Redirect or handle backend API call here
});
