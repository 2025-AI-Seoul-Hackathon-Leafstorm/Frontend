'use client';

import React, { useState } from 'react';
import MenuBar from '@/components/ui/MenuBar';
import FolderCard from '@/components/ui/FolderCard';
export default function Solutions() {
    const folders = [
        { id: 1, name: "Component A" },
        { id: 2, name: "Component B" },
        { id: 3, name: "Component C" },
        { id: 4, name: "Another Component" },
      ];
      const [searchQuery, setSearchQuery] = useState("");
      const filteredfolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
   
  return (
        
        <main className="min-h-screen bg-gray-50">
            

            <MenuBar></MenuBar>
            {/* 폴더 추가 UI */}
      <div className="p-4  flex justify-end items-center ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter folder name"
          className="border p-2 rounded"
        />
        
      </div>
            
      <div className="flex  justify-start items-center flex-wrap gap-4">
        {filteredfolders.length > 0 ? (
          filteredfolders.map((folder) => (
       <div
              key={folder.id}
              className="p-4 flex justify-start items-start"
            >
              <FolderCard title ={folder.name}></FolderCard>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No components found.</div>
        )}
      </div>
        </main>
    );
}