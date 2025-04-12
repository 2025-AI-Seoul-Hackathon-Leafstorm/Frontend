import React, { Suspense } from 'react';
import Detail2Main from './Detail2Main';

export default function Detail2() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Detail2Main />
        </Suspense>
    );
}