import React, { FormEvent, ChangeEvent, useState } from 'react';

interface CreateFolderPopupProps {
  isOpen: boolean;
  onSubmit: (folderName: string) => void;
  onCancel: () => void;
}

const CreateFolderPopup = ({ 
  isOpen, 
  onSubmit, 
  onCancel 
}: CreateFolderPopupProps) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!folderName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }
    
    onSubmit(folderName.trim());
    setFolderName('');
    setError('');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 mb-1">
              Folder Name
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFolderName(e.target.value);
                if (error) setError('');
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter folder name"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderPopup; 