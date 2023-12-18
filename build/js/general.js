$(document).ready(function() {
    if ($(".custom-select").length > 0 && $(".no-default-select2").length === 0) {
        $('.custom-select').select2({
            width: '100%',
            minimumResultsForSearch: -1
        });
    }
    $('#registrationForm').submit(function (e) {
        e.preventDefault();
        // validation of email
        var emailInput = $('#email');
        var emailValue = emailInput.val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValidEmail = emailRegex.test(emailValue);
        var emailError = $('#emailError');
        if (!isValidEmail) {
            emailError.text('Please add valid email address');
            emailInput.closest('.form-group').addClass('is-invalid');
        } else {
            emailError.text('');
            emailInput.closest('.form-group').removeClass('is-invalid');
        }
        // validation of password
        var passwordInput = $('#password');
        var passwordValue = passwordInput.val();
        var isValidPassword = /\d/.test(passwordValue);
        var passwordError = $('#passwordError');
        if (!isValidPassword) {
            passwordError.text('Password must have a numeric value');
            passwordInput.closest('.form-group').addClass('is-invalid');
        } else {
            passwordError.text('');
            passwordInput.closest('.form-group').removeClass('is-invalid');
        }

        // Focus on the first invalid input
        if (!isValidEmail) {
            emailInput.focus();
        } else if (!isValidPassword) {
            passwordInput.focus();
        }

        if (isValidEmail && isValidPassword) {
            alert("Account created successfully !");
        }
    });
   
});