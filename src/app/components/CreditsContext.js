"use client";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

const CreditsContext = createContext();

export const useCredits = () => useContext(CreditsContext);

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState("--");
  const { address } = useWallet(); // Get wallet address from Wagmi

  
  const fetchCredits = useCallback(async () => {
    if(!address) return;

    try {
      const response = await fetch(
        `/api/credits/fetch?walletAddress=${encodeURIComponent(address)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCredits(data.credits || 0);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }, [address]);

  useEffect(() => {
    fetchCredits();

    const intervalId = setInterval(fetchCredits, 3000);
    return () => clearInterval(intervalId);

  }, [credits, fetchCredits]);


  const deductCredit = async () => {
    if (credits > 0 && address) {
      try {
        const response = await fetch("/api/credits/deduct-credit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deduct: 1, walletAddress: address }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCredits(data.credits || 0);
      } catch (error) {
        console.error("Error deducting credit:;;;nhjgb", error);
      }
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, deductCredit, fetchCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
