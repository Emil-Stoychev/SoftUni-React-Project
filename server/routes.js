const router = require('express').Router()

const catalogController = require('./controllers/catalogController')
const profileController = require('./controllers/profileController')
const authController = require('./controllers/authController')
const errorController = require('./controllers/errorController.js')

router.use('/catalog', catalogController)
router.use('/profile', profileController)
router.use('/users', authController)

router.use('*', errorController)

module.exports = router