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

const createNewItemMessage = (id, nameOfProduct) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, you have successfully created a product named - "${nameOfProduct}". You can see your product in the Own Products section.`,
        date,
        read: false
    }
}

const wheelSurpriseMessage = (id, word, money) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, you received a surprise from Daily Wheel - "${word} - ${money}€". The money has been transferred to your account.`,
        date,
        read: false
    }
}

const newMessageAfterEditing = (id, nameOfProduct) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, you have successfully edited your product - "${nameOfProduct}". You can see your product in the Own Products section.`,
        date,
        read: false
    }
}

const newMessageAfterDelete = (id, nameOfProduct) => {
    let randomNum1 = Math.ceil(Math.random() * 334112)
    let randomNum2 = Math.ceil(Math.random() * 221434)

    let _id = id + randomNum1 * randomNum2

    let newDate = new Date()

    let date = newDate.toLocaleString()

    return {
        _id,
        title: `Congratulations, you have successfully deleted your product - "${nameOfProduct}".`,
        date,
        read: false
    }
}

module.exports =  {
    messageToOwner,
    messageToBuyer,
    createNewItemMessage,
    newMessageAfterEditing,
    newMessageAfterDelete,
    wheelSurpriseMessage
}