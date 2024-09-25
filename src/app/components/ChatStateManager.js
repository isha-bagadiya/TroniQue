import React, { createContext, useState, useContext } from "react";

const ChatStateContext = createContext();

export function ChatStateProvider({ children }) {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);

  const handleSelectChat = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  const handleSubOption = (option) => {
    setSelectedSubOption(option);
  };
  console.log(selectedSubOption)

  return (
    <ChatStateContext.Provider
      value={{
        selectedSessionId,
        handleSelectChat,
        selectedSubOption,
        handleSubOption,
      }}
    >
      {children}
    </ChatStateContext.Provider>
  );
}

export function useChatState() {
  return useContext(ChatStateContext);
}
