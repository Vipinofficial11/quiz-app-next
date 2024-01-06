"use client";
import { useState } from "react";
export default function Quiz({
  quizData,
  socket,
  userId,
  problemId,
  roomId,
}: {
  quizData: {
    title: string;
    description: string;
    options: string[];
  };
  socket: any;
  roomId: string;
  userId: string;
  problemId: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState(0);

  if (quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e4b580] to-[#e8729e]">
        <div className="flex w-full justify-center ">
          <div className="">
            <SingleQuiz
              choices={quizData.options.map((x) => x.title)}
              title={quizData.title}
              description={quizData.description}
              imageURL={""}
              setSelected={setSubmission}
            />
            <div className="flex justify-between w-full mt-4 text-white">
              <button
                className="flex w-full justify-center rounded-md bg-[#a55f79] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-[#da6e96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                disabled={submitted}
                onClick={() => {
                  setSubmitted(true);
                  socket.emit("submit", {
                    userId,
                    problemId,
                    submission: Number(submission),
                    roomId,
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center min-h-screen bg-gradient-to-tl from-[#e4b580] to-[#e8729e]">
        <label className="text-lg text-gray-900 mt-10 mb-2 md:text-2xl lg:text-3xl">
          Quiz not found for this room.
        </label>
      </div>
    );
  }
}

type SingleQuizProps = {
  title: string;
  description: string;
  choices: string[];
  imageURL?: string;
  setSelected: any;
};
function SingleQuiz({
  title,
  description,
  choices,
  imageURL,
  setSelected,
}: SingleQuizProps) {
  {
    console.log(title, description);
  }
  return (
    <div className="mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex flex-col">
        <label className="text-2xl md:text-3xl lg:text-3xl  text-gray-900 mt-4 mb-2 text-left">
          {title}
        </label>
        <label className="text-2xl  text-gray-500 mt-2 mb-4 text-left">
          {description}
        </label>
      </div>
      <div className="flex flex-col items-center min-w-60 md:min-w-72 lg:min-w-80">
        {choices.length &&
          choices.map((choice, index) => {
            return (
              <div
                key={index}
                className="flex items-center w-full py-2 md:py-4 pl-2 md:pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-gray-600 rounded-xl bg-purple-50 max-w-screen-md"
              >
                <input
                  type="radio"
                  name="option"
                  value={choice}
                  className="w-4 h-4 bg-black"
                  onClick={() => {
                    setSelected(index);
                  }}
                />
                <p className="ml-3 md:ml-6">{choice}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
