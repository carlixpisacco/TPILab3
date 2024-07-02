import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './AdminHeader.css';
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminHeader = ({ view, handleBackButtonClick }) => {
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthenticationContext);

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate("/");
    };

    return (

        <header className="header-admin">
            <div className="container-fluid header-container-admin">
                {view !== 'options' && (
                    <div className="col-auto back-admin-div">
                        <Button className='button-back-aheader' onClick={handleBackButtonClick}>
                            <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button-aheader'>Volver atrás</p>
                        </Button>
                    </div>
                )}
                {user && (
                    <div className="col-auto logout-admin-div">
                        <Button className='btn-logout-admin' onClick={handleLogoutAndRedirect}>
                            Cerrar Sesión
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}

AdminHeader.propTypes = {
    view: PropTypes.oneOf(['options', 'manage-users', 'manage-products']).isRequired,
    handleBackButtonClick: PropTypes.func.isRequired,
};

export default AdminHeader
