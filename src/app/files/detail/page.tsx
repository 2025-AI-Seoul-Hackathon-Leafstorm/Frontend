import React, { Suspense } from 'react';
import DetailMain from './DetailMain';

export default function Detail(): React.ReactElement {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DetailMain />
        </Suspense>
    );
} 