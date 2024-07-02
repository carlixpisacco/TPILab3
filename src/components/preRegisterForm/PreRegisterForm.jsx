
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStore} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'; 
import { useNavigate } from "react-router-dom";
import './PreRegisterForm.css'
import BasicHeader from '../basicHeader/BasicHeader';

const PreRegisterForm = () => {
    const textStyle = {
        marginLeft: '350px',
    };
    const navigate = useNavigate();

    const handleTypeForm = (name) => {
        navigate("/registerform", { state: { type: name } });
    };

    
    return (
        <>
            <BasicHeader text = {"HOLA :)"} buttonText= {"Volver al menú principal"} textStyle={textStyle} />
            <p className='texto-preregister'> Elige cómo deseas registrarte:</p>
            <div className='pre-register-container'>
                <div className='comprador-container'>
                    <Button className='btn btn-primary card-box comprador' onClick={() => handleTypeForm("comprador")}>
                        <div className='card-icon'>
                            <FontAwesomeIcon icon={faShoppingCart} size="3x" />
                        </div>
                        <h2>COMPRADOR</h2>
                    </Button>
                </div>
                <div className='vendedor-container'>
                    <Button className='btn btn-primary card-box vendedor' onClick={() => handleTypeForm("vendedor")}>
                        <div className='card-icon'>
                            <FontAwesomeIcon icon={faStore} size="3x" />
                        </div>
                        <h2>VENDEDOR</h2>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default PreRegisterForm
