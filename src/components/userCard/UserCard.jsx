import { useContext, useEffect, useState } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { Button, Card, Modal, Alert } from 'react-bootstrap';
import './UserCard.css';

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthenticationContext);
  const [showModal, setShowModal] = useState(false);
  const [userIdToModify, setUserIdToModify] = useState(null); // Estado para almacenar el ID del usuario a modificar

  useEffect(() => {
    const fetchUsers = async () => {
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
        const filteredUsers = data.filter(user => user.id !== 1); // Filtrar usuarios excluyendo el usuario con id 1
        setUsers(filteredUsers); // Almacena la lista filtrada de usuarios en el estado local
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleShowModal = (userId) => {
    setUserIdToModify(userId); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserIdToModify(null); // Restablece el ID del usuario a modificar
  };

  const handleModifyUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userIdToModify}`, {
        method: 'PATCH', // Método PATCH para cambiar el estado del usuario
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: !users.find(u => u.id === userIdToModify).estado }), // Cambia el estado actual
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el estado del usuario');
      }

      // Actualiza la lista de usuarios después de cambiar el estado
      const updatedUsers = users.map(u => {
        if (u.id === userIdToModify) {
          return { ...u, estado: !u.estado };
        }
        return u;
      });

      setUsers(updatedUsers);
      console.log('Estado del usuario cambiado con éxito');

      handleCloseModal(); // Cierra el modal después de modificar el usuario

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='usercard-container row row-cols-1 row-cols-md-4 g-0'>
      {users.map(user => (
        <div key={user.id} className="col mb-4-custom d-flex justify-content-center">
          <Card className="h-100 usercard-admin">
            <Card.Body className='usercard-body-admin'>
              <Card.Title className='title-card-admin'>{user.username}</Card.Title>
              <Card.Text className='text-card-admin'><strong>Email:</strong> {user.email}</Card.Text>
              <Card.Text className='text-card-admin'><strong>Rol:</strong> {user.rol}</Card.Text>
              <Button variant="primary" className="btn-edit-eliminar" onClick={() => handleShowModal(user.id)}>
                {user.estado ? 'Dar de baja usuario' : 'Activar usuario'}
              </Button>
              {/* Alerta para mostrar cuando el usuario está dado de baja */}
              {!user.estado && (
                <Alert variant="info">
                  Este usuario está dado de baja del sistema.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}

      {/* Modal para confirmar modificación de usuario */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          ¿Estás seguro de que deseas {users.find(u => u.id === userIdToModify)?.estado ? 'dar de baja' : 'activar'} el usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleModifyUser}>
            {users.find(u => u.id === userIdToModify)?.estado ? 'Dar de baja' : 'Activar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCard;