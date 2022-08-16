const getWheelSurprise = (word) => {
    if (word === "Heart") {
        return 25
    }

    if (word === "Kiss") {
        return 15
    }

    if (word === "Moon") {
        return 10
    }

    if (word === "Star") {
        return 100
    }

    if (word === "Cloud") {
        return 35
    }

    if (word === "Hipnosa") {
        return 50
    }

    if (word === "Rainbow") {
        return 40
    }

    if (word === "Lollipop") {
        return 30
    }
}

module.exports = {
    getWheelSurprise
}