import React, { useState } from 'react';
import CustomInput from './CustomInput'; 
import CustomColorInput from './CustomColorInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function AddStore() {
    //useState and other functions

    const [storeInfo, setStoreInfo] = useState({
        storeName: '',
        storeTagLine: '',
        contactEmail: '',
        contactPhone: '',
        contactName:'',
        ownerName:'',
        address01: '',
        address02: '',
        city: '',
        state: '',
        zip: '',
        
        });
    const [storeColors, setStoreColors] = useState({
        headerBG: '#000000',
        headerFont: 'Arial',
        navBG: '#000000',
        navFont: 'Arial',
        mainBG: '#000000',
        mainFont: 'Arial',
        productBG: '#000000',
        productFont: 'Arial',
        store: '',
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

    const handleStoreInfoChange = (e) => {
            setStoreInfo({
                ...storeInfo,
                [e.target.name]: e.target.value,
            });
    };
    
    const handleStoreColorsChange = (e) => {
            setStoreColors({
                ...storeColors,
                [e.target.name]: e.target.value,
            });
            
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button clicked'); 
        const isValid = validateForm(); // Validate form before submitting
            if (isValid) {
            // Submit storeInfo
            axios.post(`http://localhost:8000/theme/addStoreInfo/`, storeInfo)
            .then((response) => {
            console.log(response.data);
            // Then submit storeColors after storeInfo is successful
            return axios.post('http://localhost:8000/theme/addStoreColors/', storeColors);
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
            } else {
            console.error('Validation failed');
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
        if (!storeInfo.contactPhone.trim()) {
            formErrors.contactPhone = "Contact Phone is required";
        }
        if (!storeInfo.ownerName.trim()) {
            formErrors.ownerName = "Owner Name is required";
        }

        if (!storeInfo.contactEmail.trim()) {
            formErrors.contactEmail = "Contact email is required";
        } else if (!/\S+@\S+\.\S+/.test(storeInfo.contactEmail)) {
            formErrors.contactEmail = "Email address is invalid";
        }

        if (!storeInfo.address01.trim()) {
            formErrors.address = "Address is required";
        }
        if (!storeInfo.address02.trim()) {
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
        if (!storeColors.headerBG.trim()) {
            formErrors.headerBG = "Header BG is required";
        }
        if (!storeColors.headerFont.trim()) {
            formErrors.headerFont = "Header Font is required";
        }
        if (!storeColors.navBG.trim()) {
            formErrors.navBG = "Nav BG is required";
        }
        if (!storeColors.navFont.trim()) {
            formErrors.navFont = "Nav Font is required";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // returns true if no errors
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-70 bg-light mt-20 ">
            <div className="bg-secondary p-5 rounded mt-20">
                <form onSubmit={handleSubmit} method="post">
                    <h2 className="text-center text-white mb-4">Add Store</h2>
                    <CustomInput 
                    label="Store Name" 
                    value={storeInfo.storeName} 
                    onChange={handleStoreInfoChange} 
                    type="text" 
                    name="storeName"
                    />
                    {errors.storeName && <div className="alert alert-info mt-4" role="alert">{errors.storeName}</div>}

                    <CustomInput 
                    label="Store TagLine" 
                    value={storeInfo.storeTagLine} 
                    onChange={handleStoreInfoChange} 
                    type="text" 
                    name="storeTagLine"
                    />
                    {errors.storeTagLine && <div className="alert alert-info mt-4" role="alert"> {errors.storeTagLine}</div>}

                    <CustomInput 
                    label="Contact Email" 
                    value={storeInfo.contactEmail} 
                    onChange={handleStoreInfoChange} 
                    type="email" 
                    name="contactEmail"
                    />
                    {errors.contactEmail && <div className="alert alert-info mt-4" role="alert"> {errors.contactEmail}</div>}

                    <CustomInput 
                    label="Owner Name" 
                    value={storeInfo.ownerName} 
                    onChange={handleStoreInfoChange} 
                    type="text" 
                    name="ownerName"
                    />
                    {errors.ownerName && <div className="alert alert-info mt-4" role="alert"> {errors.ownerName}</div>}

                    <CustomInput 
                    label="Contact Phone" 
                    value={storeInfo.contactPhone} 
                    onChange={handleStoreInfoChange} 
                    type="text" 
                    name="contactPhone"
                    />
                    {errors.contactPhone && <div className="alert alert-info mt-4" role="alert"> {errors.contactPhone}</div>}

                    <CustomInput 
                        label="Address 1" 
                        value={storeInfo.address01} 
                        onChange={handleStoreInfoChange} 
                        type="text" 
                        name="address01"
                    />
                    {errors.address && <div className="alert alert-info mt-4" role="alert"> {errors.address}</div>}
                    <CustomInput 
                        label="Address 2" 
                        value={storeInfo.address02} 
                        onChange={handleStoreInfoChange} 
                        type="text" 
                        name="address02"
                    />
                    {errors.address && <div className="alert alert-info mt-4" role="alert"> {errors.address}</div>}
                    <CustomInput 
                        label="City" 
                        value={storeInfo.city} 
                        onChange={handleStoreInfoChange} 
                        type="text" 
                        name="city"
                    />
                    {errors.city && <div className="alert alert-info mt-4" role="alert">{errors.city}</div>}

                    <CustomInput 
                        label="State" 
                        value={storeInfo.state} 
                        onChange={handleStoreInfoChange} 
                        type="text" 
                        name="state"
                    />
                    {errors.state && <div className="alert alert-info mt-4" role="alert">{errors.state}</div>}

                    <CustomInput 
                        label="Zip" 
                        value={storeInfo.zip} 
                        onChange={handleStoreInfoChange} 
                        type="text" 
                        name="zip"
                    />
                    {errors.zip && <div className="alert alert-info mt-4" role="alert">{errors.zip}</div>}

                    <h2 className="text-center text-white mb-4">Pick Store Colors</h2>
                    <div className="d-flex flex-column align-items-center gap-3 mr-2 ">
                        <div className="d-flex justify-content-between w-100 m-3">
                            <div className="d-flex align-items-center mr-2 ">
                                <div className="inline-block " style={{ marginRight: '100px' }}>
                                    <CustomColorInput
                                        label="Header BG" 
                                        onChange={handleStoreColorsChange} 
                                        name="headerBG"
                                        type="color"
                                        value={storeColors.headerBG}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.headerBG && <div className="alert alert-info mt-4" role="alert"> {errors.headerBG}</div>}
                                </div>
                                <div className="inline-block" style={{ marginRight: '100px' }}>
                                    <CustomColorInput
                                        label="Nav BG" 
                                        onChange={handleStoreColorsChange} 
                                        name="navBG"
                                        type="color"
                                        value={storeColors.navBG}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navBG && <div className="alert alert-info mt-4" role="alert"> {errors.navBG}</div>}
                                </div>
                                <div className="inline-block" style={{ marginRight: '100px' }} >
                                    <CustomColorInput
                                        label="Nav Font" 
                                        onChange={handleStoreColorsChange} 
                                        name="navFont"
                                        type="font"
                                        value={storeColors.navFont}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                                </div>
                            </div>    
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex align-items-center mr-2">
                                <div className="inline-block" style={{ marginRight: '20px' }} >
                                    <CustomColorInput
                                        label="Main BG" 
                                        onChange={handleStoreColorsChange} 
                                        name="mainBG"
                                        type="color"
                                        value={storeColors.mainBG}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                                </div>
                                <div className="inline-block"  style={{ marginRight: '20px' }} >
                                    <CustomColorInput
                                        label="Main Font" 
                                        onChange={handleStoreColorsChange} 
                                        name="mainFont"
                                        type="font"
                                        value={storeColors.mainBG}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                                </div>
                                <div className="inline-block"  style={{ marginRight: '20px' }} >
                                    <CustomColorInput
                                        label="Produc BG" 
                                        onChange={handleStoreColorsChange} 
                                        name="productBG"
                                        type="color"
                                        value={storeColors.productBG}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                                </div>
                                <div className="inline-block"  >
                                    <CustomColorInput
                                        label="Product Font" 
                                        onChange={handleStoreColorsChange} 
                                        name="productFont"
                                        type="font"
                                        value={storeColors.productFont}
                                        fonts={FONT_OPTIONS}
                                    />
                                    {errors.navFont && <div className="alert alert-info mt-4" role="alert"> {errors.navFont}</div>}
                                </div>
                                <input
                                        type="hidden"
                                        name="store"
                                        value={1} // Assuming storeInfo contains the ID of the associated store
                                    />
                            </div>
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

