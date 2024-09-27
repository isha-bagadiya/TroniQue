import React from 'react';

const ChatTypingLoader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] bg-black opacity-50">
      <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#DE082D" strokeWidth="8" strokeDasharray="70 283" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 50 50"
            to="360 50 50"
          />
        </circle>
        
        {/* Three dots */}
        <circle cx="35" cy="50" r="5" fill="#FB5C78">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="50" cy="50" r="5" fill="#FB5C78">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <circle cx="65" cy="50" r="5" fill="#FB5C78">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default ChatTypingLoader;