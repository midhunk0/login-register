const bcrypt = require('bcrypt');  // used for secure password hashing

const hashPassword = async (password) => {
    const saltRounds = 12; 
    try {
        const salt = await bcrypt.genSalt(saltRounds);  // to generate salt for password hashing
        const hashedPassword = await bcrypt.hash(password, salt);  // to hash the password using the generated salt
        return hashedPassword;
    } 
    catch (error) {
        throw error;
    }
};

const comparePassword = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed);  // bcrypt.compare() is used to compare the plaintext with the hashed password
        return isMatch;
    } 
    catch (error) {
        throw error;
    }
};

module.exports = {
    hashPassword,
    comparePassword,
};
