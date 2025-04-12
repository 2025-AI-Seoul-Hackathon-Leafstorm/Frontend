'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DocList from '@/components/screen/DocList';

export default function Files() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderId = searchParams.get('folderId');
    const folderName = searchParams.get('folderName');

    useEffect(() => {
        // Redirect to /solution if no folderName is provided

        if (!folderId) {
            //router.push('/solution');
        }
    }, [folderId, router]);

    // Don't render anything during redirect
    if (!folderId) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container max-w-[1200px] justify-center m-auto mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 text-center">{folderName}</h1>
                <DocList folderId={folderId}/>
            </div>
        </main>
    );
}