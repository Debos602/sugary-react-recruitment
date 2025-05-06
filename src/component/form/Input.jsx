import React from "react";

export const Input = ({
    id,
    type = "text",
    label,
    placeholder,
    className = "",
    ...props
}) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
