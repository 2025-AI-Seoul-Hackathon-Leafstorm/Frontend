import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { version as pdfjsVersion } from 'pdfjs-dist/package.json';

export default function PdfWorkerProvider() {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    }, []);

    return null; // no visual output, just effect
}