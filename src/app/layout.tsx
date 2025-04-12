'use client';

import React from 'react';

import '../styles/globals.css';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>name placeholder</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Learning is fun! If there is personal AI tutor!" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}