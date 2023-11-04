import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import Image from 'next/image';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isLoading, setIsLoading] = useState(true);

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch product from the API endpoint
                const response = await fetch(`https://ecom-back.thehive-services.com/api/store/product/${id}/view`)
                if (response.ok) {
                    const productData = await response.json();
                    console.log("the product: ", productData);
                    setProduct(productData);
                    setIsLoading(false);
                } else {
                    throw new Error("Failed to fetch product");
                }
            } catch (error) {
                console.log("Error fetching product", error);
            }
        };

        fetchProduct();
        console.log("isLoading:", isLoading)
    }, []);

    // console.log("this is the product description:" + product.product.description);
    // Check if the "id" is available. It might be undefined initially.
    // You could also do some loading logic here.
    // if (!id) return <p>Loading...</p>;

    useEffect(() => {
        console.log('State has been updated', product);
        // setIsLoading(false)
    }, [product]);

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
        <h1 className="text-4xl font-semibold mb-4">Welcome to the Product Page</h1>
        <div className="flex items-center space-x-2">
            <div className="h-6 w-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <h2 className="text-xl">Loading...</h2>
        </div>
    </div>
    
    } else {
        console.log("isLoading:", isLoading)
    }

    return (
        // <ProductDetails id={id} />
        <div>
            <Navbar />
            <div className="bg-gray-100 rounded-lg p-6 shadow-md mx-4 my-4 max-w-sm w-full">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold mb-2">{product.product.name}</h1>
                    <Image src={product.product.image_name} width={150} height={150} alt={product.product.name} className="rounded-lg" />
                </div>
                <p className="text-gray-700 mb-2">${product.product.price.toFixed(2)}</p>
                <p className="text-gray-600">{product.product.description}</p>
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default ProductPage;