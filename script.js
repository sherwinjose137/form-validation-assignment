const form = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(event) {
    // 1. Prevent the page from refreshing on submit
    event.preventDefault();
    
    // Clear previous success messages
    successMessage.textContent = '';

    // 2. Run validation checks
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    // 3. If both fields pass, process the submission
    if (isNameValid && isEmailValid) {
        successMessage.textContent = `Success! Welcome, ${usernameInput.value.trim()}.`;
        
        // Reset form and styles after 2 seconds
        setTimeout(() => {
            form.reset();
            usernameInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            successMessage.textContent = '';
        }, 3000);
    }
});

function validateName() {
    const nameValue = usernameInput.value.trim();

    if (nameValue === '') {
        setError(usernameInput, nameError, 'Full name is required.');
        return false;
    } else if (nameValue.length < 2) {
        setError(usernameInput, nameError, 'Name must be at least 2 characters.');
        return false;
    } else {
        setSuccess(usernameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    // Standard regex pattern to verify email structure (text@domain.com)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        setError(emailInput, emailError, 'Email address is required.');
        return false;
    } else if (!emailPattern.test(emailValue)) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
    } else {
        setSuccess(emailInput, emailError);
        return true;
    }
}

// Helper functions to update UI cleanly
function setError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.classList.add('invalid');
    inputElement.classList.remove('valid');
}

function setSuccess(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
}
