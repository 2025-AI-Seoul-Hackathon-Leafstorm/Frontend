import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';

interface DropdownMenuProps {
    children: ReactNode;
    buttonIcon?: ReactNode;
    buttonClassName?: string;
    menuClassName?: string;
}

interface DropdownItemProps {
    onClick?: () => void;
    children?: ReactNode;
}

export default function DropdownMenu({
    children,
    buttonIcon = <MoreVertical size={20} />,
    buttonClassName = '',
    menuClassName = ''
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: globalThis.MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={`p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 ${buttonClassName}`}
                onClick={toggleDropdown}
                aria-label="Menu"
                aria-expanded={isOpen}
            >
                {buttonIcon}
            </button>

            {isOpen && (
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 ${menuClassName}`}>
                    <div className="py-1">
                        {React.Children.map(children, child => {
                            if (React.isValidElement<DropdownItemProps>(child)) {
                                return React.cloneElement(child, {
                                    onClick: () => {
                                        setIsOpen(false);
                                        if (child.props.onClick) {
                                            child.props.onClick();
                                        }
                                    }
                                });
                            }
                            return child;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
} 