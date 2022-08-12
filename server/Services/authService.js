const bcrypt = require('bcrypt')
const { authMiddleware } = require('../Middlewares/authMiddleware')

const { User } = require('../Models/User')
const { Comment } = require('../Models/Comment')
const { Product } = require('../Models/Product')
const { messageToOwner, messageToBuyer, createNewItemMessage, newMessageAfterEditing, newMessageAfterDelete } = require('../utils/MessageEngine')
const { userValidator } = require('../utils/userValidator')

const getUserById = async (userId) => {
    try {
        let user = await User.findOne({ _id: userId })

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        return user
    } catch (error) {
        return error
    }
}

const addNewItemToUser = async (userId, productId, nameOfProduct, token) => {
    try {
        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return res.json(isValidToken)
        }

        let user = await User.findOne({ _id: userId })

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        user.ownProducts.push(productId)
        user.messages.push(createNewItemMessage(productId, nameOfProduct))

        user.save()

        return user
    } catch (error) {
        return error
    }
}

const addNewLikeToUser = async (userId, token, productId ) => {
    try {
        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId)

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        user.likedProducts.push(productId)
        user.save()

        return user
    } catch (error) {
        return error
    }
}

const removeLikeFromUser = async ( userId, token, productId ) => {
    try {
        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId)

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        user.likedProducts = user.likedProducts.filter(x => x != productId)
        user.save()

        return user
    } catch (error) {
        return error
    }
}

const updateUserAfterDeleteProduct = async (userId, product) => {
    try {
        let user = await User.findById(userId)

        let newOwnProducts = user.ownProducts.filter(x => x != product._id)
        let newLikedProducts = user.likedProducts.filter(x => x != product._id)
        user.messages.push(newMessageAfterDelete(product._id, product.title))

        let updatedUser = await User.findByIdAndUpdate(user._id, { ownProducts: newOwnProducts, likedProducts: newLikedProducts, messages: user.messages })
        
        if (!updatedUser.email) {
            return { message: "Error with update, please try again later!" }
        }

        await removeLikesFromUserAfterDeleteItem(product._id)

        return updatedUser
    } catch (error) {
        return error
    }
}

const updateUserAfterBuyNewProduct = async (userId, product) => {
    try {
        let user = await User.findById(userId)

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        let userFromProduct = await User.findById(product.author)

        if (!userFromProduct) {
            return { message: "Product owner doesn't exist!" }
        }

        userFromProduct.money = Number(userFromProduct.money) + Number(product.price)
        userFromProduct.ownProducts = userFromProduct.ownProducts.filter(x => x != product._id)
        userFromProduct.messages.push(messageToOwner(product._id, product.title, product.price, user.email))


        await User.findByIdAndUpdate(userFromProduct._id, userFromProduct)

        user.likedProducts = user.likedProducts.filter(x => x != product._id)
        user.money = Number(user.money) - Number(product.price)
        user.ownProducts.push(product._id)
        user.messages.push(messageToBuyer(product._id, product.title, product.price, userFromProduct.email))

        return await User.findByIdAndUpdate(user._id, { ownProducts: user.ownProducts, likedProducts: user.likedProducts, money: user.money, messages: user.messages })
    } catch (error) {
        return error
    }
}

const checkUserExisting = async (email) => {
    try {
        return await User.findOne({ email })
    } catch (error) {
        return error
    }
}

const getAllMessages = async (userId) => {
    try {
        let user = await User.findById(userId)

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

        let user = await User.findById(userId)

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

const addMessageAfterEditing = async (userId, product, token) => {
    try {
        if (token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(userId)

        if (!user) {
            return { message: "User not found!" }
        }

        user.messages.push(newMessageAfterEditing(product._id, product.title))
        user.save()

        return user
    } catch (error) {
        return error
    }
}

const removeLikesFromUserAfterDeleteItem = async (productId) => {
    try {
        let allUsers = await User.find()

        if (allUsers.length == 0) {
            return { message: "No users found!" }
        }

        allUsers.forEach(async (x) => {
            if (x.likedProducts.includes(productId)) {
                let currUser = await User.findById(x._id)

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
    try {
        let { email, password } = data

        let user = await User.findOne({ email })

        if (!user) {
            return { message: "Email or password don't match!" }
        }

        let isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return { message: "Email or password don't match!" }
        }

        return user
    } catch (error) {
        return error
    }
}

const register = async (data) => {
    try {
        let user = userValidator(data, 'register')

        if (user.message) {
            return user
        }

        let isExist = await User.findOne({ email: user.email })

        if (isExist) {
            return { message: "Email already exist!" }
        }

        let hashedPassword = await bcrypt.hash(user.password, 10)

        let createdUser = {
            email: user.email,
            password: hashedPassword,
            image: user.image,
            money: 100
        }

        return await User.create(createdUser)
    } catch (error) {
        return error
    }
}

const updatePicture = async (data) => {
    try {
        let { cookie, image } = data

        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(cookie.token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(cookie._id)

        if (!user) {
            return { message: "User not found!" }
        }

        user.image = image
        user.save()

        return user
    } catch (error) {
        return error
    }
}

const deleteAccount = async (data) => {
    try {
        if (data.cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(data.cookie.token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(data.cookie._id)

        if (!user) {
            return { message: "User doesn't exist!" }
        }

        if (user._id.toString() !== data.cookie._id) {
            return { message: "You cannot delete this account!" }
        }

        await Comment.deleteMany({ productId: user.ownProducts })
        await Product.deleteMany({ _id: user.ownProducts })

        let allUsersLikedThisProduct = await User.find({likedProducts: user.ownProducts})

        allUsersLikedThisProduct.forEach(async (x) => {
            x.likedProducts = x.likedProducts.filter(x => {
                if(!user.ownProducts.includes(x)) {
                    return x
                }
            })

            await User.findByIdAndUpdate(x._id, {likedProducts: x.likedProducts})
        })

        return await User.findByIdAndDelete(data.cookie._id)
    } catch (error) {
        return error
    }
}

module.exports = {
    login,
    register,
    getUserById,
    getAll,
    addNewItemToUser,
    addNewLikeToUser,
    removeLikesFromUserAfterDeleteItem,
    removeLikeFromUser,
    updateUserAfterBuyNewProduct,
    getAllMessages,
    changeMessageStatus,
    addMessageAfterEditing,
    checkUserExisting,
    updatePicture,
    deleteAccount,
    updateUserAfterDeleteProduct
}