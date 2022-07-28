const { User } = require('../Models/User')

const profile = async(profileId) => {
    try {
        return await User.findById(profileId).lean() || { message: "404 Not found!" }
    } catch (error) {
        // console.error(error)
        return { message: "404 Not found!" }
    }
}

module.exports = {
    profile
}