const messageToOwner = (id, nameOfProduct, price, from) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, your product "${nameOfProduct}" was purchased from ${from}, which costs ${price}€. The money has been transferred to your account.`,
        date,
        read: false
    }
}

const messageToBuyer = (id, nameOfProduct, price, from) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, you have purchased this product "${nameOfProduct}" from ${from}, which costs ${price}€. You can see your product in the Own Products section.`,
        date,
        read: false
    }
}

module.exports =  {
    messageToOwner,
    messageToBuyer
}