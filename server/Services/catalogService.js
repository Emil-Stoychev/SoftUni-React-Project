const { authMiddleware } = require('../Middlewares/authMiddleware')
const { Product } = require('../Models/Product')
const { productValidator } = require('../utils/productValidator')
const { checkUserExisting } = require('./authService')

const getAll = async() => {
    try {
        return await Product.find({visible: true}).lean()
    } catch (error) {
        console.error(error)
        return error
    }
}

const getById = async(productId) => {
    try {
        let product = await Product.findById(productId).lean() || { message: "404 Not found!" }

        return product
    } catch (error) {
        return error
    }
}

const changeProductAuthor = async(data) => {
    let {user, productEmail, productId} = data

    try {
        if (user.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(user.token)

        if (token.message) {
            return token
        }

        let isUserExist = await checkUserExisting(productEmail)

        if(!isUserExist.email) {
            // CHECK EVERY REQUEST FOR TOKEN AND VALIDATE
            // AND MAKE OPTIONS FOR MORE IMAGES

            await Product.findByIdAndDelete(productId)

            return { message: "Product owner doesn't exist!" }
        }

        let product = await Product.findById(productId).lean()

        if(!product) {
            return {message: "Product not found"}
        }

        product.author = user._id
        product.email = user.email
        product.likes = product.likes.filter(x => x != user._id)
        product.visible = false

        let updatedProduct = await Product.findByIdAndUpdate(productId, product)

        if(!updatedProduct) {
            return {message: "Error"}
        }

        return product
    } catch (error) {
        console.error(error)
        return error
    }
}

const changeProductStatus = async(productId, data) => {
    try {
        if (!data.token) {
            return { message: "User doesn't exist!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        let product = await Product.findById(productId).lean()

        return await Product.findByIdAndUpdate(productId, {visible: !product.visible})
    } catch (error) {
        return error
    }
}

const create = async(data) => {
    try {
        if (!data.token) {
            return { message: "User doesn't exist!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
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

const edit = async(productId, data) => {
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

const addLikes = async(productId, data) => {
    try {
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

        return await Product.findByIdAndUpdate(productId, { likes: product.likes })
    } catch (error) {
        console.error(error)
        return error
    }
}

const removeLikes = async(productId, data) => {
    try {
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

        return await Product.findByIdAndUpdate(productId, { likes: product.likes })
    } catch (error) {
        console.error(error)
        return error
    }
}

const del = async(productId, data) => {
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

        return await Product.findByIdAndDelete(productId)
    } catch (error) {
        console.error(error)
        return error
    }
}

const getAllFilteredByIds = async(ids) => {
    try {
        let allProducts = await Product.find().lean()

        return allProducts.filter(x => ids?.includes(x._id.toString()))
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
    changeProductStatus
}