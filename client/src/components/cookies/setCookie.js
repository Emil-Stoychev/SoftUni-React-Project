import Cookie from 'js-cookie'

const SetCookie = (name, data) => {
    Cookie.set(name, data, {
        expires: 2,
        secure: true,
        sameSite: 'strict',
        path: '/'
    })
}

export default SetCookie