import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoMdHome } from 'react-icons/io';
import { FaShoppingCart, FaUser, FaCog, FaPowerOff } from 'react-icons/fa';
// import Image from "next/image";


const Navbar = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-[#7EB8EE] p-4 flex justify-between items-center">
            <div className=" items-center">
                <Link href='/' className="text-none">
                    <div className="text-black font-bold text-xl">Neon</div>
                </Link>
                {/* <div className="text-black text-sm ml-3">Buy stuff with us!</div> */}
            </div>

            <div className="flex items-center justify-center relative text-gray-600">
                <div className="relative">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-white h-10 sm:w-[16rem] md:w-[32rem] rounded-full text-sm pl-12 pr-4 focus:outline-none"
                    />
                    <FiSearch className="absolute left-4 top-3" />
                </div>
                {/* <div className="relative ml-4">
                    <select className="bg-white h-10 rounded-full text-sm px-4 focus:outline-none cursor-not-allowed">
                        <option>categories</option>
                    </select>
                </div> */}
            </div>

            <div
                ref={dropdownRef}
                className="ml-4 relative group"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocL5vm4B6bDOpM4qspaFI3GsN-5CLJp9BsNfNPOwRcQHR4W-=s576-c-no"
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    // width={10}
                    // height={10}
                />
                <button className="text-gray-200 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform origin-top-right scale-0 group-hover:scale-100 absolute right-0 mt-2">
                    <HiOutlineChevronDown className="h-5 w-5" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-white text-gray-700 z-10">
                        <ul className="py-2">
                            <Link href='/'>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                                    <IoMdHome className="mr-2" />
                                    Home
                                </li>
                            </Link>
                            <Link href='/cart'> 
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                                    <FaShoppingCart className="mr-2" />
                                    Cart
                                </li>
                            </Link>
                            <Link href='/settings'>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                                    <FaCog className="mr-2" />
                                    Settings
                                </li>
                            </Link>
                            <Link href='/profile'>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                                    <FaUser className="mr-2" />
                                    Profile
                                </li>
                            </Link>
                            <Link href='/login'> 
                                <li 
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                                >
                                    <FaPowerOff className="mr-2" />
                                    Login
                                </li>
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;