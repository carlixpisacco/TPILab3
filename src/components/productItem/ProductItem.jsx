import { Card, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import './ProductItem.css'
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';

const ProductItem = ({ id, seller, title, category1, category2, condition, size, description, price, image, estadoComprado, estado }) => { 
    const formattedProductTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();//pone primera letra en mayus y resto en minuscula.
    const formattedProductSeller = seller.charAt(0).toUpperCase() + seller.slice(1).toLowerCase();
    const { user,token} = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const [productDeleted, setProductDeleted] = useState(false);

    const handleClickDetails = () => {
        navigate(`/product/${id}`, {
            state: {
                product: {
                    seller,
                    title,
                    category1,
                    category2,
                    condition,
                    size,
                    description,
                    price,
                    image,
                },
            },
        });
    };

    const  handleClickEdit = () => {
        navigate(`/editProduct/${id}`, {
            state: {
                product: {
                    id,
                    title,
                    condition,
                    size,
                    description,
                    price,
                },
            },
        });
    };
  
    const updateProductStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ estado: !estado }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el producto');
            }
            setProductDeleted(true);
            const data = await response.json();
            console.log('estado modificado con éxito', data);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div>
            <div className="card-container">
                <Card className="product-card">
                    <Card.Body>
                        <Card.Title>{formattedProductSeller}</Card.Title>
                    </Card.Body>
                    {image !== "" ? (
                        <Card.Img
                            height={300}
                            variant="top"
                            src={image}
                            className="custom-image"
                        />
                    ) : (
                        <Alert variant="warning">
                            Producto sin imagen
                        </Alert>
                    )}

                    <Card.Body>
                        <Card.Subtitle>{formattedProductTitle}</Card.Subtitle>
                        <div className="mb-3">${price}</div>

                        {user && user.rol === "comprador" && (
                            <Button className="btn btn-comprar d-block mb-2 mx-auto">Comprar</Button>
                        )}

                        {!user && (
                            <Button className="btn btn-detalles d-block mx-auto" onClick={handleClickDetails}>Ver Detalles</Button>
                        )}

                        {user && user.rol === "vendedor" && (
                            <>
                                {!estadoComprado ? (
                                    <>
                                        {!productDeleted ? (
                                        <>
                                        <Button className="btn btn-editar d-block mb-2 mx-auto" onClick={handleClickEdit}>Editar</Button>
                                        <Button className="btn btn-eliminar d-block mx-auto" onClick={updateProductStatus}>Eliminar</Button>
                                        </>
                                        ) : (
                                            <div className="alert alert-warning d-block mx-auto" style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24', marginTop:"20px"}}>Eliminaste este producto</div>
                                        )}
                                    </>
                                ) : (
                                    <div className="alert alert-info d-block mx-auto">Vendiste este producto</div>
                                )}
                            </>
                        )}
                    
                        {user && user.rol === "admin" && (
                            <>
                                <Button className="btn btn-eliminar d-block mx-auto">Eliminar Producto</Button>
                                {estadoComprado && (
                                    <div className="alert alert-info d-block mx-auto">Este producto fue vendido</div>
                                )}
                                {!estado && (
                                    <div className="alert alert-info d-block mx-auto">Este producto fue eliminado por su vendedor</div>
                                )}
                            </>
                        )}
                    </Card.Body>

                </Card>
            </div>
        </div>
    )
}

ProductItem.propTypes = {
    id: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category1: PropTypes.string.isRequired,
    category2: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    estadoComprado: PropTypes.bool.isRequired,
    estado: PropTypes.bool.isRequired,
};

export default ProductItem

