import React from 'react';

const EmptyStateMessage = ({ 
  searchQuery, 
  emptyMessage = "No Clarity folders yet.", 
  noResultsMessage = "No Clarity folders found matching your search." 
}) => {
  return (
    <div className="w-full text-center py-12">
      <div className="text-gray-500 text-lg">
        {searchQuery ? noResultsMessage : emptyMessage}
      </div>
    </div>
  );
};

export default EmptyStateMessage; 