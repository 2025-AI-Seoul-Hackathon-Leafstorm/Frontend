'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DocumentViewer from '@/components/screen/DocumentViewer';
import AIChat from '@/components/screen/AIChat';
import UserGuide from "@/components/screen/UserGuide";
import MarkdownPreview from '@/components/screen/MarkdownPreview';

interface Document {
    id: string;
    title: string;
    createdAt: string;
    totalPages: number;
    fileType: string;
    processedKey?: string;
    original_filename?: string;
}

type ViewMode = 'summary' | 'original';

export default function Detail() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const folderName = searchParams.get('folderName');
    const documentTitle = searchParams.get('documentTitle');

    const [file, setFile] = useState<File | null>(null);
    const [documentData, setDocumentData] = useState<Document | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('summary');
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [isMarkdownLoading, setIsMarkdownLoading] = useState<boolean>(false);
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);

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

                // Generate S3 URL if original_filename is available
                if (document.original_filename) {
                    const s3Url = `https://ai-tutor-target-docs.s3.us-east-1.amazonaws.com/${folderName}/${document.id}/upload/${document.original_filename}`;
                    setDocumentUrl(s3Url);
                }

                // Fetch markdown summary if processedKey exists
                if (document.processedKey) {
                    setIsMarkdownLoading(true);
                    try {
                        const summaryResponse = await fetch(`https://3438ywb1da.execute-api.us-east-1.amazonaws.com/ai_tutor_get_test?document_id=${document.processedKey}`);
                        const summaryData = await summaryResponse.json();
                        if (summaryData.summary) {
                            setMarkdownContent(summaryData.summary);
                        }
                    } catch (err) {
                        console.error("Error fetching markdown:", err);
                        setError("Failed to load the document summary. Please try again.");
                    } finally {
                        setIsMarkdownLoading(false);
                    }
                }
                
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

    // Handles sending a message to AI and returning a response
    const handleSendMessage = async (message: string): Promise<string> => {
        try {
            setIsProcessing(true);

            // TODO: Replace with actual API call
            // Currently simulating with a delayed promise
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate AI response based on message content
            let response: string;
            if (message.toLowerCase().includes('summary') || message.toLowerCase().includes('summarize')) {
                response = '📝 **Document Summary**\n\nThis document explains the core concepts and development of AI technologies. Key points include:\n\n1. Definition and historical development of AI\n2. Basic types of machine learning (supervised, unsupervised, reinforcement)\n3. Principles of deep learning and neural network structures\n4. Recent developments in NLP and computer vision\n5. Ethical considerations and future outlook of AI';
            } else if (message.toLowerCase().includes('artificial intelligence') || message.toLowerCase().includes('ai')) {
                response = '🤖 **Artificial Intelligence (AI)** is a computer system that emulates human learning, reasoning, and perception abilities.\n\nThis document covers various aspects of AI and modern approaches.';
            } else {
                response = 'I have analyzed the information in the document regarding your question. If you have more specific questions, please let me know.';
            }

            return response;
        } catch (err) {
            console.error("Error processing message:", err);
            return "Sorry, an error occurred while processing the message. Please try again.";
        } finally {
            setIsProcessing(false);
        }
    };

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
                                    isMarkdownLoading ? (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Loading document summary...
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <MarkdownPreview markdown={markdownContent} />
                                    )
                                ) : (
                                    <DocumentViewer 
                                        file={file} 
                                        fileUrl={documentUrl || undefined}
                                        fileType={documentData?.fileType}
                                        fileName={documentData?.title}
                                        isLoading={isProcessing} 
                                    />
                                )}
                            </div>
                        </div>

                        {/* AI chat */}
                        <div className="h-[calc(100vh-300px)] min-h-[500px] bg-white shadow-sm rounded-lg overflow-hidden">
                            <AIChat
                                documentTitle={documentData?.title || 'Document'}
                                onSendMessage={handleSendMessage}
                                isDocumentLoaded={!!documentData}
                            />
                        </div>
                    </div>
                </div>

                {/* User guide */}
                <UserGuide />
            </div>
        </main>
    );
}