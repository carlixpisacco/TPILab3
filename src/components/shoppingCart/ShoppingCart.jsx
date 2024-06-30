import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import CartContext from '../cartContext/CartContext';
import TokenContext from '../tokenContext/TokenContext';

const ShoppingCart = () => {
    const { cart, setCart } = useContext(CartContext);
    const { token } = useContext(TokenContext);


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

    const handleBuyClick = async () => {
        if (cart.length > 0) {
            const product = cart[0];
            await updateStatus(product.id, token , product.estadoComprado);
        }
    };

    if (!cart || cart.length === 0) {
        return <p>El carrito está vacío</p>;
    }

    return (
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
                <Button className="btn btn-primary ml-2" onClick={handleBuyClick}> Comprar </Button>
            </Card.Body>
        </Card>
    );
};

export default ShoppingCart;
