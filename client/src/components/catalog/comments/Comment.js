import Picker from 'emoji-picker-react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import * as productService from '../../../services/catalog/productService'
import { TextError } from '../../error/TextError';
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect';

export const CommentSection = ({ product, user }) => {
    const [value, setValue] = useState('')
    const [errors, setErrors] = useState('')
    const [action, setAction] = useState(false)
    const navigate = useNavigate()
    const {setCookies} = useContext(AuthContext)

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
                    if(result.message) {
                        if(result.message.startsWith('Invalid access')) {
                            isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                        } else {
                            setErrors(result)
                        }
                    } else {
                        console.log(result);
                    }
                })
        }
    }

    return (
        <div className="row d-flex justify-content-center" style={{ margin: "0 0 2% 0" }} >
            <div className="col-md-8 col-lg-6" >
                <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }} >
                    <div className="card-body p-4" >
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
                                    style={errors.includes('Cannot add empty comment!') ? { borderWidth: "1.2px", borderColor: "red" } : {} }
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

                        <div className="row" onClick={() => setAction(false)}>
                            <div className="col">
                                <div className="d-flex flex-start">
                                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width={65} height={65} />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    Maria Smantha <span className="small">- 2 hours ago</span>
                                                </p>
                                                <div>
                                                    <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                        <span className="small" >&#8617; reply</span>
                                                    </a>
                                                    <a href="#!" >
                                                        <span className="small">&#9998; edit</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="small mb-0">
                                                It is a long established fact that a reader will be distracted by
                                                the readable content of a page.
                                            </p>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar" width={65} height={65} />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Simona Disa <span className="small">- 3 hours ago</span>
                                                        </p>
                                                        <div>
                                                            <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                <span className="small" >&#8617; reply</span>
                                                            </a>
                                                            <a href="#!" >
                                                                <span className="small">&#9998; edit</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="small mb-0">
                                                        letters, as opposed to using 'Content here, content here',
                                                        making it look like readable English.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width={65} height={65} />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            John Smith <span className="small">- 4 hours ago</span>
                                                        </p>
                                                        <div>
                                                            <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                <span className="small" >&#8617; reply</span>
                                                            </a>
                                                            <a href="#!" >
                                                                <span className="small">&#9998; edit</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="small mb-0">
                                                        the majority have suffered alteration in some form, by injected
                                                        humour, or randomised words.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-start mt-4">
                                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp" alt="avatar" width={65} height={65} />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    Natalie Smith <span className="small">- 2 hours ago</span>
                                                </p>
                                                <div>
                                                    <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                        <span className="small" >&#8617; reply</span>
                                                    </a>
                                                    <a href="#!">
                                                        <span className="small">&#9998; edit</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="small mb-0">
                                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                                                below for those interested. Sections 1.10.32 and 1.10.33.
                                            </p>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width={65} height={65} />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Lisa Cudrow <span className="small">- 4 hours ago</span>
                                                        </p>
                                                        <div>
                                                            <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                <span className="small" >&#8617; reply</span>
                                                            </a>
                                                            <a href="#!" >
                                                                <span className="small">&#9998; edit</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                                                        scelerisque ante sollicitudin commodo. Cras purus odio,
                                                        vestibulum in vulputate at, tempus viverra turpis.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(29).webp" alt="avatar" width={65} height={65} />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Maggie McLoan <span className="small">- 5 hours ago</span>
                                                        </p>
                                                        <div>
                                                            <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                <span className="small" >&#8617; reply</span>
                                                            </a>
                                                            <a href="#!" >
                                                                <span className="small">&#9998; edit</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="small mb-0">
                                                        a Latin professor at Hampden-Sydney College in Virginia, looked
                                                        up one of the more obscure Latin words, consectetur
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width={65} height={65} />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            John Smith <span className="small">- 6 hours ago</span>
                                                        </p>
                                                        <div>
                                                            <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                <span className="small" >&#8617; reply</span>
                                                            </a>
                                                            <a href="#!" >
                                                                <span className="small">&#9998; edit</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Autem, totam debitis suscipit saepe sapiente magnam officiis
                                                        quaerat necessitatibus odio assumenda, perferendis quae iusto
                                                        labore laboriosam minima numquam impedit quam dolorem!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}