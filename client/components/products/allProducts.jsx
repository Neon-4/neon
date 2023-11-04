import React, { useState, useEffect } from 'react';
import AddToCartButton from '../AddToCartButtonCategories';
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
        allProd.forEach((product) => {
            console.log('products individual id:', product.id)
        });
    }, [allProd]);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className='text-3xl tracking-wider font-semibold'>Shop now</span>
                {/* <div className="flex">
                    <button className="text-gray-600" onClick={handlePrev}>&lt; Prev</button>
                    <span className="text-gray-600 mx-2">|</span>
                    <button className="text-gray-600" onClick={handleNext}>Next &gt;</button>
                </div> */}
            </div>
            {/* BEFORE (WITH SCROLLABLE VIEW) */}
            {/* <div className="overflow-x-auto flex pb-4">
                {allProd.map(product => (
                    // <ItemBox key={product.id} image={product.image} name={product.name} price={product.price} />
                    <div className="bg-[#eae7e7] w-full rounded-lg p-4 shadow-md mx-2 hover:scale-105 transition-transform duration-500" key={product.id}>
                        <Link href={`/products/${product.id}/view`}>
                            <div className="cursor-pointer transition duration-300 transform hover:scale-105">
                                <div className="flex justify-center items-center">
                                    <img
                                        src={`http://ecom-back.thehive-services.com/${product.image}`}
                                        alt={product.name}
                                        className="w-[10rem] h-[10rem] object-cover rounded-lg mb-2"
                                        draggable="false"
                                    />
                                </div>
                                <p className="text-left font-bold text-sm md:text-md lg:text-lg mt-3">{product.name}</p>
                                <p className="text-left text-sm md:text-md lg:text-lg font-semibold text-[#126cb3]">${product.price}</p>
                            </div>
                        </Link>
                        <div className=''>
                        <AddToCartButton product={product} />
                        </div>
                    </div>
                ))}
            </div> */}

            {/* AFTER (NON SCROLLABLE VIEW) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts.map(product => (
                    <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300" key={product.id}>
                        <div className="flex justify-center mb-4">
                            <img
                                src={`http://ecom-back.thehive-services.com/${product.image}`}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-lg"
                                draggable="false"
                            />
                        </div>
                        <p className="text-left font-bold text-lg mb-1 tracking-wider">{product.name}</p>
                        <p className="text-left text-lg font-semibold text-[#126cb3] mb-2">${product.price}</p>
                        <p className="text-left text-sm tracking-wider mb-4">{product.description}</p>
                        <div className="flex justify-left">
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;