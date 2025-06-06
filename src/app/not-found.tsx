'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound(): React.JSX.Element {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
                <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                Page not found
                            </h1>
                            <p className="mt-1 text-base text-gray-500">
                                Sorry, we couldn&#39;t find the page you&#39;re looking for.
                            </p>
                        </div>
                        <div className="mt-10 flex justify-center sm:justify-start space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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