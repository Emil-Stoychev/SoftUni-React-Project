import { useState } from "react"
import Picker from 'emoji-picker-react'
import * as productService from '../../../services/catalog/productService'
import { useNavigate } from "react-router-dom"
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect"

export const CommentTemplateSection = ({ cookies, data, setCookies, setProduct , product}) => {
    const [value, setValue] = useState('')
    const [action, setAction] = useState({ type: null, model: false, emoji: false })
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const clickEditBtn = () => {
        setAction(({
            type: 'edit',
            model: true,
            emoji: false
        }))

        setValue(data.title)
    }

    const clickDeleteBtn = () => {
        setAction(({
            type: 'delete',
            model: true,
            emoji: false
        }))
    }

    const likeCommentHandler = () => {
        if(cookies._id != data.authorId) {
            productService.likeComment(data._id, cookies)
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
                            ['comments']: state.comments.map(x => {
                            if(x._id == data._id) {
                                if(result === 'like') {
                                    x.likes.push(cookies._id)

                                    return x
                                } else {
                                    x.likes = x.likes.filter(x => x != cookies._id)

                                    return x
                                }
                            } else {
                                return x
                            }
                        })}))
                    }
                })

        }
    }

    const deleteCommentHandler = () => {
        setAction(({
            type: null,
            model: false,
            emoji: false
        }))

        productService.deleteComment(data._id, cookies)
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
                        ['comments']: state.comments.filter(x => x._id !== data._id)
                    }))
                }
            })

    }

    const onEmojiClick = (event, emojiObject) => {
        setValue(state => state + emojiObject.emoji)
    };

    const clickSaveBtn = () => {
        if (value.length === 0 || !value || value.trim() === '') {
            if (!errors) {
                setErrors('Cannot add empty comment!')

                setValue('')
                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            setAction(({ type: null, model: false, emoji: false }))
            setErrors('')

            productService.editComment(value, data, cookies)
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
                            ['comments']: state.comments.map(x => x._id === data._id ? result : x)
                        }))
                    }
                })
        }
    }

    return (
        <>
            <div className="d-flex flex-start" style={{ borderStyle: 'outset', marginBottom: '2%' }}>
                <img className="rounded-circle shadow-1d-strong me-3" src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="avatar" width={65} height={65} />
                <div className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1"> {data.email.split('@')[0]} <span className="small">- {data.date}</span></p>

                            <div>


                                {!action.model && cookies._id == data.authorId
                                    ?
                                    <>
                                        <a href="#!" style={{ marginLeft: "-30%", textDecoration: 'none' }}>
                                            <span className="extra-large" onClick={clickEditBtn}>&#9998;</span>
                                        </a>
                                        <a href="#!" style={{ margin: "0 1% 0 10px", textDecoration: 'none' }}>
                                            <span className="extra-large" onClick={clickDeleteBtn}>&#10060;</span>
                                        </a>
                                    </>
                                    : action.model
                                        ? ''
                                        : cookies._id && cookies._id != data.authorId &&
                                        <>
                                            <a href="#!" style={{ margin: "0 0 0 -30%", textDecoration: 'none' }}>
                                                <span className="extra-large" >&#8617; reply</span>
                                            </a>
                                        </>
                                }

                                <a href="#!" style={{ margin: "0 0 0 15%", textDecoration: 'none' }}>
                                    <span className="extra-large" onClick={likeCommentHandler} >&#x1F44D; {data.likes.length || 0}</span>
                                </a>
                            </div>


                        </div>

                        {action.type === 'edit' && action.model
                            ?
                            <>
                                <div className="input-group" >
                                    <span className="input-group-text" />
                                    <textarea className="form-control" placeholder="Description" aria-label="With textarea" name="description" value={value} onChange={(e) => setValue(e.target.value)} style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}} />
                                </div>

                                <div>
                                    <button className="btn btn-primary" style={{ margin: '1%' }} onClick={clickSaveBtn}>Save</button>
                                    <button className="btn btn-primary" style={{ margin: '1%' }} onClick={() => setAction(({ type: null, model: false, emoji: false }))}>Cancel</button>
                                    <button className='btn btn-primary' style={{ margin: '1%' }} onClick={() => setAction(({ type: 'edit', model: true, emoji: true }))}>Emoji</button>

                                    <div>

                                        {action.emoji && action.model &&
                                            <div onClick={() => setAction(({ type: 'edit', model: true, emoji: false }))}>
                                                <Picker onEmojiClick={onEmojiClick} />
                                            </div>
                                        }

                                    </div>
                                </div>
                            </>
                            : action.type === 'delete' && action.model
                                ?
                                <>
                                    <div className="table-wrapper">
                                        <div className="overlay">
                                            <div className="backdrop" />
                                            <div className="confirm-container">
                                                <header className="headers">
                                                    <p className="small mb-0">{data.title}</p>
                                                    <h6>Are you sure you want to delete this comment?</h6>
                                                    <button id="action-save" className="btn btn-primary" type="submit" style={{ margin: "1%" }} onClick={deleteCommentHandler} > Yes </button>
                                                    <button id="action-cancel" className="btn btn-primary" type="button" style={{ margin: "1%" }} onClick={() => setAction(({ type: null, model: false, emoji: false }))}> No </button>
                                                </header>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <p className="small mb-0">{data.title}</p>
                        }
                    </div>

                    {/* NESTED COMMENTS */}
                    {/* <div className="d-flex flex-start mt-4">
                                                    <a className="me-3" href="#">
                                                        <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar" width={65} height={65} />
                                                    </a>
                                                    <div className="flex-grow-1 flex-shrink-1">
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="mb-1">
                                                                    Simona Disa <span className="small">- 3 hours ago</span>
                                                                </p>

                                                                {cookies.token &&
                                                                    <div>
                                                                        <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                            <span className="small" >&#8617; reply</span>
                                                                        </a>
                                                                        <a href="#!" >
                                                                            <span className="small">&#9998; edit</span>
                                                                        </a>
                                                                    </div>
                                                                }

                                                            </div>
                                                            <p className="small mb-0">
                                                                letters, as opposed to using 'Content here, content here',
                                                                making it look like readable English.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}

                </div>
            </div>
        </>
    )
}