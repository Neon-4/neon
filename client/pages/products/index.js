import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 
                const res = await axios.get('https://ecom-back.thehive-services.com/api/store/products/');
                setProducts(res.data);
                console.log(res);
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
            <Navbar />
            <div className="px-10 pt-10">
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-10">
                        <span className='text-3xl tracking-wider font-semibold'>Products</span>
                    </div>                
                </div>
            </div>
            <div className="overflow-x-auto flex flex-wrap p-8">
                {products.map((product) => (
                    <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md m-4 w-64" key={product.id}>
                        <img src={product.image_name} alt={product.name} className="object-cover mb-2" draggable='false' />
                        <p className="text-left font-bold text-xs md:text-md lg:text-md">{product.name}</p>
                        <p className="text-left font-bold text-xs md:text-md lg:text-md">{product.description}</p>
                        <p className="text-left text-xs md:text-md lg:text-md mt-3">Price: {product.price}</p>
                        <Link href={`/products/${product.id}/view`}>
                            <p className='mt-6'>View Details</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
