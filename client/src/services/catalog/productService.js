
let a = window.location.origin.split(':3000')

const URL = a[0] + ':3030/catalog'

export const getAll = () => {
    return fetch(URL)
        .then(res => res.json())
}

export const getById = (productId) => {
    return fetch(`${URL}/details/${productId}`)
        .then(res => res.json())
}

export const updateStatus = (productId, cookie) => {

    return fetch(`${URL}/changeProductStatus/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cookie)
    })
        .then(res => res.json())
}

export const deleteProduct = (productId, cookie) => {
    let data = {
        productId,
        cookie
    }

    return fetch(`${URL}/delete/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const changeProductAuthor = (user, productId, productEmail) => {

    return fetch(`${URL}/changeProductAuthor/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, productEmail, productId })
    })
        .then(res => res.json())
}

export const edit = (productId, product, cookie) => {
    let data = {
        productId,
        product,
        cookie
    }

    return fetch(`${URL}/edit/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const addLike = (productId, user) => {
    let data = {
        productId,
        userId: user._id,
        token: user.token
    }

    return fetch(`${URL}/addProductLikes/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const removeLike = (productId, user) => {
    let data = {
        productId,
        userId: user._id,
        token: user.token
    }

    return fetch(`${URL}/removeProductLikes/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const addComment = (product, user, title) => {
    let data = {
        email: user.email,
        title,
        authorId: user._id,
        productId: product._id,
        token: user.token
    }

    return fetch(`${URL}/addComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }) 
        .then(res => res.json())
}

export const create = (data, cookie) => {
    data.author = cookie._id
    data.token = cookie.token
    data.email = cookie.email

    return fetch(`${URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}