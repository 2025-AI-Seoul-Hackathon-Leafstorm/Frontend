'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DocList from '@/components/screen/DocList';

export default function Files() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderName = searchParams.get('folder');

    useEffect(() => {
        // Redirect to /solution if no folderName is provided

        if (!folderName) {
            //router.push('/solution');
        }
    }, [folderName, router]);

    // Don't render anything during redirect
    if (!folderName) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container max-w-[1200px] justify-center m-auto mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 text-center">{folderName}</h1>
                <DocList folderName={folderName}/>
            </div>
        </main>
    );
}