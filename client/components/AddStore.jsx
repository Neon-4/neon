import React, { useState } from 'react';
import CustomInput from './CustomInput'; 
import CustomColorInput from './CustomColorInput';
import 'bootstrap/dist/css/bootstrap.min.css';


function AddStore() {
    //useState and other functions

    const [storeInfo, setStoreInfo] = useState({
        storeName: '',
        storeTagLine: '',
        contactEmail: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        headerBG: '',
        headerFont: '',
        navBG: '',
        navFont: '',
        mainBG: '',
        mainFont: '',
        productBG: '',
        productFont: ''
        });
    const FONT_OPTIONS = [
        "Arial",
        "Verdana",
        "Helvetica",
        "Tahoma",
        "Times New Roman",
        "Georgia"
        ];    

    const [selectedFont, setSelectedFont] = useState('');

    const [errors, setErrors] = useState({});

    const handleFontChange = (e) => {
        setSelectedFont(e.target.value);
    };

    const handleChange = (e) => {
        setStoreInfo({
            ...storeInfo,
            [e.target.name]: e.target.value
        });
    };    

    const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log(storeInfo);
        // Proceed with form submission logic ( API call)
            }
    };

    const validateForm = () => {
        let formErrors = {};

        if (!storeInfo.storeName.trim()) {
            formErrors.storeName = "Store name is required";
        }

        if (!storeInfo.storeTagLine.trim()) {
            formErrors.storeTagLine = "Store tagline is required";
        }

        if (!storeInfo.contactEmail.trim()) {
            formErrors.contactEmail = "Contact email is required";
        } else if (!/\S+@\S+\.\S+/.test(storeInfo.contactEmail)) {
            formErrors.contactEmail = "Email address is invalid";
        }

        if (!storeInfo.address.trim()) {
            formErrors.address = "Address is required";
        }

        if (!storeInfo.city.trim()) {
            formErrors.city = "City is required";
        }

        if (!storeInfo.state.trim()) {
            formErrors.state = "State is required";
        }

        if (!storeInfo.zip.trim()) {
            formErrors.zip = "Zip code is required";
        }
        if (!storeInfo.headerBG.trim()) {
            formErrors.headerBG = "Header BG is required";
        }
        if (!storeInfo.headerFont.trim()) {
            formErrors.headerFont = "Header Font is required";
        }
        if (!storeInfo.navBG.trim()) {
            formErrors.navBG = "Nav BG is required";
        }
        if (!storeInfo.navFont.trim()) {
            formErrors.navFont = "Nav Font is required";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // returns true if no errors
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-70 bg-light mt-20 ">
            <div className="bg-secondary p-5 rounded mt-20">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-white mb-4">Add Store</h2>
                    <CustomInput 
                    label="Store Name" 
                    value={storeInfo.storeName} 
                    onChange={handleChange} 
                    type="text" 
                    name="storeName"
                    />
                    {errors.storeName && <div className="alert alert-info mt-4" role="alert">{errors.storeName}</div>}

                    <CustomInput 
                    label="Store TagLine" 
                    value={storeInfo.storeTagLine} 
                    onChange={handleChange} 
                    type="text" 
                    name="storeTagLine"
                    />
                    {errors.storeTagLine && <div className="alert alert-info mt-4" role="alert"> {errors.storeTagLine}</div>}

                    <CustomInput 
                    label="Contact Email" 
                    value={storeInfo.contactEmail} 
                    onChange={handleChange} 
                    type="email" 
                    name="contactEmail"
                    />
                    {errors.contactEmail && <div className="alert alert-info mt-4" role="alert"> {errors.contactEmail}</div>}

                    <CustomInput 
                        label="Address" 
                        value={storeInfo.address} 
                        onChange={handleChange} 
                        type="text" 
                        name="address"
                    />
                    {errors.address && <div className="alert alert-info mt-4" role="alert"> {errors.address}</div>}

                    <CustomInput 
                        label="City" 
                        value={storeInfo.city} 
                        onChange={handleChange} 
                        type="text" 
                        name="city"
                    />
                    {errors.city && <div className="alert alert-info mt-4" role="alert">{errors.city}</div>}

                    <CustomInput 
                        label="State" 
                        value={storeInfo.state} 
                        onChange={handleChange} 
                        type="text" 
                        name="state"
                    />
                    {errors.state && <div className="alert alert-info mt-4" role="alert">{errors.state}</div>}

                    <CustomInput 
                        label="Zip" 
                        value={storeInfo.zip} 
                        onChange={handleChange} 
                        type="text" 
                        name="zip"
                    />
                    {errors.zip && <div className="alert alert-info mt-4" role="alert">{errors.zip}</div>}

                    <h2 className="text-center text-white mb-4">Pick Store Colors</h2>
                    <div className="d-flex justify-content-center align-items-center gap-3 ">
                        <div className="inline-block" >
                            <CustomColorInput
                                label="Header BG"
                                value={storeInfo.headerBG} 
                                onChange={handleChange} 
                                name="headerBG"
                                type="color"
                                fonts={FONT_OPTIONS}
                            />
                            {errors.headerBG && <div className="alert alert-info mt-4" role="alert"> {errors.headerBG}</div>}
                        </div>
                        <div className="inline-block" >
                            <CustomColorInput
                                label="Header Font" 
                                value={storeInfo.headerFont} 
                                onChange={handleChange}
                                name="headerFont"
                                type="font"
                                fonts={FONT_OPTIONS}
                            />
                            {errors.headerFont && <div className="alert alert-info mt-4" role="alert">{errors.headerFont}</div>}
                        </div>
                        <div className="inline-block" >
                            <CustomColorInput
                                label="Nav Background" 
                                value={storeInfo.navBG} 
                                onChange={handleChange} 
                                name="navBG"
                                type="color"
                                fonts={FONT_OPTIONS}
                            />
                            {errors.navBG && <div className="alert alert-info mt-4" role="alert"> {errors.navBG}</div>}
                        </div>
                        <div className="inline-block" >
                            <CustomColorInput
                                label="Nav Font" 
                                value={storeInfo.navFont} 
                                onChange={handleChange} 
                                name="navFont"
                                type="font"
                                fonts={FONT_OPTIONS}
                            />
                            {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                        </div>    
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary w-40">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStore;

