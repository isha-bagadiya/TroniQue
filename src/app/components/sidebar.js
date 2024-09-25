import Link from "next/link";
import { MdOutlineMenuOpen, MdOutlineMenu } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { FaArrowDown, FaCaretDown } from "react-icons/fa";

import Image from "../../../node_modules/next/image";
import logo from "../../../public/TroniQue.svg";
import logo2 from "../../../public/logo2.svg";

import { useEffect, useState } from "react";
import { useCredits } from "./CreditsContext";
import ChatHistoryList from "./ChatHistoryList";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useChatState } from "./ChatStateManager";

export default function Sidebar({ isOpen, toggleSidebar, currentPath }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const { credits, fetchCredits } = useCredits();
  const [chatHistory, setChatHistory] = useState([]);
  const { address } = useWallet(); // Get wallet address from Wagmi
  const { handleSelectChat, handleSubOption } = useChatState();
  const [showForum, setShowForum] = useState(false);
  const [subOption, setSubOption] = useState("Topic");

  useEffect(() => {
    fetchCredits();
    handleSubOption(subOption);
  }, [fetchCredits, subOption]);

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
        )}&option=${encodeURIComponent(option)}${
          subOption
            ? `&subOption=${encodeURIComponent(subOption)}`
            : ""
        }`
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
  const toggle = () => {
    setShowForum(!showForum);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "Forum Data") {
      fetchChatHistory("forum");
      toggle();
    } else if (option === "DexTrade Data") {
      fetchChatHistory("dextrades");
      toggleDropdown();
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

  const handleSubOptionSelect = (option) => {
    setSubOption(option);
    handleSubOption(option);
    toggleDropdown();
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-center items-center">
        <div
          className={`${
            isOpen
              ? "flex flex-row-reverse gap-5 justify-center ml-auto"
              : "flex flex-col justify-center items-center"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="transition m-1 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            {isOpen ? (
              <MdOutlineMenuOpen className="text-white text-3xl" />
            ) : (
              <MdOutlineMenu className="text-white text-3xl" />
            )}
          </button>
          <button
            className="my-5 transition hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleNewChat}
          >
            <RiChatNewFill className="text-white rounded-lg text-3xl text-center" />
          </button>
        </div>
      </div>

      <div>
        <button
          className={`${
            isOpen ? "w-full px-4" : "w-max mx-auto px-2"
          } relative flex items-center justify-between my-3 rounded-md border border-gray-500 bg-gradient-to-tl from-[#DE082D] to-[#FB5C78] hover:bg-gradient-to-tr hover:from-[#FB5C78] hover:to-[#DE082D] py-2 text-sm font-medium`}
          onClick={toggleDropdown}
        >
          {isOpen && (selectedOption || "Select Option")} <FaCaretDown />
        </button>

        {showDropdown && (
          <div
            className={`${
              isOpen
                ? "w-full bg-transparent"
                : "z-50 absolute w-[200px] left-6 bg-black"
            } my-1 p-1 flex flex-col rounded-md border border-gray-500 text-nowrap overflow-hidden`}
          >
            <Link href="/forum">
              <button
                onClick={() => handleOptionSelect("Forum Data")}
                className="w-full px-2 py-[10px] rounded-md text-left text-sm hover:bg-gradient-to-r hover:from-[#de082cac] hover:to-[#fb5c79d2] flex items-center justify-between"
              >
                Forum Data <FaCaretDown className="ml-auto" />
              </button>
            </Link>

            {showForum && (
              <div className="flex justify-between my-1 px-2">
                {["Topic", "User", "Post"].map((option) => (
                  <button
                    key={option}
                    value={option}
                    onClick={() => handleSubOptionSelect(option)}
                    className={`w-[31.5%] px-2 py-2 border border-gray-500 text-xs rounded hover:bg-gradient-to-r hover:from-[#de082cac] hover:to-[#fb5c79d2] ${
                      subOption === option
                        ? "bg-gradient-to-r from-[#DE082D] to-[#FB5C78]"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <Link href="/dex-trades">
              <button
                onClick={() => handleOptionSelect("DexTrade Data")}
                className="w-full text-left px-2 py-[10px] rounded-md text-sm hover:bg-gradient-to-r hover:from-[#de082cac] hover:to-[#fb5c79d2]"
              >
                DexTrade Data
              </button>
            </Link>
          </div>
        )}
      </div>
      <div
        className={`${isOpen ? "" : "hidden"} ${
          showDropdown ? " h-[52vh] " : " h-[67vh] "
        } overflow-scroll`}
      >
        <ChatHistoryList
          history={chatHistory}
          isOpen={isOpen}
          onSelectChat={handleChatSelect}
        />
      </div>

      <div
        className={`mt-auto flex items-center justify-between gap-2 ${
          isOpen ? "flex-row" : "flex-col-reverse"
        }`}
      >
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className={`${isOpen ? "w-[120px] h-auto" : "hidden"}`}
          ></Image>
        </Link>

        <Link href="/">
          <div
            className={`${
              isOpen ? "hidden" : "w-full h-max border-t border-t-gray-500 p-3"
            }`}
          >
            <Image
              src={logo2}
              alt="logo"
              className="w-[80%] h-auto mx-auto"
            ></Image>
          </div>
        </Link>

        <div
          className={`mt-1 ${
            isOpen ? "flex items-center gap-2 flex-row-reverse" : "text-center"
          }`}
        >
          <p className="text-sm font-medium">Credits</p>
          <p className="font-bold text-lg">{credits}</p>
        </div>
      </div>
    </div>
  );
}
