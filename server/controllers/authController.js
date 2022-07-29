const router = require('express').Router()
const jwt = require('jsonwebtoken')

const authService = require('../Services/authService')
const { getAllFilteredByIds } = require('../Services/catalogService')
const {authMiddleware} = require('../Middlewares/authMiddleware')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

router.get('/', async(req, res) => {
    res.json(await authService.getAll())
})

router.get('/:userId', async(req, res) => {
    try {
        res.json(await authService.getUserById(req.params.userId))
    } catch (error) {
        res.json({message: `User doesn't exist!`})
    }
})

router.put('/deleteItem/:userId', async(req, res) => {
    try {
        res.json(await authService.removeItemFromUser(req.params.userId, req.body.productId))
    } catch (error) {
        res.json({message: `User doesn't exist!`})
    }
})

router.put('/changeUserAfterBuyProduct/:userId', async(req, res) => {
    try {
        res.json(await authService.updateUserAfterBuyNewProduct(req.params.userId, req.body))
    } catch (error) {
        console.error(error)
        return error
    }
})

router.put('/addItem/:userId', async(req, res) => {
    try {
        if(req.body.token.message) {
            return {message: "Invalid access token!"}
        }   

        let token = await authMiddleware(req.body.token)

        if(token.message) {
            return res.json(token)
        }

        let user = await authService.addNewItemToUser(req.params.userId, req.body.productId)

        res.json(user)
    } catch (error) {
        console.log(error);
        res.json({message: `User doesn't exist!`})
    }
})

router.put('/addLikes/:userId', async(req, res) => {
    try {
        let data = req.body

        if(data.token.message) {
            return {message: "Invalid access token!"}
        }    

        let token = await authMiddleware(data.token)

        if(token.message) {
            return token
        }

        let addLikeToUser = await authService.addNewLikeToUser(data)

        res.json(addLikeToUser)
    } catch (error) {
        console.error(error)
        return error
    }
})

router.put('/removeLikes/:userId', async(req, res) => {
    try {
        let data = req.body

        if(data.token.message) {
            return {message: "Invalid access token!"}
        }    

        let token = await authMiddleware(data.token)

        if(token.message) {
            return token
        }

        let removeLikeFromUser = await authService.removeLikeFromUser(data)

        res.json(removeLikeFromUser)
    } catch (error) {
        console.error(error)
        return error
    }
})

router.get('/ownProducts/:userId', async(req, res) => {
    try {
        let user = await authService.getUserById(req.params.userId)

        let ownProducts = await getAllFilteredByIds(user.ownProducts)

        ownProducts.length > 0 ? res.json(ownProducts) : res.json({message: "Empty!"})
    } catch (error) {
        res.json({message: `User doesn't exist!`})
    }
})

router.get('/likedProducts/:userId', async(req, res) => {
    try {
        let user = await authService.getUserById(req.params.userId)

        let likedProducts = await getAllFilteredByIds(user.likedProducts)

        likedProducts.length > 0 ? res.json(likedProducts) : res.json({message: "Empty!"})
    } catch (error) {
        res.json({message: `User doesn't exist!`})
    }
})

router.get('/messages/:userId', async(req, res) => {
    try {
        let messages = await authService.getAllMessages(req.params.userId)

        messages.length > 0 ? res.json(messages) : res.json({message: "Empty!"})
    } catch (error) {
        res.json({message: `User doesn't exist!`})
    }
})

router.post('/login', async(req, res) => {
    let loggedUser = await authService.login(req.body)

    if (loggedUser.message) {
        return res.json(loggedUser)
    }

    let result = await new Promise((resolve, reject) => {
        jwt.sign({ _id: loggedUser._id, email: loggedUser.email , money: loggedUser.money}, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err)
            }

            resolve(token)
        })
    })

    // res.cookie(sessionName, result)
    loggedUser.sessionStorage = result

    res.json(loggedUser)
})

router.post('/register', async(req, res) => {
    let registereduser = await authService.register(req.body)

    res.json(registereduser)
})

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName)

    res.json({ message: "Successfully logout!" })
})

module.exports = router