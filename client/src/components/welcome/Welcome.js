import { useEffect, useState } from "react";

import { IntroduceSection } from "./WelcomeSection";
import { ProductTemplate } from "./ProductTemplate";
import * as productService from '../../services/catalog/productService'

export const WelcomeSection = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    productService.getAll()
          .then(result => setProducts(result.slice(result.length - 3)))
  }, [])

  return (
    <>
    <IntroduceSection />

      <h1 className="fw-light" style={{ textAlign: "center" , userSelect: 'none'}}>Some of the best products</h1>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {products.map(x => <ProductTemplate key={x._id} data={x} />)}

          </div>
        </div>
      </div>
    </>
  );
};
