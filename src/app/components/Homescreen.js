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
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Site Feedback Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "APE NFT Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Chitchat Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Discussion Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Dev Talks Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Hackathon Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
      "Is trondao a moderator ?",
    ],
    "Site Feedback Users": ["question1", "question2", "question3", "question4"],
    "APE NFT Users": ["question1", "question2", "question3", "question4"],
    "Chitchat Users": ["question1", "question2", "question3", "question4"],
    "Discussion Users": ["question1", "question2", "question3", "question4"],
    "Dev Talks Users": ["question1", "question2", "question3", "question4"],
    "Hackathon Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
      "question 3",
      "question4",
    ],
    "Site Feedback Posts": ["question1", "question2", "question3", "question4"],
    "APE NFT Posts": ["question1", "question2", "question3", "question4"],
    "Chitchat Posts": ["question1", "question2", "question3", "question4"],
    "Discussion Posts": ["question1", "question2", "question3", "question4"],
    "Dev Talks Posts": ["question1", "question2", "question3", "question4"],
  };

  const contractSubfields = [
    "Contract Energy Statistics",
    "Contract Call Statistics",
    "Contract Data Statistics",
    "Tokens",
  ];

  const contractQuestions = {
    "Contract Energy Statistics": [
      "question1 Contract Energy Statistics",
      "question2 Contract Energy Statistics",
      "question3 Contract Energy Statistics",
      "question4 Contract Energy Statistics",
    ],
    "Contract Call Statistics": [
      "question1 Contract Call Statistics",
      "question2 Contract Call Statistics",
      "question3 Contract Call Statistics",
      "question4 Contract Call Statistics",
    ],
    "Contract Data Statistics": [
      "question1 Hackathon Topics",
      "question2 Hackathon Topics",
      "question3 Hackathon Topics",
      "question4 Hackathon Topics",
    ],
    Tokens: [
      "question1 Hackathon Topics",
      "question2 Hackathon Topics",
      "question3 Hackathon Topics",
      "question4 Hackathon Topics",
    ],
  };

  const questions =
    route === "dextrades"
      ? dexTradesQuestions
      : route === "forum"
      ? forumQuestions[selectedSubfield] || []
      : route === "contract"
      ? contractQuestions[selectedSubfield] || []
      : [];

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
