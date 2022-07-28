const router = require('express').Router()

const productService = require('../Services/catalogService')

router.get('/', async(req, res) => {
    let products = await productService.getAll() || { message: "Empty" }

    res.json(products)
})

router.post('/create', async(req, res) => {
    // TODO: Set userId in locals or when fetch to the server - send data and userId

    let createdProduct = await productService.create(req.body) || []

    res.json(createdProduct)
})

router.put('/edit/:productId', async(req, res) => {
    let editedProduct = await productService.edit(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/addProductLikes/:productId', async(req, res) => {
    let editedProduct = await productService.addLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/removeProductLikes/:productId', async(req, res) => {
    let editedProduct = await productService.removeLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.delete('/delete/:productId', async(req, res) => {
    let deletedProduct = await productService.delete(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(deletedProduct)
})

router.get('/details/:productId', async(req, res) => {
    let detailsProduct = await productService.getById(req.params.productId) || { message: "404 Not found!" }

    res.json(detailsProduct)
})

module.exports = router