import React, { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post('https://ecom-back.thehive-services.com/api/customer/registration/', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });

        if (response.status === 201) {
            const userId = response.data.id;
            console.log('User ID:', userId);
            router.push({
                pathname: '/profile',
                query: {
                    customer_id: userId,
                    firstName: firstName, // Pass first name here
                    lastName: lastName,   // Pass last name here
                    // ... pass other user data as needed
                },
            });
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        if (error.response.data.email) {
            setError('Email is already taken');
        } else {
            setError('Error registering user');
        }
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-semibold text-center mb-6 text-[#7EB7EE]">Create an Account</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                        />
                        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700 mt-3">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]"
                        />
                        {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
)}

                        {/* Password visibility button */}
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
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#7EB7EE]">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
