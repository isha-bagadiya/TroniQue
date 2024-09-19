import React from 'react';
import { FaHistory } from 'react-icons/fa';

const ChatHistoryList = ({ history, isOpen, onSelectChat }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className={`mt-4 ${isOpen ? 'px-4' : 'px-2'}`}>
      <h3 className={`text-white text-sm font-medium mb-2 ${isOpen ? '' : 'text-center'}`}>
        {isOpen ? 'Chat History' : <FaHistory />}
      </h3>
      <ul className="space-y-2">
        {history.map((chat, index) => (
          <li key={chat._id}>
            <button
              onClick={() => onSelectChat(chat)}
              className={`w-full text-left text-white text-sm hover:bg-gray-700 rounded p-2 ${
                isOpen ? '' : 'text-center'
              }`}
            >
              {isOpen
                ? `Chat ${index + 1} - ${new Date(chat.startTimestamp).toLocaleDateString()}`
                : index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistoryList;