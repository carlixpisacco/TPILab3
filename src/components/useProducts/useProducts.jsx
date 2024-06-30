import { useState, useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/products");
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProducts();
    }, []);

    return { products};
};

export default useProducts;