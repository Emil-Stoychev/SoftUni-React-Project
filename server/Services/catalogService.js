const { authMiddleware } = require('../Middlewares/authMiddleware')
const { Product } = require('../Models/Product')
const { Comment } = require('../Models/Comment')
const { addCommentService, editCommentService, addReplyCommentService } = require('../utils/CommentEngine')
const { productValidator } = require('../utils/productValidator')
const { checkUserExisting, getUserById } = require('./authService')

const getAll = async () => {
    try {
        return await Product.find({ visible: true }, { "images": { $slice: 1 } }).lean()
    } catch (error) {
        console.error(error)
        return error
    }
}

const getById = async (productId) => {
    try {
        let product = await Product.findById(productId) || { message: "404 Not found!" }

        let comments = await Comment.find().lean()

        product.comments = await Comment.find({ _id: product.comments }).lean()

        product.comments = product.comments.map(x => {
            if (x.nestedComments.length > 0) {
                x.nestedComments = comments.map(y => {
                    if (x.nestedComments.includes(y._id.toString())) {
                        return y
                    }
                })
            }

            x.nestedComments = x.nestedComments.filter(x => x != null)

            return x
        })

        return product
    } catch (error) {
        return error
    }
}

const addComment = async (data) => {
    let { email, title, authorId, productId, token } = data

    try {
        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let isUserExist = await checkUserExisting(email)

        if (!isUserExist.email) {
            return { message: "User doesn't exist!" }
        }

        let newComment = await addCommentService(email, title, authorId, productId)

        let product = await Product.findById(productId)

        product.comments.push(newComment._id.toString())

        product.save()

        return newComment
    } catch (error) {
        return error
    }
}

const editComment = async (data) => {
    let { commentValue, commentId, cookie } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != cookie._id) {
            return { message: "You cannot change this comment!" }
        }

        let editedComment = await editCommentService(commentValue, isCommentExist)

        return editedComment
    } catch (error) {
        return error
    }
}

const addReplyComment = async (data) => {
    let { commentId, cookie, commentValue } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        let editedComment = await addReplyCommentService(commentValue, isCommentExist, cookie)

        return editedComment
    } catch (error) {
        return error
    }
}

const likeComment = async (data) => {
    let { commentId, cookie } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId == cookie._id) {
            return { message: "You cannot like this comment!" }
        }

        if (isCommentExist.likes.includes(cookie._id)) {
            isCommentExist.likes = isCommentExist.likes.filter(x => x != cookie._id)

            isCommentExist.save()

            isCommentExist = 'unlike'
        } else {
            isCommentExist.likes.push(cookie._id)

            isCommentExist.save()

            isCommentExist = 'like'
        }

        return isCommentExist
    } catch (error) {
        return error
    }
}

const deleteComment = async (data) => {
    let { commentId, cookie } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != cookie._id) {
            return { message: "You cannot delete this comment!" }
        }

        let deletedComment = await Comment.findByIdAndDelete(commentId)

        await Comment.deleteMany({ _id: isCommentExist.nestedComments })

        let product = await Product.findById(isCommentExist.productId)

        product.comments = product.comments.filter(x => x != commentId)

        product.save()

        return deletedComment
    } catch (error) {
        return error
    }
}

const deleteNestedComment = async (data) => {
    let { nestedCommentId, cookie, parentId } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        let isCommentExist = await Comment.findById(nestedCommentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != cookie._id) {
            return { message: "You cannot delete this comment!" }
        }

        let deletedComment = await Comment.findByIdAndDelete(nestedCommentId)

        let parentComment = await Comment.findById(parentId)

        parentComment.nestedComments = parentComment.nestedComments.filter(x => x != nestedCommentId)

        parentComment.save()

        return deletedComment
    } catch (error) {
        return error
    }
}

const changeProductAuthor = async (data) => {
    let { user, productEmail, productId } = data

    try {
        if (user.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(user.token)

        if (token.message) {
            return token
        }

        let isUserExist = await checkUserExisting(productEmail)

        if (!isUserExist.email) {
            await Product.findByIdAndDelete(productId)

            return { message: "Product owner doesn't exist!" }
        }

        let product = await Product.findById(productId)

        if (!product) {
            return { message: "Product not found" }
        }

        product.author = user._id
        product.email = user.email
        product.likes = product.likes.filter(x => x != user._id)
        product.visible = false

        product.save()

        return product
    } catch (error) {
        console.error(error)
        return error
    }
}

const changeProductStatus = async (productId, data) => {
    try {
        if (!data.token) {
            return { message: "User doesn't exist!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId)

        product.visible = !product.visible
        product.save()

        return product
    } catch (error) {
        return error
    }
}

const create = async (data) => {
    try {
        if (!data.token) {
            return { message: "User doesn't exist!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        let user = await getUserById(data.author)

        if(user.message) {
            return user
        }

        let dataForCreation = productValidator(data)

        if (dataForCreation.message) {
            return dataForCreation
        }

        return await Product.create(dataForCreation)
    } catch (error) {
        console.error(error)
        return error
    }
}

const edit = async (productId, data) => {
    try {
        if (data.cookie.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(data.cookie.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId).lean()

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author != data.cookie._id) {
            return { message: "You cannot change this product!" }
        }

        let dataForEditing = productValidator(data.product)

        if (dataForEditing.message) {
            return dataForEditing
        }

        return await Product.findByIdAndUpdate(productId, dataForEditing)
    } catch (error) {
        console.error(error)
        return error
    }
}

const addLikes = async (productId, data) => {
    try {
        let isUserExist = await getUserById(data.userId)

        if (isUserExist.message) {
            return { message: "User doesn't exist!" }
        }

        if (data.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId)

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author == data.userId) {
            return { message: "You cannot like this product!" }
        }

        product.likes.push(data.userId)
        product.save()

        return product
    } catch (error) {
        console.error(error)
        return error
    }
}

const removeLikes = async (productId, data) => {
    try {
        let isUserExist = await getUserById(data.userId)

        if (isUserExist.message) {
            return { message: "User doesn't exist!" }
        }

        if (data.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId)

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author == data.userId) {
            return { message: "You cannot unlike this product!" }
        }

        product.likes = product.likes.filter(x => x != data.userId)
        product.save()

        return product
    } catch (error) {
        console.error(error)
        return error
    }
}

const del = async (productId, data) => {
    try {
        if (data.cookie.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(data.cookie.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId).lean()

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author != data.cookie._id) {
            return { message: "You cannot change this product!" }
        }

        await Comment.deleteMany({productId: product._id.toString()})

        return await Product.findByIdAndDelete(productId)
    } catch (error) {
        console.error(error)
        return error
    }
}

const getAllFilteredByIds = async (ids) => {
    try {
        return await Product.find({ _id: ids }).lean()
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = {
    getAll,
    create,
    getById,
    edit,
    delete: del,
    getAllFilteredByIds,
    addLikes,
    removeLikes,
    changeProductAuthor,
    changeProductStatus,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    addReplyComment,
    deleteNestedComment,
}