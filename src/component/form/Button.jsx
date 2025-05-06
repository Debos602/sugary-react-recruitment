import React from "react";

export const Button = ({
    children,
    type = "button",
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            className={`w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors shadow-md ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
