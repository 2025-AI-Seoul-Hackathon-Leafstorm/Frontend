import React from 'react';

const RenameFolderPopup = ({ 
  isOpen, 
  folderName, 
  onNameChange, 
  onSubmit, 
  onCancel 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="rename-popup bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64">
      <h3 className="text-lg font-semibold mb-2">Rename Clarity Folder</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => {
            e.stopPropagation();
            onNameChange(e.target.value);
          }}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenameFolderPopup; 