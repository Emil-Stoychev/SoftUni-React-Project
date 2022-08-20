const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    author: String,
    fromEmail: String,
    messages: Array,
    date: String,
    productId: String,
    productTitle: String,
})

const Chat = mongoose.model('Chat', chatSchema)

exports.Chat = Chat