import { useContext, useEffect, useState } from "react"
import { TextError } from "../../error/TextError"
import { productValidator } from "../../utils/ProductValidator"
import * as productService from '../../../services/catalog/productService'
import getCookie from "../../cookies/getCookie"
import { useNavigate } from "react-router-dom"
import { updateUserOwnProducts } from "../../../services/user/authService"
import { CookieContext } from "../../../contexts/CookieContext"

export const CreateSection = () => {
    const [errors, setErrors] = useState('')
    const [values, setValues] = useState({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        price: ""
    })

    let {cookie} = useContext(CookieContext)

    let navigate = useNavigate()

    const onChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        let cookie = getCookie('sessionStorage')

        productService.create(values, cookie)
            .then(result => {
                if (result.message) {
                    if(result.message === "User doesn't exist!") {
                        return navigate('/user/login')
                    }
                    setErrors(result.message)
                } else {
                    let productId = result._id

                    updateUserOwnProducts(cookie, result._id)
                        .then(result => {
                            if(result.message) {
                                if(result.message === "User doesn't exist!") {
                                    return navigate('/user/login')
                                }
                                setErrors(result.message)
                            } else {
                                navigate(`/catalog/details/${productId}`)
                            }
                        })
                }
            })
    }

    const errorChangeHandler = () => {
        let err = productValidator(values)

        if (err.message) {
            setErrors(err.message)
        } else {
            setErrors('')
        }
    }

    return (
        <>
            <h1 style={{ margin: "10% 0 0 25%" }}>CREATE PAGE</h1>
            <form onSubmit={onSubmitHandler} style={{ margin: "0 25% 0 25%" }}>
                {errors && <TextError message={errors} />}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" />
                    <input type="text" className="form-control" placeholder="Title" name="title" value={values.title} onChange={onChangeHandler} onBlur={errorChangeHandler} aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group">
                    <span className="input-group-text" />
                    <textarea className="form-control" placeholder="Description" aria-label="With textarea" name="description" onChange={onChangeHandler} onBlur={errorChangeHandler} value={values.description} />
                </div>
                <label htmlFor="basic-url" className="form-label"> Your image URL </label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3"> https or http </span>
                    <input type="text" className="form-control" id="basic-url" name="imageUrl" value={values.imageUrl} onChange={onChangeHandler} onBlur={errorChangeHandler} aria-describedby="basic-addon3" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" />
                    <input type="text" className="form-control" placeholder="Category" name="category" value={values.category} onChange={onChangeHandler} onBlur={errorChangeHandler} aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">€</span>
                    <input type="text" className="form-control" name="price" value={values.price} onChange={onChangeHandler} onBlur={errorChangeHandler} aria-label="Amount (to the nearest dollar)" />
                    <span className="input-group-text">.00</span>
                </div>
                <button type="submit" className="btn btn-primary" > CREATE </button>
            </form>
        </>
    )
}