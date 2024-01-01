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

  function checkIfNextWasCalled() {
    socket.on("next");
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a Problem
          </h2>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-gray-200 p-12 border-r-8 border-b-8 rounded-lg">
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

              {[0, 1, 2, 3].map((optionId) => (
                <div>
                  <input
                    id="radio"
                    name="radio"
                    type="radio"
                    onChange={() => {
                      setAnswer(optionId);
                    }}
                    className="p-3 m-1"
                  />

                  <label
                    htmlFor="options"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    {optionId}th Option
                  </label>

                  <input
                    id="options"
                    name="options"
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
                    className="sm:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-3 lg:mt-2"
                  />
                </div>
              ))}

              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
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
