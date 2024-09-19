import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdOutlineMenuOpen, MdOutlineMenu } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";

import Image from "../../../node_modules/next/image";
import logo from "../../../public/TroniQue.svg";
import { useEffect, useState } from "react";
import { useCredits } from "./CreditsContext";

export default function Sidebar({ isOpen, toggleSidebar, currentPath }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const { credits, fetchCredits } = useCredits();

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    if (currentPath === "/forum") {
      setSelectedOption("Forum Data");
    } else if (currentPath === "/dex-trades") {
      setSelectedOption("DexTrade Data");
    } else {
      setSelectedOption("Select Option");
    }
  }, [currentPath]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleDropdown();
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
          <button className="my-5">
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
