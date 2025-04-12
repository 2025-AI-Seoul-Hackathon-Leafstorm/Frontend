import React from 'react';
import { useRouter } from 'next/navigation';
import { Chip } from '@nextui-org/react';

// import { formatDate } from '@/utils/studyUtils';

export default function FolderCard({ title}) {
    const router = useRouter();
    
    const handleClick = () => {
        //router.push(`/study/detail?title=${encodeURIComponent(title)}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-blue-500 p-5 rounded-lg flex justify-between items-center w-[150px] h-[150px] cursor-pointer"
        >
            <div className="w-72 mobile:w-[60vw]  ">
                <h3 className="text-white text-xl font-bold mobile:text-lg pb-10 ">{title}</h3>
                
            </div>
           
        </div>
    );
};