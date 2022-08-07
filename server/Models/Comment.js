const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    nestedComments: Array,
    likes: Array,
    date: String
})

const Comment = mongoose.model('Comment', commentSchema)

exports.Comment = Comment