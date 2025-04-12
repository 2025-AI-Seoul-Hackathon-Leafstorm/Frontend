import React from 'react';

export default function ActionButton({
    onClick,
    variant = 'primary',
    icon,
    children,
    className = ''
}) {
    // Define variant styles
    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        success: 'bg-green-500 hover:bg-green-600 text-white',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        default: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    };

    const style = variantStyles[variant] || variantStyles.default;

    return (
        <button
            className={`px-3 py-2 rounded-md flex items-center transition-colors duration-200 ${style} ${className}`}
            onClick={onClick}
        >
            {icon && (
                <span className="mr-1">
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
}