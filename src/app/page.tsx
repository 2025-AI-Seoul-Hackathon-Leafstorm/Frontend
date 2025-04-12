'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/screen/FileUpload';
import DocumentViewer from '@/components/screen/DocumentViewer';
import AIChat from '@/components/screen/AIChat';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 파일 업로드 처리
  const handleFileUpload = async (uploadedFile: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // 파일 유효성 검사
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'text/html'];
      if (!validTypes.includes(uploadedFile.type)) {
        setError(`지원하지 않는 파일 형식입니다: ${uploadedFile.type}`);
        setIsProcessing(false);
        return;
      }
      
      // 실제 API에서는 여기서 파일 처리 및 텍스트 추출 등을 수행
      // 예: const textContent = await extractTextFromFile(uploadedFile);
      
      // 파일 로드 시뮬레이션 (실제 구현에서는 필요 없음)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFile(uploadedFile);
    } catch (err) {
      console.error('파일 처리 오류:', err);
      setError('파일을 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  // AI 메시지 전송 처리 (나중에 실제 API와 연동)
  const handleSendMessage = async (message: string): Promise<string> => {
    // 실제 구현에서는 API 호출
    // 현재는 단순히 Promise를 반환하는 예시
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 간단한 응답 시뮬레이션
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
      {/* 헤더 */}
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 파일 업로드 섹션 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">1. 학습 문서 선택</h2>
          <FileUpload 
            onFileUpload={handleFileUpload} 
            isUploading={isProcessing}
            acceptedTypes=".pdf,.jpg,.jpeg,.png,.txt,.html"
            maxSizeMB={10}
          />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              <strong>오류:</strong> {error}
            </div>
          )}
        </div>
        
        {/* 문서 뷰어 & AI 채팅 섹션 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">2. 문서 학습 및 질문</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 문서 뷰어 */}
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
              <DocumentViewer 
                file={file}
                isLoading={isProcessing}
              />
            </div>
            
            {/* AI 채팅 */}
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
              <AIChat 
                documentTitle={file?.name}
                onSendMessage={handleSendMessage}
                isDocumentLoaded={!!file}
              />
            </div>
          </div>
        </div>
        
        {/* 사용 가이드 */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">사용 가이드</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">1</div>
                <h4 className="font-medium">문서 업로드</h4>
              </div>
              <p className="text-gray-600 ml-10">
                학습하고 싶은 PDF, 이미지, 텍스트 문서를 업로드하세요.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">2</div>
                <h4 className="font-medium">내용 검토</h4>
              </div>
              <p className="text-gray-600 ml-10">
                좌측에서 문서 내용을 검토하고, 이해가 필요한 부분을 선택하세요.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">3</div>
                <h4 className="font-medium">AI와 대화</h4>
              </div>
              <p className="text-gray-600 ml-10">
                우측 채팅창에서 문서 내용에 대해 자유롭게 질문하고 대화하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}