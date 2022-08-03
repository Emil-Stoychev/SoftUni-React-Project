import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as productService from '../../services/catalog/productService'
import { Product } from "./ProductTemplate";

export const CatalogSection = () => {
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState('')
    const [defaultProducts, setDefaultProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [type, setType] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result)
                setDefaultProducts(result)
            })
    }, [])

    const sortByPrice = () => {
        if (type) {
            setProducts(products.sort((a, b) => Number(b.price) - Number(a.price)))
            setType(!type)
        } else {
            setProducts(products.sort((a, b) => Number(a.price) - Number(b.price)))
            setType(!type)
        }
    }

    const sortByLikes = () => {
        if (type) {
            setProducts(products.sort((a, b) => Number(b.likes.length) - Number(a.likes.length)))
            setType(!type)
        } else {
            setProducts(products.sort((a, b) => Number(a.likes.length) - Number(b.likes.length)))
            setType(!type)
        }
    }

    const sortByName = (e) => {
        if (searchValue === '') {
            setErrors('')
            setProducts(defaultProducts)
        } else {
            let isEmpty = products.filter(x => x.title.toLowerCase().includes(searchValue.toLowerCase()))

            if (isEmpty.length === 0) {
                if (!errors.message) {
                    setErrors({ message: 'Search not found' })

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                setErrors('')
                setProducts(isEmpty)
            }
        }
    }

    return (
        <>
            {
                products.length > 0
                    ?
                    <>
                        <h1 style={{ textAlign: "center", margin: "2% 0 0 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>CATALOG</h1>
                        <button className="btn btn-primary" style={{ margin: "0 3%" }} onClick={sortByPrice}> Sort by price </button>
                        <button className="btn btn-primary" style={{ margin: "0 -2%" }} onClick={sortByLikes}> Sort by likes </button>

                        <div className="input-group" style={{ width: "75%", margin: '2% 0 -2% 3%' }}>
                            <div className="form-outline" >
                                <input type="search" id="form1" style={errors.message && {borderWidth: "1.2px", borderColor: "red"}} className="form-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                <label className="form-label" htmlFor="form1"></label>
                            </div>
                            <div style={{margin: "0 0 0 0.3%"}}>
                                <button type="submit" className="btn btn-primary" onClick={sortByName}>🔍 Search </button>
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-md-3 g-5" style={{ margin: "0 2% 12% 2%" }} >
                            {products.map(x => <Product key={x._id} data={x} />)}
                        </div>
                    </>
                    :
                    products.message
                        ?
                        <>
                            <h2 style={{ textAlign: "center", margin: "12% 0 0 0", userSelect: "none" , color: "navajowhite"}}>No products yet!</h2>
                            <button className="btn btn-primary" style={{ margin: "1% 47% 25%" }} onClick={() => navigate('/catalog/create')}>Create now</button>
                        </>
                        : <h2 style={{ textAlign: "center", margin: "12% 0 28% 0", color: "navajowhite", userSelect: "none" }}>Loading...</h2>
            }
        </>
    );
};
