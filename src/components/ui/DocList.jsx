'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileHandleMenuBar from './FileHandleMenuBar';

export default function DocList({ folderName }) {
    const router = useRouter();
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://3438ywb1da.execute-api.us-east-1.amazonaws.com/folders/${folderName}/documents`);
                const data = await response.json();
                setDocuments(data.documents || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching documents:', err);
                setError('Failed to load documents. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (folderName) {
            fetchDocuments();
        }
    }, [folderName]);

    const doubleClickHandler = (document) => {
        router.push(`/files/detail2?folderName=${folderName}&documentTitle=${encodeURIComponent(document.title)}`);
    };

    if (isLoading) {
        return <div className="p-4">Loading documents...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    if (documents.length === 0) {
        return <div className="p-4">No documents found in this folder.</div>;
    }

    return (
        <div className="w-full">
            <FileHandleMenuBar folderName={folderName} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                        onDoubleClick={() => doubleClickHandler(doc)}
                    >
                        <h3 className="font-medium text-gray-900">{doc.title}</h3>
                        <p className="text-sm text-gray-500">Created: {new Date(doc.createdAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Pages: {doc.totalPages}</p>
                        <p className="text-sm text-gray-500">File Type: {doc.fileType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 