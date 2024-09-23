import React, { createContext, useState, useContext } from 'react';

const ChatStateContext = createContext();

export function ChatStateProvider({ children }) {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleSelectChat = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  return (
    <ChatStateContext.Provider value={{ selectedSessionId, handleSelectChat }}>
      {children}
    </ChatStateContext.Provider>
  );
}

export function useChatState() {
  return useContext(ChatStateContext);
}