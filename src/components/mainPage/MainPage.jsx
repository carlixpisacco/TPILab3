import Header from '../header/Header'
import Products from '../products/Products'
import NoProducts from '../noProducts/NoProducts'
import { useState, useEffect, useCallback } from 'react';
import useProducts from '../useProducts/useProducts'
import './MainPage.css';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import AdminHeader from '../adminHeader/AdminHeader';
import UserCard from '../userCard/UserCard';


const MainPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user } = useContext(AuthenticationContext);
  const [view, setView] = useState('options');
  const [prevView, setPrevView] = useState('options'); // Estado para almacenar la vista anterior

  const handleViewChange = (newView) => {
    setPrevView(view); // Guardar la vista actual antes de cambiarla
    setView(newView);
  };

  const handleBackButtonClick = () => {
    setView(prevView); // Volver a la vista anterior guardada
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchBar = useCallback((searchBarTerm) => {
    const filtered = products.filter(product =>
      product.productTitle.toLowerCase().includes(searchBarTerm.toLowerCase()) ||
      product.productSeller.toLowerCase().includes(searchBarTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const handleSearchSelect = useCallback((searchSelectTerms) => {
    const [value, type] = searchSelectTerms;
    const filtered = products.filter(product =>
      product.product1Category.toLowerCase().includes(type.toLowerCase()) &&
      product.product2Category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <>
      {user && user.rol === 'admin' ? (
        <>
          <AdminHeader view={view} handleBackButtonClick={handleBackButtonClick} />
          {view === 'options' && (
            <>
              <div className='admin-btns'>
                <div className='container-admin-users'>
                  <Button className='btn card-box-admins admin-users' onClick={() => handleViewChange('manage-users')}>
                    <h2>ADMINISTRAR USUARIOS</h2>
                  </Button>
                </div>
                <div className='container-admin-products'>
                  <Button className='btn card-box-admins admin-products' onClick={() => handleViewChange('manage-products')} >
                    <h2>ADMINISTRAR PRODUCTOS</h2>
                  </Button>
                </div>
              </div>
            </>
          )}

          {view === 'manage-users' && (
            <>
              <UserCard/>
            </>
          )}

          {view === 'manage-products' && (
            <>
              {filteredProducts.length === 0 ? <NoProducts /> : <Products products={filteredProducts} />}
            </>
          )}
        </>
      ) : (
        <>
          <Header onSearchBar={handleSearchBar} onSearchSelect={handleSearchSelect} />
          <div className='contenedor-main'>
            {filteredProducts.length === 0 ? <NoProducts /> : <Products products={filteredProducts} />}
          </div>
        </>
      )}
    </>
  )
}

export default MainPage;