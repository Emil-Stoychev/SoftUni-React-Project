const createChatMessage = (authorUser, fromUser, productId, productTitle) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        fromEmail: fromUser.email,
        author: authorUser.email,
        messages: [],
        date,
        productId,
        productTitle
    }
}

module.exports = {
    createChatMessage
}