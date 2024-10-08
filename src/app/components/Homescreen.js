import React from "react";

const Homescreen = ({ route, onQuestionClick, selectedSubfield }) => {
  const dexTradesQuestions = [
    "Show me the top 3 transactions based on trade amount",
    "What are the top 5 transactions based on created date?",
    "Can you tell me the number of transactions happened on UniswapV2 exchange?",
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
      // "Can you give me the top 5 topics based on last posted date?",
    ],
    "Site Feedback Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      // "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "APE NFT Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      // "Can you give me the top 5 topics based on last posted date?",
    ],
    "Chitchat Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      // "Can you give me the top 5 topics based on last posted date?",
    ],
    "Discussion Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      "Can you give me top 3 topics based on the number of replies?",
      // "Can you give me the top 5 topics based on last posted date?",
    ],
    "Dev Talks Topics": [
      "Can you give me top 3 topics based on number of likes?",
      "Can you give me top 5 topics based on the created date?",
      // "Can you give me top 3 topics based on the number of replies?",
      "Can you give me the top 5 topics based on last posted date?",
    ],
    "Hackathon Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
      // "Is trondao a moderator ?",
    ],
    "Site Feedback Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
    ],
    "APE NFT Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
    ],
    "Chitchat Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
    ],
    "Discussion Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
    ],
    "Dev Talks Users": [
      "Can you give me the top 3 users based on their trust level ?",
      "What is the trust level of trondao ?",
      "Can you give me the list of all the moderators ?",
    ],
    "Hackathon Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
    "Site Feedback Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
    "APE NFT Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
    "Chitchat Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
    "Discussion Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
    "Dev Talks Posts": [
      "Can you give me the top 3 posts based on created date ?",
      "Give me the top 3 posts based on number of replies.",
    ],
  };

  const contractSubfields = [
    "Contract Energy Statistics",
    "Contract Call Statistics",
    "Contract Data Statistics",
    "Tokens",
  ];

  const contractQuestions = {
    "Contract Energy Statistics": [
      "Can you give me the top 5 contracts based on energy supplied by contract?",
      "What are the top 5 unique contracts based on trx?",
      "What is the total energy of contract TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    ],
    "Contract Call Statistics": [
      "What is the trx count for the contract named TetherToken?",
      "Show me the first 3 contracts by highest number of trx",
      "Can you give me a brief description of contract LaunchPadProxy",
    ],
    "Contract Data Statistics": [
      "What are the top 10 contracts based on balance with tokens?",
      "Is the creator of contract TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS a contract itself?",
      "What is the trx count of contract TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS?",
    ],
    Tokens: [
      "Give me the top 5 tokens by balance.",
      "Can you give me the the first 3 tokens based on created date?",
      "Who is the owner of the APENFT and what is the type of the token?",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-12">
        {questions.map((question, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg p-[1px] flex flex-col justify-start items-center w-full h-40 bg-gradient-to-l hover:bg-gradient-to-tl from-[#FCD8D8] to-[#FB5C78] cursor-pointer"
            onClick={() => onQuestionClick(question)}
          >
            <div className="bg-[#121212] rounded-lg w-full h-full flex items-center justify-center">
              <p className="bg-[#45353545] hover:bg-[#4535359d] rounded-lg w-full h-full py-3 px-6 flex items-center justify-center text-center overflow-hidden">
                <span className="line-clamp-3">{question}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homescreen;
