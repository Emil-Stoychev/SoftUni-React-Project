const emailPattern = '^(?:[A-Za-z]+[0-9]+|[A-Za-z]+|[0-9]+[A-Za-z]+)\\@[A-Za-z]+\\.[A-Za-z]+$'

const emailRegex = new RegExp(emailPattern)

const userValidator = (user) => {
    let { email, password, rePassword } = user

    if (!emailRegex.test(email) || email.length < 3) {
        return { message: 'Email is not valid!' }
    }

    if (password != rePassword) {
        return { message: "Passwords don't match!" }
    }

    if (!password || password.length < 3 || password.trim() === '') {
        return { message: 'Password must be at least 3 characters!' }
    }

    return { email, password }
}

module.exports = {
    userValidator
}