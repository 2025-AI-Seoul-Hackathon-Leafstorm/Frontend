'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DocumentViewer from '@/components/screen/DocumentViewer';
import AIChat from '@/components/screen/AIChat';
import UserGuide from "@/components/screen/UserGuide";
import MarkdownPreview from '@/components/screen/MarkdownPreview';
import ChatbotModal from '@/components/ui/ChatbotModal';

export default function Detail() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const folderName = searchParams.get('folderName');
    const fileName = searchParams.get('fileName');

    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('summary');
    const aiSummary = '📝 **문서 요약**\n\n이 문서는 인공지능 기술의 핵심 개념과 발전 과정을 설명하고 있습니다. 주요 내용은 다음과 같습니다:\n\n1. 인공지능의 정의와 역사적 발전\n2. 기계학습의 기본 유형 (지도, 비지도, 강화학습)\n3. 딥러닝의 원리와 신경망 구조\n4. 자연어 처리와 컴퓨터 비전의 최신 발전\n5. AI의 윤리적 고려사항과 미래 전망';

    useEffect(() => {
        // Redirect if no folder or file name is provided
        if (!folderName || !fileName) {
            router.push('/solution');
            return;
        }

        // Fetch file data (mock implementation)
        const fetchFile = async () => {
            try {
                setIsProcessing(true);
                // This is a mock fetch - replace with your actual API call
                // In a real implementation, you would fetch the file from your backend
                await new Promise(resolve => setTimeout(resolve, 800));

                // Create a mock file object based on the file name
                const mockFile = new File([""], fileName, {
                    type: getFileType(fileName),
                    lastModified: new Date().getTime()
                });

                setFile(mockFile);
                setError(null);
            } catch (err) {
                console.error("Error fetching file:", err);
                setError("Failed to load the document. Please try again.");
            } finally {
                setIsProcessing(false);
            }
        };

        fetchFile();
    }, [folderName, fileName, router]);

    // Helper to determine file type based on extension
    const getFileType = (name) => {
        const extension = name.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf': return 'application/pdf';
            case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'txt': return 'text/plain';
            case 'png': return 'image/png';
            case 'jpg':
            case 'jpeg': return 'image/jpeg';
            default: return 'application/octet-stream';
        }
    };

    // Handles sending a message to AI and returning a response
    const handleSendMessage = async (message) => {
        try {
            setIsProcessing(true);

            // TODO: Replace with actual API call
            // Currently simulating with a delayed promise
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate AI response based on message content
            let response;
            if (message.toLowerCase().includes('요약') || message.toLowerCase().includes('정리')) {
                response = '📝 **문서 요약**\n\n이 문서는 인공지능 기술의 핵심 개념과 발전 과정을 설명하고 있습니다. 주요 내용은 다음과 같습니다:\n\n1. 인공지능의 정의와 역사적 발전\n2. 기계학습의 기본 유형 (지도, 비지도, 강화학습)\n3. 딥러닝의 원리와 신경망 구조\n4. 자연어 처리와 컴퓨터 비전의 최신 발전\n5. AI의 윤리적 고려사항과 미래 전망';
            } else if (message.toLowerCase().includes('인공지능') || message.toLowerCase().includes('ai')) {
                response = '🤖 **인공지능(AI)** 은 인간의 학습능력, 추론능력, 지각능력을 인공적으로 구현한 컴퓨터 시스템입니다.\n\n이 문서에서는 인공지능의 다양한 측면과 현대적 접근법을 다루고 있습니다.';
            } else {
                response = '질문하신 내용에 대한 정보를 문서에서 분석해보았습니다. 더 구체적인 질문이 있으시면 알려주세요.';
            }

            return response;
        } catch (err) {
            console.error("Error processing message:", err);
            return "죄송합니다, 메시지 처리 중 오류가 발생했습니다. 다시 시도해 주세요.";
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Document info header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{fileName || 'Document Detail'}</h1>
                    {folderName && (
                        <p className="text-sm text-gray-500">
                            Folder: {folderName}
                        </p>
                    )}
                </div>

                {/* Error display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Document viewer & AI chat section */}
                <div className="mb-6">
                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Document Analysis</h2>
                            <div className="flex items-center">
                                <label htmlFor="viewMode" className="text-sm font-medium text-gray-600 mr-2">View Mode:</label>
                                <select
                                    id="viewMode"
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    <option value="summary">AI summarized doc (markdown)</option>
                                    <option value="original">Original doc</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Document viewer */}
                        <div className="h-[calc(100vh-300px)] min-h-[500px] bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="p-4 overflow-auto h-full">
                                {viewMode === 'summary' ? (
                                    <MarkdownPreview markdown={aiSummary} />
                                ) : (
                                    <DocumentViewer file={file} isLoading={isProcessing} />
                                )}
                            </div>
                        </div>

                        {/* Original document viewer */}
                        <div className="h-[calc(100vh-300px)] min-h-[500px] bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="p-4 overflow-auto h-full">
                                <DocumentViewer file={file} isLoading={isProcessing} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User guide */}
                <UserGuide />
                
                {/* Chatbot Modal */}
                <ChatbotModal />
            </div>
        </main>
    );
}