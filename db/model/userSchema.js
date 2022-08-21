const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        message: "User already exists. Try with a different email"
    }

})

const User = mongoose.model("User", userSchema)
module.exports = User;