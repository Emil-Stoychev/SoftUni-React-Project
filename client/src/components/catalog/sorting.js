export const sortByPrice = (products, type, setType) => {
    if (type) {
        products.sort((a, b) => Number(b.price) - Number(a.price))
        setType(!type)
    } else {
        products.sort((a, b) => Number(a.price) - Number(b.price))
        setType(!type)
    }
}

export const sortByLikes = (products, type, setType) => {
    if (type) {
        products.sort((a, b) => Number(b.likes.length) - Number(a.likes.length))
        setType(!type)
    } else {
        products.sort((a, b) => Number(a.likes.length) - Number(b.likes.length))
        setType(!type)
    }
}

export const sortByName = (searchValue, setErrors, errors, setProducts, products, defaultProducts) => {
    if (searchValue === '') {
        setErrors('')
        setProducts(defaultProducts)
    } else {
        let isEmpty = products.filter(x => x.title.toLowerCase().includes(searchValue.toLowerCase()))

        if (isEmpty.length === 0) {
            if (!errors.message) {
                setErrors({ message: 'Search not found' })

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            setErrors('')
            setProducts(isEmpty)
        }
    }
}