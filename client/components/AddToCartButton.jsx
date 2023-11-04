import React from 'react';
import { useCart } from '@/components/checkout/CartContext';
import { useRouter } from 'next/router';

const AddToCartButton = ({ product }) => {
    const { dispatch } = useCart();
    const router = useRouter();

    const addToCart = () => {
        if (product) {
            const cartItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
            };

            dispatch({
                type: 'ADD_TO_CART',
                payload: cartItem,
            });

            // Redirect to '/cart' after adding item to the cart
            router.push('/cart');
        }
    };

    return (
        <button
            className='bg-[#7EB7EE] hover:bg-[#6fb2ef] text-white rounded-md text-xs px-2 py-1'
            onClick={addToCart}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
