import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 
                const res = await axios.get('http://localhost:8000/api/products/');
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setError('Failed to fetch products.');
            }
        };

        fetchProducts();
    }, []); 

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <Link href={`/products/${product.id}/view`}>
                                <a>View Details</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Products;
