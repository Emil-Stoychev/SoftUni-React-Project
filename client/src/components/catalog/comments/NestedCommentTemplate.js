import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Picker from 'emoji-picker-react'
import * as productService from '../../../services/catalog/productService'
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect"

const NestedCommentsTemplate = ({ data, cookies, setCookies, setProduct, product, parentId }) => {
    const [value, setValue] = useState('')
    const [action, setAction] = useState({ type: null, model: false, emoji: false })
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const changeAction = (type, model, emoji) => {
        setAction(({
            type,
            model,
            emoji
        }))

        if (type === 'edit') {
            setValue(data.title)
        }
    }

    const likeCommentHandler = () => {
        if (cookies._id != data.authorId) {
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
                                if (x._id == parentId) {
                                    if (result === 'like') {
                                        x.nestedComments = x.nestedComments.map(x => {
                                            if (x._id == data._id) {
                                                x.likes.push(cookies._id)
                                            }

                                            return x
                                        })

                                        return x
                                    } else {
                                        x.nestedComments = x.nestedComments.map(x => {
                                            if (x._id == data._id) {
                                                x.likes = x.likes.filter(x => x != cookies._id)
                                            }

                                            return x
                                        })

                                        return x
                                    }
                                } else {
                                    return x
                                }
                            })
                        }))
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

        productService.deleteNestedComment(data._id, cookies, parentId)
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
                            if (x._id.toString() == parentId) {
                                if (x.nestedComments.length > 0) {
                                    x.nestedComments = x.nestedComments.filter(x => x._id != data._id)

                                    return x
                                }
                            } else {
                                return x
                            }
                        })
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

            productService.editComment(value, data._id, cookies)
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
                                if (x._id === parentId) {
                                    x.nestedComments = x.nestedComments.map(x => {
                                        if (x._id == data._id) {
                                            x.title = result.title
                                            x.date = result.date

                                            return x
                                        }

                                        return x
                                    })

                                    return x
                                } else {
                                    return x
                                }
                            })
                        }))
                    }
                })
        }
    }

    return (
        <div style={{ borderStyle: 'inset', marginBottom: '2%' }}>
            <div className="d-flex flex-start mt-4" >
                <a className="me-3" href="#">
                    <img
                        className="rounded-circle shadow-1-strong"
                        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                        alt="avatar"
                        width={65}
                        height={65}
                    />
                </a>
                <div className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1"><b>{data?.email}</b> <span className="small">- {data?.date}</span></p>
                        </div>

                        {action.type === 'edit' && action.model
                            ?
                            <>
                                <div className="input-group" >
                                    <span className="input-group-text" />
                                    <textarea
                                        className="form-control"
                                        placeholder="Description"
                                        aria-label="With
                                    textarea"
                                        name="description"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}} />
                                </div>

                                <div>
                                    <button className="btn btn-primary" style={{ margin: '1%' }} onClick={clickSaveBtn}>Save</button>
                                    <button className="btn btn-primary" style={{ margin: '1%' }} onClick={() => changeAction(null, false, false)}>Cancel</button>
                                    <button
                                        className='btn btn-primary'
                                        style={{ margin: '1%' }}
                                        onClick={() => setAction({ type: 'edit', model: true, emoji: true })}
                                    >Emoji
                                    </button>

                                    <div>

                                        {action.emoji && action.model &&
                                            <div onClick={() => setAction({ type: 'edit', model: true, emoji: false })}>
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
                                                    <p className="small mb-0">{data?.title}</p>
                                                    <h6>Are you sure you want to delete this comment?</h6>
                                                    <button
                                                        id="action-save"
                                                        className="btn btn-primary"
                                                        type="submit"
                                                        style={{ margin: "1%" }}
                                                        onClick={deleteCommentHandler}
                                                    > Yes
                                                    </button>
                                                    <button
                                                        id="action-cancel"
                                                        className="btn btn-primary"
                                                        type="button"
                                                        style={{ margin: "1%" }}
                                                        onClick={() => changeAction(null, false, false)}
                                                    > No
                                                    </button>
                                                </header>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <p className="small mb-0">{data?.title}</p>
                        }

                    </div>
                </div>
            </div>

            {!action.model && cookies?.token &&
                <div style={{ margin: "1%" }}>

                    {cookies?._id === data?.authorId
                        ?
                        <>
                            <a href="#!" style={{ margin: "0 0 3% 10%", textDecoration: 'none' }}>
                                <span className="extra-large" onClick={() => changeAction('edit', true, false)}>&#9998;</span>
                            </a>
                            <a href="#!" style={{ margin: "0 0 3% 2%", textDecoration: 'none' }}>
                                <span className="extra-large" onClick={() => changeAction('delete', true, false)}>&#10060;</span>
                            </a>
                            <a href="#!" style={{ margin: "0 0 3% 2%", textDecoration: 'none' }}>
                                <span className="extra-large" >&#x1F44D; {data.likes.length || 0}</span>
                            </a>
                        </>
                        :
                        <>
                            <a href="#!" style={{ margin: "0 0 3% 10%", textDecoration: 'none' }}>
                                <span className="extra-large" onClick={likeCommentHandler}>&#x1F44D; {data?.likes?.length || 0}</span>
                            </a>
                        </>
                    }
                </div>
            }
        </div >
    )
}

export default NestedCommentsTemplate