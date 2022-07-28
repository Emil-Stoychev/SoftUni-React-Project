import Cookie from 'js-cookie'
import jwt from 'jwt-decode'

const getCookie = (name) => {
    let token = Cookie.get(name)

    try {
        let cookie = jwt(token)

        cookie.token = token

        return cookie
    } catch (error) {
        return error
    }
}

export default getCookie