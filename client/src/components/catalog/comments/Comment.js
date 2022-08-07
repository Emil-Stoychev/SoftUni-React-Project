import Picker from 'emoji-picker-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as productService from '../../../services/catalog/productService'
import { TextError } from '../../error/TextError';
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect';
import { CommentTemplateSection } from './CommentTemplate';

export const CommentSection = ({ setProduct, product, user, cookies, setCookies }) => {
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
            productService.addComment(product, user, value)
                .then(result => {
                    if (result.message) {
                        if (result.message.startsWith('Invalid access')) {
                            isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                        } else {
                            setErrors(result)
                        }
                    } else {
                        setProduct(state => ({
                            ...state,
                            ['comments']: [...state.comments, result]
                        }))
                        setValue('')
                    }
                })
        }
    }

    return (
        <div className="row d-flex justify-content-center" style={{ margin: "0 0 2% 0" }} >
            <div className="col-md-8 col-lg-6" >
                <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }} >
                    <div className="card-body p-4" >

                        {/* COMMENT FORM */}

                        {cookies.token &&
                            <div className="form-outline mb-4">
                                <div className="form-outline" >

                                    {errors.includes('Invalid access') && <TextError message={errors} />}

                                    <input
                                        type="search"
                                        id="form1"
                                        name='comment'
                                        className="form-control"
                                        placeholder="Type a comment..."
                                        onClick={() => setAction(false)}
                                        value={value} onChange={(e) => setValue(e.target.value)}
                                        style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}}
                                    />
                                    <label className="form-label" htmlFor="form1"></label>
                                </div>

                                <div>
                                    <label className="btn btn-primary" htmlFor="addANote" style={{ margin: '0 1% 0 0' }} onClick={onSubmitHandler}>+ Add a note</label>
                                    <button className='btn btn-primary' onClick={() => setAction(true)}>Emoji</button>

                                    {action &&
                                        <div onClick={() => setAction(false)}>
                                            <Picker onEmojiClick={onEmojiClick} />
                                        </div>
                                    }

                                </div>
                                
                            </div>
                        }

                        {/* COMMENTS */}

                        {product?.comments?.length > 0
                            ?
                            <>
                                <div className="row" onClick={() => setAction(false)}>
                                    <div className="col">

                                        {product?.comments?.map(x => <CommentTemplateSection key={x._id} cookies={cookies} data={x} setCookies={setCookies} setProduct={setProduct} />)}

                                    </div>
                                </div>
                            </>
                            : ''
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}