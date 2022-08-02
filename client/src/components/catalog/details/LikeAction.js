import { useNavigate } from 'react-router-dom'
import * as productService from '../../../services/catalog/productService'
import * as authService from '../../../services/user/authService'
import { likeErrorRedirect } from '../../utils/errorRedirect'

export const LikeAction = ({ product, user, setProduct, setCookies, setUser, setErrors, errors }) => {
    let navigate = useNavigate()

    const onClickLikeHandler = () => {
        if (product.likes.includes(user._id)) {
            return console.log('You already like this item!');
        }

        productService.addLike(product._id, user)
            .then(result => {
                if (result.message) {
                    likeErrorRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                } else {
                    authService.addLikeToUser(user, product._id)
                        .then(result => {
                            if (result.message) {
                                likeErrorRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                            } else {
                                setProduct(state => ({
                                    ...state,
                                    ["likes"]: [...state.likes, result._id],
                                }))
                            }
                        })
                }
            })
    }

    return (<button type="button" className="btn btn-primary" style={{ margin: "0 1% 0 0" }} onClick={onClickLikeHandler} > Like </button>
    )
}