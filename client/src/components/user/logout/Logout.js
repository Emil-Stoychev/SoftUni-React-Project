import removeCookie from '../../cookies/removeCookie'

export const logout = ({setCookies}) => {
    removeCookie('sessionStorage')
    setCookies('')
}