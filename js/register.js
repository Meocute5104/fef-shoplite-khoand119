/**
 * ShopLite - Registration Form Validation
 * Prevents invalid submit events and renders active field alerts
 */

document.addEventListener('DOMContentLoaded', () => {
    initRegistrationForm();
});

function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const successAlert = document.getElementById('registrationSuccess');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop page refresh

        // Hide success banner
        successAlert.style.display = 'none';

        // Read input values
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const phoneInput = document.getElementById('phone');
        const categoryInput = document.getElementById('preferredCategory');
        const termsInput = document.getElementById('agreeTerms');

        let isValid = true;

        // 1. Full Name Validation
        if (fullNameInput.value.trim().length < 2) {
            showError('groupFullName');
            isValid = false;
        } else {
            hideError('groupFullName');
        }

        // 2. Email Validation (Regex checking)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError('groupEmail');
            isValid = false;
        } else {
            hideError('groupEmail');
        }

        // 3. Password Validation (min 6 characters)
        if (passwordInput.value.length < 6) {
            showError('groupPassword');
            isValid = false;
        } else {
            hideError('groupPassword');
        }

        // 4. Phone Number Validation
        const phoneRegex = /^[0-9+() \-]{8,15}$/; // Standard digits check
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError('groupPhone');
            isValid = false;
        } else {
            hideError('groupPhone');
        }

        // 5. Select Dropdown Validation
        if (categoryInput.value === '') {
            showError('groupPreferredCategory');
            isValid = false;
        } else {
            hideError('groupPreferredCategory');
        }

        // 6. Checkbox Validation
        if (!termsInput.checked) {
            showError('groupTerms');
            isValid = false;
        } else {
            hideError('groupTerms');
        }

        // Submission execution
        if (isValid) {
            // Display green success alert
            successAlert.style.display = 'block';
            
            // Reset fields
            form.reset();
            
            // Scroll to top of the card view
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

/**
 * Show error text by appending has-error class to form-group wrapper
 */
function showError(groupId) {
    const groupElement = document.getElementById(groupId);
    if (groupElement) {
        groupElement.classList.add('has-error');
    }
}

/**
 * Remove error text by removing has-error class from form-group wrapper
 */
function hideError(groupId) {
    const groupElement = document.getElementById(groupId);
    if (groupElement) {
        groupElement.classList.remove('has-error');
    }
}
