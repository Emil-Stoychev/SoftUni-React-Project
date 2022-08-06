const { Comment } = require('../Models/Comment')

const addCommentToProduct = async (email, title, authorId, productId) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    let comment = {
        email,
        title,
        authorId,
        productId,
        date
    }

    let newComment = await Comment.create(comment)

    return newComment
}

module.exports = {
    addCommentToProduct
}