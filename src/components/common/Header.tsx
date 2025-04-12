import React from "react";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">Doc based Learning helper AI</h1>
                        <span
                            className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Prototype</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Powered by UPSTAGE
                    </div>
                </div>
            </div>
        </header>
    );
}