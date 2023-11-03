// pages/[id]/view.jsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import ProductDetails from '../../../components/ProductDetails'; // adjust the import path if necessary

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

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
                } else {
                    throw new Error("Failed to fetch product");
                }
            } catch (error) {
                console.log("Error fetching product", error);
            }
        };

        fetchProduct();
    }, []);

    // Check if the "id" is available. It might be undefined initially.
    // You could also do some loading logic here.
    // if (!id) return <p>Loading...</p>;

    return (
        // <ProductDetails id={id} />
        <div>
            <Navbar />
            <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2" key={id}>

            </div>
        </div>
    )
}

export default ProductPage;
