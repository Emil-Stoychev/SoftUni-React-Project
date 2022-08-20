import Picker from 'emoji-picker-react'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as authService from '../../../services/user/authService'
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect'

export const ChatMessageToUser = ({ cookies, setCookies, product }) => {
    const [value, setValue] = useState('')
    const [errors, setErrors] = useState('')
    const [action, setAction] = useState(false)
    const navigate = useNavigate()

    const onEmojiClick = (event, emojiObject) => {
        setValue(state => state + emojiObject.emoji)
    };

    const onSubmitHandler = () => {
        if (value.length === 0 || !value || value.trim() === '') {
            if (!errors) {
                setErrors('Cannot add empty comment!')

                setValue('')
                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            setErrors('')
            authService.askUser(value, cookies, product.author, product._id, product.title)
                .then(result => {
                    if (result.message) {
                        if (result.message.startsWith('Invalid access')) {
                            isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                        } else {
                            setErrors(result)
                        }
                    } else {
                        setValue('')
                    }
                })
        }
    }

    return (
        <>
            <div className="row d-flex justify-content-center" style={{ margin: "0 0 1% 0" }} >
                <div className="col-md-8 col-lg-6" >
                    <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }} >
                        <div className="card-body p-4" >

                            {cookies.token &&
                                <div className="form-outline mb-4" >
                                    <div className="form-outline" >

                                        <input
                                            type="search"
                                            id="form1"
                                            name='comment'
                                            className="form-control"
                                            placeholder={`Ask something ${product?.email}...`}
                                            onClick={() => setAction(false)}
                                            value={value} onChange={(e) => setValue(e.target.value)}
                                            style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}}
                                        />
                                        <label className="form-label" htmlFor="form1"></label>
                                    </div>

                                    <div>
                                        <label className="btn btn-primary" htmlFor="addANote" style={{ margin: '0 1% 0 0' }} onClick={onSubmitHandler}>Send</label>
                                        <button className='btn btn-primary' onClick={() => setAction(true)}>Emoji</button>

                                        {action &&
                                            <div onClick={() => setAction(false)}>
                                                <Picker onEmojiClick={onEmojiClick} />
                                            </div>
                                        }

                                    </div>

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}