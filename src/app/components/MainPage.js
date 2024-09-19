"use client";

import React, { useEffect } from "react";
import Homescreen from "./Homescreen";
import MessageHistory from "./MessageHistory";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useCredits } from "./CreditsContext";

const MainPage = ({ route }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(message.length === 0);
  const [messages, setMessages] = useState([]);
  const { credits, deductCredit } = useCredits();

  const handleInputChange = (e) => {
    if (e.target.value.length > 0 && credits > 0) {
      setMessage(e.target.value);
      setDisabled(false);
    } else {
      setMessage("");
      setDisabled(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !disabled) {
      handleSend();
      event.preventDefault();
    }
  };

  const handleSend = async () => {
    if (message.trim() && credits > 0) {
        try {
            await deductCredit();
            setMessages([...messages, { type: "user", content: message }]);

            // Simulate AI response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "ai", content: "This is the AI generated answer" },
                ]);
            }, 1000);

            setMessage("");
            setDisabled(true);
        } catch (error) {
            console.error("Error handling send:", error);
        }
    }
};

  const handleQuestionClick = (question) => {
    setMessage(question);
    setDisabled(credits === 0);
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-[80vh] overflow-y-auto scrollbar-hide">
        {messages?.length === 0 ? (
          <Homescreen route={route} onQuestionClick={handleQuestionClick} />
        ) : (
          <MessageHistory messages={messages} />
        )}
      </div>
      <div className="flex items-center justify-between rounded-full bg-white w-full pl-5 pr-2 h-[45px] mb-3 absolute bottom-0">
        <input
          type="text"
          className={`w-full h-full bg-transparent border-none outline-none ${
            message.trim() ? "text-black" : "text-[#848484]"
          }`}
          placeholder={credits > 0 ? "Enter a prompt here" : "No credits left"}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          disabled={disabled}
          className={`ml-2 p-2 rounded-full transition-colors ${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleSend}
        >
          <BiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default MainPage;
