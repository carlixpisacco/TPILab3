import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import CartContext from '../cartContext/CartContext';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {

    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const { token } = useContext(AuthenticationContext);

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

    const remove = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
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

    const handleBackButtonClick = () => {
        navigate('/');
    }

    return (
        <>
        <header className="header">
                <div className="container-fluid header-container">
                    <div className="row align-items-center header-row">
                        <div className="col-auto">
                            <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>Volver al menu principal</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            {(!cart || cart.length === 0) ? (
                <Card className="p-3">
                    <h2>Productos</h2>
                    <Card.Body>
                        <p>El carrito está vacío</p>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="p-3">
                    <h2>Productos</h2>
                    <Card.Body>
                        <ul>
                            {cart.map((product, index) => (
                                <li key={product.id}>
                                    {product.title} - ${product.price}
                                    <Button className="btn btn-primary ml-2" onClick={() => remove(index)}>Eliminar producto</Button>
                                </li>
                            ))}
                        </ul>
                        <p>Total: ${costoTotal()}</p>
                        <Button className="btn btn-primary ml-2" onClick={handleBuy}>Comprar</Button>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

export default ShoppingCart;
