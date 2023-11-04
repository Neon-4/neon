import React, { useEffect, useState } from "react";
import { useCart } from '@/components/checkout/CartContext';
import { useRouter } from 'next/router';

const AddToCartButtonPopItems = ({ popItem }) => {
    const { dispatch } = useCart();
    const [quantity, setQuantity] = useState(1); // def quant 1
    const router = useRouter();

    const addToCart = () => {
        if (popItem && quantity > 0) {
            const cartItem = {
                id: popItem.id,
                name: popItem.name,
                image: popItem.image,
                price: popItem.price,
                description: popItem.description,
                price: popItem.price * quantity, // Calculate total price based on quantity
                quantity: quantity, // Add quantity information to the cart item
            };

            dispatch({
                type: 'ADD_TO_CART',
                payload: cartItem,
            });

            // Redirect to the cart page with the added item ID as a query parameter
            router.push(`/cart?addedItemId=${popItem.id}`);
        }
    };
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="">
            <div className="flex items-center space-x-2 mb-2">
                <button onClick={decrementQuantity}>-</button>
                <span className="text-lg">{quantity}</span>
                <button onClick={incrementQuantity}>+</button>
            </div>
            <button
                className='bg-[#7EB7EE] hover:bg-[#6fb2ef] text-white rounded-md text-xs px-2 py-1'
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButtonPopItems;
