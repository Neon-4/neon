import React from 'react';

const CustomInput = ({ label, value, onChange, type, name }) => {
    return (
        <div className="mb-3">
            <label className="form-label text-white">{label}</label>
            <input 
                type={type} 
                className="form-control" 
                value={value} 
                onChange={onChange} 
                name={name}
            />
        </div>
    );
}

export default CustomInput;
