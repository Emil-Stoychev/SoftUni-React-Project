const router = require('express').Router()

const catalogController = require('./controllers/catalogController')
const authController = require('./controllers/authController')
const errorController = require('./controllers/errorController.js')

router.use('/catalog', catalogController)
router.use('/users', authController)

router.use('*', errorController)

module.exports = router