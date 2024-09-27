import React from "react";

const MessageHistorySkeleton = () => {
  const skeletonMessages = Array(6).fill(null); // Adjust the number as needed

  return (
    <div className="w-full h-full p-4 space-y-4">
      {skeletonMessages.map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              index % 2 === 0
                ? "bg-gray-200 rounded-br-none opacity-5"
                : "bg-gray-100 rounded-bl-none opacity-5"
            }`}
          >
            <div className="h-2 bg-gray-300 rounded animate-pulse w-[200px]"></div>
            <div className="h-2 bg-gray-300 rounded animate-pulse mt-2 w-[200px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageHistorySkeleton;