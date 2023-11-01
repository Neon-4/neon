import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
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
        <div>
            <Navbar />
            <div className="px-10 pt-10">
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-10">
                        <span className='text-3xl tracking-wider font-semibold'>Featured Categories</span>
                    </div>                
                </div>
            </div>
            <div className="overflow-x-auto flex pb-4">
                {allProducts.map(product => (
                    <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2" key={product.id}>
                        <img src={product.image_name} alt={product.name} className="object-cover mb-2" draggable='false' />
                        <p className="text-left font-bold text-xs md:text-md lg:text-md">{product.name}</p>
                        <p className="text-left font-bold text-xs md:text-md lg:text-md">{product.description}</p>
                        <p className="text-left text-xs md:text-md lg:text-md mt-3">${product.price}</p>
                        <div className='mt-6'>
                            <AddToCartButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryProducts