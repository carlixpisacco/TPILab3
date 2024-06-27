import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './BasicHeader.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AuthenticationContext  from '../../services/authentication/Authentication.context'


const BasicHeader = ({ text, buttonText, textStyle }) => {
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthenticationContext);

    const handleBackButtonClick = () => {
        navigate("/");
    };

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate("/");
    };

    return (
        <div>
            <header className="header">
                <div className="container-fluid header-container">
                    <div className="row align-items-center header-row">
                        <div className="col-auto">
                            <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>{buttonText}</p>
                            </Button>
                        </div>
                        <div className="col-auto text-header" style={textStyle}>
                            <span className="text">{text}</span>
                        </div>
                        {user && (
                            <div className="col-auto logout-bheader-div">
                                <Button variant="info" className='btn-logout' onClick={handleLogoutAndRedirect}>
                                    Cerrar Sesión
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}

BasicHeader.propTypes = {
    text: PropTypes.string,
    buttonText:PropTypes.string,
    textStyle: PropTypes.object, 
};
export default BasicHeader
