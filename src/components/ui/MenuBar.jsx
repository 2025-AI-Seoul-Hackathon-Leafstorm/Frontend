import React, { useState } from "react";

const MenuBar = () => {
  
  // addFolder func
  const addFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName]);
      setNewFolderName(""); // 입력 필드 초기화
    }
  };

  return (
    <div>
      {/* navigation bar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-end items-center">
       


       {/* add button */}
          <button
          onClick={addFolder}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
        >
          Add Folder
        </button>
        
      </nav>

      
    </div>
  );
};

export default MenuBar;
