const { Comment } = require('../Models/Comment')

const addCommentService = async (email, title, authorId, productId) => {
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

const addReplyCommentService = async (commentValue, isCommentExist, cookie) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    let comment = {
        email: cookie.email,
        title: commentValue,
        authorId: cookie._id,
        productId: isCommentExist.productId,
        date
    }

    let newComment = await Comment.create(comment)

    isCommentExist.nestedComments.push(newComment._id.toString())

    isCommentExist.save()

    return newComment

}

const editCommentService = async (commentValue, isCommentExist) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    isCommentExist.date = 'Edited ' + date
    isCommentExist.title = commentValue

    isCommentExist.save()

    return isCommentExist
}


module.exports = {
    addCommentService,
    editCommentService,
    addReplyCommentService
}