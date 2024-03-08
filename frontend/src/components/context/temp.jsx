import React, { createContext, useState, useRef } from "react";

export const CartContext = createContext(null);
export const CartContextProvider= ({children})=>{
    // const [currentCart,setCurrentCart] = useState(JSON.parse(window.localStorage.getItem("Cart"))||[]);
    const currentCart = useRef(JSON.parse(window.localStorage.getItem("Cart"))||[]);
    const addToCart=(newProduct)=>{
        let flag=false;
        currentCart.current.forEach((product)=>{
            if(product.id===newProduct.id){
                product.quantity+=newProduct.quantity;
                flag=true;
            }
        });
        if(!flag)   currentCart.current=[...currentCart.current,newProduct];
        window.localStorage.setItem("Cart",JSON.stringify(currentCart.current));
    }
    const updateQuantity = (product,quantity)=>{
        currentCart.current.forEach((currentProduct)=>{
            if(currentProduct.id===product.id){
                currentProduct.quantity+=quantity;
            }
        });
        window.localStorage.setItem("Cart",currentCart.current);
    }

    const deleteProduct =(id)=>{
        currentCart.current=currentCart.current.filter(currentProduct=>currentProduct.id!==id);
        window.localStorage.setItem("Cart",JSON.stringify(currentCart));
    }

    return(
        <CartContext.Provider value={{currentCart:currentCart.current,addToCart,updateQuantity,deleteProduct}}>
            {children}
        </CartContext.Provider>
    );
}

