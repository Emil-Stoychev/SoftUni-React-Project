const bcrypt = require('bcrypt')
const { authMiddleware } = require('../Middlewares/authMiddleware')

const { User } = require('../Models/User')
const { messageToOwner, messageToBuyer, createNewItemMessage, newMessageAfterEditing, newMessageAfterDelete } = require('../utils/MessageEngine')
const { userValidator } = require('../utils/userValidator')

const getUserById = async (userId) => {
    let user = await User.findOne({ _id: userId }).lean()

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    return user
}

const addNewItemToUser = async (userId, productId, nameOfProduct, token) => {

    if(token.message) {
        return {message: "Invalid access token!"}
    }   

    let isValidToken = await authMiddleware(token)

    if(isValidToken.message) {
        return res.json(isValidToken)
    }

    let user = await User.findOne({ _id: userId })

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    user.ownProducts.push(productId)
    user.messages.push(createNewItemMessage(productId, nameOfProduct))

    return await User.findByIdAndUpdate(userId, { ownProducts: user.ownProducts, messages: user.messages })
}

const addNewLikeToUser = async ({ userId, token, productId }) => {
    if (token.message) {
        return { message: "Invalid access token!" }
    }

    let isValidToken = await authMiddleware(token)

    if (isValidToken.message) {
        return isValidToken
    }

    let user = await User.findById(userId).lean()

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    user.likedProducts.push(productId)

    return await User.findByIdAndUpdate(userId, { likedProducts: user.likedProducts })
}

const removeLikeFromUser = async ({ userId, token, productId }) => {
    if (token.message) {
        return { message: "Invalid access token!" }
    }

    let isValidToken = await authMiddleware(token)

    if (isValidToken.message) {
        return isValidToken
    }

    let user = await User.findById(userId).lean()

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    user.likedProducts = user.likedProducts.filter(x => x != productId)

    return await User.findByIdAndUpdate(userId, { likedProducts: user.likedProducts })
}

const removeItemFromUser = async (userId, data) => {
    let { token, productId, nameOfProduct } = data

    if (token.message) {
        return { message: "Invalid access token!" }
    }

    let isValidToken = await authMiddleware(token)

    if (isValidToken.message) {
        return isValidToken
    }

    let user = await User.findOne({ _id: userId })

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    let newOwnProducts = user.ownProducts.filter(x => x != productId)
    let newLikedProducts = user.likedProducts.filter(x => x != productId)
    user.messages.push(newMessageAfterDelete(productId, nameOfProduct))

    let updatedUser = await User.findByIdAndUpdate(userId, { ownProducts: newOwnProducts, likedProducts: newLikedProducts, messages: user.messages })

    if (!updatedUser.email) {
        return { message: "Error with update, please try again later!" }
    }

    await removeLikesFromUserAfterDeleteItem(productId)

    return updatedUser
}

const updateUserAfterBuyNewProduct = async (userId, data) => {
    try {
        if (data.cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(data.cookie.token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId).lean()

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        let userFromProduct = await User.findById(data.product.author).lean()

        if (!userFromProduct) {
            return { message: "Product owner doesn't exist!" }
        }

        userFromProduct.money = Number(userFromProduct.money) + Number(data.product.price)
        userFromProduct.ownProducts = userFromProduct.ownProducts.filter(x => x != data.product._id)
        userFromProduct.messages.push(messageToOwner(data.product._id, data.product.title, data.product.price, user.email))


        await User.findByIdAndUpdate(userFromProduct._id, userFromProduct)

        user.likedProducts = user.likedProducts.filter(x => x != data.product._id)
        user.money = Number(user.money) - Number(data.product.price)
        user.ownProducts.push(data.product._id)
        user.messages.push(messageToBuyer(data.product._id, data.product.title, data.product.price, userFromProduct.email))


        return await User.findByIdAndUpdate(user._id, { ownProducts: user.ownProducts, likedProducts: user.likedProducts, money: user.money, messages: user.messages })
    } catch (error) {
        return error
    }
}

const checkUserExisting = async(email) => {
    try {
        return await User.findOne({email}).lean()
    } catch (error) {
        return error
    }
}

const getAllMessages = async (userId) => {
    try {
        let user = await User.findById(userId).lean()

        if (!user) {
            return { message: "User not found!" }
        }

        user.messages.reverse()

        return user.messages
    } catch (error) {
        return error
    }
}

const changeMessageStatus = async (userId, data) => {
    try {
        let { messageId, token } = data

        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId).lean()

        if (!user) {
            return { message: "User not found!" }
        }

        let messages = user.messages.map(x => {
            if (x._id === messageId) {
                x.read = !x.read

                return x
            } else {
                return x
            }
        })

        return await User.findByIdAndUpdate(userId, { messages })
    } catch (error) {
        return error
    }
}

const addMessageAfterEditing = async (userId, data) => {
    try {
        let { product, token } = data

        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId).lean()

        if (!user) {
            return { message: "User not found!" }
        }

        user.messages.push(newMessageAfterEditing(product._id, product.title))

        return await User.findByIdAndUpdate(userId, {messages: user.messages})
    } catch (error) {
        return error
    }
}

const removeLikesFromUserAfterDeleteItem = async (productId) => {
    try {
        let allUsers = await User.find().lean()

        if (allUsers.length == 0) {
            return { message: "No users found!" }
        }

        allUsers.forEach(async (x) => {
            if (x.likedProducts.includes(productId)) {
                let currUser = await User.findById(x._id).lean()

                let updatedLikes = currUser.likedProducts.filter(x => x != productId)

                await User.findByIdAndUpdate(x._id, { likedProducts: updatedLikes })
            }
        })

    } catch (error) {
        return error
    }
}

const getAll = async () => {
    return await User.find()
}

const login = async (data) => {
    let { email, password } = data

    let user = await User.findOne({ email }).lean()

    if (!user) {
        return { message: "Email or password don't match!" }
    }

    let isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return { message: "Email or password don't match!" }
    }

    return user
}

const register = async (data) => {
    let user = userValidator(data)

    if (user.message) {
        return user
    }

    let isExist = await User.findOne({email: user.email}).lean()

    if(isExist) {
        return {message: "Email already exist!"}
    }

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let createdUser = {
        email: user.email,
        password: hashedPassword,
        money: 100
    }

    return await User.create(createdUser)
}

module.exports = {
    login,
    register,
    getUserById,
    getAll,
    addNewItemToUser,
    removeItemFromUser,
    addNewLikeToUser,
    removeLikesFromUserAfterDeleteItem,
    removeLikeFromUser,
    updateUserAfterBuyNewProduct,
    getAllMessages,
    changeMessageStatus,
    addMessageAfterEditing,
    checkUserExisting
}