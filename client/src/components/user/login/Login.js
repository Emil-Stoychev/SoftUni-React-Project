import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import SetCookie from '../../cookies/setCookie'

import * as userService from '../../../services/user/authService'
import { TextError } from '../../error/TextError'
import { userValidator } from "../../utils/UserValidator"
import getCookie from "../../cookies/getCookie"
import { AuthContext } from "../../../contexts/AuthContext"

export const LoginSection = () => {
    const [errors, setErrors] = useState('')

    let { setCookies } = useContext(AuthContext)

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }))
    }

    function onSubmitHandler(e) {
        e.preventDefault()

        userService.login(values)
            .then(result => {
                if (result.message) {
                    setErrors(result.message)
                } else {
                    setErrors('')
                    SetCookie('sessionStorage', result)
                    setCookies(getCookie('sessionStorage'))
                    navigate('/catalog')
                }
            })
    }

    const errorChangeHandler = () => {
        let err = userValidator(values)

        if (err.message) {
            setErrors(err.message)
        } else {
            setErrors('')
        }
    }

    return (
        <>
            <h1 style={{ margin: "10% 0 0 25%", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>LOGIN</h1>

            <form onSubmit={onSubmitHandler} style={{ margin: "0 25% 20% 25%" }}>
                {errors && <TextError message={errors} />}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: "white" }}> Email address </label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={changeHandler} onBlur={errorChangeHandler} />
                    <div id="emailHelp" className="form-text" style={{ color: "white" }}> We'll never share your email with anyone else. </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: "white" }}> Password </label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={values.password} onChange={changeHandler} onBlur={errorChangeHandler} />
                </div>
                <button type="submit" className="btn btn-primary"> Submit </button>
            </form>
        </>
    )
}