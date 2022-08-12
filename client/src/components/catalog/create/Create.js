import { useContext, useState } from "react"
import { TextError } from "../../error/TextError"
import { productValidator } from "../../utils/ProductValidator"
import * as productService from '../../../services/catalog/productService'
import getCookie from "../../cookies/getCookie"
import { useNavigate } from "react-router-dom"
import { updateUserOwnProducts } from "../../../services/user/authService"
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect"
import { AuthContext } from "../../../contexts/AuthContext"
import { addImage, removeImage } from "../../utils/AddRemoveImages"

export const CreateSection = () => {
    const [errors, setErrors] = useState('')
    const [values, setValues] = useState({
        title: "",
        description: "",
        images: [],
        category: "",
        price: ""
    })

    let { setCookies } = useContext(AuthContext)
    let navigate = useNavigate()

    const onChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const errorChangeHandler = () => {
        let err = productValidator(values)

        if (err.message) {
            setErrors(err.message)
        } else {
            setErrors('')
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        let cookie = getCookie('sessionStorage')

        productService.create(values, cookie)
            .then(result => {
                if (result.message) {
                    if (result.message === "User doesn't exist!" || result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                    } else {
                        setErrors(result.message)
                    }
                } else {
                    navigate(`/catalog/details/${result._id}`)
                }
            })
    }

    return (
        <>
            <h1 style={{ margin: "10% 0 0 25%", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>CREATE</h1>
            <form onSubmit={onSubmitHandler} style={{ margin: "0 25% 12% 25%" }}>

                {errors && <TextError message={errors} />}

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={onChangeHandler}
                        onBlur={errorChangeHandler}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-text" />
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        aria-label="With textarea"
                        name="description"
                        onChange={onChangeHandler}
                        onBlur={errorChangeHandler}
                        value={values.description}
                    />
                </div>

                <div className="input-group mb-1" style={{ margin: "1% 0 0 0" }}>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => addImage(e, values, setValues, errors, setErrors)}
                    />
                </div>
                <div className="input-group mb-3">
                    {values.images.length > 0 && values.images.map(x =>
                        <div key={x.dataString}>
                            <img src={x.dataString} style={{ margin: "0 1% 1% 0", width: "100px", height: "100px" }} />
                            <input
                                className="btn btn-primary delete"
                                type="button"
                                value="X"
                                style={{ margin: "-66px 0px 0px 0px" }}
                                onClick={(e) => removeImage(e, setValues)}
                            />
                        </div>
                    )}
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category"
                        name="category"
                        value={values.category}
                        onChange={onChangeHandler}
                        onBlur={errorChangeHandler}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">€</span>
                    <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={values.price}
                        onChange={onChangeHandler}
                        onBlur={errorChangeHandler}
                        aria-label="Amount (to the nearest dollar)"
                    />
                    <span className="input-group-text">.00</span>
                </div>
                <button type="submit" className="btn btn-primary" > CREATE </button>
            </form>
        </>
    )
}