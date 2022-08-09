const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    author: String,
    email: String,
    likes: Array,
    comments: {
        type: Array,
        ref: 'comments'
    },
    visible: Boolean
})

const Product = mongoose.model('Product', productSchema)

exports.Product = Product