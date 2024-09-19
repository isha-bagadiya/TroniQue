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
          <h3 className="text-5xl py-3 font-extrabold">Hello,</h3>
          <p className="text-5xl py-3 font-extrabold">
            How can I help you today?
          </p>
        </div>
        <div className="flex flex-row justify-start gap-4 items-center w-full mt-12">
          {questions.map((question, index) => (
            <div
              key={index}
              className="overflow-hidden border border-1 rounded-md py-3 px-6 flex flex-col justify-start items-center w-[220px] h-[140px]"
              onClick={() => onQuestionClick(question)}
            >
              <p>{question}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Homescreen;
