"use client";
import { useEffect, useState } from "react";

export default function CreateQuizProblem({
  roomId,
  socket,
}: {
  quizId: string;
  socket: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState(0);
  const [problemAdded, setProblemAdded] = useState(false);
  const [options, setOptions] = useState([
    {
      id: 0,
      title: "",
    },
    {
      id: 1,
      title: "",
    },
    {
      id: 2,
      title: "",
    },
    {
      id: 3,
      title: "",
    },
  ]);

  useEffect(() => {
    if (problemAdded) {
      console.log("Added");
    }
  }, [problemAdded]);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a Problem
          </h2>

          <div className="mt-6 sm:mx-auto sm:w-full border-2 border-gray-600 p-6 rounded-lg border-r-8 bg-gradient-to-bl from-[#f3e1cc] to-[#f1b6cc]">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Problem Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Problem Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-2"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Problem Description
                </label>
                <div className="mt-2">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Problem Description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-2"
                  />
                </div>
              </div>

              {[0, 1, 2, 3].map((optionId, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:space-x-4"
                >
                  <div className="flex items-center">
                    <input
                      id={`radio-${optionId}`}
                      name="radio"
                      type="radio"
                      onChange={() => {
                        setAnswer(optionId);
                      }}
                      className="p-3 m-1"
                    />

                    <label
                      htmlFor={`options-${optionId}`}
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      {optionId}th Option
                    </label>
                  </div>

                  <div className="mt-2 sm:w-1/2">
                    <input
                      id={`options-${optionId}`}
                      name={`options-${optionId}`}
                      type="text"
                      placeholder="Option"
                      onChange={(e) => {
                        setOptions((options) =>
                          options.map((x) => {
                            if (x.id === optionId) {
                              return {
                                ...x,
                                title: e.target.value,
                              };
                            }
                            return x;
                          })
                        );
                      }}
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-3 lg:mt-2"
                    />
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-[#a55f79] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-[#da6e96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-8"
                  onClick={() => {
                    socket.emit("createProblem", {
                      roomId,
                      problem: {
                        title,
                        description,
                        options,
                        answer,
                      },
                    });
                    setProblemAdded(true);
                  }}
                >
                  Add Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
