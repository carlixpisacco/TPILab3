import PropTypes from "prop-types";
import ProductItem from "../productItem/ProductItem";
import './Products.css'
import { useContext } from 'react';
import AuthenticationContext from '../../services/authentication/Authentication.context';
import NoProducts from "../noProducts/NoProducts";


const Products = ({ products }) => {
  const { user } = useContext(AuthenticationContext);

  // Filtrar productos según el rol del usuario
  let productsToRender = [];
  if (!user || (user && user.rol === "comprador")) {
    // Para compradores, solo mostrar productos con estado true
    productsToRender = products.filter(product => !(product.estadoComprado) && product.estado);
  } else if (user && user.rol === "vendedor") {
    // Para vendedores, solo mostrar sus propios productos
    productsToRender = products.filter(product => product.productSeller === user.username && product.estado);
  } else if (user && user.rol === "admin") {
    // Para admin, mostrar todos los productos
    productsToRender = products;
  }

  // Renderizar los productos filtrados
  return (
    <div className="products-container">
        {productsToRender.length > 0 ? (
          productsToRender.map(product => (
            <ProductItem
              key={product.id}
              id={product.id}
              seller={product.productSeller}
              title={product.productTitle}
              category1={product.product1Category}
              category2={product.product2Category}
              condition={product.productCondition}
              size={product.productSize}
              description={product.productDescription}
              price={product.productPrice}
              image={product.imageUrl}
              estado={product.estado}
              estadoComprado={product.estadoComprado}
            />
          ))
        ) : (
          <NoProducts/>
        )}
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Products;