import { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import './SearchBar.css'

const SearchBar = ({ onChangeBar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onChangeBar(searchTerm);
        setSearchTerm('');
    };

    return (
        <InputGroup className="search-container">
            <FormControl
                type="text"
                placeholder="Buscar..."
                aria-label="Buscar"
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                
            />
            <Button id="search-button" variant="outline-primary"  onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </InputGroup>
    );
};

SearchBar.propTypes = {
    onChangeBar: PropTypes.func.isRequired,
  };
  

export default SearchBar
