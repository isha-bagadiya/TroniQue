import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const ChatHistoryList = ({ history, isOpen, onSelectChat }) => {
  if (!history || history.length === 0) {
    return null;
  }

  const getFirstUserMessage = (chat) => {
    const firstUserMessage = chat.messages.find((msg) => msg.type === "user");
    return firstUserMessage ? firstUserMessage.content : "No message";
  };

  return (
    <div className="my-4 px-2">
      <ul className="space-y-2">
        {history.map((chat, index) => (
          <li key={chat._id}>
            <button
              onClick={() => onSelectChat(chat)}
              className="w-full text-nowrap text-left text-white text-sm border-b border-b-[#4b22226c] border-t border-t-[#4b22226c] p-2 px-3 flex items-center gap-2"
            >
              <HiChatBubbleLeftRight />
              <p className="w-[90%] overflow-hidden"> {isOpen ? `${getFirstUserMessage(chat)}` : index + 1}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistoryList;
