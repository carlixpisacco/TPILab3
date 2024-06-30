import BasicHeader from "../basicHeader/BasicHeader";
import './SellProduct.css';
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useState} from "react";
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';


const SellProduct = () => {
    const { user, token } = useContext(AuthenticationContext);

    const [formData, setFormData] = useState({
        productSeller: user.username,
        productTitle: '',
        product1Category: '',
        product2Category: '',
        productCondition: '',
        productSize: '',
        productDescription: '',
        productPrice: '',
        imageUrl: '',
        estado: true,
        estadoComprado:false,
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const textStyle = {
        marginLeft: '220px',
        marginRight:'10px',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'productPrice' ? parseFloat(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handlePublicar = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            console.log('Producto publicado:', result);

            // Limpiar el formulario después de publicar
            setFormData({
                productSeller: user.username,
                productTitle: '',
                product1Category: '',
                product2Category: '',
                productCondition: '',
                productSize: '',
                productDescription: '',
                productPrice: '',
                imageUrl: '',
                estado: true,
                estadoComprado:false,
            });

     
            setShowSuccessAlert(true);
            // Ocultar el alert después de 10 segundos
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 10000);

        } catch (error) {
            console.error('Error al publicar el producto:', error);
           
            setShowErrorAlert(true);
            // Ocultar el alert después de 10 segundos
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 10000);
        }
    };

    return (
        <div>
            <BasicHeader text={"PUBLICA TU PRODUCTO :)"} buttonText={"Volver al menu principal"} textStyle={textStyle} />
            <div className="contenedor-card">
                <Card className="mt-3 product-form">
                    <Card.Body>
                        <Card.Title className="card-title">Datos de tu producto</Card.Title>
                        <Form onSubmit={handlePublicar}>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Título del producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productTitle"
                                    id="productTitle"
                                    value={formData.productTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Categoría:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="product1Category"
                                    id="product1Category"
                                    value={formData.product1Category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="mujer">Mujer</option>
                                    <option value="hombre">Hombre</option>
                                    <option value="niño">Niño</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Subcategoría:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="product2Category"
                                    id="product2Category"
                                    value={formData.product2Category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="partes de arriba">Parte de Arriba</option>
                                    <option value="partes de abajo">Parte de Abajo</option>
                                    <option value="accesorios">Accesorio</option>
                                    <option value="calzados">Calzado</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Estado:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="productCondition"
                                    id="productCondition"
                                    value={formData.productCondition}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Talle:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="productSize"
                                    id="productSize"
                                    value={formData.productSize}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Descripción:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="productDescription"
                                    id="productDescription"
                                    rows="3"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Precio:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="productPrice"
                                    id="productPrice"
                                    value={formData.productPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">URL de la Imagen:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    id="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className="btn btn-publicar d-block mx-auto">
                                Publicar producto
                            </Button>
                        </Form>
                        {showSuccessAlert && (
                            <Alert variant="success" className="mt-3">
                                Producto agregado con éxito.
                            </Alert>
                        )}
                        {showErrorAlert && (
                            <Alert variant="danger" className="mt-3">
                                No se pudo agregar el producto, vuelva a intentarlo.
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default SellProduct;