import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdOutlineMenuOpen, MdOutlineMenu } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";

import Image from "../../../node_modules/next/image";
import logo from "../../../public/TroniQue.svg";
import { useEffect, useState } from "react";
import { useCredits } from "./CreditsContext";
import ChatHistoryList from "./ChatHistoryList";
import { useAccount } from "wagmi";
import { useChatState } from "./ChatStateManager";

export default function Sidebar({ isOpen, toggleSidebar, currentPath }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const { credits, fetchCredits } = useCredits();
  const [chatHistory, setChatHistory] = useState([]);
  const { address } = useAccount(); // Get wallet address from Wagmi
  const { handleSelectChat } = useChatState();

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    if (selectedOption === "Forum Data") {
      fetchChatHistory("forum");
    } else if (selectedOption === "DexTrade Data") {
      fetchChatHistory("dextrades");
    }
  });

  useEffect(() => {
    if (currentPath === "/forum") {
      setSelectedOption("Forum Data");
    } else if (currentPath === "/dex-trades") {
      setSelectedOption("DexTrade Data");
    } else {
      setSelectedOption("Select Option");
    }
  }, [currentPath]);

  const fetchChatHistory = async (option) => {
    if (!address) return;

    try {
      const response = await fetch(
        `/api/get-chat-history?walletAddress=${encodeURIComponent(
          address
        )}&option=${encodeURIComponent(option)}`
      );

      if (response.ok) {
        const data = await response.json();
        setChatHistory(data.history);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch chat history:", errorData);
        // Handle specific error cases
        if (response.status === 404) {
          console.error("User not found. Please check your wallet address.");
        } else {
          console.error("Unexpected error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error(`Error fetching ${option} chat history:`, error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleDropdown();
    if (option === "Forum Data") {
      fetchChatHistory("forum");
    } else if (option === "DexTrade Data") {
      fetchChatHistory("dextrades");
    }
  };

  const handleChatSelect = (chat) => {
    console.log("Selected chat:", chat);
    console.log("Selected chat SessionID:", chat.sessionId);
    handleSelectChat(chat.sessionId);
  };

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-center items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className={`${isOpen ? "w-[120px] h-auto" : "hidden"}`}
          ></Image>
        </Link>

        <div
          className={`${
            isOpen
              ? "flex flex-row-reverse justify-center ml-auto"
              : "flex flex-col justify-center items-center"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="transition m-4 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            {isOpen ? (
              <MdOutlineMenuOpen className="text-white text-3xl" />
            ) : (
              <MdOutlineMenu className="text-white text-3xl" />
            )}
          </button>
          <button className="my-5 transition hover:-translate-y-1 hover:scale-110 duration-300" onClick={handleNewChat}>
            <RiChatNewFill className="text-white rounded-lg text-3xl text-center" />
          </button>
        </div>
      </div>

      <div>
        <button
          className={`${
            isOpen ? "w-full px-4" : "w-max mx-auto px-2"
          } relative flex items-center justify-between my-3 rounded-md border border-gray-500 bg-transparent hover:bg-gray-900  py-2 text-sm font-medium`}
          onClick={toggleDropdown}
        >
          {isOpen && (selectedOption || "Select Option")} <FaCaretDown />
        </button>

        {showDropdown && (
          <div
            className={`${
              isOpen
                ? "w-full bg-transparent"
                : "absolute w-max left-8 bg-black"
            } my-1 flex flex-col gap-2 rounded-md border border-gray-500 text-nowrap overflow-hidden`}
          >
            <Link href="/forum">
              <button
                onClick={() => handleOptionSelect("Forum Data")}
                className="w-full px-6 py-2 text-sm hover:bg-gray-900"
              >
                Forum Data
              </button>
            </Link>
            <Link href="/dex-trades">
              <button
                onClick={() => handleOptionSelect("DexTrade Data")}
                className="w-full px-6 py-2 text-sm hover:bg-gray-900"
              >
                DexTrade Data
              </button>
            </Link>
          </div>
        )}
      </div>

      <ChatHistoryList
        history={chatHistory}
        isOpen={isOpen}
        onSelectChat={handleChatSelect}
      />

      <div
        className={`mt-auto mb-2 ${
          isOpen ? "flex items-center gap-2 flex-row-reverse" : "text-center"
        }`}
      >
        <p className="text-sm font-medium">Credits</p>
        <p className="font-bold text-lg">{credits}</p>
      </div>
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } p-2 border-t border-gray-700`}
      >
        <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
          <FaUser className="text-white" />
        </div>
      </div>
    </div>
  );
}
