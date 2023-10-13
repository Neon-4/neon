import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfileSettings = () => {
    // State to keep track of form input values
    const [userSettings, setUserSettings] = useState({
        username: '',
        email: '',
        password: '', // Consider using separate fields for password updates
        // other settings fields...
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Mock user ID - in a real scenario, you'd get this from the user's auth context or session
    const userId = '123';

    useEffect(() => {
        // Fetch the current user's settings from your API when the component mounts
        const fetchUserSettings = async () => {
            setIsLoading(true);
            try {
                // Replace URL with your actual endpoint
                const response = await axios.get(`/api/users/${userId}/settings`);
                setUserSettings(response.data);
            } catch (error) {
                console.error("An error occurred while fetching user settings.", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserSettings();
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            // API call to update user settings, replace URL with your actual update endpoint
            await axios.put(`/api/users/${userId}/settings`, userSettings);
            setMessage('Settings updated successfully!');
        } catch (error) {
            console.error("An error occurred while updating settings.", error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    
    return (
        <div className="container bg-light p-5 mt-20 w-50 ">
            <h3 className="text-center my-4">User Profile Settings</h3>
            <form onSubmit={handleSubmit} >
                <div className='row flex-column justify-content-center align-items-center'>
                    <div className="mb-3 w-50 col-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={userSettings.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3 w-50 col-4 ">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userSettings.email}
                            onChange={handleInputChange}
                        />
                    </div>
            
                {/* Add other fields as necessary */}
                <button type="submit" className="btn btn-primary btn-sm w-50">Save Changes</button>
            </div>     
            </form>
            {message && <div className="alert alert-info mt-4" role="alert">{message}</div>}
        </div>
    );
};

export default UserProfileSettings;