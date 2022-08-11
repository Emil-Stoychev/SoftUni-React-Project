import getCookie from "../../cookies/getCookie";
import * as productService from '../../../services/catalog/productService'
import * as authService from '../../../services/user/authService'
import { useNavigate } from "react-router-dom";
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect";

export const DeleteOrBuyAction = ({ onDeleteClickHandler, product, options, setProduct, setOptions, setCookies, setErrors, setUser, errors }) => {
    let navigate = useNavigate()

    const deleteHandler = () => {
        let cookie = getCookie('sessionStorage')

        productService.deleteProduct(product, cookie)
            .then(result => {
                if (result.message) {
                    if (result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                    } else {
                        setErrors(result.message)
                    }
                } else {
                    navigate('/ownProducts')
                }
            })
    }

    const buyHandler = () => {
        let cookie = getCookie('sessionStorage')

        productService.changeProductAuthor(cookie, product)
            .then(result => {
                if (result.message) {
                    if (result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, setUser, setErrors, errors)
                    } else {
                        setErrors(result.message)
                    }
                } else {
                    let sessionCookie = cookie
                    let updatedProduct = result

                    sessionCookie.money = Number(sessionCookie.money) - Number(updatedProduct.price)

                    setOptions({ type: '', action: false })
                    setCookies(sessionCookie)

                    setProduct(state => ({
                        ...state,
                        ['email']: sessionCookie.email,
                        ['author']: sessionCookie._id,
                        ['visible']: false
                    }))
                }
            })
    }

    return (
        <>
            <div className="table-wrapper">
                <div className="overlay">
                    <div className="backdrop" />
                    <div className="confirm-container">
                        <header className="headers">
                            <h2>Are you sure you want to {options.type === 'buy' ? 'buy' : 'delete'} this item?</h2>
                            <button id="action-save" className="btn btn-primary" type="submit" style={{ margin: "0 1% 0 0" }} onClick={options.type === 'buy' ? buyHandler : deleteHandler}> {options.type === 'buy' ? 'Buy' : 'Delete'} </button>
                            <button id="action-cancel" className="btn btn-primary" type="button" onClick={() => onDeleteClickHandler('', false)} > Cancel </button>
                        </header>
                    </div>
                </div>
            </div>
        </>
    )
}