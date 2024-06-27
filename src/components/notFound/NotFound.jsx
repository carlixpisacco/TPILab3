import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate("/");
    };

  return (
    <div>
      <header className="header">
                <div className="container-fluid header-container">
                    <div className="row align-items-center header-row">
                        <div className="col-auto">
                            <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>Volver al menú principal</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        <div><p className='contenedor-not-found'>No hay nada para este path</p></div>
    </div>
  )
}

export default NotFound
