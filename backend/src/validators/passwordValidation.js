function minLength(password) {
    return password.length < 8
};

function hasUpperLowerCase(password) {
    return !/[a-z]/.test(password) || !/[A-Z]/.test(password);
};

function hasNumbers(password) {
    return !/\d/.test(password);
};

function hasSpecialSymbol(password) {
    return !/[^a-zA-Z0-9]/.test(password);
};

function passwordValidation(password) {
    const errorMessage = [];

    if (typeof password !== 'string') {
        return {
            error: true,
            field: 'Password',
            message: 'Password must be a string'
        };
    }
    
    if (minLength(password)) errorMessage.push('Password must contain at least 8 characters');
    if (hasUpperLowerCase(password)) errorMessage.push('Password must contain lowercase and uppercase');
    if (hasNumbers(password)) errorMessage.push('Password must contain a number');
    if (hasSpecialSymbol(password)) errorMessage.push('Password must contain a special symbol');

    if (errorMessage.length > 0) {
        return {
            error: true,
            field: 'Password',
            message: errorMessage
        };
    }

    return null;
};

module.exports = { passwordValidation };

// polish the password validator