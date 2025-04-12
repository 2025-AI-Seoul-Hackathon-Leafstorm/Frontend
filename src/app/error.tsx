'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.JSX.Element {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
                <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">500</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                Something went wrong!
                            </h1>
                            <p className="mt-1 text-base text-gray-500">
                                {process.env.NODE_ENV === 'development' ? error?.message || 'An unexpected error occurred.' : 'An unexpected error occurred.'}
                            </p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                            <button
                                onClick={reset}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Try again
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Go back home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 