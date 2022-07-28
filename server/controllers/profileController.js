const router = require('express').Router()

const profileService = require('../Services/profileService')

router.get('/:profileId', async(req, res) => {
    let profile = await profileService.profile(req.params.profileId) || []

    res.json(profile)
})

module.exports = router