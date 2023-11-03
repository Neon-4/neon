// pages/[id]/view.jsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import ProductDetails from '../../../components/ProductDetails'; // adjust the import path if necessary
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

    if(isLoading) {
        return <div>
            <h1>Welcome to the Product Page</h1>
            <h2>Page Loading ........</h2>
        </div>
    } else {
        console.log("isLoading:", isLoading)
    }

    return (
        // <ProductDetails id={id} />
        <div>
            <Navbar />
            <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2" key={id}>
                <h1>{product.product.name}</h1>
                <Image src={product.product.image_name} width={300} height={300} alt={product.product.name} />
                <p>$ {product.product.price}.00</p>
                <p>{product.product.description}</p>
            </div>
        </div>
    )
}

export default ProductPage;