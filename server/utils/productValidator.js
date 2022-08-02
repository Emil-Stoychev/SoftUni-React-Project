const imageAddressPattern = '^(?:http\\:\\/\\/|https\\:\\/\\/).+$'

const imageRegex = new RegExp(imageAddressPattern)

const productValidator = (data) => {
    let { title, description, imageUrl, category, price, author, email } = data

    if (!title || title.length < 3 || title.trim() === '') {
        return { message: 'Title must be at least 3 characters!' }
    }

    if (!description || description.length < 3 || description.trim() === '') {
        return { message: 'Description must be at least 3 characters!' }
    }

    if (!category || category.length < 3 || category.trim() === '') {
        return { message: 'Category must be at least 3 characters!' }
    }

    if (!price || price.length < 1 || isNaN(Number(price))) {
        return { message: 'Price must be a positive number!' }
    }

    if (!imageRegex.test(imageUrl)) {
        return { message: 'Image URL must starts with https ot http!' }
    }

    let product = {
        title,
        description,
        imageUrl,
        category,
        price
    }

    if (author) {
        product.author = author
        product.email = email
        product.visible = true
    }

    return product
}

module.exports = {
    productValidator
}