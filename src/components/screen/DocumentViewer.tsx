import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DocumentViewerProps {
  file: File | null;
  isLoading?: boolean;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  file,
  isLoading = false
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Generate URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileType(file.type);

      // Revoke URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [file]);

  // Automatically adjust zoom based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.9); // 모바일에서는 살짝 줄임
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setScale(1);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Render appropriate viewer based on file type such as PDF or HTML
  const renderFileViewer = () => {
    if (!fileUrl) return null;

    // If the file is a PDF
    if (fileType === 'application/pdf') {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full border-0"
          title="PDF Viewer"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        />
      );
    }

    // If the file is an image
    if (fileType.startsWith('image/')) {
      return (
        <div
          className="relative max-w-full max-h-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <Image
            src={fileUrl}
            alt="Uploaded Image"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      );
    }

    // If the file is a text file (HTML, TXT, etc.)
    if (fileType === 'text/plain' || fileType === 'text/html') {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full border-0"
          title="Text Viewer"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        />
      );
    }

    // Unsupported file type
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="font-medium text-lg">Unsupported file format</h3>
        <p className="text-gray-500 mt-2">
          Preview is not supported for {fileType} files.
          <br />Only PDF, image, and text files can be previewed.
        </p>
      </div>
    );
  };

  return (
    <div
      ref={viewerRef}
      className={`h-full flex flex-col rounded-lg overflow-hidden border shadow-sm transition-colors ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
    >
      {/* Document top toolbar */}
      <div className={`p-3 border-b flex justify-between items-center ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'
        }`}>
        <div className="flex items-center">
          <span className="font-medium truncate max-w-[150px] md:max-w-xs">
            {file ? file.name : 'Document Title'}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            title="Zoom Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <span className="text-xs font-medium">{Math.round(scale * 100)}%</span>

          <button
            onClick={handleZoomIn}
            className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            title="Zoom In"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <button
            onClick={handleResetZoom}
            className={`p-1.5 rounded text-xs ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            title="Original Size"
          >
            100%
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Document content */}
      <div
        className={`flex-1 overflow-auto ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-3"></div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Loading document...
              </p>
            </div>
          </div>
        ) : fileUrl ? (
          renderFileViewer()
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No document available
            </h3>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Please upload a document to start studying
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;