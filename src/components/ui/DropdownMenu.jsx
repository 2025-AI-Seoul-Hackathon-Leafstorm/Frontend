import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

export default function DropdownMenu({
    children,
    buttonIcon = <MoreVertical size={20} />,
    buttonClassName = '',
    menuClassName = ''
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
                            if (React.isValidElement(child)) {
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