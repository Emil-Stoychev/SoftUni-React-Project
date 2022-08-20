import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { EditAndDelete } from './EditAndDelete'
import { DeleteOrBuyAction } from './DeleteOrBuyAction'

import * as productService from '../../../services/catalog/productService'
import getCookie from '../../cookies/getCookie'
import validateIsExist from '../../utils/isProductExistValidator'
import { LikeAction } from './LikeAction'
import { UnlikeAction } from './UnlikeAction'
import { TextError } from '../../error/TextError'
import { AuthContext } from '../../../contexts/AuthContext'
import { CommentSection } from '../comments/Comment'
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect'
import { ChatMessageToUser } from '../messageToUser/ChatMessage'

export const DetailsSection = () => {
    const [product, setProduct] = useState([])
    const [user, setUser] = useState([])
    const [options, setOptions] = useState({ type: '', action: false })
    const [errors, setErrors] = useState('')
    const [imageCount, setImageCount] = useState(0)
    const { productId } = useParams()
    const navigate = useNavigate()

    window.onload = window.scrollTo(0, 0)

    let { cookies, setCookies } = useContext(AuthContext)

    useEffect(() => {
        productService.getById(productId)
            .then(result => {
                setProduct(result)
                validateIsExist(navigate, result)
                setUser(getCookie('sessionStorage'))
            })
    }, [])

    const onDeleteClickHandler = (type, action) => {
        setOptions(({
            type,
            action
        }))
    }

    const onBuyClickHandler = (type, action) => {
        if (user?.money < product.price) {
            if (user._id === product.author) {
                if (errors !== 'You cannot buy this item!') {
                    setErrors('You cannot buy this item!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            }
            if (errors !== 'Not enough money') {
                setErrors('Not enough money')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        } else {
            setOptions(({
                type,
                action
            }))
        }
    }

    const changeStatusHandler = () => {
        let cookie = getCookie('sessionStorage')

        productService.updateStatus(product._id, cookie)
            .then(result => {
                if (result.message) {
                    if (result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                    } else {
                        setErrors(result.message)
                    }
                } else {
                    setProduct(state => ({
                        ...state,
                        ['visible']: !state.visible
                    }))
                }
            })
    }

    const nextImage = () => {
        if (imageCount > product?.images.length - 2) {
            setImageCount(0)
        } else {
            setImageCount(state => state + 1)
        }
    }

    const previousImage = () => {
        if (imageCount < 1) {
            setImageCount(product?.images.length - 1)
        } else {
            setImageCount(state => state - 1)
        }
    }

    return (
        <>
            {product?._id
                ?
                <>
                    <h1 style={{ textAlign: "center", margin: "2%", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>DETAILS</h1>
                    <div className="row d-flex justify-content-center" style={{ margin: '0 0 2% 0' }}>
                        <div className="card col-md-8 col-lg-6">
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" >
                                <div className="carousel-inner">
                                    <div className='carousel-item active'>
                                        <img
                                            className="img-fluid rounded mx-auto d-block"
                                            src={product?.images[imageCount]?.dataString}
                                            style={{ marginLeft: 'auto', marginRight: "auto", height: "50vh" }}
                                        />
                                    </div>
                                </div>

                                {product?.images.length > 1 &&
                                    <>
                                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" onClick={previousImage} >
                                            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'black' }} />
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" onClick={nextImage}>
                                            <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'black' }} />
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </>
                                }
                            </div>

                            <div className="card-body">
                                <h2 style={{ fontFamily: "Copperplate Gothic" }}>{product?.title}</h2>
                                <p className="card-text" ><b>Description:</b> {product?.description}</p>
                                <p><b>Category:</b> {product?.category}</p>
                                <p><b>Author:</b> {product?.email}</p>
                                <p><b>Price:</b> {product?.price}€</p>

                                {errors && <TextError message={errors} />}

                                {options.action
                                    ? <DeleteOrBuyAction
                                        onDeleteClickHandler={onDeleteClickHandler}
                                        errors={errors}
                                        setUser={setUser}
                                        product={product}
                                        setErrors={setErrors}
                                        options={options}
                                        setProduct={setProduct}
                                        setOptions={setOptions}
                                        setCookies={setCookies}
                                    />
                                    : !user.message
                                        ? user?._id == product?.author
                                            ? <EditAndDelete
                                                onDeleteClickHandler={onDeleteClickHandler}
                                                product={product}
                                                changeStatusHandler={changeStatusHandler}
                                            />
                                            :
                                            <>
                                                {!product?.author != user?._id &&
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        style={{ margin: "0 1% 0 0" }}
                                                        onClick={() => onBuyClickHandler('buy', true)}
                                                    > Buy </button>
                                                }

                                                {!product?.likes?.includes(user?._id)
                                                    ? <LikeAction
                                                        product={product}
                                                        user={user}
                                                        setProduct={setProduct}
                                                        setCookies={setCookies}
                                                        setUser={setUser}
                                                        setErrors={setErrors}
                                                        errors={errors}
                                                    />
                                                    : <UnlikeAction
                                                        product={product}
                                                        user={user}
                                                        setProduct={setProduct}
                                                        setCookies={setCookies}
                                                        setUser={setUser}
                                                        setErrors={setErrors}
                                                        errors={errors}
                                                    />
                                                }
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary disabled"
                                                    style={{ margin: "0 1% 0 0" }}
                                                > Likes:
                                                    {product?.likes?.length}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary disabled"
                                                    style={{ margin: "0 1% 0 0" }}
                                                > Comments:
                                                    {product?.comments?.length}
                                                </button>
                                            </>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </>
                : <h2 style={{ textAlign: "center", margin: "12% 0 31.9% 0", color: "navajowhite" }}>Loading...</h2>
            }

            {cookies.token && product.author !== cookies._id &&
                <ChatMessageToUser
                    cookies={cookies}
                    setCookies={setCookies}
                    product={product}
                />
            }

            {product?._id &&
                <CommentSection
                    setProduct={setProduct}
                    product={product}
                    user={user}
                    cookies={cookies}
                    setCookies={setCookies}
                />}
        </>
    )
}