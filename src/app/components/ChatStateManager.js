import React, { createContext, useState, useContext } from "react";

const ChatStateContext = createContext();

export function ChatStateProvider({ children }) {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedSubOption2, setSelectedSubOption2] = useState(null);


  const handleSelectChat = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  const handleSubOption = (option) => {
    setSelectedSubOption(option);
  };

  const handleSubOption2 = (option) => {
    setSelectedSubOption2(option);
  };
  console.log(selectedSubOption)
  console.log(selectedSubOption2)


  return (
    <ChatStateContext.Provider
      value={{
        selectedSessionId,
        handleSelectChat,
        selectedSubOption,
        handleSubOption,
        selectedSubOption2,
        handleSubOption2,
      }}
    >
      {children}
    </ChatStateContext.Provider>
  );
}

export function useChatState() {
  return useContext(ChatStateContext);
}
