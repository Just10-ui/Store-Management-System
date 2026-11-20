function passwordValidation(password) {
    const error = [];

    // Checks the password data type
    if (typeof password !== 'string') {
        return {
            isValid: false,
            message: 'Password must be a string'
        };
    }

    // Checks the password length
    if (password.length < 8) {
        error.push('Password must contain at least 8 characters');
    }

    // Checks for lowercase
    if (!/[a-z]/.test(password)) {
        error.push('Password must have lowercase letter');
    }

    // Checks for uppercase
    if (!/[A-Z]/.test(password)) {
        error.push('Password must have uppercase letter');
    }

    // Check for number
    if (!/\d/.test(password)) {
        error.push('Password must contain number');
    }

    // Check for special symbol
    if (!/[^a-zA-Z0-9\s]/) {
        error.push('Password must contain special symbol');
    }

    return {
        isValid: error.length === 0,
        error
    }
};

module.exports = { passwordValidation };