<<<<<<< HEAD
'use client';

=======
>>>>>>> ref#6/refactoringProjects
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  documentTitle?: string;
  onSendMessage?: (message: string) => Promise<string>;
  isDocumentLoaded: boolean;
}

const AIChat: React.FC<AIChatProps> = ({
  documentTitle,
<<<<<<< HEAD
  onSendMessage = async (msg: string) => "샘플 응답입니다.",
  isDocumentLoaded = false
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 문서에 대해 질문이 있으시면 저에게 물어보세요.',
      timestamp: new Date()
    }
  ]);

=======
  isDocumentLoaded = false
}) => {
  const initialMessages: Message[] = [
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! Feel free to ask me any questions about the document.',
      timestamp: new Date()
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
>>>>>>> ref#6/refactoringProjects
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

<<<<<<< HEAD
  // 추천 질문 샘플
=======
>>>>>>> ref#6/refactoringProjects
  const suggestions = [
    "Can you summarize this document?",
    "Explain the key concepts",
    "Simplify the difficult parts",
    "What are the practical use cases?"
  ];

<<<<<<< HEAD
  // 문서가 로드되면 맞춤형 메시지 표시
=======
>>>>>>> ref#6/refactoringProjects
  useEffect(() => {
    if (isDocumentLoaded && documentTitle) {
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
<<<<<<< HEAD
          content: `"${documentTitle}" 문서가 로드되었습니다. 어떤 내용이 궁금하신가요?`,
=======
          content: `"${documentTitle}" has been loaded. What would you like to know about it?`,
>>>>>>> ref#6/refactoringProjects
          timestamp: new Date()
        }
      ]);
      setShowSuggestions(true);
    }
  }, [isDocumentLoaded, documentTitle]);

<<<<<<< HEAD
  // 채팅창 자동 스크롤
=======
>>>>>>> ref#6/refactoringProjects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

<<<<<<< HEAD
=======
  useEffect(() => {
    if (messages.length >= 6 && !showSuggestions) {
      const timer = setTimeout(() => setShowSuggestions(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [messages, showSuggestions]);

>>>>>>> ref#6/refactoringProjects
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

<<<<<<< HEAD
  // 텍스트 선택 감지 (선택된 텍스트에 대한 질문을 위함)
=======
>>>>>>> ref#6/refactoringProjects
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString().trim());
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, []);

<<<<<<< HEAD
  // 입력창 높이 자동 조절
=======
>>>>>>> ref#6/refactoringProjects
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedText('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      let response = '';
      const userInput = userMessage.content.toLowerCase();

      if (userInput.includes('요약') || userInput.includes('정리')) {
        response = `📝 **Document Summary**\n\nThis document explains the core concepts and development of AI technologies. Key points include:\n\n1. Definition and historical development of AI\n2. Basic types of machine learning (supervised, unsupervised, reinforcement)\n3. Principles of deep learning and neural network structures\n4. Recent developments in NLP and computer vision\n5. Ethical considerations and future outlook of AI`;
      } else if (userInput.includes('인공지능') || userInput.includes('ai')) {
        response = `🤖 **Artificial Intelligence (AI)** is a computer system that emulates human learning, reasoning, and perception abilities.\n\nAccording to the document, the history of AI development is as follows:\n- 1950s: Alan Turing's 'Turing Test' concept\n- 1980s: Emergence of expert systems\n- 2010s: Practical AI development via the deep learning revolution\n\nRecently, AI has made significant progress in NLP, image recognition, and reinforcement learning.`;
      } else if (userInput.includes('머신러닝') || userInput.includes('기계학습')) {
        response = `📊 **Machine Learning** enables computers to learn patterns from data and make decisions or predictions without explicit programming.\n\nThe document describes three major types of learning:\n\n1. **Supervised Learning**: Uses labeled data (e.g., classification, regression)\n2. **Unsupervised Learning**: Discovers patterns from unlabeled data (e.g., clustering)\n3. **Reinforcement Learning**: Learns through interactions with the environment to maximize reward`;
      } else if (userInput.includes('딥러닝') || userInput.includes('신경망')) {
        response = `🧠 **Deep Learning** uses multi-layer artificial neural networks inspired by the human brain to learn complex patterns from data.\n\nKey types of neural networks described in the document:\n\n1. **CNN (Convolutional Neural Network)**: Specialized for image processing\n2. **RNN (Recurrent Neural Network)**: Effective for sequence data\n3. **Transformer**: Foundation of modern NLP models\n\nDeep learning performs especially well on large datasets.`;
      } else {
        response = `I searched the document for your question. This topic is related to core concepts in AI and plays an important role in data-driven decision-making.\n\nIf you have a more specific question, feel free to ask. For example, you can ask about particular algorithms or real-world applications.`;
      }

<<<<<<< HEAD
      // 약간의 지연 후 응답 추가 (실제 API 응답 시간 시뮬레이션)
=======
>>>>>>> ref#6/refactoringProjects
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('메시지 처리 중 오류 발생:', error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
<<<<<<< HEAD
        content: '죄송합니다, 응답을 처리하는 중에 오류가 발생했습니다. 다시 시도해 주세요.',
=======
        content: 'Sorry, an error occurred while processing the response. Please try again.',
>>>>>>> ref#6/refactoringProjects
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
<<<<<<< HEAD

      // 3-4개 메시지 교환 후 추천 질문 다시 표시
      if (messages.length >= 6 && !showSuggestions) {
        setTimeout(() => setShowSuggestions(true), 1000);
      }
=======
>>>>>>> ref#6/refactoringProjects
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/📝|🤖|📊|🧠/g, '<span style="font-size:1.2em;margin-right:4px;">$&</span>');
  };

  const askAboutSelection = () => {
    if (selectedText) {
      setInputValue(`Explain about "${selectedText}"`);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800">AI Study Assistant</h2>
          <p className="text-xs text-gray-500">Ask questions and learn based on the document</p>
        </div>
        {selectedText && (
          <button
            onClick={askAboutSelection}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
          >
            Ask about selected text
          </button>
        )}
      </div>

      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] mb-4 ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div
<<<<<<< HEAD
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
=======
              className={`p-3 rounded-lg ${message.role === 'user'
                  ? 'bg-blue-500 text-white'
>>>>>>> ref#6/refactoringProjects
                  : 'bg-gray-100 text-gray-800'
                }`}
              dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
            />
            <div
<<<<<<< HEAD
              className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
              }`}
=======
              className={`text-xs mt-1 ${message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                }`}
>>>>>>> ref#6/refactoringProjects
            >
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="max-w-[85%] mr-auto mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="my-4">
            <p className="text-xs text-gray-500 mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    setInputValue(suggestion);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <div className="flex items-end">
          <textarea
            ref={inputRef}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
            placeholder={isDocumentLoaded ? "Type your question..." : "Please upload a document first..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isDocumentLoaded || isLoading}
            rows={1}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[4rem]"
            onClick={handleSendMessage}
            disabled={!isDocumentLoaded || inputValue.trim() === '' || isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
  export default AIChat;
};
<<<<<<< HEAD
=======

export default AIChat;
>>>>>>> ref#6/refactoringProjects
