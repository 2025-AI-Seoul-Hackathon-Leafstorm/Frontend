'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import FolderMenuBar from '@/components/ui/FolderMenuBar';
import FolderCard from '@/components/ui/FolderCard';
import ActionButton from '@/components/ui/ActionButton';
import RenameFolderPopup from '@/components/ui/RenameFolderPopup';
import SearchBar from '@/components/ui/SearchBar';
import FolderActionButtons from '@/components/ui/FolderActionButtons';
import EmptyStateMessage from '@/components/ui/EmptyStateMessage';

export default function FoldersMain() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderName = searchParams.get('folderName');

    const [folders, setFolders] = useState([
        { id: 1, name: "Default" },
        { id: 2, name: "Database" },
        { id: 3, name: "Algorithm" },
        { id: 4, name: "Etc" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get the selected folder object
    const selectedFolder = folders.find(folder => folder.id === selectedFolderId);

    // Handle click outside to deselect folder
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.folder-card') &&
                !event.target.closest('.rename-popup') &&
                !event.target.closest('.action-buttons')) {
                setSelectedFolderId(null);
                setIsRenaming(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateFolder = (e) => {
        e.stopPropagation();
        // Add new folder logic
        const newFolder = {
            id: folders.length + 1,
            name: "New Folder"
        };
        setFolders([...folders, newFolder]);
    };

    const handleSelectFolder = (id) => {
        setSelectedFolderId(id);
    };

    const handleOpenFolder = (e) => {
        e.stopPropagation();
        if (selectedFolder) {
            router.push(`/files?folderId=${selectedFolder.id}&folderName=${encodeURIComponent(selectedFolder.name)}`);
        }
    };

    const handleRenameFolder = (e) => {
        e.stopPropagation();
        if (selectedFolder) {
            setIsRenaming(true);
            setNewFolderName(selectedFolder.name);
        }
    };

    const handleRenameSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (newFolderName.trim() && selectedFolderId) {
            setFolders(folders.map(folder =>
                folder.id === selectedFolderId
                    ? { ...folder, name: newFolderName.trim() }
                    : folder
            ));
            setIsRenaming(false);
            setNewFolderName("");
        }
    };

    const handleDeleteFolder = (e) => {
        e.stopPropagation();
        if (selectedFolderId && window.confirm("Are you sure you want to delete this folder?")) {
            setFolders(folders.filter(folder => folder.id !== selectedFolderId));
            setSelectedFolderId(null);
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

                        {selectedFolderId && (
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search folders..."
                    />
                </div>

                {/* Folders Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {filteredFolders.length > 0 ? (
                        filteredFolders.map((folder) => (
                            <div key={folder.id} className="folder-card">
                                <FolderCard
                                    id={folder.id}
                                    title={folder.name}
                                    isSelected={selectedFolderId === folder.id}
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