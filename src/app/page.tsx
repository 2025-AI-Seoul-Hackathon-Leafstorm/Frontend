'use client';

import React, { useState } from 'react';
<<<<<<< HEAD
import FileUpload from '@/components/screen/FileUpload';
import DocumentViewer from '@/components/screen/DocumentViewer';
import AIChat from '@/components/screen/AIChat';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
=======

import FileUpload from '@/components/screen/FileUpload';
import DocumentViewer from '@/components/screen/DocumentViewer';
import AIChat from '@/components/screen/AIChat';
import UserGuide from "@/components/screen/UserGuide";
>>>>>>> ref#6/refactoringProjects

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handles file upload and validation
  const handleFileUpload = async (uploadedFile: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'text/html'];
      if (!validTypes.includes(uploadedFile.type)) {
        setError(`Unsupported file type: ${uploadedFile.type}`);
        setIsProcessing(false);
        return;
      }

      // TODO: Integrate Upstage API to analyze the document

      // Simulate file loading (for demo purposes only)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setFile(uploadedFile);
    } catch (error) {
      console.error('File processing error', error);
      setError('Error while processing the file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handles sending a message to AI and returning a response
  const handleSendMessage = async (message: string): Promise<string> => {
    // TODO: Replace with actual API call
    // Currently simulating with a delayed promise
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate AI response based on message content
    if (message.toLowerCase().includes('요약') || message.toLowerCase().includes('정리')) {
      return '📝 **문서 요약**\n\n이 문서는 인공지능 기술의 핵심 개념과 발전 과정을 설명하고 있습니다. 주요 내용은 다음과 같습니다:\n\n1. 인공지능의 정의와 역사적 발전\n2. 기계학습의 기본 유형 (지도, 비지도, 강화학습)\n3. 딥러닝의 원리와 신경망 구조\n4. 자연어 처리와 컴퓨터 비전의 최신 발전\n5. AI의 윤리적 고려사항과 미래 전망';
    } else if (message.toLowerCase().includes('인공지능') || message.toLowerCase().includes('ai')) {
      return '🤖 **인공지능(AI)** 은 인간의 학습능력, 추론능력, 지각능력을 인공적으로 구현한 컴퓨터 시스템입니다.\n\n이 문서에서는 인공지능의 다양한 측면과 현대적 접근법을 다루고 있습니다.';
    } else {
      return '질문하신 내용에 대한 정보를 문서에서 분석해보았습니다. 더 구체적인 질문이 있으시면 알려주세요.';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
<<<<<<< HEAD
      {/* 헤더 */}
      <Header />
      
=======
>>>>>>> ref#6/refactoringProjects
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* File upload section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">1. Select a Learning Document</h2>
          <FileUpload
            onFileUpload={handleFileUpload}
            isUploading={isProcessing}
            acceptedTypes=".pdf,.jpg,.jpeg,.png,.txt,.html"
            maxSizeMB={10}
          />

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Document viewer & AI chat section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">2. Study and Ask Questions About the Document</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document viewer */}
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
              <DocumentViewer
                file={file}
                isLoading={isProcessing}
              />
            </div>

            {/* AI chat */}
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
              <AIChat
                documentTitle={file?.name}
                onSendMessage={handleSendMessage}
                isDocumentLoaded={!!file}
              />
            </div>
          </div>
        </div>

        {/* User guide */}
        <UserGuide />
      </div>
<<<<<<< HEAD
      
      {/* Footer */}
      <Footer />
=======
>>>>>>> ref#6/refactoringProjects
    </main>
  );
}