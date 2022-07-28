import Cookie from 'js-cookie'

const removeCookie = (name) => {
    return Cookie.remove(name)
}

export default removeCookie