'use client';

import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // PDF.js 워커 설정
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}