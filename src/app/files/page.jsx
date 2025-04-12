import React, { Suspense } from 'react';
import FilesMain from './FilesMain';

export default function Files() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FilesMain />
        </Suspense>
    );
}