"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/TroniQue.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';

const Navbar = () => {
    const { address, isConnected } = useAccount();
    const [isAddressSaved, setIsAddressSaved] = useState(false);

    useEffect(() => {
        if (isConnected && address && !isAddressSaved) {
            saveWalletAddress(address);
        }
    }, [isConnected, address, isAddressSaved]);

    const saveWalletAddress = async (walletAddress) => {
        console.log("addresssssss:", walletAddress)
        try {
            const response = await fetch('/api/credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress }),
            });

            if (response.ok) {
                setIsAddressSaved(true);
                console.log('Wallet address saved successfully');
            } else {
                console.error('Failed to save wallet address');
            }
        } catch (error) {
            console.error('Error saving wallet address:', error);
        }
    };

    return (
        <div className="w-[90%] mx-auto px-16 pt-20 py-8 flex items-center justify-between">
            <Link href="/">
                <Image src={logo} alt='logo'></Image>
            </Link>
            <ConnectButton />

        </div>
    )
}

export default Navbar