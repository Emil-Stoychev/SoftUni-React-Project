const router = require('express').Router()
const jwt = require('jsonwebtoken')

const authService = require('../Services/authService')
const { getAllFilteredByIds } = require('../Services/catalogService')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

router.get('/', async (req, res) => {
    res.json(await authService.getAll())
})

router.get('/:userId', async (req, res) => {
    res.json(await authService.getUserById(req.params.userId))
})

router.put('/deleteItem/:userId', async (req, res) => {
    res.json(await authService.removeItemFromUser(req.params.userId, req.body))
})

router.put('/changeUserAfterBuyProduct/:userId', async (req, res) => {
    res.json(await authService.updateUserAfterBuyNewProduct(req.params.userId, req.body))
})

router.put('/addItem/:userId', async (req, res) => {
    let user = await authService.addNewItemToUser(req.params.userId, req.body.productId, req.body.nameOfProduct, req.body.token)

    res.json(user)
})

router.put('/addLikes/:userId', async (req, res) => {
    let addLikeToUser = await authService.addNewLikeToUser(req.body)

    res.json(addLikeToUser)
})

router.put('/removeLikes/:userId', async (req, res) => {
    let removeLikeFromUser = await authService.removeLikeFromUser(req.body)

    res.json(removeLikeFromUser)
})

router.get('/ownProducts/:userId', async (req, res) => {
    let user = await authService.getUserById(req.params.userId)

    let ownProducts = await getAllFilteredByIds(user.ownProducts)

    ownProducts.length > 0 ? res.json(ownProducts) : res.json({ message: "Empty!" })
})

router.get('/likedProducts/:userId', async (req, res) => {
    let user = await authService.getUserById(req.params.userId)

    let likedProducts = await getAllFilteredByIds(user.likedProducts)

    likedProducts.length > 0 ? res.json(likedProducts) : res.json({ message: "Empty!" })
})

router.get('/messages/:userId', async (req, res) => {
    let messages = await authService.getAllMessages(req.params.userId)

    messages.length > 0 ? res.json(messages) : res.json({ message: "Empty!" })
})

router.put('/messages/:userId/changeStatus', async (req, res) => {
    let editedMessage = await authService.changeMessageStatus(req.params.userId, req.body)

    res.json(editedMessage)
})

router.post('/messages/:userId/addMessageAfterEditing', async (req, res) => {
    let editedMessage = await authService.addMessageAfterEditing(req.params.userId, req.body)

    editedMessage.email ? res.json(editedMessage.messages) : res.json({ message: "Error!" })
})

router.post('/login', async (req, res) => {
    let loggedUser = await authService.login(req.body)

    if (loggedUser.message) {
        return res.json(loggedUser)
    }

    let result = await new Promise((resolve, reject) => {
        jwt.sign({ _id: loggedUser._id, email: loggedUser.email, money: loggedUser.money }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err)
            }

            resolve(token)
        })
    })

    sessionStorage = result

    res.json(sessionStorage)
})

router.put('/changePicture/:userId', async (req, res) => {
    let updatedUser = await authService.updatePicture(req.body)

    res.json(updatedUser)
})

router.post('/register', async (req, res) => {
    let registereduser = await authService.register(req.body)

    res.json(registereduser)
})

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName)

    res.json({ message: "Successfully logout!" })
})

router.delete('/deleteAccount/:userId', async (req, res) => {
    let deletedAccount = await authService.deleteAccount(req.body)

    res.json(deletedAccount)
})

module.exports = router