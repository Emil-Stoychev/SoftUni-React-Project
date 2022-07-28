const jwt = require('jsonwebtoken')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

const authMiddleware = async(token) => {
    if (token) {
        try {
            let decodedToken = jwt.verify(token, secret)

            return decodedToken
        } catch (error) {
            return {message: "Invalid access token!"}
        }
    }
}

module.exports = {
    authMiddleware
}