import React from "react";

const Homescreen = ({ route, onQuestionClick, selectedSubfield }) => {
  const dexTradesQuestions = [
    "What are the month wise total unique transactions?",
    "What are percentage of total unique transactions for 10 smart contract?",
    "Give the hourly total unique transactions of April based on block time.",
    "What are the daily total trades?",
  ];

  const forumSubfields = [
    "Hackathon Topics",
    "Site Feedback Topics",
    "APE NFT Topics",
    "Chitchat Topics",
    "Discussion Topics",
    "Dev Talks Topics",
    "Hackathon Users",
    "Site Feedback Users",
    "APE NFT Users",
    "Chitchat Users",
    "Discussion Users",
    "Dev Talks Users",
    "Hackathon Posts",
    "Site Feedback Posts",
    "APE NFT Posts",
    "Chitchat Posts",
    "Discussion Posts",
    "Dev Talks Posts",
  ];

  const forumQuestions = {
    "Hackathon Topics": [
      "question1 Hackathon Topics",
      "question2 Hackathon Topics",
      "question3 Hackathon Topics",
      "question4 Hackathon Topics"
    ],
    "Site Feedback Topics": [
      "question1 Site Feedback Topics",
      "question2 Site Feedback Topics",
      "question3 Site Feedback Topics",
      "question4 Site Feedback Topics"
    ],
    "APE NFT Topics": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Chitchat Topics": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Discussion Topics": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Dev Talks Topics": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Hackathon Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Site Feedback Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "APE NFT Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Chitchat Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Discussion Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Dev Talks Users": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Hackathon Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Site Feedback Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "APE NFT Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Chitchat Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Discussion Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
    "Dev Talks Posts": [
      "question1",
      "question2",
      "question3",
      "question4"
    ],
  };

  const questions = route === "dextrades" ? dexTradesQuestions : (forumQuestions[selectedSubfield] || []);

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
            className="overflow-hidden rounded-lg p-[1px] flex flex-col justify-start items-center w-[220px] h-[160px] bg-gradient-to-l hover:bg-gradient-to-tl from-[#FCD8D8] to-[#FB5C78]"
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
