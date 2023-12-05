// to create a mongoose schema and a model for user in mongodb database
const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;