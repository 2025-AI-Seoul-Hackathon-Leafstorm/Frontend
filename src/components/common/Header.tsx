import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link className="cursor-pointer" href="/">
                        <div className="flex items-center cursor-pointer">
                            <h1 className="text-xl font-bold text-gray-900">Clarity</h1>
                            <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Prototype</span>
                        </div>
                    </Link>
                    <div className="text-sm text-gray-500">
                        Powered by UPSTAGE
                    </div>
                </div>
            </div>
        </header>
    );
}