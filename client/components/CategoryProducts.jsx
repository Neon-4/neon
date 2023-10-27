import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryProducts = ({ category_id }) => {
const [products, setProducts] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
    const fetchProducts = async () => {
    try {
        const response = await axios.get(`/api/category/${category_id}/products/`);
        setProducts(response.data);
    } catch (err) {
        setError('An error occurred while fetching products.');
    }
    };

    fetchProducts();
}, [category_id]);

if (error) {
    return <div>Error: {error}</div>;
}

return (
    <div>
    <h1>Products in this Category</h1>
    <ul>
        {products.map((product) => (
        <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            {/* Add more product details here */}
        </li>
        ))}
    </ul>
    </div>
);
};

export default CategoryProducts;
