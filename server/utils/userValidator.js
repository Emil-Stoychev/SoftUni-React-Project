const emailPattern = '^(?:[A-Za-z]+[0-9]+|[A-Za-z]+|[0-9]+[A-Za-z]+)\\@[A-Za-z]+\\.[A-Za-z]+$'

const emailRegex = new RegExp(emailPattern)

const userValidator = (user, type) => {
    let { email, password, rePassword, image } = user

    if (!emailRegex.test(email) || email.length < 3) {
        return { message: 'Email is not valid!' }
    }

    if (password != rePassword) {
        return { message: "Passwords don't match!" }
    }

    if (!password || password.length < 3 || password.trim() === '') {
        return { message: 'Password must be at least 3 characters!' }
    }

    if(type === 'register') {
        if (image === '') {
            return { message: 'Profile picture is required!' }
        } else {
            if (!image.startsWith('data:image')) {
                return { message: 'Profile picture should be valid!' }
            }
        }
    }

    return { email, password, image }
}

module.exports = {
    userValidator
}