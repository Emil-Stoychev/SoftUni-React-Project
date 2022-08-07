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

const editCommentService = async (commentValue, isCommentExist) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    isCommentExist.date = 'Edited ' + date
    isCommentExist.title = commentValue

    let editedComment = await Comment.findByIdAndUpdate(isCommentExist._id, { date: isCommentExist.date, title: isCommentExist.title })

    return isCommentExist
}


module.exports = {
    addCommentService,
    editCommentService,
}