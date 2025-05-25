import React from "react";

function ProductsContainer({children})
{
    return (
        <div className="productContainer">
              {children}
        </div>
    )
}

export default ProductsContainer;