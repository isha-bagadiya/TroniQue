import React from "react";

const ChatHistoryList = ({ history, isOpen, onSelectChat }) => {
  if (!history || history.length === 0) {
    return null;
  }

  const getFirstUserMessage = (chat) => {
    const firstUserMessage = chat.messages.find((msg) => msg.type === "user");
    return firstUserMessage ? firstUserMessage.content : "No message";
  };

  return (
    <div
      className={`my-4 ${isOpen ? "px-2" : "hidden"}`}
    >
      <ul className="space-y-2">
        {history.map((chat, index) => (
          <li key={chat._id}>
            <button
              onClick={() => onSelectChat(chat)}
              className="w-full overflow-hidden text-nowrap text-left text-white text-sm border-b border-b-gray-800 border-t border-t-gray-800 p-2 px-3"
            >
              {isOpen ? `${getFirstUserMessage(chat)}` : index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistoryList;
