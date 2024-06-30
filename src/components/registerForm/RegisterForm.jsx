import { useContext, useState } from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './RegisterForm.css'

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = location.state;
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rol: type,
    estado:true
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { handleRegister, error } = useContext(AuthenticationContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== confirmPassword) {
      setLocalError("No coinciden las contraseñas.");
      return;
    }

    try {
      await handleRegister(formData);
      setSuccess("Registro exitoso.");
      setLocalError(null);
    
    } catch (err) {
      setLocalError(err.message || "Error en el registro.");
    }
  };

  const handleBackButtonClick = () => {
    navigate("/preRegister");
  };

  return (
    <>
      <header className="header">
        <div className="container-fluid header-container">
          <div className="row align-items-center header-row">
            <div className="col-auto">
              <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>Volver atrás</p>
              </Button>
            </div>
            <div className="col-auto text-header-register">
              <span className="text" style={{ marginLeft: '100px' }}> COMPLETA TUS DATOS</span>
            </div>
          </div>
        </div>
      </header>
      <div className='form-register-container'>
        <Card className="p-3 px-5 shadow user-form">
          <Form onSubmit={handleSubmit}>
            <FormGroup className='mb-4'>
              <FormLabel className='user-label'>Nombre de usuario</FormLabel>
              <FormControl
                type="text"
                name="username"
                value={formData.username}
                placeholder="Ingresa tu nombre de usuario"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup className='mb-4'>
              <FormLabel className='user-label'>Email</FormLabel>
              <FormControl
                type="email"
                name="email"
                value={formData.email}
                placeholder="Ingresa tu email"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup className='mb-4'>
              <FormLabel className='user-label'>Contraseña</FormLabel>
              <FormControl
                type="password"
                name="password"
                value={formData.password}
                placeholder="Ingresa tu contraseña"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel className='user-label'>Confirmar Contraseña</FormLabel>
              <FormControl
                type="password"
                value={confirmPassword}
                required
                placeholder="Confirma tu contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" className='btn-user-register'>Registrarse</Button>
            
            {localError && (
              <Alert variant="danger" className="mt-3">
                {localError}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            {success && (
              <Alert variant="success" className="mt-3">
                {success}
              </Alert>
            )}
          </Form>
        </Card>
      </div>
    </>

  );
}

export default RegisterForm;
