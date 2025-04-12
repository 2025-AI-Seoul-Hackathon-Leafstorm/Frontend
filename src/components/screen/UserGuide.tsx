import React from "react";

export default function UserGuide() {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">User Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <div
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">1
                        </div>
                        <h4 className="font-medium">Upload Document</h4>
                    </div>
                    <p className="text-gray-600 ml-10">
                        Upload a PDF, image, or text document you want to study.
                    </p>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <div
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">2
                        </div>
                        <h4 className="font-medium">Review Content</h4>
                    </div>
                    <p className="text-gray-600 ml-10">
                        Review the document on the left and highlight the parts you want to understand better.
                    </p>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <div
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-2">3
                        </div>
                        <h4 className="font-medium">Chat with AI</h4>
                    </div>
                    <p className="text-gray-600 ml-10">
                        Use the chat box on the right to freely ask questions about the document.
                    </p>
                </div>
            </div>
        </div>
    );
}