'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import FolderCard from '@/components/ui/FolderCard';
import RenameFolderPopup from '@/components/ui/RenameFolderPopup';
import CreateFolderPopup from '@/components/ui/CreateFolderPopup';
import SearchBar from '@/components/ui/SearchBar';
import FolderActionButtons from '@/components/ui/FolderActionButtons';
import EmptyStateMessage from '@/components/ui/EmptyStateMessage';
import { Folder, getFolders, createFolder } from '@/services/folderService';

export default function FoldersMain(): React.JSX.Element {
    const router = useRouter();

    const [folders, setFolders] = useState<Folder[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
    const [isRenaming, setIsRenaming] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        try {
            setIsLoading(true);
            const data = await getFolders();
            setFolders(data.folders);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch folders:", err);
            setError("Failed to load folders. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get the selected folder object
    const selectedFolder = folders.find(folder => folder.name === selectedFolderName);

    // Handle click outside to deselect folder
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.folder-card') &&
                !target.closest('.rename-popup') &&
                !target.closest('.create-popup') &&
                !target.closest('.action-buttons')) {
                setSelectedFolderName(null);
                setIsRenaming(false);
                setIsCreating(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateFolderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsCreating(true);
    };

    const handleCreateFolderSubmit = async (folderName: string) => {
        try {
            setIsLoading(true);
            const newFolder = await createFolder(folderName);
            setFolders([...folders, newFolder]);
            setIsCreating(false);
            setError(null);
        } catch (err) {
            console.error("Failed to create folder:", err);
            setError("Failed to create folder. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectFolder = (name: string) => {
        setSelectedFolderName(name);
    };

    const handleOpenFolder = () => {
        if (selectedFolder) {
            router.push(`/files?folderName=${encodeURIComponent(selectedFolder.name)}`);
        }
    };

    const handleRenameFolder = () => {
        if (selectedFolder) {
            setIsRenaming(true);
            setNewFolderName(selectedFolder.name);
        }
    };

    const handleRenameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (newFolderName.trim() && selectedFolderName) {
            setFolders(folders.map(folder =>
                folder.name === selectedFolderName
                    ? { ...folder, name: newFolderName.trim() }
                    : folder
            ));
            setIsRenaming(false);
            setNewFolderName("");
        }
    };

    const handleDeleteFolder = () => {
        if (selectedFolderName && window.confirm("Are you sure you want to delete this folder?")) {
            setFolders(folders.filter(folder => folder.name !== selectedFolderName));
            setSelectedFolderName(null);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section with Action Buttons */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">My Folders</h1>
                    <div className="flex items-center gap-4 action-buttons">
                        {/* Rename Popup */}
                        <RenameFolderPopup
                            isOpen={isRenaming}
                            folderName={newFolderName}
                            onNameChange={setNewFolderName}
                            onSubmit={handleRenameSubmit}
                            onCancel={() => setIsRenaming(false)}
                        />

                        {/* Create Folder Popup */}
                        <CreateFolderPopup
                            isOpen={isCreating}
                            onSubmit={handleCreateFolderSubmit}
                            onCancel={() => setIsCreating(false)}
                        />

                        {/* Action Buttons in the specified order */}
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={handleCreateFolderClick}
                            disabled={isLoading}
                        >
                            Create New Folder
                        </button>

                        {selectedFolderName && (
                            <FolderActionButtons
                                onOpen={handleOpenFolder}
                                onRename={handleRenameFolder}
                                onDelete={handleDeleteFolder}
                            />
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Search Section */}
                <div className="mb-8 flex justify-center">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        placeholder="Search folders..."
                    />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* Folders Grid */}
                {!isLoading && (
                    <div className="flex flex-wrap justify-center gap-6">
                        {filteredFolders.length > 0 ? (
                            filteredFolders.map((folder) => (
                                <div key={folder.name} className="folder-card">
                                    <FolderCard
                                        name={folder.name}
                                        title={folder.name}
                                        isSelected={selectedFolderName === folder.name}
                                        onSelect={handleSelectFolder}
                                    />
                                </div>
                            ))
                        ) : (
                            <EmptyStateMessage
                                searchQuery={searchQuery}
                                emptyMessage="No folders yet. Create your first folder!"
                                noResultsMessage="No folders found matching your search."
                            />
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}