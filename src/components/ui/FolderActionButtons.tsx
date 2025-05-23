import React from 'react';
import ActionButton from './ActionButton';

interface FolderActionButtonsProps {
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const FolderActionButtons: React.FC<FolderActionButtonsProps> = ({ 
  onOpen, 
  onRename, 
  onDelete 
}) => {
  return (
    <>
      <ActionButton 
        onClick={onOpen}
        variant="primary"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
        </svg>}
      >
        Open
      </ActionButton>
      <ActionButton 
        onClick={onRename}
        variant="warning"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>}
      >
        Rename
      </ActionButton>
      <ActionButton 
        onClick={onDelete}
        variant="danger"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>}
      >
        Delete
      </ActionButton>
    </>
  );
};

export default FolderActionButtons; 