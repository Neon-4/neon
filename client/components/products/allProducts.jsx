import React, { useState, useEffect } from 'react';
import { products } from '@/api/products';
import ItemBox from '../ItemsBox';
import AddToCartButton from '../AddToCartButton';

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from the API endpoint
                const response = await fetch('https://ecom-back.thehive-services.com/api/store/products/');
                if (response.ok) {
                    const productsData = await response.json();
                    console.log("the products", productsData)
                    setAllProducts(productsData);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const [startIndex, setStartIndex] = useState(0);
    const allProd = allProducts.slice(startIndex, startIndex + 5);

    const handleNext = () => {
        if (startIndex + 5 < products.length) {
            setStartIndex(startIndex + 5);
        }
    };

    const handlePrev = () => {
        if (startIndex - 5 >= 0) {
            setStartIndex(startIndex - 5);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className='text-3xl tracking-wider font-semibold'>Popular Items</span>
                <div className="flex">
                    <button className="text-gray-600" onClick={handlePrev}>&lt; Prev</button>
                    <span className="text-gray-600 mx-2">|</span>
                    <button className="text-gray-600" onClick={handleNext}>Next &gt;</button>
                </div>
            </div>
            <div className="overflow-x-auto flex pb-4">
                {allProd.map(product => (
                    <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2" key={product.id}>
                        <img src="https://m.media-amazon.com/images/I/51Y2jSytusL._SX300_SY300_QL70_FMwebp_.jpg" alt={product.name} className="object-cover mb-2" draggable='false' />
                        <p className="text-left font-bold text-xs md:text-md lg:text-md">{product.name}</p>
                        <p className="text-left text-xs md:text-md lg:text-md mt-3">${product.price}</p>
                        <div className='mt-6'>
                            <AddToCartButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
