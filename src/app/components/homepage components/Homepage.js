"use client";

import Image from "next/image";
import React, { useState } from "react";
import img1 from "../../../../public/Img 1.svg";
import img2 from "../../../../public/illustration2.webp";
import img3 from "../../../../public/illustration3.webp";
import img4 from "../../../../public/illustration4.webp";
import Link from "next/link";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { motion } from "framer-motion";

const Homepage = () => {
  const { connected } = useWallet();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const glowAnimation = {
    initial: { textShadow: "0 0 0px rgba(255,255,255,0)" },
    animate: {
      textShadow: [
        "0 0 4px rgba(255,255,255,0.1)",
        "0 0 10px rgba(255,255,255,0.3)",
        "0 0 16px rgba(255,255,255,0.6)",
        "0 0 20px rgba(255,255,255,0.3)",
        "0 0 4px rgba(255,255,255,0.1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const rotateAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 20, 0, -20, 0],
      transition: {
        duration: 100,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="w-[90%] mx-auto px-16 font-regular-actay">
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center mt-10 h-[75vh] overflow-hidden">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-6xl text-center w-[90%] mx-auto leading-tight">
              <span className="bg-tronique bg-clip-text text-transparent inline-block">
                TroniQue:
              </span>{" "}
              <span>Simplifying Tron and Empowering Users with TroniQue</span>
            </h1>
            <p className="text-xl text-center mt-5" variants={fadeInUp}>
              Navigate the world of TRON with unmatched ease and insight
            </p>

            {!connected && (
              <motion.div
                className="bg-tronique rounded-full overflow-hidden p-[1px] w-[140px] h-[50px] relative z-20 flex items-center justify-center my-6"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-[#621D1D] w-full h-full rounded-full hover:bg-[#621d1da1]">
                  <WalletActionButton>Get Started</WalletActionButton>
                </div>
              </motion.div>
            )}
            {connected && (
              <Link href="/forum">
                <motion.div
                  className="bg-tronique rounded-full overflow-hidden p-[1px] w-[140px] h-[50px] relative z-20 flex items-center justify-center my-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-[#621D1D] w-full h-full rounded-full hover:bg-[#621d1da1]">
                    <button className="z-20 relative rounded-full w-full h-full bg-gradient-to-b from-[#621d1d52] to-[#DE082D4D] font-light">
                      Get Started
                    </button>
                  </div>
                </motion.div>
              </Link>
            )}
          </div>
          <motion.div className="w-full h-max -mt-36 z-10 relative">
            <motion.div
              variants={rotateAnimation}
              initial="initial"
              animate="animate"
            >
              <Image
                src={img1}
                alt="img1"
                className="w-[75%] h-auto mx-auto"
                priority
              />
            </motion.div>
          </motion.div>
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
          </div>
          <div className="w-[33%] h-max rounded-2xl overflow-hidden">
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
          </div>
          <div className="w-[33%] h-max rounded-2xl overflow-hidden">
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
              Smart Contracts Statistics
            </h2>
            <h4 className="text-xl my-5 leading-tight">
              Explore and Track TRON Smart Contracts with Ease
            </h4>
            <p className="text-base text-justify">
              At TroniQue, we make accessing comprehensive smart contract data
              on the TRON blockchain simple and efficient. Our platform provides
              users with detailed insights into key aspects of smart contracts,
              including their creation, status, interactions, and execution
              history. Whether you&apos;re monitoring specific contracts, analyzing
              trends, or verifying contract activity, TroniQue streamlines the
              process, offering clear and accessible information. With just a
              few clicks, users can explore the smart contracts that drive the
              TRON ecosystem.
            </p>
          </div>
          <div className="w-[33%] h-max rounded-2xl overflow-hidden">
            <Image
              src={img4}
              alt="img4"
              className="w-full h-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
