const createChatMessage = (authorUser, fromUser, productId) => {
    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        fromEmail: fromUser.email,
        author: authorUser.email,
        messages: [],
        date,
        productId
    }
}

module.exports = {
    createChatMessage
}