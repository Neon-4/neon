import React, { useState, useEffect } from 'react';
import { FiUser, FiLogOut, FiShoppingCart, FiSettings, FiUserCheck, FiList, FiEdit, FiSave } from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';


const Profile = (props) => {
    const [userData, setUserData] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        // ... other properties from the API response
    });
    console.log("this is props:", userData)


    const router = useRouter();
    const { customer_id, firstName, lastName } = router.query;

    console.log("displayyyyyyy:", { customer_id, firstName, lastName });

    
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://ecom-back.thehive-services.com/api/customer/fullCustomer/${customer_id}/view/`, {
                    headers: {
                        'accept': 'application/json',
                        'X-CSRFToken': 'dAPcOgZpJ5ENjZQco4avS1m3ko0pqSSqCjn86stYSz02plR7nf2KVS18ynf9mcWT',
                    }
                });
                if (response.status === 200) {
                    const user = response.data;
                    setUserData({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        // ... other properties from the API response
                    });
                }
            } catch (error) {
                setError('Error fetching user data. Please try again later.');
            }
        };

        fetchUserData();
    }, [props.customer_id]);

        // Function to toggle edit mode
        const toggleEditMode = () => {
            setIsEditing((prevIsEditing) => !prevIsEditing);
        };

        // Function to handle form field changes
        const handleChange = (e) => {
            const { name, value } = e.target;
            setUserData((prevUserData) => ({
                ...prevUserData,
                [name]: value,
            }));
        };

    // const router = useRouter();
    // const { customer_id, firstName, lastName } = router.query;

    // console.log("displayyyyyyy:", { customer_id, firstName, lastName });

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-10">
                <img
                    src=""
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-[#126cb3]"
                />
                <h2 className="mt-4 text-2xl font-semibold text-[black]">{customer_id}{firstName} {lastName}</h2>
                {/* Form for editing user data */}
                <form className="mt-4 max-w-md w-full sm:w-2/3 md:w-1/2">
                    {/* Birthdate */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Birth Date:</label>
                        <input
                            type="text"
                            name="birthdate"
                            value={userData.birthdate}
                            onChange={handleChange}
                            placeholder="Enter your birthdate"
                            className={`w-full p-2 rounded-lg ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {/* Address */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Address:</label>
                        <textarea
                            name="address"
                            value={userData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className={`w-full p-2 h-32 rounded-lg resize-none ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={`w-full p-2 rounded-lg ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {/* Email */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`w-full p-2 rounded-lg ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {/* Age */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Age:</label>
                        <input
                            type="text"
                            name="age"
                            value={userData.age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                            className={`w-full p-2 rounded-lg ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {/* Location */}
                    <div className={`mb-4 ${isEditing ? 'border' : ''}`}>
                        <label className="block text-[#126cb3] font-bold">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleChange}
                            placeholder="City, State, Country"
                            className={`w-full p-2 rounded-lg ${isEditing ? 'bg-white border' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    {isEditing ? (
                        <button
                            type="button"
                            onClick={() => {
                                toggleEditMode();
                                // Save the data here if needed
                            }}
                            className="flex items-center mt-4 px-4 py-2 bg-[#126cb3] text-white rounded-lg shadow hover:bg-[black]"
                        >
                            <FiSave className="mr-2" />
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleEditMode}
                            className="flex items-center mt-4 px-4 py-2 bg-[black] text-white rounded-lg shadow hover:bg-[#126cb3]"
                        >
                            <FiEdit className="mr-2" />
                            Edit
                        </button>
                    )}
                </form>
                <br/><br/>
            </div>
        </div>
    );
};

export default Profile;
