const isEmailTaken = (array, email) => {
    return array.find(user => user.email == email);
};

module.exports = { isEmailTaken };