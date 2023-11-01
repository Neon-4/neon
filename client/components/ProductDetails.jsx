// components/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { resolve } from 'styled-jsx/css';

const ProductDetail = () => {
    // const { prod_id } = useParams();
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/product/${id}/view/`);
                console.log('match.params.prod_id:', match.params.prod_id)
                console.log('response from api:', response);
                setProduct(response.data.product);
                setProductImages(response.data.productImages);
            } catch (err) {
                console.error('error fetching data:', err);
                setError('An error occurred while fetching data.');
            }
        };

        fetchProduct();
    }, []); // Runs once when the component mounts and whenever prod_id changes

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    {/* Render product images */}
                    <div>
                        {productImages.map((image, index) => (
                            <img key={index} src={image.url} alt={`Product Img - ${index + 1}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
