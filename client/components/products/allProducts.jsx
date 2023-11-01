import React, { useState, useEffect } from 'react';
// import { products } from '@/api/products';
import ItemBox from '../ItemsBox';
import AddToCartButton from '../AddToCartButton';
import Link from 'next/link';

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
        if (startIndex + 5 < allProducts.length) {
            setStartIndex(startIndex + 5);
        }
    };

    const handlePrev = () => {
        if (startIndex - 5 >= 0) {
            setStartIndex(startIndex - 5);
        }
    };
    console.log('all products:', allProducts)
    useEffect(() => {
        allProd.forEach((product) =>{
            console.log('products individual id:', product.id)
        });
    }, [allProd]);
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
                {allProd.map(product  => (
                    // <ItemBox key={product.id} image={product.image} name={product.name} price={product.price} />
                    <div className="bg-[#eae7e7] w-full rounded-lg p-4 shadow-md mx-2" key={product.id}>
                        <Link href={`/products/${product.id}/view`}>
                            <div className='justify-center items-center flex'>
                                <img src={`http://ecom-back.thehive-services.com/${product.image}`} alt={product.name} className="w-[10rem] mb-2" draggable='false' />
                            </div>
                            <p className="text-left font-bold text-xs md:text-md lg:text-md mt-3">{product.name}</p>
                            <p className="text-left text-xs md:text-md lg:text-md">${product.price}</p>
                        </Link>
                        <div className=''>
                            <AddToCartButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
