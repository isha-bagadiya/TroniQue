"use client";

import Image from "next/image";
import React from "react";
import img1 from "../../../../public/Illustration1.svg";
import img2 from "../../../../public/Illustration2.svg";
import img3 from "../../../../public/Illustration3.svg";
import img4 from "../../../../public/Illustration4.svg";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="w-[90%] mx-auto px-16">
      <div className="w-full h-10 bg-red-600 rounded-full my-3"></div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between my-10">
          <div className="w-[52%] flex flex-col">
            <h1 className="text-7xl font-bold w-full">TroniQue:</h1>
            <h1 className="text-5xl w-full my-5 leading-tight">
              Simplifying Tron and Empowering Users with TroniQue
            </h1>
            <p className="text-xl text-justify">
              Navigate the world of TRON with unmatched ease and insight
            </p>
          </div>
          <div className="w-[33%] h-max">
            <Image
              src={img1}
              alt="img1"
              className="w-full h-auto"
              loading="lazy"
            ></Image>
          </div>
        </div>

        <div className="flex items-center justify-between my-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">Community Pulse</h2>
            <h4 className="text-2xl my-5 leading-tight">
              Explore the Pulse of the Community
            </h4>
            <p className="text-base text-justify">
              Dive into the vibrant discussions and gain deep insights from the
              TRON DAO Forum. With TroniQue, you can effortlessly search and
              analyze conversations to stay on top of the latest topics,
              community opinions, and key discussions.
            </p>
            <Link href="/forum">
              <button className="px-4 py-2 rounded-full border border-white w-max mt-4">
                Get Started
              </button>
            </Link>
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

        <div className="flex flex-row-reverse items-center justify-between my-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">Market Dynamics</h2>
            <h4 className="text-2xl my-5 leading-tight">
              Track and Analyze Decentralized Exchanges with Ease
            </h4>
            <p className="text-base text-justify">
              Stay ahead in the dynamic world of decentralized trading on the
              TRON network. TroniQue provides real-time data and sophisticated
              analytics for all DEX trades. Understand market movements, track
              energy usage, and analyze trade patterns to make informed
              decisions.
            </p>
            <Link href="/dex-trades">
              <button className="px-4 py-2 rounded-full border border-white w-max mt-4">
                Get Started
              </button>
            </Link>
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

        <div className="flex flex-row items-center justify-between my-10">
          <div className="w-[52%] flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">
              Documentation Gateway
            </h2>
            <h4 className="text-2xl my-5 leading-tight">
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
            <button
              className="px-4 py-2 rounded-full border border-white w-max mt-4"
              onClick={() =>
                toast("Coming Soon 🚀", {
                  duration: 1000,
                })
              }
            >
              Get Started
            </button>
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
    </div>
  );
};

export default Homepage;
