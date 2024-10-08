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
  const { selectedSessionId, selectedSubOption, selectedSubOption2 } =
    useChatState();
  const [sessionId, setSessionId] = useState(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [isAIGenerating, setIsAIGenerating] = useState(false); // New state

  const dataTypeMapping = {
    Hackathon: {
      Topics: "hackathon_topics",
      Users: "hackathon_users",
      Posts: "hackathon_posts",
    },
    "Site Feedback": {
      Topics: "sitefeedback_topics",
      Users: "sitefeedback_users",
      Posts: "sitefeedback_posts",
    },
    "APE NFT": {
      Topics: "apenft_topics",
      Users: "apenft_users",
      Posts: "apenft_posts",
    },
    Chitchat: {
      Topics: "chitchat_topics",
      Users: "chitchat_users",
      Posts: "chitchat_posts",
    },
    Discussion: {
      Topics: "discussion_topics",
      Users: "discussion_users",
      Posts: "discussion_posts",
    },
    "Dev Talks": {
      Topics: "devtalks_topics",
      Users: "devtalks_users",
      Posts: "devtalks_posts",
    },
  };

  useEffect(() => {
    if (route === "forum" || route === "contract") {
      setMessages([]); // Reset messages when subfields change
      setSessionId(null); // Reset the session ID
    }
  }, [selectedSubOption, selectedSubOption2, route]);

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
          subOption:
            route === "forum" || route === "contract"
              ? selectedSubOption
              : undefined,
          subOption2: route === "forum" ? selectedSubOption2 : undefined,
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
        setIsAIGenerating(true); // Set to true when starting AI generation

        const newUserMessage = { type: "user", content: message };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setMessage("");
        setDisabled(true);

        console.log("Sending message to AI:", message);

        const aiResponse = await generateAIResponse(message);
        console.log("Received AI response:", aiResponse);

        if (aiResponse) {
          const aiMessage = {
            type: "ai",
            content: aiResponse,
          };
          const finalMessages = [...updatedMessages, aiMessage];
          setMessages(finalMessages);
          await saveChatSession(finalMessages);
        } else {
          console.error("AI response is empty or undefined");
          throw new Error("Empty AI response");
        }
      } catch (error) {
        console.error("Error in handleSend:", error);
        const errorMessage = {
          type: "error",
          content:
            "Sorry, I couldn't generate a response at this time. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsMessageSending(false);
        setIsAIGenerating(false); // Set to false when AI generation is complete
      }
    }
  };
  const generateAIResponse = async (userMessage) => {
    try {
      let dataType;

      if (route === "forum" && selectedSubOption && selectedSubOption2) {
        dataType =
          dataTypeMapping[selectedSubOption]?.[selectedSubOption2] || "topics";
      } else if (route === "contract" && selectedSubOption) {
        // You can add specific logic for the contract route if needed
        dataType = "topics"; // or any other default for contract route
      }

      const response = await fetch("http://34.231.214.248:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          openai_api_key: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          data_type: dataType,
        }),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(
          `Failed to generate AI response: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (!data.answer) {
        throw new Error("API response is missing the 'answer' field");
      }

      return data.answer;
    } catch (error) {
      console.error("Error in generateAIResponse:", error);
      throw error;
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
          <Homescreen
            route={route}
            onQuestionClick={handleQuestionClick}
            selectedSubfield={
              route === "forum"
                ? `${selectedSubOption} ${selectedSubOption2}`.trim()
                : route === "contract"
                ? selectedSubOption
                : undefined
            }
          />
        ) : (
          <>
            <MessageHistory messages={messages} />
            {isAIGenerating && (
              <div
                className={`max-w-[70%] p-3 rounded-lg "bg-gray-200 rounded-br-none opacity-5`}
              >
                <div className="h-2 bg-gray-300 rounded animate-pulse w-[310px]"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-2 w-[310px]"></div>
              </div>
            )}

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
