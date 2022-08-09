import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../../services/user/authService'
import { convertBase64, imageTypes } from "../../utils/AddRemoveImages"
import getCookie from '../../cookies/getCookie'
import { TextError } from '../../error/TextError'
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect'
import { AuthContext } from '../../../contexts/AuthContext'
import removeCookie from '../../cookies/removeCookie'

export const ProfileSection = () => {
    const [user, setUser] = useState([])
    const [errors, setErrors] = useState('')
    const [action, setAction] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState({ action: false, value: '' })
    const navigate = useNavigate()

    const cookie = getCookie('sessionStorage')

    const { cookies, setCookies } = useContext(AuthContext)

    useEffect(() => {
        authService.getUserById(cookie._id)
            .then(result => {
                result.defaultImage = result.image

                setUser(result)
            })
    }, [])

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            if (user.image === base64) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                setUser(state => ({
                    ...state,
                    ['image']: base64
                }));
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
        setUser(state => ({
            ...state,
            ['image']: ''
        }));
    }

    const editUserImage = () => {
        setAction(state => !state)

        authService.updateUserPicture(cookie, user.image)
            .then(result => {
                if (result.message) {
                    if (result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                        setUser(state => ({
                            ...state,
                            ['image']: user.defaultImage
                        }));
                    }
                }
            })
    }

    const cancelEdit = () => {
        setUser(state => ({
            ...state,
            ['image']: user.defaultImage
        }));

        setAction(state => !state)
    }

    const onDeleteAccHandler = () => {
        if (deleteAcc.value.length === 0 || !deleteAcc.value || deleteAcc.value.trim() === '') {
            if (!errors) {
                setErrors('Cannot delete empty field!')

                setDeleteAcc(state => ({ ...state, ['value']: '' }))
                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            if (deleteAcc.value !== cookies.email) {
                if (!errors) {
                    setErrors('Your email is not correct!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                authService.deleteAccount(cookies)
                    .then(result => {
                        if (result.message) {
                            if (!errors) {
                                setErrors(result.message)

                                setTimeout(() => {
                                    setErrors('')
                                }, 2000);
                            }
                        } else {
                            removeCookie('sessionStorage')
                            setCookies('')
                            setUser('')
                            setErrors('Your account was deleted, Automatically redirect after 3 seconds!')

                            if (!errors.includes('Your account was deleted')) {
                                setTimeout(() => {
                                    setErrors('')
                                    return navigate('/user/register', { replace: true })
                                }, 3000);
                            }
                        }
                    })
            }
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", userSelect: "none", fontFamily: "Copperplate Gothic", color: "navajowhite", marginTop: '2%' }}>PROFILE</h1>
            <div className="row d-flex justify-content-center" style={{ margin: '0 0 2% 0' }}>
                <div className="card col-md-8 col-lg-6" style={{ width: "36rem" }}>
                    <img
                        src={user.image || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                        className="card-img-top"
                        alt="user-image"
                    />
                    <div className="card-body">
                        <h5 className="card-title" style={{ textAlign: "center" }}><b>{user?.email?.split('@')[0]}</b> </h5>
                        <p className="card-text"><b>Email:</b> {user?.email}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Money:</b> {user?.money}€</li>
                        <li className="list-group-item"> <b>Own products:</b> {user?.ownProducts?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "47%" }} onClick={() => navigate('/ownProducts')}> Click to see </button>
                        </li>
                        <li className="list-group-item"> <b>Your messages:</b> {user?.messages?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "46%" }} onClick={() => navigate('/messages')}> Click to see </button>
                        </li>
                        <li className="list-group-item"> <b>Liked products:</b> {user?.likedProducts?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "46%" }} onClick={() => navigate('/likedProducts')}> Click to see </button>
                        </li>
                    </ul>
                    <button className='btn btn-primary' style={{ margin: '1%' }} onClick={() => setAction(state => !state)}>Edit profile image</button>
                    <button
                        className='btn btn-danger'
                        style={{ margin: '1%' }}
                        onClick={() => setDeleteAcc(state => ({ ...state, ['action']: !state.action }))}
                    >Delete your account
                    </button>

                    {errors && <TextError message={errors} />}

                    {deleteAcc.action &&
                        <>
                            <div className="form-outline" >

                                {errors.includes('Invalid access') && <TextError message={errors} />}

                                <label className="form-label" htmlFor="form1" style={{ userSelect: 'none' }}>Type <b>"{cookies.email}"</b> to confirm!</label>
                                <input
                                    type="search"
                                    id="form1"
                                    name='comment'
                                    className="form-control"
                                    placeholder=""
                                    onClick={() => setAction(false)}
                                    value={deleteAcc.value} onChange={(e) => setDeleteAcc(state => ({ ...state, ['value']: e.target.value }))}
                                    style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}}
                                />
                            </div>

                            <div>
                                <button
                                    id="action-save"
                                    className="btn btn-danger"
                                    type="submit"
                                    style={{ margin: "1%" }}
                                    onClick={onDeleteAccHandler}
                                > Yes
                                </button>
                                <button
                                    id="action-cancel"
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ margin: "1%" }}
                                    onClick={() => setDeleteAcc(state => ({ ...state, ['action']: !state.action }))}
                                > No
                                </button>
                            </div>
                        </>
                    }

                    {action &&
                        <>
                            <label htmlFor="exampleInputPassword2" className="form-label" style={{ color: "white" }}> Edit picture </label>
                            <div className="input-group mb-1" style={{ margin: "1% 0 0 0" }}>
                                <input className="form-control" type="file" onChange={(e) => addImage(e)} />
                                <div>
                                    <button className='btn btn-primary' style={{ margin: '1%' }} onClick={cancelEdit}>Cancel</button>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                {user.image !== '' &&
                                    <div key={user.image}>
                                        <img src={user.image} style={{ margin: "0 1% 1% 0", width: "100px", height: "100px" }} />
                                        <input
                                            className="btn btn-primary delete"
                                            type="button"
                                            value="X"
                                            style={{ margin: "-66px 0px 0px 0px" }}
                                            onClick={(e) => removeImage(e)}
                                        />
                                        <div>
                                            <button className='btn btn-primary' style={{ margin: '1%' }} onClick={editUserImage}>Save</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}