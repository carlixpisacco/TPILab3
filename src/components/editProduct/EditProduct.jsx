import './EditProduct.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import BasicHeader from '../basicHeader/BasicHeader';
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';

const EditProduct = () => {
    const location = useLocation();
    const { id, title, condition, size, description, price} = location.state.product;
    const {token} = useContext(AuthenticationContext);
    const [editingField, setEditingField] = useState(null);
    const [editedValues, setEditedValues] = useState({
        title,
        condition,
        size,
        description,
        price,
    });

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleInputChange = (e) => {
        setEditedValues({
            ...editedValues,
            [editingField]: e.target.value,
        });
    };

    const saveProduct = async () => {
        // Objeto inicial con los campos que se enviarán
        const productToSave = {};

        // Comprobar cada campo editado y agregarlo al objeto productToSave
        if (editedValues.title !== title) {
            productToSave.productTitle = editedValues.title;
        }
        if (editedValues.condition !== condition) {
            productToSave.productCondition = editedValues.condition;
        }
        if (editedValues.size !== size) {
            productToSave.productSize = editedValues.size;
        }
        if (editedValues.description !== description) {
            productToSave.productDescription = editedValues.description;
        }
        if (editedValues.price !== price) {
            productToSave.productPrice = editedValues.price;
        }

        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(productToSave),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el producto');
            }

            const data = await response.json();
            console.log('Producto guardado con éxito', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSaveClick = () => {
        saveProduct();
        setEditingField(null);
    };

    const textStyle = {
        marginLeft: '270px',
    };

    return (
        <div className='edit-product-container'>
            <BasicHeader text="EDITA TU PRODUCTO" buttonText="Volver al menú principal" textStyle={textStyle} />
            <Card className="edit-product-card">
                <Card.Body>

                    <Card.Text className="edit-text">
                        <strong>Título:</strong> {editingField === 'title' ? (
                            <>
                                <Form.Control
                                    type="text"
                                    value={editedValues.title}
                                    onChange={handleInputChange}
                                    className="w-50"
                                />
                                <Button variant="success" size="sm" onClick={handleSaveClick}>Guardar</Button>
                            </>
                        ) : (
                            <>
                                {editedValues.title}
                                <Button variant="primary" size="sm" onClick={() => handleEditClick('title')}>Editar</Button>
                            </>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong>Condición:</strong> {editingField === 'condition' ? (
                            <>
                                <Form.Select value={editedValues.condition} onChange={handleInputChange} className="w-50">
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                </Form.Select>
                                <Button variant="success" size="sm" onClick={handleSaveClick}>Guardar</Button>
                            </>
                        ) : (
                            <>
                                {editedValues.condition}
                                <Button variant="primary" size="sm" onClick={() => handleEditClick('condition')}>Editar</Button>
                            </>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong>Talle:</strong> {editingField === 'size' ? (
                            <>
                                <Form.Select value={editedValues.size} onChange={handleInputChange} className="w-50">
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </Form.Select>
                                <Button variant="success" size="sm" onClick={handleSaveClick}>Guardar</Button>
                            </>
                        ) : (
                            <>
                                {editedValues.size}
                                <Button variant="primary" size="sm" onClick={() => handleEditClick('size')}>Editar</Button>
                            </>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong>Descripción:</strong> {editingField === 'description' ? (
                            <>
                                <Form.Control
                                    type="text"
                                    value={editedValues.description}
                                    onChange={handleInputChange}
                                    className="w-50"
                                />
                                <Button variant="success" size="sm" onClick={handleSaveClick}>Guardar</Button>
                            </>
                        ) : (
                            <>
                                {editedValues.description}
                                <Button variant="primary" size="sm" onClick={() => handleEditClick('description')}>Editar</Button>
                            </>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong>Precio:</strong> {editingField === 'price' ? (
                            <>
                                <Form.Control
                                    type="number"
                                    value={editedValues.price}
                                    onChange={handleInputChange}
                                    className="w-50"
                                />
                                <Button variant="success" size="sm" onClick={handleSaveClick}>Guardar</Button>
                            </>
                        ) : (
                            <>
                                ${editedValues.price}
                                <Button variant="primary" size="sm" onClick={() => handleEditClick('price')}>Editar</Button>
                            </>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditProduct;