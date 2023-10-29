import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://ecom-back.thehive-services.com/api/customer/login", {
                email,
                password
            });

            if (response.status === 200) {
                router.push("/dashboard");
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-semibold text-center mb-6 text-[#7EB7EE]">Neon Customer Login</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="w-full p-2 border rounded-md focus:outline-none focus:border-[#7EB7EE]" />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#7EB7EE] text-white rounded-md hover:bg-[#7EB7EE] focus:outline-none focus:ring focus:ring-[#7EB7EE]"
                    >
                        Log in
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center">Don&apos;t have an account? <Link href="/signup" className="text-[#7EB7EE]">Sign up</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
