import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as productService from '../../services/catalog/productService'
import { Product } from "./ProductTemplate";

export const CatalogSection = () => {
    const [products, setProducts] = useState([])
    const [defaultProducts, setDefaultProducts] = useState([])
    const [error, setError] = useState('')
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
            setError('')
            setProducts(defaultProducts)
        } else {
            let isEmpty = products.filter(x => x.title.toLowerCase().includes(searchValue.toLowerCase()))

            if (isEmpty.length === 0) {
                setError({ message: 'Search not found' })

                setTimeout(() => {
                    setError('')
                }, 2000);
            } else {
                setError('')
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
                        <h1 style={{ textAlign: "center", margin: "2% 0 0 0" }}>CATALOG PAGE</h1>
                        <button className="btn btn-primary" style={{ margin: "0 3.2%" }} onClick={sortByPrice}> Sort by price </button>
                        <button className="btn btn-primary" style={{ margin: "0 -2.5%" }} onClick={sortByLikes}> Sort by likes </button>

                        <div className="input-group" style={{ margin: '-1.9% 0 0 18%' }}>
                            <div className="form-outline">
                                <input type="search" id="form1" className="form-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                <label className="form-label" htmlFor="form1"></label>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={sortByName}> Search </button>
                            </div>
                        </div>

                        {error.message ? <h4 style={{ textAlign: "center", margin: "0 50% 0 0", color: "red" }}>Search not found!</h4> : ''}

                        <div className="row row-cols-1 row-cols-md-3 g-5" style={{ margin: "0 2% 0 2%" }} >
                            {products.map(x => <Product key={x._id} data={x} />)}
                        </div>
                    </>
                    :
                    products.message || products.length === 0
                        ?
                        <>
                            <h2 style={{ textAlign: "center", margin: "12% 0 0 0" }}>No products yet!</h2>
                            <button className="btn btn-primary" style={{ margin: "1% 47%" }} onClick={() => navigate('/catalog/create')}>Create now</button>
                        </>
                        : <h2 style={{ textAlign: "center", margin: "12% 0 0 0" }}>Loading...</h2>
            }
        </>

    );
};
