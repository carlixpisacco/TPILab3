import { createContext, useState } from 'react';
import PropTypes from "prop-types";
// Crear el contexto
export const CartContext = createContext();

// Crear el proveedor del contexto
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

    return (
        <CartContext.Provider value={{ cart, addToCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default CartContext;