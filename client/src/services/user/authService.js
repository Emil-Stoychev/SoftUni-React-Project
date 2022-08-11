
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

export const changeMessageStatus = (userId, messageId, token) => {
    let data = {
        messageId,
        token
    }

    return fetch(`${URL}/messages/${userId}/changeStatus`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const updateUserPicture = (cookie, image) => {
    let data = {
        cookie,
        image
    }

    return fetch(`${URL}/changePicture/${cookie._id}`, {
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

export const getUserById = (id) => {
    return fetch(`${URL}/${id}`)
        .then(res => res.json())
}

export const deleteAccount = (cookie) => {
    let data = { 
        cookie
    }

    return fetch(`${URL}/deleteAccount/${data._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}