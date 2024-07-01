import { useContext, useState } from "react";
import { Form, Button, Card, Alert, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import AuthenticationContext from "../../services/authentication/Authentication.context";
import { useNavigate } from "react-router-dom";
import TokenContext from "../tokenContext/TokenContext";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { updateToken } = useContext(TokenContext);
    const { handleLogin, user } = useContext(AuthenticationContext);
    const [error, setError] = useState(null);
    const [userStatus, setUserStatus] = useState(true);


    const handleBackButtonClick = () => {
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/login';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Usuario o contraseña incorrectas');
                }
                return response.json(); // Convertir la respuesta a JSON
            })
            .then(data => {
                console.log("Respuesta del servidor:", data); // Verificar la respuesta del servidor
                if (data.estado === false) {
                    setUserStatus(false)
                }
                else {
                    const jwtToken = data.accessToken; // Extraer el token JWT de la respuesta del servidor
                    if (jwtToken) {
                        updateToken(jwtToken); // Actualizar el token en el contexto de tokens
                        handleLogin(); // Realizar el proceso de inicio de sesión
                        setUserStatus(true);
                        navigate('/'); // Redirigir a la página de perfil u otra página autorizada
                    } else {
                        throw new Error('Token no recibido'); // Manejar errores si no se recibe el token
                    }
                }
            })
            .catch(error => {
                console.error(error); // Manejar errores de red o del servidor
                setError(error.message);
            });
    };

    const handleRegisterClick = () => {
        navigate('/preRegister'); // Redirigir al formulario de registro si el usuario decide registrarse
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
            <div className="login-container">
                <Card className="login-card">
                    <h3>¡Bienvenido/a!</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                value={email}
                                required
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl
                                type="password"
                                value={password}
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>

                        <Button variant="primary" type="submit" disabled={user !== null}>
                            Iniciar sesión
                        </Button>
                    </Form> 

                    {user && (
                    <div className="w-100 mt-3">
                        <Alert variant="success">Usted ya inicio sesión.</Alert>
                    </div>
                    )}

                    { !userStatus && (
                        <Alert className="w-100 mt-3" variant="danger">Usted ha eliminado su usuario.
                        Si desea volver a registrarse, por favor use otro mail. 
                        </Alert>
                    )}

                    {error && (
                        <div className="w-100 mt-3">
                            <Alert variant="danger">{error}</Alert>
                        </div>
                    )}

                    <div className="span-login">
                        <p>
                            ¿Eres nuevo? |{' '}
                            <span
                                onClick={handleRegisterClick}
                                style={{ color: 'rgb(40, 40, 166)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Registrarse
                            </span>
                        </p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Login;
