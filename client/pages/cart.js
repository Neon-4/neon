import React from 'react';
import { useCart } from '@/components/checkout/CartContext';
import Navbar from '@/components/Navbar';

const Checkout = () => {
    const { state } = useCart();
    function calculateTotalPrice(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                    <ul className="divide-y divide-gray-200">
                        {state.items.map(item => (
                            <li key={item.id} className="py-4 flex justify-between items-center">
                                <div className="flex items-center flex-grow">
                                    <img src={item.image_name} alt='item image' className="w-20 h-20 object-cover mr-4 rounded" />
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                        <p className="text-gray-600 text-lg mb-2">${item.price}</p>
                                        <p className="text-gray-700 text-sm">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-600 mr-2">Quantity: {item.quantity}</p>
                                    {/* Add more product details here */}
                                    {/* For example: */}
                                    {/* <p className="text-gray-600">${item.price * item.quantity}</p> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* <div className="flex justify-end mt-4">
                        <span className="text-lg font-semibold mr-2">Total:</span>
                        <span className="text-lg">${calculateTotalPrice(state.items)}</span>
                    </div> */}
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
                            <span className="text-lg bg-red-500 text-white p-2 rounded mb-2">
                                Total: ${calculateTotalPrice(state.items)}
                            </span>
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
