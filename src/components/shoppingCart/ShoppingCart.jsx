import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ShoppingCart = () => {
    const [cart, setCart] = useState([{ name: 'Producto de prueba', price: 100 }]);

    const addCart = () => {
        const newProduct = { name: 'Nuevo producto', price: 50 };
        setCart([...cart, newProduct]);
    };

    const remove = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const costoTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    return (
        <Card className="p-3">
            <h2>Productos</h2>
            <Card.Body>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            {product.name} - ${product.price}
                            <Button className="btn btn-primary ml-2" onClick={() => remove(index)}>Eliminar producto</Button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${costoTotal()}</p>
                <Button className="btn btn-success mt-3" onClick={addCart}>Agregar producto</Button>
            </Card.Body>
        </Card>
    );
};

export default ShoppingCart;
