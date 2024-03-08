import React from "react";

export const CartCard = ({product,deleteProduct})=>{
    console.log(product);
    return(
        <>
          <div className="cart-item" data-key="product1">
            <div className="row">
              <div classNameName="col-4 col-lg-3">
                <img
                  src={product?.image.url}
                  alt="Laptop"
                  height="90"
                  width="115"
                />
              </div>
              <div className="col-5 col-lg-3">
                <a href={`/product/${product?.id}`}> {product?.name} </a>
              </div>
              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p id="card_item_price">{product?.price}</p>
              </div>
              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus"> - </span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={product?.quantity}
                    readonly
                  />
                  <span className="btn btn-primary plus"> + </span>
                </div>
              </div>
              <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>deleteProduct(product?.id)}></i>
              </div>
            </div>
          </div>
          <hr />
          </>
    );
}

