const router = require('express').Router()

router.get('/', async(req, res ) => {
    res.json({message: 'Error page'})
})

module.exports = router