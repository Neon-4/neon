import React, { useState, useEffect } from 'react';

// const Cart = ({ product }) => {
const Cart = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from the API endpoint
                const response = await fetch('https://ecom-back.thehive-services.com/api/store/products/');
                if (response.ok) {
                    const productsData = await response.json();
                    console.log("the products", productsData);
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

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
            {allProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="flex items-center mb-4">
                                <img src={product.image_name} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                <div>
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Product not found.</p>
            )}
        </div>
    );
};

export default Cart;

// TRYING TO FIGURE THIS OUT:

// import React from 'react';

// const Cart = ({ product }) => {
//     return (
//         <div className="bg-gray-100 min-h-screen p-4">
//             <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
//             {product ? (
//                 <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
//                     <div className="flex items-center mb-4">
//                         <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
//                         <div>
//                             <h2 className="text-lg font-semibold">{product.name}</h2>
//                             <p className="text-gray-500">${product.price.toFixed(2)}</p>
//                         </div>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">{product.description}</p>
//                 </div>
//             ) : (
//                 <p className="text-gray-600">Product not found.</p>
//             )}
//         </div>
//     );
// };

// export default Cart;
