const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 12; 
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } 
    catch (error) {
        throw error;
    }
};

const comparePassword = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed);
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
