import React from 'react';
import { useCart } from '@/components/checkout/CartContext';
import axios from "axios";
import Navbar from '@/components/Navbar';

const Checkout = () => {
    const { state, dispatch } = useCart();
    function calculateTotalPrice(items) {
        // display items object
        console.log("===this is item id", items[0]?.id)
        console.log("===this is item desc.", items[0]?.description)
        console.log("===this is item img", items[0]?.image)
        console.log("===this is item name", items[0]?.name)
        console.log("===this is item price", items[0]?.price)
        console.log("===this is item quantity", items[0]?.quantity)
        return items.reduce((total, item) => total + item.price, 0);
    }
    const removeFromCart = (itemId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: itemId,
        });
    };
    const customer = 1
    const orderNum = ""
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/order/createOrder/", {
                customer,
                orderNum
            })
            console.log('the response', res)
            if (res.status == 201) {
                const newOrder = res.data.orderNum
                const theItems = state

                try {
                    const response = await axios.patch("http://127.0.0.1:8000/api/order/updateOrder/", {
                        newOrder,
                        theItems
                    })
                    console.log('2nd api call response', response)
                } catch (err) {
                    console.error(err)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                    <form onSubmit={handleFormSubmit}>
                        <ul className="divide-y divide-gray-200">
                            {state.items.map(item => (
                                <li key={item.id} className="py-4 justify-between items-center">
                                    <div className="flex items-center flex-grow">
                                        <img src={`https://ecom-back.thehive-services.com${item.image}`} alt='item image' className="w-24 h-24 object-cover mr-4 rounded" />
                                        <div className="flex flex-col flex-grow">
                                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                            <p className="text-gray-600 text-lg mb-2">${item.price}</p>
                                            <p className="text-blue-600 mr-2 mb-3">Quant.{item.quantity}</p>
                                            <p className="text-gray-700 text-sm tracking-wider">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className='justify-end flex'>
                                        <button
                                            className="bg-black text-white mt-1 py-1 px-2 cursor-pointer hover:bg-yellow-300 hover:text-black justify-end rounded-md"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button type="submit">Proceed to Checkout</button>
                    </form>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Credit Card Number</label>
                            <input
                                type="number"
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Expiration Date</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">CVV</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Cardholder Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className='flex flex-col items-end'>
                            {/* <span className="text-lg bg-red-500 text-white p-2 rounded mb-2">
                                Total: ${calculateTotalPrice(state.items)}
                            </span> */}
                            <div className='flex'>
                                <span className="text-lg font-semibold mr-2">Total:</span>
                                <span className="text-lg">${calculateTotalPrice(state.items)}</span>
                            </div>
                            <div className="flex justify-end">
                                <button type='submit' className="bg-black hover:bg-[#7EB7EE] text-white py-2 px-4 rounded">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
