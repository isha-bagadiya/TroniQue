"use client";
import React, { useEffect, useRef, useState } from "react";
import Homescreen from "./Homescreen";
import MessageHistory from "./MessageHistory";
import { BiSend } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCredits } from "./CreditsContext";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useChatState } from "./ChatStateManager";
import MessageHistorySkeleton from "./skeletons/MessageHistorySkeleton";

const MainPage = ({ route }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(message.length === 0);
  const [messages, setMessages] = useState([]);
  const { credits, deductCredit } = useCredits();
  const { address } = useWallet(); // Get wallet address from Wagmi
  const { selectedSessionId, selectedSubOption } = useChatState();
  const [sessionId, setSessionId] = useState(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    const loadSession = async () => {
      if (selectedSessionId) {
        setIsLoading(true);
        try {
          console.log("trying to fetch");
          const response = await fetch(
            `/api/get-messages?sessionId=${selectedSessionId}&walletAddress=${address}&route=${route}`
          );
          console.log(response);
          if (!response.ok) {
            throw new Error("Failed to load chat session");
          }
          const data = await response.json();
          console.log("dataaaaa", data);
          if (Array.isArray(data.messages)) {
            setMessages(data.messages);
            console.log("Messages set:", data.messages);
          } else {
            console.error(
              "Received data does not contain a messages array:",
              data
            );
          }
          setSessionId(data.sessionId);
        } catch (error) {
          console.error("Error loading chat session:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSession();
  }, [selectedSessionId, address, route]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const saveChatSession = async (updatedMessages) => {
    try {
      const response = await fetch("/api/save-chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: address,
          route,
          messages: updatedMessages,
          sessionId,
          subOption: route === "forum" ? selectedSubOption : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save chat session");
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      console.log("Chat session saved:", data.message);
    } catch (error) {
      console.error("Error saving chat session:", error);
    }
  };

  const handleSend = async () => {
    if (message.trim() && credits > 0 && !isMessageSending) {
      try {
        await deductCredit();
        setIsMessageSending(true);
        const newUserMessage = { type: "user", content: message };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setMessage("");
        setDisabled(true);

        // Simulate AI response
        setTimeout(async () => {
          const aiMessage = {
            type: "ai",
            // content: "This is the AI generated answer",
            content: "The first three topics based on the number of likes are:\n\n1. **Unclaimed - Fall of Mankind** with 1161 likes.\n2. **BttTipBot - Tipping is mandatory sir** with 1127 likes.\n3. **Strongcoin - Be strong! Tap and earn** with 536 likes.",
          };
          const finalMessages = [...updatedMessages, aiMessage];
          setMessages(finalMessages);
          setIsMessageSending(false);

          await saveChatSession(finalMessages);
        }, 1000);

      } catch (error) {
        console.error("Error handling send:", error);
        setIsMessageSending(false);
      }
    }
  };

  const handleQuestionClick = (question) => {
    setMessage(question);
    setDisabled(credits === 0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-[80vh] overflow-y-auto scrollbar-hide">
        {isLoading ? (
          <MessageHistorySkeleton />
        ) : messages?.length === 0 ? (
          <Homescreen route={route} onQuestionClick={handleQuestionClick} />
        ) : (
          <>
            <MessageHistory messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className="flex items-center justify-between rounded-full border border-black bg-[#1c1919] w-full pl-5 pr-2 h-[50px] mb-3 absolute bottom-0">
        <input
          ref={inputRef}
          type="text"
          className={`w-full h-full bg-transparent border-none outline-none ${
            message.trim() ? "text-white" : "text-[#848484]"
          }`}
          placeholder={credits > 0 ? "Enter a prompt here" : "No credits left"}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isMessageSending}
        />

        <button
          disabled={disabled || isMessageSending}
          className={`ml-2 p-2 rounded-full transition-colors ${
            disabled || isMessageSending
              ? "bg-gray-300 text-[#DE082D] cursor-not-allowed"
              : "text-[#DE082D] bg-white"
          }`}
          onClick={handleSend}
        >
          {isMessageSending ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={18} />
          ) : (
            <BiSend size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MainPage;
