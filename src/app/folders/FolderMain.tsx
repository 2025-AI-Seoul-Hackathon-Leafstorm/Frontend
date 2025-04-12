'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import FolderCard from '@/components/ui/FolderCard';
import RenameFolderPopup from '@/components/ui/RenameFolderPopup';
import SearchBar from '@/components/ui/SearchBar';
import FolderActionButtons from '@/components/ui/FolderActionButtons';
import EmptyStateMessage from '@/components/ui/EmptyStateMessage';

interface Folder {
    name: string;
    documentCount: number;
}

export default function FoldersMain(): React.JSX.Element {
    const router = useRouter();

    const [folders, setFolders] = useState<Folder[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
    const [isRenaming, setIsRenaming] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>("");

    useEffect(() => {
        async function fetchFolders() {
            try {
                const response = await fetch("https://3438ywb1da.execute-api.us-east-1.amazonaws.com/folders");
                const data = await response.json();
                setFolders(data.folders);
            } catch (err) {
                console.error("Failed to fetch folders:", err);
            }
        }

        fetchFolders();
    }, []);

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
                !target.closest('.action-buttons')) {
                setSelectedFolderName(null);
                setIsRenaming(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateFolder = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Add new folder logic
        const newFolder: Folder = {
            name: "New Folder",
            documentCount: 0
        };
        setFolders([...folders, newFolder]);
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

                        {/* Action Buttons in the specified order */}
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={handleCreateFolder}
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

                {/* Search Section */}
                <div className="mb-8 flex justify-center">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        placeholder="Search folders..."
                    />
                </div>

                {/* Folders Grid */}
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
            </div>
        </main>
    );
}