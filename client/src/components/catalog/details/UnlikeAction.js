import { useNavigate } from 'react-router-dom'
import * as productService from '../../../services/catalog/productService'
import * as authService from '../../../services/user/authService'
import { isInvalidTokenThenRedirect } from '../../utils/errorRedirect'

export const UnlikeAction = ({ product, user, setProduct, setCookies, setUser, setErrors, errors }) => {
    let navigate = useNavigate()

    const onClickUnlikeHandler = () => {
        if (!product.likes.includes(user._id)) {
            return console.log('You cannot like this item again!');
        }

        productService.removeLike(product._id, user)
            .then(result => {
                if (result.message) {
                    isInvalidTokenThenRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                } else {
                    setProduct(state => ({
                        ...state,
                        ["likes"]: state.likes.filter(x => x != user._id),
                    }))
                }
            })
    }

    return (
        <button type="button" className="btn btn-primary" style={{ margin: "0 1% 0 0" }} onClick={onClickUnlikeHandler}> Unlike </button>
    )
}