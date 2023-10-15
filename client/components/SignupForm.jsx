import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-semibold text-center mb-6 text-[#7EB7EE]">Create an Account</h1>
                <form>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" id="firstName" className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" id="lastName" className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]" />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none"
                        >
                            {showPassword ? (
                                <FiEyeOff className="w-3 h-3 text-gray-500 hover:text-[#7EB7EE]" />
                            ) : (
                                <FiEye className="w-3 h-3 text-gray-500 hover:text-[#7EB7EE]]" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#7EB7EE] text-white rounded-md hover:bg-[#7EB7EE] focus:outline-none focus:ring focus:ring-[#7EB7EE]"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Already have an account? <Link href="/login" className="text-[#7EB7EE]">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
