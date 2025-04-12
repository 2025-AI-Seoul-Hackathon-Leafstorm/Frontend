'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import FileHandleMenuBar from '@/components/ui/FileHandleMenuBar';
// need import services data from the server for the view of documents

export default function DocList({ folderId }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedFile = searchParams.get('file');

    // State for folder existence in database
    const [folderExists, setFolderExists] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch('https://3438ywb1da.execute-api.us-east-1.amazonaws.com/folders');
                const result = await response.json();
                console.log(result);

                if (Array.isArray(result.folders)) {
                    const folderIds = result.folders.map(folder => folder.name);
                    setFolders(folderIds);
                } else {
                    console.error("Unexpected API response:", result);
                }
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };

        fetchFolders();
    }, []);

    useEffect(() => {
        // Simulate checking if folder exists in database
        const checkFolderExists = async () => {
            setIsLoading(true);
            try {
                const exists = folders.includes(folderId);
                setFolderExists(exists);

                if (exists) {
                    const response = await fetch(`https://3438ywb1da.execute-api.us-east-1.amazonaws.com/folders/${folderId}/documents`);
                    const result = await response.json();

                    console.log(result);

                    if (Array.isArray(result.documents)) {
                        setData(result.documents);
                    } else {
                        console.error("Unexpected documents response:", result);
                        setData([]);
                    }
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error checking folder or fetching documents:", error);
                setFolderExists(false);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (folderId) {
            checkFolderExists();
        }
    }, [folderId, folders]);

    const clickHandler = (documentId) => {
        const params = new URLSearchParams(window.location.search);
        params.set('file', documentId);
        router.push(`?${params.toString()}`);
    };

    const doubleClickHandler = (documentId) => {
        router.push(`/files/detail?folderId=${encodeURIComponent(folderId)}&documentId=${encodeURIComponent(documentId)}`);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (!folderExists) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
                <h2 className="text-xl font-semibold text-red-700 mb-2">Folder Not Found</h2>
                <p className="text-red-600 mb-4">
                    The folder "{folderId}" does not exist in the database.
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                    onClick={() => router.push('/folders')}
                >
                    Return to Folders
                </button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <FileHandleMenuBar selectedFile={selectedFile} folderId={folderId} />
            <table className="min-w-full bg-white border border-none">
                <thead>
                <tr className="text-center bg-gray-300">
                    <th className="px-4 py-2 border-b">Title</th>
                    <th className="px-4 py-2 border-b">File Type</th>
                    <th className="px-4 py-2 border-b">Pages</th>
                    <th className="px-4 py-2 border-b">Created At</th>
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                            No documents found. Please upload a document.
                        </td>
                    </tr>
                ) : (
                    data.map((file, index) => (
                        <tr
                            key={index}
                            className={`text-center cursor-pointer hover:bg-gray-200 ${selectedFile === file.id ? 'bg-blue-100' : ''}`}
                            onClick={() => clickHandler(file.id)}
                            onDoubleClick={() => doubleClickHandler(file.id)}
                        >
                            <td className="px-4 py-2 border-b">{file.title || 'Unnamed Document'}</td>
                            <td className="px-4 py-2 border-b">{file.fileType || 'Unknown'}</td>
                            <td className="px-4 py-2 border-b">{file.totalPages || 0}</td>
                            <td className="px-4 py-2 border-b">{new Date(file.createdAt).toLocaleString()}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}