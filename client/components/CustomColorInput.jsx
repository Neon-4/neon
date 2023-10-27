import React from 'react';


const CustomColorInput = ({ label, value, onChange, name, type, fonts }) => {
return (
    <div className="mb-3 text-center">
    <label className="form-label text-white">{label}</label>
    {type === "color" ? (
        <input
        type="color"
        className="form-control form-control-color w-20 mx-auto"
        value={value}
        onChange={onChange}
        name={name}
        />
    ) : (
        <select
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
        >
        {fonts.map((font, index) => (
            <option key={index} value={font}>
            {font}
            </option>
        ))}
        </select>
    )}
    </div>
);
};

export default CustomColorInput;
