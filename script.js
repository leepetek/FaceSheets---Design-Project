document.addEventListener('DOMContentLoaded', function() {

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const mismatchError = document.getElementById('password-mismatch-error');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text'); // Optional text
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const signupForm = document.getElementById('signup-form');

    // --- Toggle Password Visibility ---
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // --- Password Strength Check ---
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let score = 0;
        let feedback = '';

        // Basic Strength Criteria (Adjust as needed)
        if (password.length >= 8) score++; // Length
        if (/[A-Z]/.test(password)) score++; // Uppercase
        if (/[a-z]/.test(password)) score++; // Lowercase
        if (/[0-9]/.test(password)) score++; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) score++; // Symbols

        // Update Strength Bar and Text
        strengthBar.className = 'strength-bar'; // Reset classes
        switch (score) {
            case 0:
            case 1:
                strengthBar.classList.add('weak');
                feedback = 'Weak';
                break;
            case 2:
                strengthBar.classList.add('medium');
                 feedback = 'Medium';
                break;
            case 3:
            case 4:
                strengthBar.classList.add('good');
                 feedback = 'Good';
                break;
            case 5:
                strengthBar.classList.add('strong');
                 feedback = 'Strong';
                break;
            default:
                 feedback = '';
        }

        if (password.length === 0) {
             strengthBar.className = 'strength-bar'; // Clear bar if empty
             feedback = '';
        }

        strengthText.textContent = feedback; // Update optional text
        checkPasswordMatch(); // Check match whenever primary password changes
    });

    // --- Check Password Match ---
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length > 0) { // Only show error if confirm has input
            if (password === confirmPassword) {
                mismatchError.style.display = 'none';
                mismatchError.textContent = '';
                confirmPasswordInput.style.borderColor = ''; // Reset border
            } else {
                mismatchError.style.display = 'block';
                mismatchError.textContent = 'Passwords do not match.';
                confirmPasswordInput.style.borderColor = '#e74c3c'; // Red border for error
            }
        } else {
            mismatchError.style.display = 'none'; // Hide if confirm is empty
            mismatchError.textContent = '';
             confirmPasswordInput.style.borderColor = ''; // Reset border
        }
    }

    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    // --- Prevent Form Submission if Passwords Don't Match ---
    signupForm.addEventListener('submit', function(event) {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            event.preventDefault(); // Stop form submission
            mismatchError.style.display = 'block';
            mismatchError.textContent = 'Passwords do not match. Please correct before submitting.';
             confirmPasswordInput.focus(); // Optional: focus the confirm field
             confirmPasswordInput.style.borderColor = '#e74c3c';
        }
        // Add other validation checks here if needed (e.g., email format)
    });

}); // End DOMContentLoaded