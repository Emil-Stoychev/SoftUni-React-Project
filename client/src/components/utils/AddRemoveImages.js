export const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/raw']

export const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = (() => {
            resolve(fileReader.result)
        })

        fileReader.onerror = ((error) => {
            reject(error)
        })
    })
}

export const addImage = async (e, values, setValues, errors, setErrors) => {
    let file = e.target.files[0]

    if (file && imageTypes.includes(file.type)) {
        let base64 = await convertBase64(file)

        let newDate = new Date()

        let date = newDate.toLocaleString()

        let imageData = {
            name: file.name,
            type: file.type,
            date,
            dataString: base64,
        }

        if (values.images.some(x => x.dataString == imageData.dataString)) {
            if (errors !== 'This image already exist!') {
                setErrors('This image already exist!')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            if(values.images.length > 5) {
                if (errors !== 'You cannot upload more than 6 images!') {
                    setErrors('You cannot upload more than 6 images!')
    
                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                setValues(state => ({
                    ...state,
                    ['images']: [...state.images, imageData]
                }));
            }
        }
    } else {
        if (errors !== 'File must be a image!') {
            setErrors('File must be a image!')

            setTimeout(() => {
                setErrors('')
            }, 2000);
        }
    }

    e.target.value = null
}

export const removeImage = (e, setValues) => {
    let file = e.target.parentElement.childNodes[0].src

    setValues(state => ({
        ...state,
        ['images']: state.images.filter(x => x.dataString !== file)
    }));
}