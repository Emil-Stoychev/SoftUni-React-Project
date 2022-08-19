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
    image: String,
    ownProducts: Array,
    likedProducts: Array,
    chat: Array,
    messages: Array,
    money: Number,
    wheel: Object
})

const User = mongoose.model('User', userSchema)

exports.User = User