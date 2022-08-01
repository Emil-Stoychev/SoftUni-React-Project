import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../../services/user/authService'
import getCookie from "../../cookies/getCookie";
import { Product } from "../ProductTemplate";

export const OwnProducts = () => {
    const [products, setProducts] = useState([])
    const cookie = getCookie('sessionStorage')
    const navigate = useNavigate()

    useEffect(() => {
        authService.getOwnProducts(cookie?._id)
            .then(result => setProducts(result))
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "2% 0 0 0" , fontFamily: "Copperplate Gothic" , userSelect: "none" , color: "navajowhite" }}>My products</h1>

            {products.length > 0
                ?
                <div className="row row-cols-1 row-cols-md-3 g-5" style={{ margin: "0 2% 12% 2%" }} >
                    {products.map(x => <Product key={x._id} data={x} />)}
                </div>
                :
                products.message
                    ?
                    <>
                        <h2 style={{ textAlign: "center", margin: "12% 0 0 0" , userSelect: "none" }}>You don't have products yet!</h2>
                        <button className="btn btn-primary" style={{ margin: "1% 47% 20%" }} onClick={() => navigate('/catalog/create')}>Create now</button>
                    </>
                    : <h2 style={{ textAlign: "center", margin: "12% 0 0 0" , userSelect: "none" }}>Loading...</h2>
            }
        </>
    );
};
