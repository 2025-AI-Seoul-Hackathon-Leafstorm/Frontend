import React, { Suspense } from 'react';
import FilesMain from './FilesMain';

export default function Files(): React.JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FilesMain />
        </Suspense>
    );
} 