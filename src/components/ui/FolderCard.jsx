import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chip } from '@nextui-org/react';

// import { formatDate } from '@/utils/studyUtils';

export default function FolderCard({ 
    title, 
    id, 
    isSelected, 
    onSelect
}) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    
    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(id);
    };

    const handleDoubleClick = () => {
        router.push(`/files?folderId=${id}&folderName=${encodeURIComponent(title)}`);
    };

    return (
        <div
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-[100px] h-[100px] cursor-pointer m-4"
        >
            {/* Simple Box Folder Icon */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[57px] transition-all duration-300 ${
                isHovered ? 'scale-110' : ''
            }`}>
                {/* Box Body */}
                <div className={`absolute bottom-0 w-full h-[45px] bg-yellow-400 rounded-md transition-all duration-300 ${
                    isSelected ? 'bg-yellow-500' : ''
                }`}></div>
                
                {/* Box Lid */}
                <div className={`absolute top-0 w-full h-4 bg-yellow-500 rounded-t-md transition-all duration-300 origin-bottom transform ${
                    isSelected ? 'rotate-[-15deg] translate-y-[-2px] bg-yellow-600' : ''
                }`}></div>
                
                {/* Box Shadow (only when selected) */}
                {isSelected && (
                    <div className="absolute bottom-0 left-0 w-full h-[45px] bg-yellow-600/30 rounded-md -z-10 transform translate-y-[4px] blur-sm"></div>
                )}
            </div>
            
            {/* Folder Name */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full">
                <h3 className={`text-gray-700 text-sm font-semibold text-center transition-all duration-200 truncate px-1 ${
                    isSelected ? 'text-gray-900' : ''
                }`}>{title}</h3>
            </div>
        </div>
    );
};