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
    imageUrl: {
        type: String,
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
    likes: Array,
    comments: Array,
    visible: Boolean
})

const Product = mongoose.model('Product', productSchema)

exports.Product = Product