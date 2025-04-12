import React, { ReactNode, MouseEvent } from 'react';

type DropdownVariant = 'danger' | 'warning' | 'success' | 'info' | 'default';

interface DropdownItemProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    icon?: ReactNode;
    children: ReactNode;
    variant?: DropdownVariant;
    className?: string;
}

export default function DropdownItem({
    onClick,
    icon,
    children,
    variant = 'default',
    className = ''
}: DropdownItemProps) {
    // Define variant styles
    const variantStyles: Record<DropdownVariant, string> = {
        danger: 'text-red-600',
        warning: 'text-yellow-600',
        success: 'text-green-600',
        info: 'text-blue-600',
        default: '',
    };

    const style = variantStyles[variant] || variantStyles.default;

    return (
        <button
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${style} ${className}`}
            onClick={onClick}
        >
            {icon && (
                <span className="mr-2">
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
} 