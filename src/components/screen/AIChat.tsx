import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  documentTitle?: string;
  folderName?: string;
  onSendMessage?: (message: string) => Promise<string>;
  isDocumentLoaded: boolean;
}

const AIChat: React.FC<AIChatProps> = ({
  documentTitle,
  folderName,
  isDocumentLoaded = false,
  onSendMessage
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
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [messageQueue, setMessageQueue] = useState<{message: string, folder: string, document: string}[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 3;
  const reconnectDelay = 3000; // 3 seconds
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const suggestions = [
    "Can you summarize this document?",
    "Explain the key concepts",
    "Simplify the difficult parts",
    "What are the practical use cases?"
  ];

  // Function to establish WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!isDocumentLoaded || !documentTitle || !folderName) {
      console.log('Cannot connect: missing required data', {
        isDocumentLoaded,
        documentTitle,
        folderName
      });
      return;
    }
    
    console.log('Attempting to connect to WebSocket...', {
      documentTitle,
      folderName,
      isDocumentLoaded,
      attempt: reconnectAttempts + 1
    });
    
    setConnectionStatus('connecting');
    
    // Use a more reliable WebSocket URL
    const wsUrl = 'wss://ytj3zc721d.execute-api.us-east-1.amazonaws.com/production';
    console.log('Connecting to WebSocket URL:', wsUrl);
    
    try {
      // Add a system message to inform the user about connection attempt
      const connectingMessage: Message = {
        id: Date.now().toString(),
        role: 'system',
        content: 'Attempting to connect to AI service...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, connectingMessage]);
      
      const websocket = new WebSocket(wsUrl);
      
      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (websocket.readyState !== WebSocket.OPEN) {
          console.error('❌ WebSocket connection timeout');
          websocket.close();
          
          // Add a system message about timeout
          const timeoutMessage: Message = {
            id: Date.now().toString(),
            role: 'system',
            content: 'Connection timed out. Trying to reconnect...',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, timeoutMessage]);
          
          handleReconnect();
        }
      }, 15000); // 15 seconds timeout

      websocket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log('✅ WebSocket Connected Successfully', {
          url: wsUrl,
          readyState: websocket.readyState,
          protocol: websocket.protocol
        });
        
        setConnectionStatus('connected');
        setReconnectAttempts(0);
        
        // Add a system message about successful connection
        const connectedMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'Connected to AI service successfully!',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, connectedMessage]);
        
        // Send initial data
        const initialData = {
          folder: folderName,
          document: documentTitle,
          type: 'init'
        };
        console.log('Sending initial data:', initialData);
        websocket.send(JSON.stringify(initialData));
        
        // Process any queued messages
        if (messageQueue.length > 0) {
          console.log(`Processing ${messageQueue.length} queued messages`);
          messageQueue.forEach(item => {
            console.log('Sending queued message:', item);
            websocket.send(JSON.stringify({
              message: item.message,
              folder: item.folder,
              document: item.document,
              type: 'message'
            }));
          });
          setMessageQueue([]);
        }
      };

      websocket.onmessage = (event) => {
        console.log('📩 Received WebSocket message:', event.data);
        try {
          const response = JSON.parse(event.data);
          
          // Handle different message types
          if (response.type === 'error') {
            console.error('❌ Server error:', response.message);
            const errorMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `Error: ${response.message || 'Unknown error occurred'}`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
            return;
          }
          
          const assistantMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.message || 'Sorry, I could not process your request.',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
          const errorMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Sorry, I received an invalid response. Please try again.',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsLoading(false);
        }
      };

      websocket.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.error('❌ WebSocket Error:', error);
        setIsLoading(false);
        setConnectionStatus('disconnected');
        
        // Add error message to chat
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Connection error. Please try again later.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      };

      websocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log('🔴 WebSocket Disconnected:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        setConnectionStatus('disconnected');
        
        // Add disconnection message if not clean close
        if (!event.wasClean) {
          const disconnectMessage: Message = {
            id: Date.now().toString(),
            role: 'system',
            content: 'Connection lost. Trying to reconnect...',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, disconnectMessage]);
          
          // Attempt to reconnect if not a clean close and not max attempts
          if (reconnectAttempts < maxReconnectAttempts) {
            handleReconnect();
          }
        }
      };

      setWs(websocket);

      return () => {
        clearTimeout(connectionTimeout);
        console.log('Cleaning up WebSocket connection...');
        websocket.close();
        setConnectionStatus('disconnected');
      };
    } catch (error) {
      console.error('❌ Error connecting to WebSocket:', error);
      setIsLoading(false);
      setConnectionStatus('disconnected');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Connection error. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [isDocumentLoaded, documentTitle, folderName, reconnectAttempts, messageQueue]);

  // Handle reconnection with exponential backoff
  const handleReconnect = useCallback(() => {
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      // Add a message to inform the user
      const maxAttemptsMessage: Message = {
        id: Date.now().toString(),
        role: 'system',
        content: 'Connection failed after multiple attempts. Please refresh the page or try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, maxAttemptsMessage]);
      return;
    }
    
    const delay = reconnectDelay * Math.pow(2, reconnectAttempts);
    console.log(`Scheduling reconnection attempt in ${delay}ms (attempt ${reconnectAttempts + 1}/${maxReconnectAttempts})`);
    
    setReconnectAttempts(prev => prev + 1);
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, delay);
  }, [reconnectAttempts, connectWebSocket]);

  // Initial connection
  useEffect(() => {
    console.log('Initial connection effect triggered', {
      isDocumentLoaded,
      documentTitle,
      folderName
    });
    
    if (isDocumentLoaded && documentTitle && folderName) {
      console.log('Attempting to connect to WebSocket from useEffect');
      connectWebSocket();
    } else {
      console.log('Cannot connect: missing required data in useEffect', {
        isDocumentLoaded,
        documentTitle,
        folderName
      });
      
      // Add a system message if document is not loaded
      if (!isDocumentLoaded) {
        const notLoadedMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'Please upload a document first to enable AI chat.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, notLoadedMessage]);
      }
    }
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [isDocumentLoaded, documentTitle, folderName, connectWebSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length >= 6 && !showSuggestions) {
      const timer = setTimeout(() => setShowSuggestions(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [messages, showSuggestions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) {
      console.log('Cannot send message:', {
        isEmpty: inputValue.trim() === '',
        isLoading
      });
      return;
    }

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
      // Try to use WebSocket if available and in OPEN state
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('📤 Sending message via WebSocket:', {
          content: userMessage.content,
          folder: folderName,
          document: documentTitle,
          webSocketState: ws.readyState
        });
        
        ws.send(JSON.stringify({
          message: userMessage.content,
          folder: folderName,
          document: documentTitle,
          type: 'message'
        }));
      } 
      // Queue message if WebSocket is connecting
      else if (ws && ws.readyState === WebSocket.CONNECTING) {
        console.log('📤 WebSocket is connecting, queueing message');
        setMessageQueue(prev => [...prev, {
          message: userMessage.content,
          folder: folderName || '',
          document: documentTitle || ''
        }]);
        
        // Add a system message to inform the user
        const queueMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'Message queued. Will be sent when connection is established.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, queueMessage]);
        setIsLoading(false);
      }
      // Check if WebSocket is in CLOSED state and try to reconnect
      else if (ws && ws.readyState === WebSocket.CLOSED) {
        console.log('📤 WebSocket is closed, attempting to reconnect');
        connectWebSocket();
        
        // Queue the message
        setMessageQueue(prev => [...prev, {
          message: userMessage.content,
          folder: folderName || '',
          document: documentTitle || ''
        }]);
        
        // Add a system message to inform the user
        const reconnectMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'Connection lost. Attempting to reconnect...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, reconnectMessage]);
        setIsLoading(false);
      }
      // Fallback to onSendMessage prop if available
      else if (onSendMessage) {
        console.log('📤 Sending message via onSendMessage prop');
        
        // Add a system message about using fallback
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'Using fallback communication method.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
        
        const response = await onSendMessage(userMessage.content);
        
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      } 
      // If neither WebSocket nor onSendMessage is available
      else {
        console.error('❌ No communication method available');
        
        // Add a system message about no communication method
        const noMethodMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: 'No communication method available. Please try again later.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, noMethodMessage]);
        
        throw new Error('No communication method available');
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, an error occurred while sending the message. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
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
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-800">AI Study Assistant</h2>
          <div 
            className={`ml-2 w-2.5 h-2.5 rounded-full ${
              connectionStatus === 'connected' 
                ? 'bg-green-500' 
                : connectionStatus === 'connecting'
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-red-500'
            }`}
            title={
              connectionStatus === 'connected' 
                ? 'Connected' 
                : connectionStatus === 'connecting'
                  ? 'Connecting...'
                  : 'Disconnected'
            }
          />
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
              className={`p-3 rounded-lg ${message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.role === 'system'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
            />
            <div
              className={`text-xs mt-1 ${message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                }`}
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
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 102 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
