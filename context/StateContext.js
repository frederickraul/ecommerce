import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';
import { Product } from '../components';

const Context = createContext();

export const StateContext = ( { children } ) =>{
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) =>{
        const checkProductInCar = cartItems.find((item) => item._id === product._id);
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCar){
            
            const updateCartItems = cartItems.map((cartProduct) =>{
                if(cartProduct._id === product._id) return {...cartProduct, quantity: cartProduct.quantity + quantity}
            })

            setcartItems(updateCartItems);
        }else{
            product.quantity = quantity;
            
            setcartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name}  added to the cart.`);
    } 

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);

        settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);

        setcartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems;
        if(value === 'inc'){
            newCartItems[index] = {...foundProduct,quantity: foundProduct.quantity + 1 }; 
            setcartItems(newCartItems);
            settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities+ 1);
        }else if(value ==='dec'){
            if(foundProduct.quantity > 1)
            {
                newCartItems[index] = {...foundProduct,quantity: foundProduct.quantity - 1 }; 
                setcartItems(newCartItems);
                settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                settotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        } 
    }

    const incQty = () => {
        setqty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setqty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }
    
    return(
       <Context.Provider  
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setcartItems,
            settotalPrice,
            settotalQuantities,
            setqty,
            incQty,
            decQty,
            onAdd,
            setshowCart,
            toggleCartItemQuantity,
            onRemove,
    }}>
    {children}
           
       </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context);