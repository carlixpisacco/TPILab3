import { useContext, useEffect, useState } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { Button, Card, Modal, Alert, FormLabel, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './UserCard.css';
import useProducts from '../useProducts/useProducts'

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthenticationContext);
  const { products } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [tempUsernameMap, setTempUsernameMap] = useState({}); // Estado para almacenar temporalmente los usernames editados
  const [editingUserId, setEditingUserId] = useState(null); // Estado para almacenar el ID del usuario en edición 
  const productsToUpdate = products.filter(product => product.productSeller === tempUsernameMap[editingUserId]);
  const [newUsername, setNewUsername] = useState(''); // Estado para almacenar el nuevo username


  useEffect(() => {
    // Inicializa tempUsernameMap con los usernames actuales de los usuarios
    const initialTempUsernameMap = {};
    users.forEach(user => {
      initialTempUsernameMap[user.id] = user.username;
    });
    setTempUsernameMap(initialTempUsernameMap);
  }, [users]);

  const handleEditUsername = (userId) => {
    setEditingUserId(userId);
    setNewUsername(tempUsernameMap[userId]); // Inicializa el nuevo username con el valor actual
  };

  const handleUsernameChange = (e) => {
    // Actualiza el nuevo username en el estado
    setNewUsername(e.target.value);
  };

  const handleSaveUsername = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }), // Enviar el nuevo username al backend
      });

      if (!response.ok) {
        throw new Error('Error al guardar el username');
      }

      // actualizar el estado local del usuario con el nuevo username
      const updatedUser = { ...users.find(u => u.id === userId), username: newUsername };
      const updatedUsers = users.map(u => (u.id === userId ? updatedUser : u));
      setUsers(updatedUsers);

      // actualizar tempUsernameMap para reflejar el nuevo username temporalmente
      const updatedTempUsernameMap = { ...tempUsernameMap, [userId]: newUsername };
      setTempUsernameMap(updatedTempUsernameMap);

      // actualizar cada producto en la base de datos mediante PATCH
      await Promise.all(productsToUpdate.map(async (product) => {
        try {
          const updateProductResponse = await fetch(`http://localhost:8000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productSeller: newUsername }), // Enviar el nuevo username del vendedor del producto
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
      }));

      setNewUsername('');
      setEditingUserId(null); // Finaliza la edición

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null); // Finaliza la edición
    setNewUsername(''); // Resetear el nuevo username
  };

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
        const filteredUsers = data.filter(user => user.id !== 1); // Filtrar usuarios excluyendo el usuario con id 1 (es el admin)
        setUsers(filteredUsers); // Almacena la lista filtrada de usuarios en el estado local
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleShowModal = (userId) => {
    setEditingUserId(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUserId(null);
  };

  const handleModifyUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${editingUserId}`, {
        method: 'PATCH', // Método PATCH para cambiar el estado del usuario
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: !users.find(u => u.id === editingUserId).estado }), // Cambia el estado actual
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el estado del usuario');
      }

      // Actualiza la lista de usuarios después de cambiar el estado
      const updatedUsers = users.map(u => {
        if (u.id === editingUserId) {
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
              <Button
                className="btn-editusername-admin"
                onClick={() => handleEditUsername(user.id)}
              >
                Editar username
              </Button>

              {editingUserId === user.id && (
                <div className="edit-text">
                  <FormLabel className="edit-new-username">Nuevo Username:</FormLabel>
                  <FormControl
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    className="input-edit"
                    autoFocus
                  />
                  <Button variant="success" className='btn-edit-guardar' onClick={() => handleSaveUsername(user.id)}>
                    <FontAwesomeIcon icon={faSave} />
                  </Button>
                  <Button variant="danger" className='btn-edit-x' onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </div>
              )}

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
          ¿Estás seguro de que deseas {users.find(u => u.id === editingUserId)?.estado ? 'dar de baja' : 'activar'} el usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleModifyUser}>
            {users.find(u => u.id === editingUserId)?.estado ? 'Dar de baja' : 'Activar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCard;