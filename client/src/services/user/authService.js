
let a = window.location.origin.split(':3000')

const URL = a[0] + ':3030/users'

export const getOwnProducts = (ownerId) => {
    return fetch(`${URL}/ownProducts/${ownerId}`)
        .then(res => res.json())
}

export const getLikedProducts = (ownerId) => {
    return fetch(`${URL}/likedProducts/${ownerId}`)
        .then(res => res.json())
}

export const getMessages = (ownerId) => {
    return fetch(`${URL}/messages/${ownerId}`)
        .then(res => res.json())
}

export const updateUserAfterBuy = (cookie, product) => {
    let data = {
        cookie,
        product
    }

    return fetch(`${URL}/changeUserAfterBuyProduct/${cookie._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const register = (data) => {
    return fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const login = (data) => {
    return fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const updateUserOwnProducts = (cookie, productId) => {
    let data = {
        token: cookie.token,
        productId
    }

    return fetch(`${URL}/addItem/${cookie._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const addLikeToUser = (user, productId) => {
    let data = {
        token: user.token,
        productId,
        userId: user._id
    }

    return fetch(`${URL}/addLikes/${user._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const removeLikeFromUser = (user, productId) => {
    let data = {
        token: user.token,
        productId,
        userId: user._id
    }

    return fetch(`${URL}/removeLikes/${user._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const deleteProductFromUser = (cookie, productId) => {
    let data = {
        cookie,
        productId
    }

    return fetch(`${URL}/deleteItem/${cookie._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`${URL}/${id}`)
        .then(res => res.json())
}