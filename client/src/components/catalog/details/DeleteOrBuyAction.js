import getCookie from "../../cookies/getCookie";
import * as productService from '../../../services/catalog/productService'
import * as authService from '../../../services/user/authService'
import { useNavigate } from "react-router-dom";

export const DeleteOrBuyAction = ({ onDeleteClickHandler, product, options , setProduct, setOptions, setCookies}) => {
    let navigate = useNavigate()

    const deleteHandler = () => {
        let cookie = getCookie('sessionStorage')

        productService.deleteProduct(product._id, cookie)
            .then(result => {
                if (result.message) {
                    console.log(result);
                    navigate('/404')
                } else {
                    authService.deleteProductFromUser(cookie, product._id)
                        .then(result => {
                            if (result.message) {
                                console.log(result);
                                navigate('/404')
                            } else {
                                navigate('/ownProducts')
                            }
                        })
                }
            })
    }

    const buyHandler = () => {
        let cookie = getCookie('sessionStorage')

        productService.changeProductAuthor(cookie, product._id)
            .then(result => {
                if (result.message) {
                    console.log(result);
                } else {
                    let updatedProduct = result
                    authService.updateUserAfterBuy(cookie, product)
                        .then(result => {
                            if (result.message) {
                                console.log(result);
                            } else {
                                updatedProduct.email = cookie.email
                                cookie.money = Number(cookie.money) - Number(updatedProduct.price)

                                setCookies(cookie)
                                setOptions({ type: '', action: false })
                                setProduct(updatedProduct)
                            }
                        })
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