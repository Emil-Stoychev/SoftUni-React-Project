const router = require('express').Router()

const productService = require('../Services/catalogService')

router.get('/', async (req, res) => {
    let products = await productService.getAll()

    res.json(products.length > 0 ? products : { message: "Empty" })
})

router.post('/create', async (req, res) => {
    let createdProduct = await productService.create(req.body) || []

    res.json(createdProduct)
})

router.put('/edit/:productId', async (req, res) => {
    let editedProduct = await productService.edit(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.post('/addComment', async (req, res) => {
    let addedComment = await productService.addComment(req.body) || { message: "404 Not found!" }

    res.json(addedComment)
})

router.put('/editComment/:commentId', async (req, res) => {
    let editedComment = await productService.editComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/editNestedComment/:commentId', async (req, res) => {
    let editedComment = await productService.editNestedComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/addReplyComment/:commentId', async (req, res) => {
    let editedComment = await productService.addReplyComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/likeComment/:commentId', async (req, res) => {
    let editedComment = await productService.likeComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/likeNestedComment/:commentId', async (req, res) => {
    let editedComment = await productService.likeComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.delete('/deleteComment/:commentId', async (req, res) => {
    let deletedComment = await productService.deleteComment(req.body) || { message: "404 Not found!" }

    res.json(deletedComment)
})

router.delete('/deleteNestedComment/:commentId', async (req, res) => {
    let deletedComment = await productService.deleteNestedComment(req.body) || { message: "404 Not found!" }

    res.json(deletedComment)
})

router.put('/addProductLikes/:productId', async (req, res) => {
    let editedProduct = await productService.addLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/removeProductLikes/:productId', async (req, res) => {
    let editedProduct = await productService.removeLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/changeProductAuthor/:productId', async (req, res) => {
    let editedProduct = await productService.changeProductAuthor(req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/changeProductStatus/:productId', async (req, res) => {
    let editedProduct = await productService.changeProductStatus(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.delete('/delete/:productId', async (req, res) => {
    let deletedProduct = await productService.delete(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(deletedProduct)
})

router.get('/details/:productId', async (req, res) => {
    let detailsProduct = await productService.getById(req.params.productId) || { message: "404 Not found!" }

    res.json(detailsProduct)
})

module.exports = router