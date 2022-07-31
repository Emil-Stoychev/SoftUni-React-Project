import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { EditAndDelete } from './EditAndDelete'
import { DeleteOrBuyAction } from './DeleteOrBuyAction'

import * as productService from '../../../services/catalog/productService'
import * as authService from '../../../services/user/authService'
import getCookie from '../../cookies/getCookie'
import validateIsExist from '../../utils/isProductExistValidator'
import { LikeAction } from './LikeAction'
import { UnlikeAction } from './UnlikeAction'
import { TextError } from '../../error/TextError'

export const DetailsSection = ({setCookies}) => {
    const [product, setProduct] = useState([])
    const [user, setUser] = useState([])
    const [options, setOptions] = useState({ type: '', action: false })
    const [errors, setErrors] = useState('')
    const { productId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        productService.getById(productId)
            .then(result => {
                setProduct(result)
                validateIsExist(navigate, result)
                setUser(getCookie('sessionStorage'))
            })
    }, [])

    useEffect(() => {
        authService.getUserById(product?.author)
            .then(result => {
                setProduct(state => ({
                    ...state,
                    email: result.email
                }))
            })
    }, [user])

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
                if(result.message) {

                } else {
                    setProduct(state => ({
                        ...state,
                        ['visible']: !state.visible
                    }))
                }
            })
    }

    return (
        <>
            {product._id
                ?
                <>
                    <h1 style={{ textAlign: "center" , fontFamily: "Copperplate Gothic" , userSelect: "none"}}>DETAILS</h1>
                    <div className="card" style={{ width: "38rem", marginLeft: "35%" }}>
                        <img src={product?.imageUrl} alt={product?.title + ' image not found'} />
                        <div className="card-body">
                            <h2>{product?.title}</h2>
                            <p className="card-text">{product?.description}</p>
                            <p>Category: {product?.category}</p>
                            <p>Author: {product?.email}</p>
                            <p>Price: {product?.price}€</p>

                            {errors && <TextError message={errors} />}

                            {options.action
                                ? <DeleteOrBuyAction onDeleteClickHandler={onDeleteClickHandler} product={product} options={options} setProduct={setProduct} setOptions={setOptions} setCookies={setCookies}/>
                                : !user.message
                                    ? user?._id == product?.author
                                        ? <EditAndDelete onDeleteClickHandler={onDeleteClickHandler} product={product} changeStatusHandler={changeStatusHandler} />
                                        :
                                        <>
                                            {!product?.author != user?._id &&
                                                <button type="button" className="btn btn-primary" style={{ margin: "0 1% 0 0" }} onClick={() => onBuyClickHandler('buy', true)}> Buy </button>
                                            }

                                            {!product?.likes?.includes(user?._id)
                                                ? <LikeAction product={product} user={user} setProduct={setProduct} />
                                                : <UnlikeAction product={product} user={user} setProduct={setProduct} />
                                            }
                                            <button type="button" className="btn btn-outline-primary disabled" style={{ margin: "0 1% 0 0" }}> Likes: {product?.likes.length} </button>
                                        </>
                                    : ''
                            }
                        </div>
                    </div>
                </>
                : <h2 style={{ textAlign: "center", margin: "12% 0 0 0" }}>Loading...</h2>
            }
        </>
    )
}