import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { Upload, FileText, Edit2, Trash2 } from 'lucide-react';

// Import UI components
import ActionButton from '@/components/ui/ActionButton';
import DropdownMenu from '@/components/ui/DropdownMenu';
import DropdownItem from '@/components/ui/DropdownItem';
import TagBadge from '@/components/ui/TagBadge';

export default function FileHandleMenuBar({ selectedFile, folderName }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Use passed folderName prop, or get from URL if not provided
    const folderNameFromUrl = searchParams.get('folderName');
    const activeFolderName = folderName || folderNameFromUrl;

    if (!selectedFile && !activeFolderName) return null;

    const uploadFileHandler = () => {
        alert("Upload file logic not implemented");
    };

    const openDetailHandler = () => {
        router.push('/files/detail?folderName=' + encodeURIComponent(activeFolderName) + '&fileName=' + encodeURIComponent(selectedFile));
    };

    const renameFileHandler = () => {
        const newName = prompt('Enter new name for the file:', selectedFile);
        if (newName) {
            alert(`Renaming "${selectedFile}" to "${newName}" (not implemented)`);
        }
    };

    const deleteFileHandler = () => {
        if (confirm(`Are you sure you want to delete "${selectedFile}"?`)) {
            alert(`Deleting "${selectedFile}" (not implemented)`);
            if (typeof window !== 'undefined' && typeof router.replace === 'function') {
                const url = new URL(window.location.href);
                url.searchParams.delete('file');
                router.replace(url.toString());
            }
        }
    };

    return (
        <div className="mb-4 p-2 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
                {/* Left section */}
                <div className="flex items-center space-x-2">
                    <ActionButton
                        variant="success"
                        icon={<Upload size={16} />}
                        onClick={uploadFileHandler}
                    >
                        Upload
                    </ActionButton>

                    {activeFolderName && (
                        <div className="text-gray-600 px-3">
                            <span className="font-medium">Folder:</span> {activeFolderName}
                        </div>
                    )}
                </div>

                {/* Right section - File actions */}
                {selectedFile && (
                    <div className="flex items-center">
                        <TagBadge variant="primary" className="mr-4">
                            {selectedFile}
                        </TagBadge>

                        {/* Desktop view - buttons */}
                        <div className="hidden md:flex space-x-2">
                            <ActionButton
                                variant="primary"
                                icon={<FileText size={16} />}
                                onClick={openDetailHandler}
                            >
                                Open
                            </ActionButton>
                            <ActionButton
                                variant="warning"
                                icon={<Edit2 size={16} />}
                                onClick={renameFileHandler}
                            >
                                Rename
                            </ActionButton>
                            <ActionButton
                                variant="danger"
                                icon={<Trash2 size={16} />}
                                onClick={deleteFileHandler}
                            >
                                Delete
                            </ActionButton>
                        </div>

                        {/* Mobile view - dropdown */}
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownItem
                                    icon={<FileText size={16} />}
                                    onClick={openDetailHandler}
                                >
                                    Open
                                </DropdownItem>
                                <DropdownItem
                                    icon={<Edit2 size={16} />}
                                    onClick={renameFileHandler}
                                >
                                    Rename
                                </DropdownItem>
                                <DropdownItem
                                    icon={<Trash2 size={16} />}
                                    variant="danger"
                                    onClick={deleteFileHandler}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}