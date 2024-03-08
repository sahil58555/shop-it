import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);
export const CartContextProvider= ({children})=>{

    const [currentCart,setCurrentCart] = useState(JSON.parse(window.localStorage.getItem("Cart"))||[]);

    useEffect(()=>{
        window.localStorage.setItem("Cart",JSON.stringify(currentCart));
    },[currentCart]);

    const addToCart=(newProduct)=>{
        let flag=false;
        setCurrentCart((prev)=>prev.map((product)=>{
            if(product.id===newProduct.id){
                product.quantity+=newProduct.quantity;
                flag=true;
            }
            return product;
        }));
        if(!flag){
            setCurrentCart((prev)=>[...prev,newProduct]);
        }
    }
    const updateQuantity = (product,quantity)=>{
        setCurrentCart((prev)=>prev.map((currentProduct)=>{
            if(currentProduct.id===product.id){
                currentProduct.quantity+=quantity;
            }
            return product;
        }));
    }

    const deleteProduct =(id)=>{
        setCurrentCart(prev=>prev.filter(currentProduct=>currentProduct.id!==id));
    }

    return(
        <CartContext.Provider value={{currentCart,quantity:currentCart.reduce((n,{quantity}) => n+quantity,0),addToCart,updateQuantity,deleteProduct}}>
            {children}
        </CartContext.Provider>
    );
}

