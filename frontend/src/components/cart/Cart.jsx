import React, { useContext, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { CartCard } from "./CartCard";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  const {currentCart,deleteProduct} = useContext(CartContext);
  const quantity = currentCart.reduce((n,{quantity})=>n+quantity,0);
  const price = currentCart.reduce((n,{quantity,price})=>n+quantity*price,0).toFixed(2);
  console.log("Cart Status",currentCart);
  console.log("aaaaaaaa");
  return (
    <>
      <MetaData http-equiv="Content-Security-Policy"   title={"Buy Best Products Online"} />
      <div className="row d-flex justify-content-between">
      <div className="col-12 col-lg-8">
          <h2 class="mt-5">Your Cart: <b>{currentCart.length} items</b></h2>
          <hr />
          <div>
            {currentCart?.map((product) => (
              <CartCard product={product} deleteProduct={deleteProduct} />
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal: <span className="order-summary-values">{quantity} (Units)</span></p>
            <p>Est. total: <span className="order-summary-values">${price}</span></p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary w-100">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
