import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    return (
        <div className="notion-style max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-900">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-900">{children}</h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xl font-semibold mb-2 mt-4 text-gray-900">{children}</h4>
                    ),
                    p: ({ children }) => (
                        <p className="text-base leading-7 mb-4 text-gray-700">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-base leading-7">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4 text-gray-600">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children }) => (
                        <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800">
                            {children}
                        </code>
                    ),
                    pre: ({ children }) => (
                        <pre className="bg-gray-100 rounded-lg p-4 mb-4 overflow-x-auto">
                            {children}
                        </pre>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-gray-700">{children}</em>
                    ),
                    hr: () => (
                        <hr className="my-6 border-gray-200" />
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gray-50">{children}</thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
                    ),
                    tr: ({ children }) => (
                        <tr>{children}</tr>
                    ),
                    th: ({ children }) => (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {children}
                        </td>
                    ),
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPreview;