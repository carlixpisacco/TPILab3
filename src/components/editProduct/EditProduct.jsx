import './EditProduct.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import BasicHeader from '../basicHeader/BasicHeader';
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditProduct = () => {
    const location = useLocation();
    const { id, title, condition, size, description, price } = location.state.product;
    const { token } = useContext(AuthenticationContext);
    const [editingField, setEditingField] = useState(null);
    const [editedValues, setEditedValues] = useState({
        productTitle: title,
        productCondition: condition,
        productSize: size,
        productDescription: description,
        productPrice: parseFloat(price),
    });

    const textStyle = {
        marginLeft: '270px',
        marginRight:'40px',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues({
            ...editedValues,
            [name]: name === 'productPrice' ? parseFloat(value) : value,
        });
    };

    const handleSaveClick = () => {
        saveProduct();
        setEditingField(null);
    };

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleCancelClick = () => {
        setEditingField(null);
    };

    const saveProduct = async () => {
        // Objeto inicial con los campos que se enviarán
        const productToSave = {};

        // Comprobar cada campo editado y agregarlo al objeto productToSave
        if (editedValues.productTitle !== title) {
            productToSave.productTitle = editedValues.productTitle;
        }
        if (editedValues.productCondition !== condition) {
            productToSave.productCondition = editedValues.productCondition;
        }
        if (editedValues.productSize !== size) {
            productToSave.productSize = editedValues.productSize;
        }
        if (editedValues.productDescription !== description) {
            productToSave.productDescription = editedValues.productDescription;
        }
        if (editedValues.productPrice !== price) {
            productToSave.productPrice = editedValues.productPrice;
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

    return (
        <div className='edit-product-container'>
            <BasicHeader text="EDITA TU PRODUCTO" buttonText="Volver al menú principal" textStyle={textStyle} />
            <Card className="edit-product-card">
                <Card.Body className='edit-product-body'>
                    <Card.Text className="edit-text">
                        <strong className="edit-strong">Título:</strong>
                        {editingField === 'productTitle' ? (
                            <>
                                <Form.Control
                                    type="text"
                                    name="productTitle"
                                    value={editedValues.productTitle}
                                    onChange={handleInputChange}
                                    className="input-edit"
                                    autoFocus
                                />
                                <Button variant="success" size="sm" className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</Button>
                                <Button variant="danger" size="sm" className='btn-edit-x' onClick={handleCancelClick}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className='btn-edit-editar' onClick={() => handleEditClick('productTitle')}>Editar</Button>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong className="edit-strong">Condición:</strong>
                        {editingField === 'productCondition' ? (
                            <>
                                <Form.Select
                                    name="productCondition"
                                    value={editedValues.productCondition}
                                    onChange={handleInputChange}
                                    className="input-edit"
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                </Form.Select>
                                <Button variant="success" size="sm" className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</Button>
                                <Button variant="danger" size="sm" className='btn-edit-x' onClick={handleCancelClick}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className='btn-edit-editar' onClick={() => handleEditClick('productCondition')}>Editar</Button>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong className="edit-strong">Talle:</strong>
                        {editingField === 'productSize' ? (
                            <>
                                <Form.Select
                                    name="productSize"
                                    value={editedValues.productSize}
                                    onChange={handleInputChange}
                                    className="input-edit"
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </Form.Select>
                                <Button variant="success" size="sm" className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</Button>
                                <Button variant="danger" size="sm" className='btn-edit-x' onClick={handleCancelClick}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className='btn-edit-editar' onClick={() => handleEditClick('productSize')}>Editar</Button>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong className="edit-strong">Descripción:</strong>
                        {editingField === 'productDescription' ? (
                            <>
                                <Form.Control
                                    as="textarea"
                                    name="productDescription"
                                    value={editedValues.productDescription}
                                    onChange={handleInputChange}
                                    className="input-edit"
                                    autoFocus
                                    style={{ width: '200px', minHeight: '100px', borderRadius: '4px', marginLeft: "30px", marginTop: "10px", marginBottom: "15px" }}
                                />
                                <Button variant="success" size="sm" className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</Button>
                                <Button variant="danger" size="sm" className='btn-edit-x' onClick={handleCancelClick} >
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className='btn-edit-editar' onClick={() => handleEditClick('productDescription')}>Editar</Button>
                        )}
                    </Card.Text>

                    <Card.Text className="edit-text">
                        <strong className="edit-strong">Precio:</strong>
                        {editingField === 'productPrice' ? (
                            <>
                                <Form.Control
                                    type="number"
                                    name="productPrice"
                                    value={editedValues.productPrice}
                                    onChange={handleInputChange}
                                    className="input-edit"
                                    autoFocus
                                />
                                <Button variant="success" size="sm" className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</Button>
                                <Button variant="danger" size="sm" className='btn-edit-x' onClick={handleCancelClick} >
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className='btn-edit-editar' onClick={() => handleEditClick('productPrice')}>Editar</Button>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditProduct;