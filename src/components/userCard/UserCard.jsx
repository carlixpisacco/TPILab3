import { useContext, useEffect, useState } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UserCard = () => { 

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { user, token } = useContext(AuthenticationContext)
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const userList = async () => {
      
      try {
        const response = await fetch('http://localhost:8000/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }

        const data = await response.json();
        setUsers(data); // Almacena la lista de usuarios en el estado local
      } catch (error) {
        console.error('Error:', error);
      }
    };

    userList();
  }, [token]); // Ejecutar solo una vez al cargar el componente


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
        body: JSON.stringify({ estado: (!user.estado) }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      handleCloseModal()
      const data = await response.json();
      console.log('estado modificado con éxito', data);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleBackButtonClick = () => {
    navigate("/");
};


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
      <div>
        <h2>Lista de Usuarios</h2>
      </div>

      {users
        .filter((_, index) => index !== 0)
        .map(user => (
          <Card key={user.id} className="mb-3">
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
              <Card.Text>Rol: {user.rol}</Card.Text>
              <Button variant="primary" className="btn-edit-eliminar" onClick={handleShowModal}>
                Eliminar mi usuario
              </Button>
            </Card.Body>

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
          </Card>
        ))}
    </>
  );
};

export default UserCard;
