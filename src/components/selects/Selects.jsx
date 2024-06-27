import { Form } from 'react-bootstrap';
import PropTypes from "prop-types";


const Selects = ({ label, value, onChangeSelects }) => {
  // Esta función se llama cuando cambia el valor del select
  const handleChange = (e) => {
    onChangeSelects(e.target.value);
  };

  return (
    <Form.Select
      aria-label={label}
      value={value}
      onChange={handleChange}
    >
      <option value="" disabled>{label}</option>
      <option value="partes de arriba">Partes de arriba</option>
      <option value="partes de abajo">Partes de abajo</option>
      <option value="accesorios">Accesorios</option>
      <option value="calzados">Calzado</option>
    </Form.Select>
  );
};

Selects.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeSelects: PropTypes.func.isRequired,
};

export default Selects