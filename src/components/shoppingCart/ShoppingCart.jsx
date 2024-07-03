import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import CartContext from '../cartContext/CartContext';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import BasicHeader from '../basicHeader/BasicHeader'
import './ShoppingCart.css';

const ShoppingCart = () => {

    const { cart, setCart, removeFromCart } = useContext(CartContext);
    const { token } = useContext(AuthenticationContext);
    

    const textStyle = {
        marginLeft: '300px',
        marginRight: '160px',
    };

    const updateStatus = async (id, token, estado) => {

        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ estadoComprado: !estado }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el producto');
            }

            const data = await response.json();
            console.log('Estado modificado con éxito', data);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const costoTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    const handleBuy = async () => {
        if (cart.length > 0) {
            const promises = cart.map(product => updateStatus(product.id, token, product.estadoComprado));
            await Promise.all(promises);
        }
        setCart([]);
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        localStorage.removeItem(`addedToCart_${productId}`); // Eliminar del localStorage
    };

    return (
        <>
            <BasicHeader text={"TU CARRITO"} buttonText={"Volver al menu principal"} textStyle={textStyle} />
            <div className='shoppingcart-container'>
                {(!cart || cart.length === 0) ? (
                    <Card className="shoppingcart-card">
                        <h2 className='shoppingcart-h21'>Productos elegidos</h2>
                        <Card.Body>
                            <p className='shoppingcart-empty'>El carrito está vacío</p>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="shopingcart-card">
                        <h2 className='shoppingcart-h2'>Productos elegidos</h2>
                        <Card.Body>
                            <ul className='shoppingcart-ul'>
                                {cart.map((product) => (
                                    <li key={product.id} className='shoppingcart-li'>
                                        <span className='shoppingcart-product-title'>{product.title.charAt(0).toUpperCase() + product.title.slice(1).toLowerCase()} - </span>  <span className='shoppingcart-product-price'>${product.price}</span>
                                        <Button className="btn-shoppingcart-eliminar" onClick={() => handleRemoveFromCart(product.id)}>Eliminar producto</Button>
                                    </li>
                                ))}
                            </ul>
                            <div className='shoppingcart-total-container '><p className='shoppingcart-total'>Total:</p> <span className='span-total'>${costoTotal()}</span></div>
                            <Button className="btn-shoppingcart-comprar" onClick={handleBuy}>Comprar</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    );
};

export default ShoppingCart;
