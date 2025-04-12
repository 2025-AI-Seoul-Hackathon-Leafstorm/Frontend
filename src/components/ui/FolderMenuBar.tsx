import React from "react";

interface FolderMenuBarProps {
  onCreateFolder: () => void;
}

const FolderMenuBar: React.FC<FolderMenuBarProps> = ({ onCreateFolder }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">My Folders</h1>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={onCreateFolder}
      >
        Create New Folder
      </button>
    </div>
  );
};

export default FolderMenuBar; 