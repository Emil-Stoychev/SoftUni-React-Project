import { useState } from "react"
import Picker from 'emoji-picker-react'
import * as productService from '../../../services/catalog/productService'
import { useNavigate } from "react-router-dom"
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect"
import { TextError } from "../../error/TextError"
import NestedCommentsTemplate from "./NestedCommentTemplate"

export const CommentTemplateSection = ({ cookies, data, setCookies, setProduct, product }) => {
    const [value, setValue] = useState('')
    const [action, setAction] = useState({ type: null, model: false, emoji: false })
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const onEmojiClick = (event, emojiObject) => {
        setValue(state => state + emojiObject.emoji)
    };

    const changeAction = (type, model, emoji) => {
        setAction(({
            type,
            model,
            emoji
        }))

        if (type === 'edit') {
            setValue(data.title)
        }

        if (type === 'reply') {
            setValue('')
        }

    }

    const replyToComment = () => {
        if (value.length === 0 || !value || value.trim() === '') {
            if (!errors) {
                setErrors('Cannot add empty comment!')

                setValue('')
                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            setAction(({
                type: null,
                model: false,
                emoji: false
            }))

            productService.addReplyComment(data._id, cookies, value)
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
                                if (x._id == data._id) {
                                    x.nestedComments.push(result)

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
                                if (x._id == data._id) {
                                    if (result === 'like') {
                                        x.likes.push(cookies._id)
                                    } else {
                                        x.likes = x.likes.filter(x => x != cookies._id)
                                    }

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
                                if (x._id === data._id) {
                                    x.title = result.title
                                    x.date = result.date

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
        <>
            <div className="d-flex flex-start" style={{ borderStyle: 'outset', marginBottom: '2%' }}>
                <img className="rounded-circle shadow-1d-strong me-3"
                    src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    alt="avatar"
                    width={65}
                    height={65}
                />
                <div className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1"> <b>{data?.email?.split('@')[0]}</b> <span className="small">- {data?.date}</span></p>
                        </div>

                        {action.type === 'edit' && action.model
                            ?
                            <>
                                <div className="input-group" >
                                    <span className="input-group-text" />
                                    <textarea className="form-control"
                                        placeholder="Description"
                                        aria-label="With textarea"
                                        name="description"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}}
                                    />
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
                                            <div onClick={() => changeAction('edit', true, false)}>
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
                                                    <button id="action-save"
                                                        className="btn btn-primary"
                                                        type="submit"
                                                        style={{ margin: "1%" }}
                                                        onClick={deleteCommentHandler}
                                                    > Yes </button>
                                                    <button id="action-cancel"
                                                        className="btn btn-primary"
                                                        type="button"
                                                        style={{ margin: "1%" }}
                                                        onClick={() => changeAction(null, false, false)}
                                                    > No </button>
                                                </header>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <p className="small mb-0">{data?.title}</p>
                        }
                    </div>


                    <div style={{ margin: "1%" }} >
                        {!action.model && cookies?._id == data?.authorId
                            ?
                            <>
                                <a href="#!" style={{ textDecoration: 'none' }}>
                                    <span className="extra-large" onClick={() => changeAction('edit', true, false)}>&#9998;</span>
                                </a>
                                <a href="#!" style={{ margin: "0 0 3% 2%", textDecoration: 'none' }}>
                                    <span className="extra-large" onClick={() => changeAction('delete', true, false)}>&#10060;</span>
                                </a>
                                <a href="#!" style={{ margin: "0 0 0 2%", textDecoration: 'none' }}>
                                    <span className="extra-large" onClick={() => changeAction('reply', true, false)}>&#8617; reply</span>
                                </a>
                            </>
                            : action.model
                                ? ''
                                : cookies._id &&
                                <>
                                    <a href="#!" style={{ margin: "0 0 3% 0", textDecoration: 'none' }}>
                                        <span className="extra-large" onClick={() => changeAction('reply', true, false)}>&#8617; reply</span>
                                    </a>
                                </>
                        }

                        {!action.model &&
                            <a href="#!" style={{ margin: "0 0 3% 2%", textDecoration: 'none' }}>
                                <span className="extra-large" onClick={likeCommentHandler} >&#x1F44D; {data?.likes?.length || 0}</span>
                            </a>
                        }
                    </div>

                    {action.model && action.type === 'reply' &&
                        <div className="form-outline" >

                            {errors.includes('Invalid access') && <TextError message={errors} />}

                            <input
                                type="search"
                                id="form1"
                                name='comment'
                                className="form-control"
                                placeholder="Type a comment..."
                                onClick={() => changeAction('reply', true, false)}
                                value={value} onChange={(e) => setValue(e.target.value)}
                                style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {}}
                            />
                            <label className="form-label" htmlFor="form1"></label>
                            <button id="action-save" className="btn btn-primary" type="submit" style={{ margin: "1%" }} onClick={replyToComment} > Add </button>
                            <button
                                id="action-cancel"
                                className="btn btn-primary"
                                type="button"
                                style={{ margin: "1%" }}
                                onClick={() => changeAction(null, false, false)}
                            > Cancel
                            </button>
                            <button
                                className='btn btn-primary'
                                style={{ margin: '1%' }}
                                onClick={() => setAction({ type: 'reply', model: true, emoji: true })}
                            >Emoji
                            </button>

                            {action.emoji && action.model &&
                                <div onClick={() => setAction({ type: 'reply', model: true, emoji: false })}>
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div>
                            }
                        </div>

                    }

                    {/* NESTED COMMENTS */}
                    {data?.nestedComments?.length > 0 &&
                        data?.nestedComments?.map(x =>
                            <NestedCommentsTemplate
                                key={x._id}
                                data={x}
                                cookies={cookies}
                                setCookies={setCookies}
                                setProduct={setProduct}
                                product={product}
                                parentId={data._id}
                            />)}

                </div>
            </div>
        </>
    )
}