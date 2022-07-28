const bcrypt = require('bcrypt')

const { User } = require('../Models/User')
const { userValidator } = require('../utils/userValidator')

const getUserById = async(userId) => {
    let user = await User.findOne({_id: userId}).lean()

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    return user
}

const addNewItemToUser = async(userId, productId) => {
    let user = await User.findOne({_id: userId})

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    user.ownProducts.push(productId)

    return await User.findByIdAndUpdate(userId, {ownProducts: user.ownProducts})
}

const addNewLikeToUser = async({userId, token, productId}) => {
    let user = await User.findById(userId).lean()

    if(!user) {
        return { message: "User doesn't exist!" } 
    }

    user.likedProducts.push(productId)

    return await User.findByIdAndUpdate(userId, {likedProducts: user.likedProducts})
}

const removeLikeFromUser = async({userId, token, productId}) => {
    let user = await User.findById(userId).lean()

    if(!user) {
        return { message: "User doesn't exist!" } 
    }

    user.likedProducts = user.likedProducts.filter(x => x != productId)

    return await User.findByIdAndUpdate(userId, {likedProducts: user.likedProducts})
}

const removeItemFromUser = async(userId, productId) => {
    let user = await User.findOne({_id: userId})

    if (!user) {
        return { message: "User doesn't exist!" }
    }

    let newOwnProducts = user.ownProducts.filter(x => x != productId)
    let newLikedProducts = user.likedProducts.filter(x => x != productId)

    let updatedUser = await User.findByIdAndUpdate(userId, {ownProducts: newOwnProducts, likedProducts: newLikedProducts})

    if(!updatedUser.email) {
        return {message: "Error with update, please try again later!"}
    }

    await removeLikesFromUserAfterDeleteItem(productId)

    return updatedUser
}

const removeLikesFromUserAfterDeleteItem = async (productId) => {
    try {
        let allUsers = await User.find().lean()

        if(allUsers.length == 0) {
            return {message: "No users found!"}
        }

        allUsers.forEach(async (x) => {
            if(x.likedProducts.includes(productId)) {
                let currUser = await User.findById(x._id).lean()

                let updatedLikes = currUser.likedProducts.filter(x => x != productId)

                await User.findByIdAndUpdate(x._id, {likedProducts: updatedLikes})
            }
        })

    } catch (error) {
        return error
    }
}

const getAll = async() => {
    return await User.find()
}

const login = async(data) => {
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

const register = async(data) => {
    let user = userValidator(data)

    if (user.message) {
        return user
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
    removeLikeFromUser
}