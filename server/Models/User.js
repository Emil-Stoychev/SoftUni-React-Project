const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ownProducts: Array,
    likedProducts: Array,
    messages: Array,
    money: Number
})

const User = mongoose.model('User', userSchema)

exports.User = User