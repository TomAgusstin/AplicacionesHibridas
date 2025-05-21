import React from "react";

function ProductsContainer(props)
{
    return (
        <div className="productContainer">
              {props.children}
        </div>
    )
}

export default ProductsContainer;