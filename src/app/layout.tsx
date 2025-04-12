'use client';

import React, { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
<<<<<<< HEAD
import '@/styles/globals.css';
=======
>>>>>>> ref#6/refactoringProjects

import '../styles/globals.css';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, []);

<<<<<<< HEAD
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
=======
    return (
        <html lang="en">
        <head>
            <title>namePlaceholder</title>
        </head>
        <body>
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    );
>>>>>>> ref#6/refactoringProjects
}