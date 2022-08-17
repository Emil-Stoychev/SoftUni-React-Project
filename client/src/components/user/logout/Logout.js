import removeCookie from '../../cookies/removeCookie'
import * as authService from '../../../services/user/authService'

export const logout = async (cookies, setCookies) => {
    removeCookie('sessionStorage')
    setCookies('')

    authService.logout(cookies.token)
        .then(result => console.log(result))
}