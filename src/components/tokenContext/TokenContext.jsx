import PropTypes from "prop-types";
import { createContext, useState } from "react"


const TokenContext = createContext();


const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    }

    const deleteToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    };


    return (
        <TokenContext.Provider value={{ token, updateToken, deleteToken }}>
            {children}
        </TokenContext.Provider>
    )
}

TokenProvider.propTypes = {
    children: PropTypes.object.isRequired,
};

export default TokenContext;

export { TokenProvider };