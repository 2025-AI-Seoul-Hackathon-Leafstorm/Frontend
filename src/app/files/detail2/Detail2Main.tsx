'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DocumentViewer from '@/components/screen/DocumentViewer';
import UserGuide from "@/components/screen/UserGuide";
import MarkdownPreview from '@/components/screen/MarkdownPreview';
import ChatbotModal from '@/components/ui/ChatbotModal';

interface Document {
    id: string;
    title: string;
    createdAt: string;
    totalPages: number;
    fileType: string;
}

type ViewMode = 'summary' | 'original';

export default function Detail2Main() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const folderName = searchParams.get('folderName');
    const documentTitle = searchParams.get('documentTitle');

    const [file, setFile] = useState<File | null>(null);
    const [documentData, setDocumentData] = useState<Document | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('summary');
    const aiSummary = '📝 **문서 요약**\n\n이 문서는 인공지능 기술의 핵심 개념과 발전 과정을 설명하고 있습니다. 주요 내용은 다음과 같습니다:\n\n1. 인공지능의 정의와 역사적 발전\n2. 기계학습의 기본 유형 (지도, 비지도, 강화학습)\n3. 딥러닝의 원리와 신경망 구조\n4. 자연어 처리와 컴퓨터 비전의 최신 발전\n5. AI의 윤리적 고려사항과 미래 전망';

    useEffect(() => {
        // Redirect if no folder or document title is provided
        if (!folderName || !documentTitle) {
            router.push('/solution');
            return;
        }

        // Fetch document data
        const fetchDocument = async () => {
            try {
                setIsProcessing(true);
                
                // Fetch document data from API
                const response = await fetch(`https://3438ywb1da.execute-api.us-east-1.amazonaws.com/folders/${folderName}/documents`);
                const result = await response.json();
                
                // Find the document with matching title
                const document = result.documents.find((doc: Document) => doc.title === documentTitle);
                
                if (!document) {
                    setError("Document not found. Please try again.");
                    return;
                }
                
                setDocumentData(document);
                
                // Create a mock file object based on the document data
                const mockFile = new File([""], document.title || "Unnamed Document", {
                    type: document.fileType || 'application/octet-stream',
                    lastModified: new Date(document.createdAt).getTime()
                });
                
                setFile(mockFile);
                setError(null);
            } catch (err) {
                console.error("Error fetching document:", err);
                setError("Failed to load the document. Please try again.");
            } finally {
                setIsProcessing(false);
            }
        };

        fetchDocument();
    }, [folderName, documentTitle, router]);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Document info header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{documentData?.title || 'Document Detail'}</h1>
                    {folderName && (
                        <p className="text-sm text-gray-500">
                            Folder: {folderName}
                        </p>
                    )}
                    {documentData && (
                        <div className="mt-2 text-sm text-gray-500">
                            <p>Created: {new Date(documentData.createdAt).toLocaleString()}</p>
                            <p>Pages: {documentData.totalPages}</p>
                            <p>File Type: {documentData.fileType}</p>
                        </div>
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
                                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
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