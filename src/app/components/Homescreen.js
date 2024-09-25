import React from "react";

const Homescreen = ({ route, onQuestionClick }) => {
  const dexTradesQuestions = [
    "What are the month wise total unique transactions?",
    "What are percentage of total unique transactions for 10 smart contract?",
    "Give the hourly total unique transactions of April based on block time.",
    "What are the daily total trades?",
  ];

  const forumQuestions = [
    "Top 10 users who have engaged the most in season 5.",
    "Which are the trending projects in season 5?",
    "List all users who have posted more than 10 times on a single topic in season 5.",
    "Top 10 users who have engaged the most in season 4.",
  ];

  const questions = route === "dextrades" ? dexTradesQuestions : forumQuestions;

  return (
    <div className="flex flex-col w-[80%] mx-auto items-center justify-center p-12">
      <div className="flex w-full h-auto flex-col items-start mt-16">
        <h3 className="text-5xl py-3 font-extrabold bg-tronique bg-clip-text text-transparent">
          Hello,
        </h3>
        <p className="text-5xl py-3 font-extrabold">
          How can I help you today?
        </p>
      </div>
      <div className="flex flex-row justify-start gap-4 items-center w-full mt-12 cursor-pointer">
        {questions.map((question, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg p-[1px] flex flex-col justify-start items-center w-[220px] h-[160px] bg-gradient-to-l from-[#FCD8D8] to-[#FB5C78]"
            onClick={() => onQuestionClick(question)}
          >
            <div className="bg-[#121212] rounded-lg w-full h-full">
              <p className="bg-[#45353545] hover:bg-[#4535359d] rounded-lg w-full h-full py-3 px-6">
                {question}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homescreen;
