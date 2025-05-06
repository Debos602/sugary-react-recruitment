import React from "react";

export const Form = ({ children, onSubmit, className = "", ...props }) => {
    return (
        <form
            onSubmit={onSubmit}
            className={`space-y-5 ${className}`}
            {...props}
        >
            {children}
        </form>
    );
};
