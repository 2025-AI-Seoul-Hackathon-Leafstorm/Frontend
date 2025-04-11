// src/components/FileUpload.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  isUploading = false,
  acceptedTypes = ".pdf,.docx,.pptx,.txt",
  maxSizeMB = 10
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<{name: string; size: string} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  // 파일 크기를 사람이 읽기 쉬운 형태로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // 드래그 앤 드롭 이벤트 핸들러
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // 파일 드롭 처리
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // 파일 선택 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  // 파일 처리 로직
  const handleFile = (file: File) => {
    // 파일 유형 검증
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const validExtensions = acceptedTypes.split(',');
    
    if (!validExtensions.some(ext => fileExtension.includes(ext))) {
      setError(`지원되지 않는 파일 형식입니다. ${acceptedTypes} 파일만 업로드 가능합니다.`);
      return;
    }
    
    // 파일 크기 검증
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`파일 크기가 너무 큽니다. ${maxSizeMB}MB 이하의 파일만 업로드 가능합니다.`);
      return;
    }
    
    // 파일 정보 저장 및 부모 컴포넌트에 전달
    setFileInfo({
      name: file.name,
      size: formatFileSize(file.size)
    });
    onFileUpload(file);
  };
  
  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!isUploading && inputRef.current) {
      inputRef.current.click();
    }
  };
  
  // 선택된 파일 취소
  const handleCancelFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileInfo(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  // 드롭존 외부 클릭 감지하여 드래그 상태 해제
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropZoneRef.current && !dropZoneRef.current.contains(e.target as Node)) {
        setDragActive(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mb-6">
      <div 
        ref={dropZoneRef}
        className={`
          relative flex flex-col items-center justify-center w-full p-6 
          border-2 border-dashed rounded-lg transition-all duration-200 
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : fileInfo 
              ? 'border-green-400 bg-green-50' 
              : error 
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-gray-100'
          }
          ${isUploading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
        `}
        onClick={handleUploadClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept={acceptedTypes}
          onChange={handleChange}
          disabled={isUploading}
        />
        
        {/* 업로드 중 상태 */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg z-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-2"></div>
              <p className="text-sm font-medium text-gray-700">문서 처리 중...</p>
            </div>
          </div>
        )}
        
        {/* 파일 선택됨 */}
        {fileInfo ? (
          <div className="flex flex-col items-center">
            <div className="mb-3 bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mb-1 text-sm font-medium text-gray-900">{fileInfo.name}</p>
            <p className="text-xs text-gray-500">{fileInfo.size}</p>
            <button
              className="mt-3 text-sm text-red-500 hover:text-red-700 flex items-center"
              onClick={handleCancelFile}
              disabled={isUploading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              파일 삭제
            </button>
          </div>
        ) : error ? (
          // 에러 상태
          <div className="flex flex-col items-center">
            <div className="mb-3 bg-red-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mb-1 text-sm font-medium text-red-600">{error}</p>
            <p className="text-xs text-gray-500 text-center">다른 파일을 선택해 주세요</p>
          </div>
        ) : (
          // 기본 상태
          <div className="flex flex-col items-center">
            <div className="mb-3 bg-gray-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              <span className="font-semibold text-blue-600">파일을 선택</span>하거나 여기에 드래그하세요
            </p>
            <p className="text-xs text-gray-500 text-center">
              {acceptedTypes.replace(/\./g, '').toUpperCase().split(',').join(', ')} 파일만 지원됩니다 (최대 {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>
      
      {/* 도움말 텍스트 */}
      <p className="mt-2 text-xs text-gray-500 text-center">
        업로드한 문서는 AI 학습 도우미를 위해 분석됩니다. 개인정보가 포함된 문서는 주의해주세요.
      </p>
    </div>
  );
};

export default FileUpload;