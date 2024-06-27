import Header from '../header/Header'
import Products from '../products/Products'
import NoProducts from '../noProducts/NoProducts'
import { useState, useEffect } from 'react';
import './MainPage.css'


const MainPage = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8000/products", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((productsData) => {
        setProducts(productsData);
        setFilteredProducts(productsData)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSearchBar = (searchBarTerm) => {
    setFilteredProducts([]);
    const filtered = products.filter(product =>
      product.productTitle.toLowerCase().includes(searchBarTerm.toLowerCase()) ||
      product.productSeller.toLowerCase().includes(searchBarTerm.toLowerCase())
    );
    setFilteredProducts(filtered);

  };

  const handleSearchSelect = (searchSelectTerms) => {
    setFilteredProducts([]);

    const [value, type] = searchSelectTerms; //uso el deconstructor ya que paso un arreglo en header.

    const filtered = products.filter(product =>
      product.product1Category.toLowerCase().includes(type.toLowerCase()) &&
      product.product2Category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  }


  return (
    <>
      <Header onSearchBar={handleSearchBar} onSearchSelect={handleSearchSelect}/>
      <div className='contenedor-main'>
        {filteredProducts.length === 0 ? <NoProducts text ={"No se encontraron productos"} /> : <Products products={filteredProducts} />}
      </div>
    </>
  )
}


export default MainPage

