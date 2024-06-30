import Header from '../header/Header'
import Products from '../products/Products'
import NoProducts from '../noProducts/NoProducts'
import { useState, useEffect, useCallback } from 'react';
import useProducts from '../useProducts/useProducts'
import './MainPage.css'


const MainPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

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
      <Header onSearchBar={handleSearchBar} onSearchSelect={handleSearchSelect} />
      <div className='contenedor-main'>
        {filteredProducts.length === 0 ? <NoProducts/> : <Products products={filteredProducts} />}
      </div>
    </>
  )
}

export default MainPage;