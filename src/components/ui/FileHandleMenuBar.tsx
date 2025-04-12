'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { Upload, FileText, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { uploadFileToAITutor } from '@/utils/fileUtils';

interface FileHandleMenuBarProps {
    selectedFile?: string;
    folderName?: string;
}

export default function FileHandleMenuBar({ selectedFile, folderName }: FileHandleMenuBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Use passed folderName prop, or get from URL if not provided
    const folderNameFromUrl = searchParams.get('folderName');
    const activeFolderName = folderName || folderNameFromUrl;
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    if (!activeFolderName) return null;

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            // Upload the file using the AI tutor API
            setUploadProgress(50);
            setUploadProgress(60);
            setUploadProgress(70);
            const response = await uploadFileToAITutor(file, activeFolderName);
            const data = await response.json();

            setUploadProgress(80);
            setUploadProgress(90);
            if (!data.filename) {
                throw new Error('Invalid response from server');
            }
            
            console.log('Upload successful:', data);
            
            // Redirect to the document detail page
            router.push(`/files/detail?folderName=${activeFolderName}&documentTitle=${encodeURIComponent(data.document_name)}`);
        } catch (err) {
            console.error('Error uploading file:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload file. Please try again.');
        } finally {
            setIsUploading(false);
            setUploadProgress(100);
            // Clear the file input
            event.target.value = '';
        }
    };

    const openDocument = () => {
        if (selectedFile) {
            router.push(`/files/detail?folderName=${activeFolderName}&documentTitle=${encodeURIComponent(selectedFile)}`);
        }
    };

    const editDocumentName = () => {
        if (selectedFile) {
            const newName = prompt('Enter new name for the document:', selectedFile);
            if (newName && newName.trim() !== '') {
                // Here you would implement the API call to rename the document
                alert(`Document renamed to: ${newName} (API call would be implemented here)`);
            }
        }
    };

    const deleteDocument = () => {
        if (selectedFile) {
            if (confirm(`Are you sure you want to delete "${selectedFile}"?`)) {
                // Here you would implement the API call to delete the document
                alert(`Document "${selectedFile}" deleted (API call would be implemented here)`);
                // Refresh the page or update the document list
                router.refresh();
            }
        }
    };

    const goBackToFolders = () => {
        router.push('/folders');
    };

    return (
        <div className="bg-white p-4 border-b">
            {/* Folder and selected document info */}
            <div className="mb-4 text-gray-600">
                Folder: {activeFolderName}
                {selectedFile && (
                    <span className="ml-2 text-blue-600">
                        | Selected: {selectedFile}
                    </span>
                )}
            </div>
            
            {/* All buttons in one row */}
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                        onClick={goBackToFolders}
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Folders
                    </button>
                    <label className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center">
                        <Upload size={16} className="mr-1" />
                        Upload Document
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                </div>
                
                {selectedFile && (
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                            onClick={openDocument}
                        >
                            <FileText size={16} className="mr-1" />
                            Open
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
                            onClick={editDocumentName}
                        >
                            <Edit2 size={16} className="mr-1" />
                            Rename
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                            onClick={deleteDocument}
                        >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
            
            {isUploading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-medium mb-2">Uploading...</h3>
                        <div className="w-64 h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{uploadProgress}%</p>
                    </div>
                </div>
            )}
            
            {error && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-medium text-red-500 mb-2">Error</h3>
                        <p>{error}</p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => setError(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 