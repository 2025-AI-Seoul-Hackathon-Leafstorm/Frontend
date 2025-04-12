'use client';

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

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 추천 질문 샘플
  const suggestions = [
    "이 문서를 요약해줄래?",
    "주요 개념을 설명해줘",
    "이해하기 어려운 부분을 쉽게 풀어서 설명해줘",
    "이 내용의 실제 응용 사례는 뭐가 있어?"
  ];

  // 문서가 로드되면 맞춤형 메시지 표시
  useEffect(() => {
    if (isDocumentLoaded && documentTitle) {
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `"${documentTitle}" 문서가 로드되었습니다. 어떤 내용이 궁금하신가요?`,
          timestamp: new Date()
        }
      ]);
      setShowSuggestions(true);
    }
  }, [isDocumentLoaded, documentTitle]);

  // 채팅창 자동 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 텍스트 선택 감지 (선택된 텍스트에 대한 질문을 위함)
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

  // 입력창 높이 자동 조절
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
      // 모의 응답 로직 (실제 API 연동 시 대체)
      let response = '';
      const userInput = userMessage.content.toLowerCase();

      if (userInput.includes('요약') || userInput.includes('정리')) {
        response = `📝 **문서 요약**\n\n이 문서는 인공지능 기술의 핵심 개념과 발전 과정을 설명하고 있습니다. 주요 내용은 다음과 같습니다:\n\n1. 인공지능의 정의와 역사적 발전\n2. 기계학습의 기본 유형 (지도, 비지도, 강화학습)\n3. 딥러닝의 원리와 신경망 구조\n4. 자연어 처리와 컴퓨터 비전의 최신 발전\n5. AI의 윤리적 고려사항과 미래 전망`;
      } else if (userInput.includes('인공지능') || userInput.includes('ai')) {
        response = `🤖 **인공지능(AI)** 은 인간의 학습능력, 추론능력, 지각능력을 인공적으로 구현한 컴퓨터 시스템입니다.\n\n문서에서는 AI의 발전 역사를 다음과 같이 설명하고 있습니다:\n- 1950년대: 앨런 튜링의 '튜링 테스트' 개념 제안\n- 1980년대: 전문가 시스템의 발전\n- 2010년대: 딥러닝 혁명으로 실용적 AI 발전\n\n최근에는 자연어 처리, 이미지 인식, 강화학습 분야에서 큰 발전을 이루고 있습니다.`;
      } else if (userInput.includes('머신러닝') || userInput.includes('기계학습')) {
        response = `📊 **머신러닝(기계학습)** 은 컴퓨터가 명시적인 프로그래밍 없이 데이터로부터 패턴을 학습하여 의사결정이나 예측을 수행하는 기술입니다.\n\n문서에서 설명하는 세 가지 주요 학습 방식은 다음과 같습니다:\n\n1. **지도학습**: 레이블이 있는 데이터로 학습 (예: 분류, 회귀)\n2. **비지도학습**: 레이블 없는 데이터에서 패턴 발견 (예: 군집화)\n3. **강화학습**: 환경과 상호작용하며 보상 최대화 학습`;
      } else if (userInput.includes('딥러닝') || userInput.includes('신경망')) {
        response = `🧠 **딥러닝**은 인간 뇌의 신경망 구조에서 영감을 받은 다층 인공 신경망을 사용하여 데이터로부터 복잡한 패턴을 학습하는 기술입니다.\n\n문서에서 설명하는 주요 신경망 유형은 다음과 같습니다:\n\n1. **CNN(합성곱 신경망)**: 이미지 처리에 특화됨\n2. **RNN(순환 신경망)**: 시퀀스 데이터 처리에 활용\n3. **Transformer**: 최신 자연어 처리 모델의 기반\n\n딥러닝은 특히 대규모 데이터셋에서 뛰어난 성능을 발휘합니다.`;
      } else {
        response = `질문하신 내용에 대해 문서에서 찾아보았습니다. 이 주제는 인공지능의 핵심 개념과 관련이 있으며, 특히 데이터 기반 의사결정 과정에서 중요한 역할을 합니다.\n\n더 구체적인 질문이 있으시면 알려주세요. 예를 들어, 특정 알고리즘이나 적용 사례에 대해 질문하실 수 있습니다.`;
      }

      // 약간의 지연 후 응답 추가 (실제 API 응답 시간 시뮬레이션)
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
        content: '죄송합니다, 응답을 처리하는 중에 오류가 발생했습니다. 다시 시도해 주세요.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);

      // 3-4개 메시지 교환 후 추천 질문 다시 표시
      if (messages.length >= 6 && !showSuggestions) {
        setTimeout(() => setShowSuggestions(true), 1000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    // 마크다운 형식 텍스트를 HTML로 간단히 변환 (실제로는 마크다운 라이브러리 사용 권장)
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/📝|🤖|📊|🧠/g, '<span style="font-size:1.2em;margin-right:4px;">$&</span>');
  };

  const askAboutSelection = () => {
    if (selectedText) {
      setInputValue(`"${selectedText}"에 대해 설명해줘`);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800">AI 학습 도우미</h2>
          <p className="text-xs text-gray-500">문서를 기반으로 질문하고 학습하세요</p>
        </div>
        {selectedText && (
          <button
            onClick={askAboutSelection}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
          >
            선택 텍스트에 대해 질문
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
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
              dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
            />
            <div
              className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="max-w-[85%] mr-auto mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="my-4">
            <p className="text-xs text-gray-500 mb-2">추천 질문:</p>
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
            placeholder={isDocumentLoaded ? "질문을 입력하세요..." : "문서를 먼저 업로드해주세요..."}
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
