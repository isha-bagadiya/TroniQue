"use client";

import Image from "next/image";
import React, { useState } from "react";
import img1 from "../../../../public/Img 1.svg";
import img2 from "../../../../public/Illustration2.svg";
import img3 from "../../../../public/Illustration3.svg";
import img4 from "../../../../public/Illustration4.svg";
import Link from "next/link";
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";

const Homepage = () => {
  const { connected } = useWallet();
  const [showWalletPopup, setShowWalletPopup] = useState(false);

  return (
    <div className="w-[90%] mx-auto px-16 font-regular-actay ">
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center mt-10 h-[75vh] overflow-hidden">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-6xl text-center w-[90%] mx-auto leading-tight">
              <span className="bg-tronique bg-clip-text text-transparent">
                TroniQue:
              </span>{" "}
              Simplifying Tron and Empowering Users with TroniQue
            </h1>
            <p className="text-xl text-center mt-5">
              Navigate the world of TRON with unmatched ease and insight
            </p>

            {!connected && (
              <div className="bg-tronique rounded-full overflow-hidden p-[1px] w-[140px] h-[50px] relative z-20 flex items-center justify-center my-6">
                <div className="bg-[#621D1D] w-full h-full rounded-full hover:bg-[#621d1da1]">
                <WalletActionButton children={'Get Started'}/>
                </div>
              </div>
            )}
            {connected && (
              <Link href="/forum">
                <div className="bg-tronique rounded-full overflow-hidden p-[1px] w-[140px] h-[50px] relative z-20 flex items-center justify-center my-6">
                  <div className="bg-[#621D1D] w-full h-full rounded-full hover:bg-[#621d1da1]">
                    <button className="z-20 relative rounded-full w-full h-full bg-gradient-to-b from-[#621d1d52] to-[#DE082D4D] font-light">
                      Get Started
                    </button>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="w-full h-max -mt-36 z-10 relative">
            <Image
              src={img1}
              alt="img1"
              className="w-[75%] h-auto mx-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>

        <div className="flex items-center justify-between p-10 py-14 bg-gradient-to-b from-[#242424f0] to-[#1d1a1afb] rounded-2xl w-full mb-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">Community Pulse</h2>
            <h4 className="text-xl my-5 leading-tight">
              Explore the Pulse of the Community
            </h4>
            <p className="text-base text-justify">
              Dive into the vibrant discussions and gain deep insights from the
              TRON DAO Forum. With TroniQue, you can effortlessly search and
              analyze conversations to stay on top of the latest topics,
              community opinions, and key discussions.
            </p>
            {/* {!isConnected && <GetStarted />} */}
            {connected && (
              <Link href="/forum">
                <button className="px-6 py-2 rounded-full border border-white w-max mt-4">
                  Get Started
                </button>
              </Link>
            )}
          </div>
          <div className="w-[33%] h-max">
            <Image
              src={img2}
              alt="img2"
              className="w-full h-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>

        <div className="flex flex-row-reverse items-center justify-between p-10 py-14 bg-gradient-to-b from-[#242424f0] to-[#1d1a1afb] rounded-2xl w-full my-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">Market Dynamics</h2>
            <h4 className="text-xl my-5 leading-tight">
              Track and Analyze Decentralized Exchanges with Ease
            </h4>
            <p className="text-base text-justify">
              Stay ahead in the dynamic world of decentralized trading on the
              TRON network. TroniQue provides real-time data and sophisticated
              analytics for all DEX trades. Understand market movements, track
              energy usage, and analyze trade patterns to make informed
              decisions.
            </p>
            {/* {!isConnected && <GetStarted />} */}

            {connected && (
              <Link href="/dex-trades">
                <button className="px-6 py-2 rounded-full border border-white w-max mt-4">
                  Get Started
                </button>
              </Link>
            )}
          </div>
          <div className="w-[33%] h-max">
            <Image
              src={img3}
              alt="img3"
              className="w-full h-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>

        <div className="flex items-center justify-between p-10 py-14 bg-gradient-to-b from-[#242424f0] to-[#1d1a1afb] rounded-2xl w-full my-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">
              Documentation Gateway
            </h2>
            <h4 className="text-xl my-5 leading-tight">
              Access All Essential Information in One Place
            </h4>
            <p className="text-base text-justify">
              Navigate the TRON ecosystems complexities effortlessly with
              TroniQue. Just type in a query—be it technical specifications,
              developer guides, or operational details—and our AI-driven system
              retrieves the information instantly. Its like having a
              knowledgeable guide right at your fingertips, making sure you get
              the precise data you need without the usual hassle.
            </p>
            {connected && (
              <button className="px-6 py-2 rounded-full border border-white w-max mt-4">
                Get Started
              </button>
            )}
          </div>
          <div className="w-[33%] h-max">
            <Image
              src={img4}
              alt="img4"
              className="w-full h-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>
      </div>
      {showWalletPopup && <WalletConnectPopup />}
    </div>
  );
};

export default Homepage;
