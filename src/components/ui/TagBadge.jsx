import React from 'react';

export default function TagBadge({
    children,
    variant = 'default',
    className = ''
}) {
    // Define variant styles
    const variantStyles = {
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-indigo-100 text-indigo-800',
        default: 'bg-gray-100 text-gray-800',
    };

    const style = variantStyles[variant] || variantStyles.default;

    return (
        <div className={`px-3 py-1 rounded-md inline-flex items-center ${style} ${className}`}>
            {children}
        </div>
    );
}