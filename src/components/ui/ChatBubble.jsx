function ChatBubble({ message, sender }) {
    return (
      <div className={`flex ${sender === "bot" ? "justify-start" : "justify-end"} mb-4`}>
        <div className={`max-w-xs p-3 rounded-lg ${sender === "bot" ? "bg-gray-100 text-black" : "bg-blue-500 text-white"}`}>
          {message}
        </div>
      </div>
    );
  }
  