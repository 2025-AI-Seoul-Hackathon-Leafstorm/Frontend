'use client';

import React, { Suspense } from 'react';
import FolderMain from './FolderMain';

export default function Folders(): React.JSX.Element {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <FolderMain />
      </Suspense>
  );
} 