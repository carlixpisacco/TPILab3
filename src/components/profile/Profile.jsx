import { Card, Button, FormControl, FormLabel, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BasicHeader from '../basicHeader/BasicHeader';
import './Profile.css';
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import useProducts from '../useProducts/useProducts'
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { user, token, handleLogout, updateUser } = useContext(AuthenticationContext);
    const { products } = useProducts();
    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username || '');
    const [tempUsername, setTempUsername] = useState(user.username || '');
    const [showModal, setShowModal] = useState(false);
    const productsToUpdate = products.filter(product => product.productSeller === user.username);
    const [showAlert, setShowAlert] = useState(false);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSaveUsername = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username: newUsername }), // Cambiado a newUsername
            });

            if (!response.ok) {
                throw new Error('Error al guardar el username');
            }

            const updatedUser = { ...user, username: newUsername };
            updateUser(updatedUser);
        

            // Actualizar cada producto en la base de datos mediante PATCH
            productsToUpdate.forEach(async (product) => {
                try {
                    const updateProductResponse = await fetch(`http://localhost:8000/products/${product.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ productSeller: newUsername }), // Cambiado a newUsername
                    });

                    if (!updateProductResponse.ok) {
                        throw new Error(`Error al actualizar el username del producto ${product.id}`);
                    }

                    const updatedProduct = await updateProductResponse.json();
                    console.log('Username del producto actualizado con éxito:', updatedProduct);

                } catch (error) {
                    console.error(`Error al actualizar el username del producto ${product.id}:`, error);
                    // Manejo de errores si es necesario
                }
            });
            setTempUsername(newUsername);
            setEditingUsername(false); 
            setShowAlert(true); 
            setNewUsername(''); 

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUsername(false);
        setNewUsername(tempUsername);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ estado: !(user.estado) }),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
            handleCloseModal();
            handleLogout();
            navigate("/");
            const data = await response.json();
            console.log('estado modificado con éxito', data);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <BasicHeader text={"BIENVENIDO A TU PERFIL"} buttonText={"Volver al menú principal"} textStyle={{ marginLeft: '220px', marginRight: '50px' }} />

            <div className='profile-container'>
                <Card className="profile-card">
                    <Card.Body className='profile-card-body'>
                        <Card.Title className='edit-profile-title'>Edita tu perfil</Card.Title>

                        <Card.Text>
                            <span className='edit-profile-email'>Email:</span> <span className='profile-email-data'>{user.email}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className='edit-profile-username'>Username:</span > <span className='profile-username-data'>{tempUsername}</span>
                        </Card.Text>

                        {showAlert && (
                            <Alert variant="success" onClose={() => setShowAlert(false)} style={{ width: '300px', marginLeft: '150px' }}>
                                Username guardado con éxito
                            </Alert>
                        )}

                        {/* Campo de edición para Username */}
                        {editingUsername ? (
                            <Card.Text className="edit-text">
                                <FormLabel className="edit-new-username">Nuevo Username:</FormLabel>
                                <FormControl
                                    type="text"
                                    value={newUsername}
                                    onChange={handleUsernameChange}
                                    className="input-edit"
                                    autoFocus
                                />
                                <Button variant="success" className='btn-edit-guardar' onClick={handleSaveUsername}>
                                    <FontAwesomeIcon icon={faSave} />
                                </Button>
                                <Button variant="danger" className='btn-edit-x' onClick={handleCancelEdit}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </Card.Text>
                        ) : (
                            <div className='div-btn-editar'>
                                <Button variant="primary" className='btn-edit-editar' onClick={() => setEditingUsername(true)}>
                                    Editar Username
                                </Button>
                                <>
                                    <Button variant="primary" className='btn-edit-eliminar' onClick={handleShowModal}>
                                        Eliminar mi usuario
                                    </Button>

                                    <Modal show={showModal} onHide={handleCloseModal}>
                                        <Modal.Body>
                                            ¿Estás seguro de que deseas eliminar tu usuario?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseModal}>
                                                Cancelar
                                            </Button>
                                            <Button variant="danger" onClick={handleDeleteUser}>
                                                Eliminar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Profile;