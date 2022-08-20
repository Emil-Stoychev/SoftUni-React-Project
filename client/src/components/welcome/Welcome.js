import { useEffect, useState } from "react";

import { IntroduceSection } from "./WelcomeSection";
import { ProductTemplate } from "./ProductTemplate";
import * as productService from '../../services/catalog/productService'

export const WelcomeSection = () => {
  const [products, setProducts] = useState([])

  window.onload = window.scrollTo(0, 0)

  useEffect(() => {
    productService.getAll()
      .then(result => setProducts(result.length > 0 ? result.slice(result.length - 3) : result))
  }, [])

  return (
    <>
      <IntroduceSection products={products} />

      {products.message || products.length === 0
        ? ''
        :
        <>
          <h1 className="fw-light" style={{ textAlign: "center", userSelect: 'none', fontFamily: "Copperplate Gothic", color: "navajowhite" }}>Some of the best products</h1>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-6">

                {products.map(x => <ProductTemplate key={x._id} data={x} />)}

              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};
