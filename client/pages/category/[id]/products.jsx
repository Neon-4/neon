import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButtonCategories";
import Navbar from "@/components/Navbar";
// import Image from 'next/image';

const CategoryProducts = () => {
    const router = useRouter();
    const { id } = router.query
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products from the API endpoint
                const response = await fetch(`https://ecom-back.thehive-services.com/api/store/category/${id}/products`)
                if (response.ok) {
                    const productsData = await response.json();
                    console.log("the products from this category", productsData);
                    setAllProducts(productsData);
                } else {
                    throw new Error("Failed to fetch products from the specified category");
                }
            } catch (error) {
                console.log("Error fetching products from specified category", error);
            }
        };

        fetchProducts();
    }, [id]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-semibold tracking-wider mb-6">Featured Categories</h1>
                </div>
                <div className="flex flex-wrap -mx-4">
                    {allProducts.map(product => (
                        <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
                                <img
                                    src={product.image_name}
                                    alt={product.name}
                                    className="object-cover mb-4 h-40 w-full rounded-lg"
                                />
                                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                                <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                                <div className="mt-6">
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default CategoryProducts