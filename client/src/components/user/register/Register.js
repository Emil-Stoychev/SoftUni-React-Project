import { useState } from "react"
import { useNavigate } from "react-router-dom"

import * as userService from '../../../services/user/authService'
import { TextError } from '../../error/TextError'
import { convertBase64, imageTypes } from "../../utils/AddRemoveImages"
import { userValidator } from "../../utils/UserValidator"

export const RegisterSection = () => {
    const [errors,setErrors] = useState('')
    const [values, setValues] = useState({
        email: '',
        password: '',
        rePassword: '',
        image: ''
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        userService.register(values)
            .then(result => {
                if(result.message) {
                    setErrors(result.message)
                } else {
                    navigate('/user/login')
                }
            })
    }

    const errorChangeHandler = () => {
        let err = userValidator(values, 'register')

        if(err.message) {
            setErrors(err.message)
        } else {
            setErrors('')
        }
    }

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            if (values.image === base64) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')
    
                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if(values.image !== '') {
                    if (errors !== 'You cannot upload more than 1 image!') {
                        setErrors('You cannot upload more than 1 image!')
        
                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setValues(state => ({
                        ...state,
                        ['image']: base64
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
    
    const removeImage = (e) => {
        setValues(state => ({
            ...state,
            ['image']: ''
        }));
    }

    return (
        <>
            <h1 style={{ margin: "10% 0 0 25%" , fontFamily: "Copperplate Gothic" , userSelect: "none" , color: "navajowhite"}}>REGISTER</h1>
            
            <form onSubmit={onSubmitHandler} style={{ margin: "0 25% 15% 25%" }}>
                {errors && <TextError message={errors} /> }

                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{color: "white"}}> Email address </label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={changeHandler} onBlur={errorChangeHandler}/>
                    <div id="emailHelp" className="form-text" style={{color: "white"}}> We'll never share your email with anyone else. </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{color: "white"}}> Password </label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={values.password} onChange={changeHandler} onBlur={errorChangeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label" style={{color: "white"}}> Repeat Password </label>
                    <input type="password" name="rePassword" className="form-control" id="exampleInputPassword2" value={values.rePassword} onChange={changeHandler} onBlur={errorChangeHandler}/>
                </div>

                <label htmlFor="exampleInputPassword2" className="form-label" style={{color: "white"}}> Profile picture </label>
                <div className="input-group mb-1" style={{ margin: "1% 0 0 0" }}>
                    <input className="form-control" type="file" onChange={(e) => addImage(e)} />
                </div>

                <div className="input-group mb-3">
                    {values.image !== '' &&
                        <div key={values.image}>
                            <img src={values.image} style={{ margin: "0 1% 1% 0", width: "100px", height: "100px" }} />
                            <input className="btn btn-primary delete" type="button" value="X" style={{ margin: "-66px 0px 0px 0px" }} onClick={(e) => removeImage(e)} />
                        </div>
                    }
                </div>

                <button type="submit" className="btn btn-primary" > Submit </button>
            </form>
        </>
    )
}