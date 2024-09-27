import React from "react";

const ChatHistoryListSkeleton = ({ count = 7 }) => {
  return (
    <div className="my-4 px-2">
      <ul className="space-y-2">
        {[...Array(count)].map((_, index) => (
          <li key={index}>
            <div className="w-full h-8 border-b opacity-40 border-b-[#4b22226c] border-t border-t-[#4b22226c] p-2 px-3 flex items-center gap-2">
              <div className="w-6 h-6 opacity-10 bg-black rounded-full animate-pulse"></div>
              <div className="h-6 opacity-10 bg-black rounded animate-pulse w-[90%]"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistoryListSkeleton;