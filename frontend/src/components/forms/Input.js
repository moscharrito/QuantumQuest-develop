import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, name }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default Input;
