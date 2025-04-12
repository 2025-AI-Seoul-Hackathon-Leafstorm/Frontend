import React, { Suspense } from 'react';
import DetailMain from './DetailMain';

export default function Detail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DetailMain />
        </Suspense>
    );
}