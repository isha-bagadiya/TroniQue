"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/TroniQue.svg";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { LuFolderDown } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#282c34] rounded-lg max-w-sm w-full p-8 relative">
        {children}
        <button
          className="absolute top-2 right-2 text-white text-3xl"
          onClick={onClose}
        >
          <IoIosClose />
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const { address, connected } = useWallet();
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const checkWalletAvailability = () => {
      if (typeof window !== "undefined" && window.tronLink) {
        setIsWalletInstalled(true);
      } else {
        setIsWalletInstalled(false);
      }
    };

    checkWalletAvailability();
  }, []);

  const handleConnect = () => {
    setShowInstallModal(true);
  };

  const handleInstallClick = () => {
    window.open("https://www.tronlink.org/", "_blank");
  };

  const handleInstalledClick = () => {
    window.location.reload();
  };

  const handleLaterClick = () => {
    setShowInstallModal(false);
    alert("If you don't connect a wallet, you won't be able to use TroniQue.");
  };

  useEffect(() => {
    if (connected && address && !isAddressSaved) {
      saveWalletAddress(address);
    }
  }, [connected, address, isAddressSaved]);

  const saveWalletAddress = async (walletAddress) => {
    console.log("addresssssss:", walletAddress);
    try {
      const response = await fetch("/api/credits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (response.ok) {
        setIsAddressSaved(true);
        console.log("Wallet address saved successfully");
      } else {
        console.error("Failed to save wallet address");
      }
    } catch (error) {
      console.error("Error saving wallet address:", error);
    }
  };

  return (
    <div className="w-[90%] mx-auto px-16 pt-20 py-8 flex items-center justify-between">
      <Link href="/">
        <Image src={logo} alt="logo"></Image>
      </Link>

      {!isWalletInstalled ? (
        <button
          onClick={handleConnect}
          className="px-7 py-3 font-semibold rounded-full bg-gradient-to-r from-[#DE082D] to-[#FB5C78]"
        >
          Install Wallet
        </button>
      ) : !connected ? (
        <WalletActionButton>Connect Wallet</WalletActionButton>
      ) : (
        <WalletActionButton />
      )}

      <Modal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      >
        <h2 className="text-2xl font-semibold my-2 bg-tronique bg-clip-text text-transparent">
          TronLink Wallet
        </h2>
        <button
          className="flex items-center gap-3 text-base hover:underline hover:underline-offset-1 hover:font-semibold"
          onClick={handleInstallClick}
        >
          Click here to install the wallet <LuFolderDown />
        </button>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 py-[8px] rounded-full border-none outline-none bg-gradient-to-tl from-[#DE082D] to-[#FB5C78] hover:bg-gradient-to-tr hover:from-[#FB5C78] hover:to-[#DE082D]"
            onClick={handleInstalledClick}
          >
            I have Installed
          </button>
          <button
            className="px-4 py-[8px] rounded-full border-none outline-none bg-gradient-to-tl from-[#DE082D] to-[#FB5C78] hover:bg-gradient-to-tr hover:from-[#FB5C78] hover:to-[#DE082D]"
            onClick={handleLaterClick}
          >
            Do It Later
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
