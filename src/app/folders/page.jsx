import React, { Suspense } from 'react';
import FolderMain from './FolderMain';

export default function Folders() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <FolderMain />
      </Suspense>
  );
}