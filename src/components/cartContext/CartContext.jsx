import { createContext, useState } from 'react';
import PropTypes from "prop-types";
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    const addToCart = (product) => {
        setCart(prevCart => {
            // Verificar si el producto ya está en el carrito
            const isProductInCart = prevCart.some(item => item.id === product.id);
            if (isProductInCart) {
                // Si el producto ya está en el carrito, no hacer nada
                return prevCart;
            } else {
                // Si el producto no está en el carrito, agregarlo
                return [...prevCart, product]; 
            } 
        });
    };
    
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default CartContext;