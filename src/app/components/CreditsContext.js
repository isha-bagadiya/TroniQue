"use client";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";

const CreditsContext = createContext();

export const useCredits = () => useContext(CreditsContext);

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const { address } = useAccount(); // Get wallet address from Wagmi

  
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

    const intervalId = setInterval(fetchCredits, 1000);
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
        console.error("Error deducting credit:", error);
      }
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, deductCredit, fetchCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
